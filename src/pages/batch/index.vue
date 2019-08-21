<template>
  <div class="wrap">
    <div class="container">
      <div class="content" v-for="(val,key,index) in list" :key="index">
        <div class="header">{{key}}</div>
        <div class="box">
          <div  
            class="time"
            :class="v.check?'active':''"
            v-for="(v,idx) in val"
            :key="idx"
            @click="getSubmit(v,idx)"
          >{{v.startTime}}~{{v.endTime}}</div>
        </div>
      </div>
    </div>
    <div class="footer">
        <button @click="getOpen"><i-icon type="task_fill" size="20" />批量预约</button>
    </div>
    <i-modal i-class="modal" :visible="isModal" :show-ok="isOk" :show-cancel="isCancel" :cancel-text="cancelText" ok-text="预约" @cancel="getCancel" @ok="getOk" >
        <div>
            <span class="spans">{{title}}</span>
        </div>
        <div class="cont">
          <div v-if="successCourses==''&&failCourses==''">
            <p>预约课程:</p>
            <ul>
                <li v-for="(item,index) in listShow" :key="index">{{item.courseDate}}<span>{{item.startTime}}~{{item.endTime}}</span></li>
            </ul>
          </div>
            <ul v-if="successCourses!=''">
              <p>预约成功：</p>
              <li v-for="(item,index) in successCourses" :key="index">{{item.courseDate}}<span>{{item.startTime}}~{{item.endTime}}</span></li>
            </ul>
            <ul v-if="failCourses!=''">
              <p>预约失败：</p>
              <li v-for="(item,index) in failCourses" :key="index">{{item.courseDate}}<span>{{item.startTime}}~{{item.endTime}}</span></li>
            </ul>
        </div>
    </i-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      studentId:"",
      coachId:"",
      list: [],
      number: 0,
      params: [],
      title:"课程确认",
      isModal:false,
      courseId:"",
      km:"",
      orderCourses:[],
      listShow:[],
      isOk:true,
      isCancel:true,
      orderCoursesQuery:[],
      successCourses:[],
      failCourses:[],
      cancelText:"取消"
    };
  },
  onLoad(options){
    this.studentId = wx.getStorageSync('studentId');
    this.km = options.km;
    this.studentId = options.studentId;
    this.coachId = options.coachId;
    this.queryAll();
  },
  methods: {
    queryAll(){
      this.$httpWX.post({
        url:this.$api.batch.query,
        data:{
          params:{
            studentId:this.studentId,
            kmCode:this.km,
            coachId:this.coachId
            // isCurrentCoach:1
          }
        }
      }).then(res=>{
        this.list = res.data;
        this.list.forEach(item=>{
          this.$set(item,'check',false);
        })
      })
    },
    getSubmit(item, i) {
        this.params = [];
        this.listShow = [];
        this.$set(item,'check',!item.check);
        console.log(this.list);
        for(var key in this.list){
          this.list[key].forEach(item=>{
            if(item.check){
              this.params.push(item.id);
              this.listShow.push(item);
            }
          })
        }
        console.log(this.params);
    },
    getOpen(){
      this.title = '课程确认';
      this.isOk = true;
      this.isCancel = true;
      this.orderCourses = [];
      this.failCourses = [];
      if(this.params==''){
        wx.showToast({
          title: '请选择课程',
          icon: 'success',
          duration: 2000
        })
      }else{
        this.isModal = true;
      }
    },
    // 查询批量预约结果
    bookQuery(){
        this.$httpWX.post({
          url:this.$api.batch.bookQuery,
          data:{
            params:{
              orderCourses:this.orderCourses
            }
          }
        }).then(res=>{
          console.log(res);
          var orderCoursesQuery = [];
          var failCourses = [];
          res.data.map(v=>{
            if(v.batchNo==-112){
               setTimeout(()=>{
                var that = this;
                this.bookQuery();
              },3000)
            }else if(v.batchNo>0){
              orderCoursesQuery.push({
                 studentId:this.studentId,
                 courseId:v.courseId,
                 batchNo:v.batchNo,
                 courseDate:v.courseDate,
                 startTime:v.startTime,
                 endTime:v.endTime
               })
               this.title = '预约结果！'
                this.cancelText = '确认'
                this.isCancel = true;
            }
            else {
              failCourses.push({
                 studentId:this.studentId,
                 courseId:v.courseId,
                 batchNo:v.batchNo,
                 courseDate:v.courseDate,
                 startTime:v.startTime,
                 endTime:v.endTime
               })
              this.title = '预约结果！'
              this.cancelText = '确认'
              this.isCancel = true;
            }
          })
          this.successCourses = orderCoursesQuery;
          this.failCourses = failCourses;
          // this.orderCourses = orderCoursesQuery;
          
        })
    },
    getCancel(){
        this.isModal = false;
    },
    // 批量预约
    getOk(){
      this.title = '快速为您约课中';
      this.isOk = false;
      this.isCancel = false;
      this.cancelText = '取消';
        var orderCourses = [];
        for(var key in this.params){
          // console.log(this.params[key]);
          this.courseId = this.params[key];
          let params = {
            studentId:this.studentId,
            courseId:this.courseId,
            kmCode:this.km
          }
          orderCourses.push(params);
        }
        this.$httpWX.post({
          url:this.$api.batch.book,
          data:{
            params:{
              orderCourses:orderCourses
            }
          }
        }).then(res=>{
          console.log(res);
          this.orderCourses = [];
           res.data.map(v=>{
             if(v.batchNo>0){
               this.orderCourses.push({
                 studentId:this.studentId,
                 courseId:v.courseId,
                 batchNo:v.batchNo
               })
             }else {
               this.title = '预约结果！'
               this.cancelText = '确认'
               this.isCancel = true;
               this.failCourses = res.data;
             }
          })
          if(this.orderCourses.length){
            this.bookQuery();          
          }
        })
    }
  }
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .container{
    margin-bottom: 50px;
    .content {
      width: 100%;
      padding: 20rpx;
      border-bottom: 1rpx solid #f0f0f0;
      .header {
        text-align: center;
        color: #fb6809;
        font-size: 16px;
        font-weight: bold;
      }
      .box {
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
        padding: 20rpx 0;
        .time {
          width: 110px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1rpx solid #9f9f9f;
          border-radius: 8rpx;
          background: #fff;
          color: #4f4f4f;
          margin: 7rpx;
        }
        .time.active {
          background: #fb6809;
          border: 1rpx solid #fb6809;
          color: #fff;
        }
      }
    }
  }
  .footer{
      width: 100%;
      position: fixed;
      bottom: 10px;
      button{
        width:240px;
        height:40px;
        box-shadow: 0px 2px 10px 0px 
            rgba(253, 135, 2, 0.6);
        background-image: linear-gradient(90deg, #fc8902 0%, #fb4003 100%);
        line-height:40px;
        font-size:28rpx;
        color:#fff;
        border-radius:21px;
      }
  }
  .modal{
        div{
            .spans{
            font-size: 28rpx;
            color: #4f4f4f;
            font-weight: bold;
            margin-left: 10rpx;
            }
        }
        .cont{
            text-align: left;
            padding: 20px 40px;
            ul{
                li{
                    font-size: 24rpx;
                    font-weight: bold;
                    color: #4f4f4f;
                    span{
                        margin-left: 20rpx;
                    }
                }
            }
        }
    }
}
</style>

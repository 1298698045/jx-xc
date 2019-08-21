<template>
  <div class="wrap">
    <div class="header">
      <p>预约时段：{{detail.courseDate}} {{detail.startTime}}～{{detail.endTime}}</p>
      <p>{{detail.kmValue}}</p>
    </div>
    <div class="center">
      <i-row i-class="row" v-for="(item,index) in list" :key="index">
        <i-col span="5">
          <img src="/static/images/man.png" alt style="width:46px;height:46px;" />
        </i-col>
        <i-col span="13">
          <div class="box">
            <p>{{item.coachName}}</p>
            <siteAll :siteValue="item.siteId"></siteAll>
          </div>
        </i-col>
        <i-col span="5" i-class="left">
          <i-button i-class="btn" type="primary" @click="getOrder(item)">预约</i-button>
        </i-col>
      </i-row>
    </div>
    <i-modal i-class="modal" :visible="visible1"
     :show-ok="isOk" :show-cancel="isCancel"
     :cancel-text="cancelText" :ok-text="okText" @ok="goConfirm" @cancel="goCancel">
      <div class="title">
        <i-con type="remind_fill" size="28" color="#fb6809" />
        <span>{{title}}</span>
      </div>
      <div class="center">
        <p>
          教练：
          <span>{{coachName}}</span>
        </p>
        <p>
          时段：
          <span>{{starTimes}} {{startTime}}&nbsp;-&nbsp;{{endTime}}</span>
        </p>
        <p>
          日期：
          <span>{{courseDate}}</span>
        </p>
        <p>
          场地：
          <span>{{address}}</span>
        </p>
      </div>
    </i-modal>
  </div>
</template>
<script>
import siteAll from "../../components/site";
export default {
  components: {
    siteAll
  },
  data() {
    return {
      list: [],
      id: "",
      detail: "",
      studentId: "",
      km: "",
      title:"",
      cancelText:"取消",
      okText:"预约",
      visible1: false,
      coachName: "",
      starTimes: "",
      startTime: "",
      endTime: "",
      courseDate: "",
      isOk:true,
      isCancel:true,
      batchNo:""
    };
  },
  onLoad(options) {
    this.studentId = options.studentId;
    this.km = options.km;
    this.detail = JSON.parse(options.selectCoach);
    this.getQuery();
  },
  methods: {
    getQuery() {
      this.$httpWX
        .post({
          url: this.$api.more.query,
          data: {
            params: {
              startDate: this.detail.courseDate,
              endDate: this.detail.courseDate,
              startTime: this.detail.startTime,
              endTime: this.detail.endTime,
              studentId: this.studentId,
              kmCode: this.km
            }
          }
        })
        .then(res => {
          console.log(res);
          this.list = res.data.list;
          this.list.forEach(item => {
            var starTimes = item.endTime.slice(0, 2) < 12 ? "上午" : "下午";
            this.$set(item, "starTimes", starTimes);
          });
        });
    },
    bindPickerChange(e) {},
    getOrder(item) {
      console.log(item);
      this.id = item.id;
      this.title = '课程确认';
      this.isOk = true;
      this.cancelText = '取消';
      this.okText = '预约';
      this.coachName = item.coachName;
      this.starTimes = item.starTimes;
      this.startTime = item.starTime;
      this.endTime = item.endTime;
      this.courseDate = item.courseDate;
      this.visible1 = true;
    },
    goCancel(){
        this.visible1 = false;
    },
    goConfirm(){
        return new Promise((resolve,rejcet)=>{
            this.$httpWX.post({
                url: this.$api.reducible.book,
                data: {
                    params:{
                        studentId:this.studentId,
                        courseId:this.id,
                        kmCode:this.km
                    }
                }
            }).then(res=>{
                console.log(res);
                if(res.code==0){
                    this.title = '快速为您约课中...';
                    this.isOk = false;
                    this.isCancel = false;
                    this.batchNo = res.data;
                    resolve(this.getBookQuery())
                }else {
                    this.title = res.msg;
                    this.cancelText = '关闭';
                    this.isOk = false;
                }
            })
        })
    },
    getBookQuery(){
      if(this.batchNo==''){
        this.title = '预约失败，请重新预约！';
        this.cancelText = '关闭';
        this.isOk = false;
      }
      return new Promise ((resolve,reject)=>{
        this.$httpWX.post({
          url:this.$api.reducible.bookQuery,
          data:{
            params:{
              studentId:this.studentId,
              courseId:this.id,
              batchNo:this.batchNo||''
            }
          }
        }).then(res=>{
          console.log('结果',res);
          this.visible2 = true;
          if(res.code==-112){
              setTimeout(()=>{
                var that = this;
                this.getBookQuery();
              },3000)
          }else {
            this.title = '恭喜您，预约成功！';
            this.isOk = false;
            this.isCancel = true;
            this.cancelText = '确认';
          }
        })
      })
    },
  }
};
</script>
<style lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header {
    display: flex;
    height: 49px;
    line-height: 49px;
    background: #f6f6f6;
    padding: 0 20rpx;
    p {
      font-size: 28rpx;
      color: #979797;
    }
    p:nth-child(2) {
      margin-left: 30px;
    }
  }
  .center {
    width: 100%;
    padding: 0 20rpx;
    background: #fff;
    .row {
      padding: 10rpx 0;
      font-size: 24rpx;
      border-bottom: 1rpx solid #faf9f9;
      .box {
        margin-top: 10rpx;
        .pcol {
          color: #979797;
        }
      }
      .left {
        padding: 25rpx 0;
        .btn {
          width: 70px !important;
          height: 24px !important;
          line-height: 24px !important;
          margin: 0 !important;
          border: 1rpx solid #fb7015 !important;
          background: #fff !important;
          color: #fb7015 !important;
          font-size: 24rpx !important;
          border-radius: 8rpx !important;
          // margin-top:20%!important
        }
      }
    }
  }
  .modal {
    .title {
      span {
        font-size: 28rpx;
        color: #4f4f4f;
        font-weight: bold;
        margin-left: 10rpx;
      }
    }
    .center {
      width: 254px;
      // height: 89px;
      // background: #fcece4;
      border-radius: 10rpx;
      margin: 20rpx auto;
      font-size: 28rpx;
      text-align: left;
      padding: 20rpx 30rpx;
      p {
        color: #a4a4a4;
        span {
          color: #fb6809;
        }
      }
    }
    h3 {
      font-size: 28rpx;
      color: #888888;
      padding-top: 20rpx;
    }
  }
}
</style>

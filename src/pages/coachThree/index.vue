<template>
    <div class="container">
      <div class="header">
          <p>首次使用需先选择教练，可随时更换！祝您学车愉快！</p>
        </div>
        <div class="wrap">
            <div class="center">
              <div class="navHeader">
                <picker @change="bindPickerChange" v-model="index" range-key="name" :range="array">
                  <i-row i-class="rows">
                    <i-col span="6">
                      <p style="color: #bfbfbf;">选择训练场</p>
                    </i-col>
                    <i-col span="12">
                      <p style="text-align:center;">{{array[index].name}}</p>
                    </i-col>
                    <i-col span="6">
                      <p style="text-align:right;">
                        <i-icon type="unfold" size="24" />
                      </p>
                    </i-col>
                  </i-row>
                </picker>
              </div>
              

                <!-- <div class="boxWrap">
                  <i-row @click="getShow">
                    <i-col span="12">
                      <p>{{all}}</p>
                    </i-col>
                    <i-col span="12">
                        <h3>
                          <picker @change="bindPickerChange" :value="index" :range="array" range-key="provinceCode_label">
                            <i-icon type="enter" size="24"></i-icon>
                            <P>{{array[index].name}}</p>
                          </picker>
                          
                          <i-icon type="enter" size="24"></i-icon>
                        </h3>
                    </i-col>
                  </i-row>
                </div> -->
                <div class="row" v-for="(item,index) in list" :key="index" @click="getCoach(item,index)">
                    <i-row>
                        <i-col span="5">
                          <image v-if="item.sex=='XB001'" src="/static/images/man.png" style="width:46px;height:46px;vertical-align:middle;margin-left:36rpx;"></image>
                          <image v-if="item.sex=='XB002'" src="/static/images/gril.png" style="width:46px;height:46px;vertical-align:middle;margin-left:36rpx;"></image>
                        </i-col>
                        <i-col i-class="left" span="12">
                          <p style="text-align:left;margin-left:10rpx;margin-top:5rpx;">{{item.name}}</p>
                          <p style="text-align:left;margin-left:10rpx;font-size: 14px;color: #979797;">{{item.teachSubject=='JXKM001'?'科目二':item.teachSubject=='JXKM002'?'科目三':item.teachSubject=='JXKM003'?'科目二、科目三':''}}</p>
                        </i-col>
                        <i-col span="6" i-class="txt-right">
                          <p class="icon-success" :style="{'background': number==index?'#fb7117':'#d1d1d1'}">
                            <i-icon type="right" size="22" :color="'#fff'"/>
                          </p>
                        </i-col>
                        <!-- <i-col span="6">
                          <p style="text-align:left;margin-left:30rpx;margin-top:5rpx;">{{item.sex=='XB001'?'男':item.sex=='XB002'?'女':''}}</p>
                        </i-col> -->
                        <i-col span="4">
                            <!-- {{item.age}}&nbsp;周岁 -->
                        </i-col>
                        <i-col span="8">
                          <!-- <p style="text-align:right;margin-top:5rpx;">{{item.teachSubject=='JXKM001'?'科目二':item.teachSubject=='JXKM002'?'科目三':item.teachSubject=='JXKM003'?'科目二、科目三':''}}</p> -->
                        </i-col>
                    </i-row>
                </div>
            </div>


            <div class="boxBottom" v-if="isShow">
              <h3 style="text-align:center;padding:10rpx 0;">选择训练场</h3>
              <p :class="{active:tagIdx==index}" v-for="(item,index) in array" :key="index" @click="getChoice(index,item)">
                <span style="margin-left:50rpx;">
                  {{item.name}}:
                  <!-- {{item.provinceCode_label}}{{item.cityCode_label}} -->
                  {{item.districtCode_label}}{{item.address}}
                </span>
              </p>
            </div>
        </div>
        <div class="footer">
          <button class="quitBtn" @click="getGood">选好了</button>
        </div>
        <i-modal i-class="modal" :visible="isModal" cancel-text="重选" @ok="getOk" @cancel="getCanel">
          <div>
            <i-icon type="remind_fill" size="28" color="#fb6809" />
            <span>提示</span>
          </div>
          <div class="tBox">
            <p>确认要选择 <span style="color:#fb6809;">{{nameCoach}}</span> 作为您</p>
            <p>
              <span style="color:#4f4f4f;">科目三</span>的教练吗?
            </p>
          </div>
        </i-modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
      index:0,
      number: -1,
      userId:'',
      reportId:'',
      schoolCoach:'', // 教练id
      list: [
        // {
        //   name: "杨修远",
        //   sex: "男",
        //   age: "36",
        //   subject: "科目二"
        // }
      ],
      departmentCode:"",  // 所属机构
      maxBookedEnable:"",
      array: [
      ],
      isShow:false, // 场地显示
      tagIdx:"",
      all:"全部训练场",
      teachPermitted:"",
      isModal:false,
      id:"",
      nameCoach:"",
      subject:""
    };
  },
  onLoad(options){
    this.teachPermitted = wx.getStorageSync('teachPermitted');
    this.getAllField();
    console.log(options);
    this.departmentCode = options.departmentCode;
    this.reportId = options.reportId;
    this.userId = options.userId;
    //console.log(options.userId);
    // this.getDetail();
    this.getContractRules();
    // this.getQuery();
  },
  created() {
  },
  methods: {
    getShow(){
      this.isShow = !this.isShow;
    },
    // 全部训练场
    getAllField(){
      this.$httpWX.post({
        url:this.$api.coach.querySite,
        data:{
          status:"CDZT01"
        }
      }).then(res=>{
        console.log(res);
        this.array = res.content;
        this.array.unshift({name:"全部训练场"});
      })
    },
    // 选择训练场查询教练
    getChoice(index,item){
      console.log(item);
      this.all = item.name;
      this.tagIdx = index;
      this.$httpWX.post({
        url:this.$api.coach.queryAllCoach,
        data:{
          coachFlag:'1',
          status:'YGZT01',
          // belongSliceCode:this.departmentCode,
          maxBookedEnable:this.maxBookedEnable,
          subject:"JXKM002",
          carSiteId:item.id,
          teachPermitted:this.teachPermitted
        }
      }).then(res=>{
        this.list = res.content;
        this.isShow = false;
      })
    },
    bindPickerChange(e){
      console.log(e);
      this.index = e.mp.detail.value;
      let index = e.mp.detail.value;
      let id = this.array[index].id;
        this.$httpWX.post({
        url:this.$api.coach.queryAllCoach,
        data:{
          coachFlag:'1',
          status:'YGZT01',
          // belongSliceCode:this.departmentCode,
          maxBookedEnable:this.maxBookedEnable,
          subject:"JXKM002",
          carSiteId:id,
          teachPermitted:this.teachPermitted
        }
      }).then(res=>{
        this.list = res.content;
        this.isShow = false;
      })
    },
    // 查询教练
    getQuery(){
      this.$httpWX.post({
        url:this.$api.coach.queryAllCoach,
        data:{
          coachFlag:'1',
          status:'YGZT01',
          // belongSliceCode:this.departmentCode,
          maxBookedEnable:this.maxBookedEnable,
          subject:"JXKM002",
          teachPermitted:this.teachPermitted
          // classTypeId:wx.getStorageSync('classTypeId')
        }
      }).then(res=>{
        //console.log('1',res);
        this.list = res.content;
      }).catch(err=>{
        //console.log(err)
      })
    },
    // 我的
    getDetail(){
        this.$httpWX.get({
          url:this.$api.public.me+"/"+ this.userId,
          data:{
  
          }
        }).then(res=>{
          this.departmentCode = res.content.student.departmentCode;
          wx.setStorageSync('majorCardCode',res.content.student.baseInfo.majorCardCode)
          wx.setStorageSync('telphone',res.content.student.baseInfo.telphone)
          wx.setStorageSync('classTypeId',res.content.student.classTypeId)
          wx.setStorageSync('schoolCoach',res.content.student.report.schoolCoach);
          wx.setStorageSync('schoolCoachName',res.content.employee?res.content.employee.name:'');
          wx.setStorageSync('phone',res.content.employee?res.content.employee.phone:'');
          wx.setStorageSync('car',res.content.car?res.content.car.licenceNum :'无');
          wx.setStorageSync('siteId',res.content.car?res.content.car.siteId:'');
          wx.setStorageSync('departmentCode',res.content.student.departmentCode)
          wx.setStorageSync('regularizationFlag',res.content.student.regularizationFlag)
          this.reportId = res.content.student.report.id;
          if(res.content.employee==null){
            this.getContractRules();
          }else{
            wx.switchTab({
              url: "/pages/already/main"
            });
          }
        })
      },
    // 约课规则
    getContractRules() {
      this.$httpWX
        .post({
          url: this.$api.reducible.getStudentByCondition,
          data: {
            majorCardCode: wx.getStorageSync("majorCardCode"),
            telphone: wx.getStorageSync("telphone")
          }
        })
        .then(res => {
            this.maxBookedEnable = res.content.report.classType.userCount;
            this.getQuery();
        })
    },
    getCanel(){
      this.isModal = false;
    },
    getOk() {
      // this.number = index;
      //console.log(id);
      this.$httpWX.get({
        url:this.$api.coach.changeCoach + "/" + this.reportId +'/' + this.id + '/' + 'KM003',
        data:{

        }
      }).then(res=>{
        this.isModal = false;
        if(res.status.code * 1 === 10){
          wx.switchTab({
            url: "/pages/already/main"
          });
        }
        // this.getDetail().then(()=>{
        //   wx.switchTab({
        //     url: "/pages/already/main"
        //   });
        // });
      })
    },
    // 选好了
    getGood(){
      if(this.nameCoach == ''){
        return false;
      }else {
        this.isModal = true;
      }
    },
    getCoach(item,index){
      this.number = index;
      this.id = item.id;
      this.nameCoach = item.name;
      this.subject = item.teachSubject=='JXKM001'?'科目二':item.teachSubject=='JXKM002'?'科目三':item.teachSubject=='JXKM003'?'科目二、科目三':'';
    }
  },
       /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      // this.getDetail();
      wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    
    }
};
</script>
<style lang="scss">
@font-face {
    font-family: 'iconfont';
    src: url(data:font/truetype;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTYe/1T0AAAeYAAAAHEdERUYAKQAMAAAHeAAAAB5PUy8yPI1IaQAAAVgAAABWY21hcOaB6bgAAAHIAAABSmdhc3D//wADAAAHcAAAAAhnbHlmnnAlXgAAAyQAAAGAaGVhZBT08ncAAADcAAAANmhoZWEHmAPRAAABFAAAACRobXR4EegBOwAAAbAAAAAYbG9jYQDqAGwAAAMUAAAADm1heHABEwA9AAABOAAAACBuYW1lKeYRVQAABKQAAAKIcG9zdEgkSJMAAAcsAAAARAABAAAAAQAA2OJq7F8PPPUACwQAAAAAANkN1xoAAAAA2Q3XGgAA/8YDugOAAAAACAACAAAAAAAAAAEAAAOA/4AAXARKAAAAAAO6AAEAAAAAAAAAAAAAAAAAAAAGAAEAAAAGADEAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQxAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5h/mRgOA/4AAXAOAAIAAAAABAAAAAAAABAAAAAAAAAABVQAABAABOwRKAAAESQAAAAAAAwAAAAMAAAAcAAEAAAAAAEQAAwABAAAAHAAEACgAAAAGAAQAAQAC5h/mRv//AADmH+ZF//8Z5Bm/AAEAAAAAAAAAAAEGAAABAAAAAAAAAAECAAAAAgAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqAGwAwAAAAAIBOwCKAusCVQAKABUAAAE3JxcOAQczPgE3Fw4BBzcHFzc+ATcB7ldZAUxjAyIDUD7bB1U+AVlVAkxpCAHwNDEmDGdKPVQMqzxQCB8vNiYHYUoAAAMAAP/GA7oDgAANACEAIgAAAQYABxYAFzYANzQuAhMBBiIvASY0NjIfAQE+AR4CBgc1Ad3L/vMFBQENy8sBDQVIiK2y/ssNJA2yDRsjDZMBFgkWFxEGBgkDgAX+88vL/vMFBQENy2CtiEj+n/7LDQ2yDSMbDZMBFAkGBhEXFgkCAAAAAAMAAP/GA7kDgAANAC8AMAAAAQYABxYAFzYANy4DEx4BDgEHJi8BBwYjLgI2PwEnLgE+AhYfATc2HgIPARcB3Mr+8wUFAQ3KywEMBgFHiK2VCQULFQ0SDbe6DREOFQoFCbq4CAcGERcXCLi6DSMZAQy7twOABf7zy8r+8wYFAQ3LYK2ISP1rChkZDgEBDLi3DQEOGRkKt7oIFxcRBgYJurcNARoiDri3AAAAEgDeAAEAAAAAAAAAFQAsAAEAAAAAAAEACABUAAEAAAAAAAIABwBtAAEAAAAAAAMACACHAAEAAAAAAAQACACiAAEAAAAAAAUACwDDAAEAAAAAAAYACADhAAEAAAAAAAoAKwFCAAEAAAAAAAsAEwGWAAMAAQQJAAAAKgAAAAMAAQQJAAEAEABCAAMAAQQJAAIADgBdAAMAAQQJAAMAEAB1AAMAAQQJAAQAEACQAAMAAQQJAAUAFgCrAAMAAQQJAAYAEADPAAMAAQQJAAoAVgDqAAMAAQQJAAsAJgFuAAoAQwByAGUAYQB0AGUAZAAgAGIAeQAgAGkAYwBvAG4AZgBvAG4AdAAKAAAKQ3JlYXRlZCBieSBpY29uZm9udAoAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAAVmVyc2lvbiAxLjAAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AAEdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC4AAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAGh0dHA6Ly9mb250ZWxsby5jb20AAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAEAAgECAQMBBA1xaWVodWFueGl0b25nA2R1aQNjdW8AAAAB//8AAgABAAAADAAAABYAAAACAAEAAwAFAAEABAAAAAIAAAAAAAAAAQAAAADVpCcIAAAAANkN1xoAAAAA2Q3XGg==) format('truetype');
    font-weight: normal;
    font-style: normal;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-qiehuanxitong:before {
  content: "\e61f";
}

.icon-dui:before {
  content: "\e645";
}

.icon-cuo:before {
  content: "\e646";
}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container .wrap {
  width: 90%;
  margin: 0 auto;
}
.container  .header {
  width: 375px;
	height: 33px;
  line-height: 33px;
  text-align: center;
	background-color: #fff4e1;
  font-size: 12px;
  color: #fb6f14;
}
.container .wrap .header h3{
    padding:20rpx 0;
    font-size: 24rpx;
    font-weight: bold;
}
.container .wrap .header h3 span{
    color: #ff3f00;
    font-size: 28rpx;
}
.container .wrap .center {
  width: 100%;
  height: auto;
  padding-bottom:50px;
  /* margin: 50rpx 0; */
}
.container .wrap .center .navHeader{
  height: 50px;
  line-height: 50px;
  background: #fff;
  border-radius: 25px;
  font-size: 28rpx;
  box-shadow: 0px 4px 10px 0px 
		rgba(104, 97, 90, 0.12);
    margin-top: 20rpx;
}
.container .wrap .center .navHeader .rows{
  padding: 0 30rpx;
}
.container .wrap .center .boxWrap{
  font-size: 26rpx;
  background: #fff;
  padding: 20rpx 0;
  /*margin: 30rpx 0;*/
  border-radius: 10rpx;
}
.container .wrap .center .boxWrap p{
  margin-left:20rpx;
}
.container .wrap .center .boxWrap h3{
  text-align:right;
  margin-right:10rpx;
}
.container .wrap .center .row {
  font-size: 26rpx;
  /* background: #fff; */
  padding: 20rpx 0;
  /* margin: 30rpx 0; */
  border-radius: 10rpx;
  border-bottom:1rpx solid #faf9f9;
}
.container .wrap .center .row.active {
  border: 1rpx solid #ff3f00;
}
.container .wrap .center .row .left {
  text-align: center;
}


.container .wrap .boxBottom{
  width:100%;
  height:500rpx;
  background:#fff;
  position:fixed;
  bottom:0;
  left:0;
  overflow:scroll;
  box-shadow: 0 6px 6px 0 #f2f2f2 inset;
}
.container .wrap .boxBottom p{
  /*height:30rpx;*/
  /* text-align:center;*/
  padding:20rpx 0;
  font-size:30rpx;
  border-bottom:1rpx solid #ccc;
}
.container .wrap .boxBottom p.active{
  color:red;
}

.footer{
  // margin: 80rpx 0;
  text-align: center;
  position: fixed;
  bottom:20rpx;
  left: 20%;
  .quitBtn{
    width: 240px;
    height: 40px;
    background-image: linear-gradient(90deg, 
      #fc8902 0%, 
      #fb4003 100%);
    box-shadow: 0px 2px 10px 0px 
      rgba(253, 135, 2, 0.6);
    border-radius: 21px;
    color:#fff;
    font-size:28rpx;
    line-height:80rpx
  }
}


.modal{
  div{
    span{
      font-size: 28rpx;
      color: #4f4f4f;
      font-weight: bold;
      margin-left: 10rpx;
    }
  }
  .tBox{
    color: #888888;
    padding: 15rpx 0;
  }
}

</style>
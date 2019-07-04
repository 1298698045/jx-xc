<template>
    <div class="wrap">
      <div class="hedaerWrap">
        <div class="header">
          <i-row>
            <i-col span="5">
              <!-- <i-icon type="businesscard" size="28" color="blue"/> -->
              <div style="text-align:center;">
                <image src="/static/images/username-default.png" style="width:45px;height:45px;"></image>
                <!-- <image v-if="sex=='XB002'" src="/static/images/gril.png" style="width:45px;height:45px;"></image> -->
              </div>
            </i-col>
            <i-col span="12">
              <p style="font-size:16px;">{{name}}</p>
              <p style="font-size:12px;">受理时间：<text>{{time}}</text></p>
            </i-col>
            <i-col span="7" @click="inforRoute">
              <p style="line-height:50px;">
                <i-icon type="createtask" size="28" color="#fff" />
                学习历程</p>
            </i-col>
            <!-- <i-col span="6">
              <i class="iconfont icon-wodeyemian-lishi" style="color:#ff3f00;display:inline-block;margin-left:33px;margin-top:8rpx;"></i>
              <span style="font-size:24rpx;margin-left:5rpx;">{{betweenDays}}天</span>
            </i-col>
            <i-col span="4">
              <i class="iconfont icon-wodeyemian-wancheng" style="color:#ff3f00;display:inline-block;margin-left:20rpx;margin-top:8rpx;"></i>
              <span style="font-size:24rpx;">{{coursedCount}}课时</span></view>
            </i-col> -->
          </i-row>
        </div>
       <div class="boxCont">
          <div class="navCenter">
            <i-row>
              <i-col span="12">
                <p style="font-weight:bold;">我的课时</p>
              </i-col>
              <i-col span="6">
                <p style="font-size:12px;color: #ababab;">
                  已学天数：<span style="color:#fb6d11;font-weight:bold;">{{betweenDays}}</span>
                </p>
              </i-col>
              <i-col span="6">
                <p  style="font-size:12px;color: #ababab;">
                  已上课时：<span style="color:#fb6d11;font-weight:bold;">{{coursedCount}}</span>
                </p>
              </i-col>
            </i-row>
            <p style="padding:20rpx 0 10rpx 0;color:#a4a4a4;">科目二：<span style="color: #fb6809;margin-left:20rpx;">{{partTwoHours==null?'无限':partTwoHours}}课时</span></p>
            <p style="color:#a4a4a4;">科目三：<span  style="color: #fb6809;margin-left:20rpx;">{{partThreeHours==null?'无限':partThreeHours}}课时</span></p>
          </div>
        </div>
        <div class="sppedCont">
          <div class="sppend">
            <div class="rowSp">
              <p class="tName">我的进度</p>
              <p class="icn">
                {{type=="PXLX001"?'A1':type=="PXLX002"?'A2':type=="PXLX003"?'A3':type=="PXLX004"?'B1':type=="PXLX005"?'B2':type=="PXLX006"?'C1':type=="PXLX007"?'C2':type=="PXLX008"?'C3':type=="PXLX009"?'C4':type=="PXLX0010"?'C5':
                  type=="PXLX0011"?'D':type=="PXLX0012"?'E':type=="PXLX0013"?'F':type=="PXLX0014"?'M':type=="PXLX0015"?'N':type=="PXLX0016"?'P':''}}
              </p>
            </div>
            <p class="title" @click="getRouter">
              {{type=="PXLX001"?'A1':type=="PXLX002"?'A2':type=="PXLX003"?'A3':type=="PXLX004"?'B1':type=="PXLX005"?'B2':type=="PXLX006"?'C1':type=="PXLX007"?'C2':type=="PXLX008"?'C3':type=="PXLX009"?'C4':type=="PXLX0010"?'C5':
                type=="PXLX0011"?'D':type=="PXLX0012"?'E':type=="PXLX0013"?'F':type=="PXLX0014"?'M':type=="PXLX0015"?'N':type=="PXLX0016"?'P':''}}{{classTypeName}}
                <i-icon i-clss="icons" type="enterinto_fill" size="24" color="#fb6809" />
            </p>
            <div class="carBoxWrap">  
              <div class="carBox">
                <div class="img">
                  <img v-if="partOneStatus=='KM001-XXJD003'" src="/static/images/subject-grey.png" alt="">
                  <img v-if="partOneStatus!='KM001-XXJD003'" src="/static/images/subject-active.png" alt="">
                </div>
                <span :class="partOneStatus=='KM001-XXJD003'?'':'active'"></span>
              </div>
              <div class="carBox">
                <div class="img">
                  <img v-if="partTwoStatus=='KM002-XXJD001'"  src="/static/images/subject-grey.png" alt="">
                  <img v-if="partTwoStatus!='KM002-XXJD001'"  src="/static/images/subject-active.png" alt="">
                </div>
                <span :class="partTwoStatus=='KM002-XXJD001'?'':'active'"></span>
              </div>
              <div class="carBox">
                <div class="img">
                  <img v-if="partThreeStatus=='KM003-XXJD001'"  src="/static/images/subject-grey.png" alt="">
                  <img v-if="partThreeStatus!='KM003-XXJD001'"  src="/static/images/subject-active.png" alt="">
                </div>
                <span :class="partThreeStatus=='KM003-XXJD001'?'':'active'"></span>
              </div>
              <div class="carBox">
                <div class="img">
                  <img v-if="partFourStatus=='KM004-XXJD003'" src="/static/images/subject-grey.png" alt="">
                  <img v-if="partFourStatus!='KM004-XXJD003'" src="/static/images/subject-active.png" alt="">
                </div>
              </div>
            </div>

            <div class="tWrap">
              <div class="text">
                <p style="font-size: 14px;color: #4f4f4f;">科目一</p>
                <p :class="partOneStatus=='KM001-XXJD001'?'org':partOneStatus=='KM001-XXJD002'?'greenText':'tcolor'">
                  {{partOneStatus=='KM001-XXJD001'?'本校进行中':partOneStatus=='KM001-XXJD002'?'已完成':partOneStatus=='KM001-XXJD003'?'待激活':''}}
                </p>
              </div>
              <div class="text">
                <p style="font-size: 14px;color: #4f4f4f;">科目二</p>
                <p :class="partTwoStatus=='KM002-XXJD001'?'tcolor':partTwoStatus=='KM002-XXJD002'?'org':partTwoStatus=='KM002-XXJD003'?'org':partTwoStatus=='KM002-XXJD004'?'greenText':''">
                  {{partTwoStatus=='KM002-XXJD001'?'待激活':partTwoStatus=='KM002-XXJD002'?'本校进行中':partTwoStatus=='KM002-XXJD003'?'委培进行中':partTwoStatus=='KM002-XXJD004'?'已完成':''}}
                </p>
              </div>
              <div class="text">
                <p style="font-size: 14px;color: #4f4f4f;">科目三</p>
                <p :class="partThreeStatus=='KM003-XXJD001'?'tcolor':partThreeStatus=='KM003-XXJD002'?'org':partThreeStatus=='KM003-XXJD003'?'greenText':partThreeStatus=='KM003-XXJD004'?'org':''">
                  {{partThreeStatus=='KM003-XXJD001'?'待激活':partThreeStatus=='KM003-XXJD002'?'本校进行中':partThreeStatus=='KM003-XXJD003'?'已完成':partThreeStatus=='KM003-XXJD004'?'委培进行中':''}}
                </p>
              </div>
              <div class="text">
                <p style="font-size: 14px;color: #4f4f4f;">科目四</p>
                <p :class="partFourStatus=='KM004-XXJD001'?'org':partFourStatus=='KM004-XXJD002'?'greenText':partFourStatus=='KM004-XXJD003'?'tcolor':''">
                  {{partFourStatus=='KM004-XXJD001'?'本校进行中':partFourStatus=='KM004-XXJD002'?'已完成':partFourStatus=='KM004-XXJD003'?'待激活':''}}
                </p>
              </div>
            </div>
          </div>
        </div> 
      </div>
      <i-row i-class="fWrap" @click="getFeedback">
        <i-col span="20">
          <i-icon type="brush_fill" size="20" color="#d4d4d4" />
          <span>意见反馈</span>
        </i-col>
        <i-col span="4">
          <p style="text-align:right;">
            <i-icon type="enter" size="24" color="#4f4f4f" />
          </p>
        </i-col>
      </i-row>
      <!-- <div class="rowfow" @click="customerPhone">
        <i-icon type="customerservice" size="24" color="#fb6809" />
        客服电话：<span style="font-size: 16px;color: #fb6809;">400-222-3345</span>
      </div> -->
      
      <div class="footer">
        <button class="quitBtn" @click="quitOut">退出登录</button>
      </div>

      <i-modal i-class="modal" :visible="isModal" @ok="getOk" @cancel="getCanel">
        <div>
          <i-icon type="remind_fill" size="28" color="#fb6809" />
          <span>提示</span>
        </div>
        <p>确定要退出登录吗?</p>
      </i-modal>
        <!-- <div class="contents">
          <div class="card-box">
            <p style="padding:40rpx 30rpx;">剩余课时：<span style="font-weight:bold;">科目二{{partTwoHours==null?'无限':partTwoHours}}课时，科目三{{partThreeHours==null?'无限':partThreeHours}}课时</span></p>
          </div>
          <div class="card-box">
            <i-row i-class="row-class">
              <i-col span="12" i-class="border-right">
                <image class="imgIcon" src="/static/images/car1.png"></image>{{type=="PXLX001"?'A1':type=="PXLX002"?'A2':type=="PXLX003"?'A3':type=="PXLX004"?'B1':type=="PXLX005"?'B2':type=="PXLX006"?'C1':type=="PXLX007"?'C2':type=="PXLX008"?'C3':type=="PXLX009"?'C4':type=="PXLX0010"?'C5':
                type=="PXLX0011"?'D':type=="PXLX0012"?'E':type=="PXLX0013"?'F':type=="PXLX0014"?'M':type=="PXLX0015"?'N':type=="PXLX0016"?'P':''}}
              </i-col>
              <i-col span="12" i-class="right-col" @click="getRouter">
                <image class="imgIcon" src="/static/images/class1.png"></image>
                {{classTypeName}}
              </i-col>
            </i-row>
            <i-row i-class="row-class">
              <i-col span="12" i-class="border-right">
                <image class="imgIcon" src="/static/images/study1.png"></image>
                {{partOneStatus=='KM001-XXJD001'?'科目一（本校进行中）':partOneStatus=='KM001-XXJD002'?'科目一（已完成）':partOneStatus=='KM001-XXJD003'?'科目一（待激活）':'科目一'}}
              </i-col>
              <i-col span="12" i-class="right-col">
                <image class="imgIcon" src="/static/images/study1.png"></image>
                {{partTwoStatus=='KM002-XXJD001'?'科目二（待激活）':partTwoStatus=='KM002-XXJD002'?'科目二（本校进行中）':partTwoStatus=='KM002-XXJD003'?'科目二（委培进行中）':partTwoStatus=='KM002-XXJD004'?'科目二（已完成）':'科目二'}}
              </i-col> -->
              <!-- <i-col span="12" i-class="right-col">
                <image class="imgIcon" src="/static/images/time.png"></image>
                完成课时：{{classtime}}小时
              </i-col> -->
            <!-- </i-row>
            <i-row i-class="row-class">
              <i-col span="12" i-class="border-right">
                <image class="imgIcon" src="/static/images/study1.png"></image>
                {{partThreeStatus=='KM003-XXJD001'?'科目三（待激活）':partThreeStatus=='KM003-XXJD002'?'科目三（本校进行中）':partThreeStatus=='KM003-XXJD003'?'科目三（已完成）':partThreeStatus=='KM003-XXJD004'?'科目三（委培进行中）':'科目三'}}
              </i-col>
              <i-col span="12" i-class="right-col">
                <image class="imgIcon" src="/static/images/study1.png"></image>
                {{partFourStatus=='KM004-XXJD001'?'科目四（本校进行中）':partFourStatus=='KM004-XXJD002'?'科目四（已完成）':partFourStatus=='KM004-XXJD003'?'科目四（待激活）':'科目四'}}
              </i-col>
            </i-row> -->
            <!-- <i-row i-class="row-class">
              <i-col span="12" i-class="border-right">
                <image class="imgIcon" src="/static/images/car.png"></image>
                {{send}}
              </i-col>
            </i-row> -->
          <!-- </div>
          <div class="card-box box-bg" @click="inforRoute">
            <image src="/static/images/course_img.png" class="imgItem"></image>
            <div class="imgText"><a>学习历程</a></div>
          </div> -->
          <!-- 暂时去掉 -->
          <!-- <div class="card-box box-bg">
            <image src="/static/images/infor_img.png" class="imgItem"></image>
            <div class="imgText"><a href="">资讯文章</a></div>
          </div> -->
          <!-- <div class="card-box">
            <i-row i-class="row-class" @click="customerPhone">
              <i-col span="22">客服电话（08:00-18:00）</i-col>
            </i-row> -->
            <!-- 暂时去掉 -->
            <!-- <i-row i-class="row-class" @click="complaintPhone">
              <i-col span="22">投诉建议（08:00-18:00）</i-col>
            </i-row>
            <i-row i-class="row-class">
              <i-col span="22">用户协议</i-col>
              <i-col span="2"><i-icon type="enter" /></i-col>
            </i-row> -->
            <!-- <i-row i-class="row-class">
              <i-col span="22" @click="quitOut">退出登录</i-col>
              <i-col span="2"><i-icon type="enter" /></i-col>
            </i-row>
          </div>
        </div> -->
    </div>
</template>
<script>
    export default {
      data () {
        return {
          sex:"",
          time:"",
          coursedCount:"",
          partTwoHours:"",
          partThreeHours:"",
          betweenDays:"",
          partOneStatus:"",
          partTwoStatus:"",
          partThreeStatus:"",
          partFourStatus:"",
          form:{
            name:"",
            day:"",
            timeDay:"",
            time:"",
            subjectTime:"",
            subjectTimeTwo:""
          },
          name:'',
          type:"",
          classTypeName:'',
          status:'',
          classtime:'',
          send:'',
          isModal:false,
        }
      },
      onShow(){
        this.getToken();
      },
      onLoad(){
        this.getQuery();
        // this.getPhone();
      },
      methods: {
         // 校验token
        getToken(){
          let token = wx.getStorageSync('token');
          this.$httpWX.get({
            url:this.$api.public.checkAuthentication + "/"+token,
            data:{

            }
          }).then(res=>{
            console.log('token',res);
            if(res.status.code * 1 !== 10){
              wx.showLoading();
              wx.hideLoading();
              setTimeout( () => {
                wx.showToast({
                  title: '请重新登录!',
                  icon: "none",
                });
                setTimeout( () =>{
                  wx.hideToast();  
                },2000)
              },10);
              wx.reLaunch({
                url:"/pages/newLogin/main"
              })
            }
          })
        },
        getQuery(){
          this.$httpWX.get({
            url: this.$api.public.me + "/"+wx.getStorageSync('studentId'),
            data:{

            }
          }).then(res=>{
            console.log(res);
            let departmentCode = res.content.student.departmentCode;
            let reportId = res.content.student.report.id;
            let userId = wx.getStorageSync("studentId");
            let employee = res.content.employee;
            let partThreeCoach = res.content.partThreeCoach;

            this.partTwoStatus = res.content.student.partTwoStatus; // 科目二状态
            this.partThreeStatus = res.content.student.partThreeStatus;  // 科目三状态
            if(this.partTwoStatus != "KM002-XXJD004" && employee == null){
              wx.reLaunch({
                url: "/pages/coach/main?departmentCode="+departmentCode + '&reportId='+reportId + '&userId='+userId
              });
            }else 
            if(this.partThreeStatus != "KM003-XXJD003" &&  partThreeCoach == null){
              wx.reLaunch({
                url: "/pages/coachThree/main?departmentCode="+departmentCode + '&reportId='+reportId + '&userId='+userId
              });
            }
            this.sex = res.content.student.baseInfo.sex;
            this.name = res.content.student.baseInfo.name;
            this.time = res.content.student.documentedTime;
            this.coursedCount = res.content.coursedCount;
            this.type = res.content.student.report.currentTrainingType;
            this.classTypeName = res.content.student.classTypeName;
            this.partTwoHours = res.content.student.finance.partTwoHours;
            this.partThreeHours = res.content.student.finance.partThreeHours;
            this.betweenDays = res.content.betweenDays;
            this.partOneStatus = res.content.student.partOneStatus;
            // this.partTwoStatus = res.content.student.partTwoStatus;
            // this.partThreeStatus = res.content.student.partThreeStatus;
            this.partFourStatus = res.content.student.partFourStatus;
          })
        },
        // 获取客服、投诉电话
        // getPhone(){
        //   this.$httpWX.get({
        //     url:"/v1/aplus-driverschool/driverSchool/detail/"+wx.getStorageSync('schoolId'),
        //     data:{

        //     }
        //   }).then(res=>{
        //     console.log(res);
        //   })
        // },
        // 客服电话
        customerPhone(){
          wx.makePhoneCall({
            phoneNumber: '' //仅为示例，并非真实的电话号码
          })
        },
        // 投诉电话
        complaintPhone(){
          wx.makePhoneCall({
            phoneNumber: ''
          })
        },
        quitOut(){
          this.isModal = true;
          // wx.redirectTo({
          //   url:'/pages/login/main'
          // })
          // wx.removeStorageSync('token')
        },
        // 退出登录弹框
        getOk(){
          wx.redirectTo({
            url:'/pages/tLogin/main'
          })
          wx.removeStorageSync('token')
          this.isModal = false;
        },
        getCanel(){
          this.isModal = false;
        },
        // 班型介绍
        getRouter(){
          wx.navigateTo({
            url:"/pages/versionType/main"
          })
        },
        inforRoute(){
          wx.navigateTo({
            url: '/pages/studyjourney/main?coursedCount='+this.coursedCount+'&betweenDays='+this.betweenDays
          })
        },
        // 意见反馈
        getFeedback(){
          const url = "/pages/feedback/main?name="+this.name;
          wx.navigateTo({url:url});
        }
      },
            /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
      onPullDownRefresh() {
        this.getQuery();
        wx.stopPullDownRefresh();
      },
      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {
      
      }
    }
</script>
<style lang="scss">
@font-face {
    font-family: 'iconfont';
    src: url(data:application/font-woff2;charset=utf-8;base64,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) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
    font-weight: normal;
    font-style: normal;
}
.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-keyueyemian-genghuanjiaolian:before { content: "\e61e"; }

.icon-keyueyemian-lianxi:before { content: "\e61f"; }

.icon-keyueyemian-weizhi:before { content: "\e620"; }

.icon-wodeyemian-wancheng:before { content: "\e621"; }

.icon-shaixuan:before { content: "\e622"; }

.icon-wodeyemian-lishi:before { content: "\e623"; }
.hedaerWrap{
  background: #fff;
  padding-bottom: 150rpx;
}
.header{
  width: 100%;
	height: 124px;
	border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
	background: #ff612c;
  color:#fff;
  font-size:14px;
}
.boxCont{
  width: 351px;
  height: 110px;
  margin: 0 auto;
  background: #fff;
  position: relative;
  top:-60px;
  border-radius: 6px;
  font-size:28rpx;
  box-shadow: 0px 4px 10px 0px 
		rgba(17, 17, 17, 0.12);
  .navCenter{
    padding: 20rpx;
  }
}
.sppedCont{
  width: 351px;
  height: auto;
  margin: -50px auto;
  background: #fff;
  border-radius: 6px;
  font-size: 28rpx;
  box-shadow: 0px 4px 10px 0px 
		rgba(17, 17, 17, 0.12);
  .sppend{
    padding: 20rpx;
    .rowSp{
      overflow: hidden;
      .tName{
        font-size: 28rpx;
        color:black;
        font-weight: bold;
        float: left;
      }
      .icn{
        width: 45px;
        height: 20px;
        line-height: 20px;
        background-color: rgba(251, 100, 2, 0.1);
        border-radius: 10px;
        float: left;
        font-size: 11px;
        color: #fb6809;
        text-align: center;
        margin-left: 20rpx;
      }
    }
    .title{
      font-size: 28rpx;
      color: #fb6809;
      text-align:center;
      padding: 20rpx 0;
      .icons{
        margin-left: 15rpx;
      }
    }
    .carBoxWrap{
      overflow: hidden;
      margin:10rpx 38rpx;
      .carBox{
        // padding: 0 10rpx;
        float: left;
        overflow: hidden;
        .img{
          width: 26px;
          height: 26px;
          float: left;
          img{
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }
        span{
          display: inline-block;
          width: 50px;
          height: 4px;
          background-color: #d4d4d4;
          border-radius: 2px;
          margin:0 10rpx;
        }
        span.active{
          background-color:#fed19d;
        }
      }
    }
    .tWrap{
      overflow: hidden;
      .text{
        width: 63px;
	      height: 38px;
        font-size: 28rpx;
        text-align: center;
        margin:20rpx 18rpx;
        float: left;
        .tcolor{
          color:#a4a4a4;
          font-size: 12px;
        }
        .greenText{
          color:#6bb857;
          font-size: 12px;
        }
        .org{
          color: #fb690a;
          font-size: 12px;
        }
      }
    }
  }
}
.fWrap{
  background: #fff;
  margin-top: 35px;
  box-shadow: 0px 4px 10px 0px 
		rgba(17, 17, 17, 0.12);
    color: #4f4f4f;
    font-size: 28rpx;
    padding: 20rpx;
}
.rowfow{
  background: #fff;
  box-shadow: 0px 4px 10px 0px 
		rgba(17, 17, 17, 0.12);
    color: #4f4f4f;
    font-size: 26rpx;
    padding: 20rpx;
    text-align: center;
    margin-top: 20rpx;
}
.footer{
  margin: 80rpx 0;
  text-align: center;
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
  p{
    color: #888888;
    padding: 15rpx 0;
  }
}



.imgItem{
  height:100%;
  width:100%;
}
.card-box{
  width:90%;
  margin:15px auto;
  box-shadow:0 1px 6px rgba(0,0,0,.2);
  padding:0 10px;
  background:#fff;
  font-size:12px;
  border-radius:6px;
}
.border-right{
  border-right:1px solid #D4D4D4;
}
.row-class{
  border-bottom:1px solid #eee;
  padding:15px 0;
}
.right-col{
  padding-left:10px;
}
.card-box.box-bg{
  height:80px;
  line-height:80px;
  position:relative;
  padding:0;
}
.imgText{
  position:absolute;
  right:15px;
  z-index:1;
  top:0;
  color:#fff;
  font-size:20px;
  font-weight:900;
}
.imgIcon{
  width: 24px; 
  height: 24px;
  vertical-align:middle;
  margin-right:6px;
}
</style>
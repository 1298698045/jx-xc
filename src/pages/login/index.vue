<template>
  <div class="outDiv" style="background:url('http://yx.aplusx.com/wximg/jiaxiao/car.jpg')no-repeat;background-size:100% 100%;">
    <form>
      <view class='login-from'>
        <view style="text-align:center;"> 
          <image style="width:188px;height:48px;margin:50px 0;" src="/static/images/logo1.png"></image>
        </view>
        <view class='inputBox'>
            <view class='inputC'>
              <!-- <label class="labelText"absolute>手机号</label> -->
               <i-input title="手机号" v-model.lazy = "phone" autofocus placeholder="手机号" type="number" maxlength="11" @change="phoneChange"/>
               <i-icon type="close" i-class="clearicon" @click="getCancel" />
            </view>
            <view class='inputC'>
              <!-- <label class="labelText">密&nbsp&nbsp&nbsp码</label> -->
              <i-input title="密码" v-model="password" v-if="isShow" placeholder="密码" type="password" @change="psdChange"/>
              <i-input title="密码" v-model="password" v-if="show" placeholder="密码" type="" @change="psdChange"/>
              <i-icon i-class="Xcuo" type="browse_fill" v-if="show" size="22" color="#5e5e5e" @click="getIsShow"></i-icon>
              <i-icon i-class="Xcuo" type="browse_fill" v-if="isShow" size="22" color="#d6d6d6" @click="getIsShow"></i-icon>
            </view>
        </view>
        <!--按钮-->
        <view><button class="loginBtn" type="" data-login="home-boss" @click="formSubmit">登录</button></view>
        <view style="text-align:center;font-size:12px;color:#ff3f00;margin-top:160px;"><span style="border-bottom:1rpx solid #ff3f00;" @click="getAgain">重新认证</span><span style="font-weight:bold;margin-left:10px;margin-right:10px;">|</span><span style="border-bottom:1rpx solid #ff3f00;" @click="getReturn">返回首页</span></view>
        <!-- <p style="color:blue;text-align:center;font-size:12px;padding:10rpx 0;" @click="getReturn">返回首页</p> -->
      </view>
    </form>
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";
import card from "@/components/card";
export default {
  components: {
    card
  },

  data() {
    return {
      logs: [],
      phone:"",
      code:"",
      password:"",
      psdflag: true,
      isShow:true,
      show:false,
      userId:"",
      departmentCode:"",
      reportId:"",
      partTwoStatus:"", // 科目二状态
      partThreeStatus:"" // 科目三状态
    };
  },

  created() {
    const logs = wx.getStorageSync("logs") || [];
    this.logs = logs.map(log => formatTime(new Date(log)));
  },
  onLoad(){
    let phone = wx.getStorageSync('telphone');
    let password = wx.getStorageSync('password');
    if(phone){
      this.phone = phone;
    }
    if(password){
      this.password = password;
    }
  },
  methods: {
    // 返回首页
    getReturn(){
      wx.switchTab({
        url: "/pages/cover/main"
      });
    },
    // 重新认证 
    getAgain(){
      wx.redirectTo({
        url: "/pages/forget/main"
      });
    },
    phoneChange(v) {
      this.phone = v.target.detail.value;
    },
    psdChange(v) {
      this.password = v.target.detail.value;
    },
    getIsShow(){
      this.isShow = !this.isShow;
      this.show = !this.show;
    },
    getCancel(){
      this.phone = "";
    },
    formSubmit() {
      // if(this.phone && this.password){
      //   wx.setStorageSync('telphone',this.phone);
      //   wx.setStorageSync('password',this.password);
      // }
      wx.setStorageSync('token','');
      wx.setStorageSync('studentId','');
      wx.setStorageSync('schoolId','');
      this.$httpWX
        .post({
          url: "/v1/aplus-jx-public/universal/user/authentication",
          data: {
            loginName: this.phone,
            password: this.password,
            clientType:"student_app"
          }
        })
        .then(res => {
          wx.showLoading();
          wx.hideLoading();
          setTimeout( () => {
            wx.showToast({
              title: res.status.message,
              icon: "none",
            });
            setTimeout( () =>{
              wx.hideToast();  
            },2000)
          },10);
          // let token = wx.setStorageSync('token',res.content.token);
          wx.setStorageSync('token',res.content.token);
          wx.setStorageSync('studentId',res.content.userId);
          wx.setStorageSync('schoolId',res.content.schoolId);
          wx.setStorageSync('studentId',res.content.userId)
          console.log(res);
          this.userId = res.content.userId;
          if (res.status.code * 1 === 10) {
            wx.setStorageSync('telphone',this.phone);
            wx.setStorageSync('password',this.password);
            this.getDetail();
            // wx.reLaunch({
            //   url: "/pages/coach/main?userId=" + userId
            // });
          }
        });
    },
    // 我的
    getDetail(){
      //console.log(this.userId);

      // return new Promise ((resolve,reject)=>{
        this.$httpWX.get({
          url:'/v1/aplus-jx-study/student/api/me/'+ this.userId,
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

          wx.setStorageSync('teachPermitted',res.content.student.report.currentTrainingType);
          // this.getContractRules();


          this.partTwoStatus = res.content.student.partTwoStatus; // 科目二状态
          this.partThreeStatus = res.content.student.partThreeStatus;  // 科目三状态
          // 科目二、科目三都是已完成
          if(this.partTwoStatus == "KM002-XXJD004" && this.partThreeStatus == "KM003-XXJD003"){
            wx.switchTab({
              url: "/pages/already/main"
            });
            // 科目二、科目三未完成
          }else if(this.partTwoStatus != "KM002-XXJD004" && this.partThreeStatus != "KM003-XXJD003"){
            if(res.content.employee==null){
              wx.reLaunch({
                url: "/pages/coach/main?departmentCode="+this.departmentCode + '&reportId='+this.reportId + '&userId='+this.userId
              });
            }else if(res.content.partThreeCoach==null){
              wx.reLaunch({
                url: "/pages/coachThree/main?departmentCode="+this.departmentCode + '&reportId='+this.reportId + '&userId='+this.userId
              });
            }else{
              wx.switchTab({
                url: "/pages/already/main"
              });
            }
            // 科目二已完成、科目三未完成
          }else if(this.partTwoStatus == "KM002-XXJD004" && this.partThreeStatus != "KM003-XXJD003"){
            if(res.content.partThreeCoach==null){
              wx.reLaunch({
                url: "/pages/coachThree/main?departmentCode="+this.departmentCode + '&reportId='+this.reportId + '&userId='+this.userId
              });
            }else{
              wx.switchTab({
                url: "/pages/already/main"
              });
            }
            // 科目二未完成、科目三已完成
          }else if(this.partTwoStatus != "KM002-XXJD004" && this.partThreeStatus == "KM003-XXJD003"){
            if(res.content.employee==null){
              wx.reLaunch({
                url: "/pages/coach/main?departmentCode="+this.departmentCode + '&reportId='+this.reportId + '&userId='+this.userId + '&threeStatus='+'1'
              });
            }else{
              wx.switchTab({
                url: "/pages/already/main"
              });
            }
          }


          // if(res.content.employee==null){
          //    wx.reLaunch({
          //     url: "/pages/coach/main?departmentCode="+this.departmentCode + '&reportId='+this.reportId + '&userId='+this.userId
          //   });
          // }else if(res.content.partThreeCoach==null){
          //   wx.reLaunch({
          //     url: "/pages/coachThree/main?departmentCode="+this.departmentCode + '&reportId='+this.reportId + '&userId='+this.userId
          //   });
          // }else{
          //   console.log(1111);
          //   wx.switchTab({
          //     url: "/pages/already/main"
          //   });
          // }
          // resolve();
        })
      // })
      
      
      
    },
  }
};
</script>

<style>
page {
  height: 100%;
}

.phcolor {
  color: #eee;
}
.outDiv {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  /* padding: 0 15px; */
}
.homeTitle {
  margin-top: 1px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  width: 100%;
  background-color: #424b61;
  color: #fff;
  font-size: 16px;
}
/*表单内容*/
.login-from {
  flex: auto;
  height: 100%;
  width: 100%;
}

.inputView {
  background-color: #fff;
  line-height: 44px;
  width: 100%;
}
/*输入框*/
.nameImage,
.keyImage {
  margin-left: 22px;
  width: 14px;
  height: 14px;
}

.loginLab {
  position: absolute;
  color: #545454;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  padding-left: 15px;
}
.checkNum {
  padding-left: 65px;
  padding-right: 0;
  display: block;
  height: 35px;
  margin-top: 11px;
  color: #cccccc;
  font-size: 14px;
  background-color: #f2f2f2;
}
/*按钮*/
.loginBtnView {
  width: 100%;
  height: auto;
  background-color: #f41856;
  margin-top: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.loginBtn {
  width: 70%;
  /* margin: 25px; */
  background-color: #ff3f00;
  margin-top: 70px;
  color: #fff;
  border-radius: 21px;
}
.codebtn {
  position: absolute;
  right: 15px;
  background-color: rgb(247, 105, 104);
  color: #fff;
  margin-left: 1px;
  height: 40px;
  line-height: 40px;
}
.inputBox {
  margin-top: 20px;
  padding-left: 15px;
  background: #fff;
  position: relative;
  border-radius: 6px;
  margin:0 15px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}
.inputC {
  display: flex;
  position: relative;
}
/*.inputBox>.inputC:nth-child(2){
  border-top: 1px solid #cccccc;
}*/
.Xcuo {
  position: absolute;
  right: 106rpx;
  z-index: 1;
  top: 25%;
}
.inputText {
  display: block;
  height: 40px;
  width: 100%;
  line-height: 40px;
  margin-left: 15px;
}
.labelText {
  width: 80px;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
}
.labelBtn {
  background: rgb(247, 105, 104);
  color: white;
}
.iconfont {
  font-size: 24px;
  color: #424b61;
  position: absolute;
  right: 15px;
  height: 40px;
  line-height: 40px;
  z-index: 99;
}
.iconviewed {
  color: #eee;
}
.clearicon {
  line-height: 20px;
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
  text-align: center;
}
</style>

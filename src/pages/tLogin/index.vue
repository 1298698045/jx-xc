<template>
  <div class="wrap">
    <div class="header">
      <img src="/static/images/che.png" alt>
    </div>
    <div class="content">
      <div class="boxWrap">
        <van-field
          :value="phone"
          required
          type="number"
          maxlength="11"
          clearable
          label="手机号："
          placeholder="请输入手机号"
          @change="onChangePhone"
        />
        <van-field
          :value="password"
          required
          center
          clearable
          label="密码："
          password
          placeholder="请输入密码"
          use-button-slot
          @change="onChangeCode"
        ></van-field>
      </div>
      <div class="btnWrap">
        <button class="quitBtn" @click="getVerification">登录</button>
        <p>
          <span @click="getPassword">忘记密码？</span>
          <span @click="getHome" style="margin-left:20rpx;">返回首页</span>
        </p>
      </div>
    </div>
    <i-modal i-class="modal" :visible="isModal" :show-cancel="false" @ok="getOk">
      <div>
        <i-icon type="success_fill" size="80" color="#7ed321"/>
      </div>
      <h3>认证成功</h3>
      <p>点击开始设置密码</p>
    </i-modal>
  </div>
</template>
<script>
import { setInterval } from "timers";

export default {
  data() {
    return {
      phone: "",
      password: "",
      isModal: false,
      userId:"",
      departmentCode:"",
      reportId:"",
      partTwoStatus:"", // 科目二状态
      partThreeStatus:"" // 科目三状态
    };
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
    onChangePhone(e) {
      this.phone = e.mp.detail;
    },
    onChangeCode(e) {
      this.password = e.mp.detail;
    },
    getVerification() {
      wx.setStorageSync("token", "");
      wx.setStorageSync("studentId", "");
      wx.setStorageSync("schoolId", "");
      this.$httpWX
        .post({
          url: this.$api.login.authentication,
          data: {
            loginName: this.phone,
            password: this.password,
            clientType: "student_app"
          }
        })
        .then(res => {
          wx.showLoading();
          wx.hideLoading();
          setTimeout(() => {
            wx.showToast({
              title: res.status.message,
              icon: "none"
            });
            setTimeout(() => {
              wx.hideToast();
            }, 2000);
          }, 10);
          // let token = wx.setStorageSync('token',res.content.token);
          wx.setStorageSync("token", res.content.token);
          wx.setStorageSync("studentId", res.content.userId);
          wx.setStorageSync("schoolId", res.content.schoolId);
          wx.setStorageSync("studentId", res.content.userId);
          console.log(res);
          this.userId = res.content.userId;
          if (res.status.code * 1 === 10) {
            wx.setStorageSync("telphone", this.phone);
            wx.setStorageSync("password", this.password);
            this.getDetail();
            // wx.reLaunch({
            //   url: "/pages/coach/main?userId=" + userId
            // });
          }
        });
      // this.isModal = true;
    },
    // 我的
    getDetail() {
      this.$httpWX
        .get({
          url: this.$api.public.me + "/" + this.userId,
          data: {}
        })
        .then(res => {
          this.departmentCode = res.content.student.departmentCode;
          wx.setStorageSync(
            "majorCardCode",
            res.content.student.baseInfo.majorCardCode
          );
          wx.setStorageSync("telphone", res.content.student.baseInfo.telphone);
          wx.setStorageSync("classTypeId", res.content.student.classTypeId);
          wx.setStorageSync(
            "schoolCoach",
            res.content.student.report.schoolCoach
          );
          wx.setStorageSync(
            "schoolCoachName",
            res.content.employee ? res.content.employee.name : ""
          );
          wx.setStorageSync(
            "phone",
            res.content.employee ? res.content.employee.phone : ""
          );
          wx.setStorageSync(
            "car",
            res.content.car ? res.content.car.licenceNum : "无"
          );
          wx.setStorageSync(
            "siteId",
            res.content.car ? res.content.car.siteId : ""
          );
          wx.setStorageSync(
            "departmentCode",
            res.content.student.departmentCode
          );
          wx.setStorageSync(
            "regularizationFlag",
            res.content.student.regularizationFlag
          );
          this.reportId = res.content.student.report.id;

          wx.setStorageSync(
            "teachPermitted",
            res.content.student.report.currentTrainingType
          );
          // this.getContractRules();

          this.partTwoStatus = res.content.student.partTwoStatus; // 科目二状态
          this.partThreeStatus = res.content.student.partThreeStatus; // 科目三状态
          // 科目二、科目三都是已完成
          if (
            this.partTwoStatus == "KM002-XXJD004" &&
            this.partThreeStatus == "KM003-XXJD003"
          ) {
            wx.switchTab({
              url: "/pages/already/main"
            });
            // 科目二、科目三未完成
          } else if (
            this.partTwoStatus != "KM002-XXJD004" &&
            this.partThreeStatus != "KM003-XXJD003"
          ) {
            if (res.content.employee == null) {
              wx.reLaunch({
                url:
                  "/pages/coach/main?departmentCode=" +
                  this.departmentCode +
                  "&reportId=" +
                  this.reportId +
                  "&userId=" +
                  this.userId
              });
            } else if (res.content.partThreeCoach == null) {
              wx.reLaunch({
                url:
                  "/pages/coachThree/main?departmentCode=" +
                  this.departmentCode +
                  "&reportId=" +
                  this.reportId +
                  "&userId=" +
                  this.userId
              });
            } else {
              wx.switchTab({
                url: "/pages/already/main"
              });
            }
            // 科目二已完成、科目三未完成
          } else if (
            this.partTwoStatus == "KM002-XXJD004" &&
            this.partThreeStatus != "KM003-XXJD003"
          ) {
            if (res.content.partThreeCoach == null) {
              wx.reLaunch({
                url:
                  "/pages/coachThree/main?departmentCode=" +
                  this.departmentCode +
                  "&reportId=" +
                  this.reportId +
                  "&userId=" +
                  this.userId
              });
            } else {
              wx.switchTab({
                url: "/pages/already/main"
              });
            }
            // 科目二未完成、科目三已完成
          } else if (
            this.partTwoStatus != "KM002-XXJD004" &&
            this.partThreeStatus == "KM003-XXJD003"
          ) {
            if (res.content.employee == null) {
              wx.reLaunch({
                url:
                  "/pages/coach/main?departmentCode=" +
                  this.departmentCode +
                  "&reportId=" +
                  this.reportId +
                  "&userId=" +
                  this.userId +
                  "&threeStatus=" +
                  "1"
              });
            } else {
              wx.switchTab({
                url: "/pages/already/main"
              });
            }
          }
        });
    },
    getOk() {
      this.isModal = false;
    },
    getPassword(){
      wx.clearStorageSync('token');
      const url = '/pages/newLogin/main';
      wx.navigateTo({url:url});
    },
    getHome(){
      const url = '/pages/cover/main';
      wx.switchTab({url:url});
    }
  }
};
</script>

<style lang="scss">
@import "../../../static/assets/login.scss";
</style>

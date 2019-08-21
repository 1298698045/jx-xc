<template>
  <div class="wrap">
    <div class="header">
      <img src="/static/images/che.png" alt />
    </div>
    <div class="content">
      <div class="boxWrap">
        <van-field
          :value="phone"
          required
          type="number"
          maxlength="11"
          clearable
          title-width="60px"
          label="手机号："
          placeholder="请输入报名登记的手机号"
          @change="onChangePhone"
        />
        <van-field
          :value="code"
          required
          center
          clearable
          title-width="60px"
          label="验证码："
          placeholder="请输入短信验证码"
          use-button-slot
          @change="onChangeCode"
        >
          <van-button
            v-if="house1"
            custom-class="btn"
            slot="button"
            size="small"
            @tap="getCode"
          >获取验证码</van-button>
          <van-button v-if="house2" custom-class="btn active" slot="button" size="small">
            <span>{{second}}s</span>重新获取
          </van-button>
        </van-field>
      </div>
      <div class="btnWrap">
        <button class="quitBtn" @click="getVerification">验证</button>
        <p>
          <!-- <span @click="routeLogin">已有账号，直接登录</span> -->
          <span @click="getHome" style="margin-left:20rpx;">返回首页</span>
        </p>
      </div>
      <div class="footer">
        <i-divider content="微信授权手机号登录"></i-divider>
        <button
          class="btn"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
          @click="handleDuration"
        >
          <i class="iconfont icon-weixin-copy" style="color:#1cb934;font-size:50px;"></i>
        </button>
      </div>
    </div>
    <i-modal i-class="modal" :visible="isModal" :show-cancel="false" @ok="getOk">
      <div>
        <i-icon type="success_fill" size="80" color="#7ed321" />
      </div>
      <h3>认证成功</h3>
      <p>点击开始设置密码</p>
    </i-modal>
    <i-message id="message" />
  </div>
</template>
<script>
import { setInterval } from "timers";
const { $Message } = require("../../../static/view/base/index");
export default {
  data() {
    return {
      phone: "",
      code: "",
      time: "获取验证码",
      isClick: true,
      interval: null,
      isModal: false,
      second: 61,
      house1: true,
      house2: false,
      errMsg: "",
      iv: "",
      encryptedData: "",
      lcode: "",
      openid: "",
      phone: "",
      userInfo: "",
      mobile: "",
      type: "",
      studentId: ""
    };
  },
  onLoad() {
    let type = wx.getStorageSync("type");
    if (type) {
      const url = "/pages/already/main";
      wx.switchTab({ url: url });
    }
    this.login();
  },
  methods: {
    login() {
      var that = this;
      wx.login({
        success: res => {
          console.log(res.code);
          that.lcode = res.code;
          that.$httpWX
            .post({
              url: that.$api.login.code,
              data: {
                params: {
                  code: res.code
                }
              }
            })
            .then(res => {
              that.openid = res.data.openid;
              wx.setStorageSync("token", res.data.token);
              wx.setStorageSync("openid", res.data.openid);
            });
        }
      });
    },
    getPhoneNumber(e) {
      this.errMsg = e.mp.detail.errMsg;
      this.iv = e.mp.detail.iv;
      this.encryptedData = e.mp.detail.encryptedData;
      return new Promise((resolve, reject) => {
        if (this.errMsg == "getPhoneNumber:fail user deny") {
          console.log("拒绝授权");
          return false;
        } else {
          this.$httpWX
            .post({
              url: this.$api.login.phone,
              data: {
                params: {
                  encryptedData: this.encryptedData,
                  iv: this.iv
                }
              }
            })
            .then(res => {
              if (res.code == 0) {
                this.mobile = res.data.mobile;
                this.type = res.data.type;
                wx.setStorageSync("type", this.type);
                wx.setStorageSync("mobile", this.mobile);
                if (this.type == "student_not_found") {
                  wx.showToast({
                    title: "登陆成功",
                    icon: "success",
                    duration: 2000,
                    success: () => {
                      setTimeout(res => {
                        var that = this;
                        const url = "/pages/already/main";
                        wx.switchTab({ url: url });
                      }, 1000);
                    }
                  });
                } else if (this.type == "student_bind_success") {
                  this.getStudentDetail();
                } else if (this.type == "student_already_bind") {
                  this.getStudentDetail();
                }
                if (this.type == "student_tenant_list") {
                  wx.setStorageSync("schoolList", res.data.tenantList);
                  this.studentId = res.data.tenantList[0].studentId;
                  console.log(this.studentId);
                  this.bindTeant();
                }
              }
            });
        }
      });
    },
    // 自动默认绑定租户第一个
    bindTeant() {
      this.$httpWX
        .post({
          url: this.$api.public.bind_teant,
          data: {
            params: {
              studentId: this.studentId
            }
          }
        })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.getStudentDetail();
          }
        });
    },
    getStudentDetail() {
      this.$httpWX
        .post({
          url: this.$api.public.studentDetail,
          data: {}
        })
        .then(res => {
          console.log(res);
          wx.setStorageSync("studentId", res.data.studentId);
          wx.setStorageSync("tenantId", res.data.tenantId);
          let km2Status = res.data.km2Status;
          let km3Status = res.data.km3Status;
          let km2CoachId = res.data.km2CoachId;
          let km3CoachId = res.data.km3CoachId;
          let uid = res.data.uid;
          if (uid != 0) {
          }

          if (
            (km2Status == "1" || km2Status == "2") &&
            (km3Status == "1" || km3Status == "2")
          ) {
            if (km2CoachId == 0) {
              const url = "/pages/coach/main";
              wx.redirectTo({ url: url });
            } else if (km3CoachId == 0) {
              const url = "/pages/coachThree/main";
              wx.redirectTo({ url: url });
            } else if (km2CoachId != 0 && km3CoachId != 0) {
              const url = "/pages/already/main";
              wx.switchTab({ url: url });
            }
          } else if (
            (km2Status != "1" || km2Status != "2") &&
            (km3Status == "1" || km3Status == "2")
          ) {
            if (km3CoachId == 0) {
              const url = "/pages/coachThree/main";
              wx.redirectTo({ url: url });
            }
          } else if (
            (km2Status == "1" || km2Status == "2") &&
            (km3Status != "1" && km3Status != "2")
          ) {
            if (km2CoachId == 0) {
              const url = "/pages/coach/main";
              wx.redirectTo({ url: url });
            } else if (km3CoachId == 0) {
              const url = "/pages/coachThree/main";
              wx.redirectTo({ url: url });
            } else if (km2CoachId != 0 && km3CoachId != 0) {
              const url = "/pages/already/main";
              wx.switchTab({ url: url });
            }
          } else if (
            km2Status == "1" ||
            km2Status == "2" ||
            (km3Status == "1" || km3Status == "2")
          ) {
            if (km2CoachId == 0) {
              const url = "/pages/coach/main";
              wx.redirectTo({ url: url });
            } else if (km3CoachId == 0) {
              const url = "/pages/coachThree/main";
              wx.redirectTo({ url: url });
            }
          } else if (
            (km2Status != "1" || km2Status != "2") &&
            (km3Status != "1" || km3Status != "2")
          ) {
            console.log("3333");
            const url = "/pages/already/main";
            wx.switchTab({ url: url });
          }
          // if(res.code==0){
          //     wx.redirectTo({url:"/pages/coach/main"})
          // }
        });
    },
    onChangePhone(e) {
      this.phone = e.mp.detail;
    },
    onChangeCode(e) {
      this.code = e.mp.detail;
    },
    getCode() {
      if (this.phone == "") {
        wx.showToast({
          title: "请输入手机号",
          icon: "success",
          duration: 2000
        });
      } else if (this.phone.length != 11) {
        wx.showToast({
          title: "手机号输入有误",
          icon: "success",
          duration: 2000
        });
      } else {
        this.$httpWX
          .post({
            url: this.$api.login.send,
            data: {
              params: {
                code: this.lcode,
                mobile: this.phone
              }
            }
          })
          .then(res => {
            if (res.code == 0) {
              this.gainCode();
            } else {
              wx.showToast({
                title: res.msg,
                icon: "none",
                duration: 2000
              });
            }
          });
      }
    },

    gainCode() {
      var that = this;
      var second = this.second;
      if (second == 0) {
        this.second = 61;
        this.house1 = true;
        this.house2 = false;
        return;
      }
      var time = setTimeout(() => {
        this.second--;
        (this.house1 = false), (this.house2 = true);
        this.gainCode();
      }, 1000);
    },
    getVerification() {
      this.$httpWX
        .post({
          url: this.$api.login.vlogin,
          data: {
            params: {
              mobile: this.phone,
              vcode: this.code
            }
          }
        })
        .then(res => {
          console.log(res);
          this.mobile = res.data.mobile;
          this.type = res.data.type;
          var { accessToken } = res.data.token;
          wx.setStorageSync("token", accessToken);
          wx.setStorageSync("type",this.type);
          if (this.type == "student_not_found") {
                  wx.showToast({
                    title: "登陆成功",
                    icon: "success",
                    duration: 2000,
                    success: () => {
                      setTimeout(res => {
                        var that = this;
                        const url = "/pages/already/main";
                        wx.switchTab({ url: url });
                      }, 1000);
                    }
                  });
                } else if (this.type == "student_bind_success") {
                  this.getStudentDetail();
                } else if (this.type == "student_already_bind") {
                  this.getStudentDetail();
                }
                if (this.type == "student_tenant_list") {
                  wx.setStorageSync("schoolList", res.data.tenantList);
                  this.studentId = res.data.tenantList[0].studentId;
                  console.log(this.studentId);
                  this.bindTeant();
                }
        });
    },
    getOk() {
      this.isModal = false;
      const url = "/pages/already/main";
      wx.redirectTo({ url: url });
    },
    routeLogin() {
      const url = "/pages/tLogin/main";
      wx.navigateTo({ url: url });
    },
    getHome() {
      const url = "/pages/cover/main";
      wx.switchTab({ url: url });
    },
    handleDuration() {
      $Message({
        content: "我将在 5 秒后消失",
        type: "warning",
        duration: 3
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../../static/assets/login.scss";
@font-face {
  font-family: "iconfont";
  src: url(data:font/truetype;charset=utf-8;base64,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)
    format("truetype");
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

.icon-weixin-copy:before {
  content: "\e652";
}
</style>

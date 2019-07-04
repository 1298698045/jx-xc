<template>
  <div class="wrap">
    <div class="header">
      <div class="nav">
        <p>密码规则：长度至少6位，最多16个字符，注意字母区分大小写，</p>
        <p>不支持汉字</p>
      </div>
    </div>
    <div class="content">
      <div class="boxWrap">
        <van-field
          :value="newPassword"
          required
          clearable
          label="密码："
          password
          placeholder="请输入密码"
          @change="passwordChange"
        />
        <van-field
          :value="password"
          required
          center
          clearable
          label="确认密码："
          password
          placeholder="请输入密码"
          use-button-slot
          @change="confireChange"
        ></van-field>
      </div>
      <div class="btnWrap">
        <button class="quitBtn" @click="getVerification">确认</button>
        <!-- <p>
          <span>已有账号，直接登录</span>
        </p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newPassword: "",
      password: ""
    };
  },
  methods: {
    passwordChange(e) {
      this.newPassword = e.mp.detail;
    },
    confireChange(e) {
      this.password = e.mp.detail;
    },
    getVerification() {
      if (this.newPassword == "" || this.password == "") {
        wx.showToast({
          title: "请输入密码",
          icono: "success",
          duration: 2000
        });
        return false;
      } else if (this.newPassword.length < 6 || this.password.length < 6) {
        wx.showToast({
          title: "密码过于简单",
          icono: "success",
          duration: 2000
        });
        return false;
      } else if (this.password != this.newPassword) {
        wx.showToast({
          title: "密码输入不一致",
          icono: "success",
          duration: 2000
        });
        return false;
      } else {
          this.$httpWX.post({
            url:this.$api.login.appAuthentication,
            data:{
                phone:wx.getStorageSync('Ident'),
                password:this.newPassword,
                confirmPassword:this.password,
            }
          }).then(res=>{
            if(res.status.code * 1 === 10){
                wx.redirectTo({
                    url: "/pages/tLogin/main"
                });
            }
          })
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../../static/assets/password.scss";
</style>

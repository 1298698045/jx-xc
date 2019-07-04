<template>
    <div class="wrap" style="background:url('http://yx.aplusx.com/wximg/jiaxiao/firstbind.png')no-repeat;background-size:100% 100%;">
      <div class="container">
          <div class="boxHeader">
            <h1><span>你好!</span>&nbsp;欢迎使用Aplus学车宝</h1>
              <p>初次使用需进行身份验证，</p>
              <p>请与报名时登记的信息保持一致！</p>
          </div>
          <div class="center">
              <!-- <i-input title="姓名"  type="text"  placeholder="请输入姓名"></i-input> -->
              <!-- <i-input title="证件类型" type="text" placeholder="身份证" v-on:change="cerType"></i-input> -->
              <!-- <div class="select_box" v-if="select">
                <div class="select_one" @click="mySelect">身份证</div>
                <div class="select_one" @click="mySelect">护照</div>
                <div class="select_one" @click="mySelect">军官证</div>
                <div class="select_one" @click="mySelect">其他</div>
              </div> -->
              <!-- <view class="section">
                <picker v-on:change="bindPickerChange" v-model="index" :range="array">
                  <view class="picker">
                    <i-input title="证件类型" v-model="array[index]" disabled></i-input>
                    <i-con i-class="Types" type="unfold" size="22" color="#bfbfbf"></i-con>
                  </view>
                </picker>
              </view> -->
              <!-- <i-input v-model="Ident" title="证件号码" type="" placeholder="请输入身份证号" maxlength="18" v-on:change="Identification"></i-input> -->
              <div class="viewWrap">
                <i-input v-model="Ident" title="证件号码" type="text" placeholder="请输入身份证号" maxlength="18" v-on:change="Identification"></i-input>
                <i-con i-class="Xcuo" type="close" size="20" color="#bfbfbf" v-on:click="getIdent"></i-con>
              </div>
              <div class="viewWrap">
                <i-input v-model="tlPhone" title="手机号" type="number"  placeholder="请输入手机号" maxlength="11" v-on:change="phone"></i-input>
                <i-con i-class="Xcuo" type="close" size="20" color="#bfbfbf" v-on:click="getCall"></i-con>
              </div>
              <div class="viewWrap">
                <i-input v-model="password" v-if="isShow" title="密码" type="password" placeholder="至少6位，字母和数字组合" v-on:change="getPassword"></i-input>
                <i-input v-model="password" v-if="show" title="密码" type="" placeholder="至少6位，字母和数字组合" v-on:change="getPassword"></i-input>
                <i-con i-class="Xcuo" v-if="show" type="browse_fill" size="22" color="#5e5e5e" @click="showPass()"></i-con>
                <i-con i-class="Xcuo" v-if="isShow" type="browse_fill" size="22" color="#d6d6d6" v-on:click="showPass()"></i-con>
              </div>
              <div class="viewWrap">
                <i-input v-model="confirmPassword" v-if="confirmIsShow" title="确认密码" type="password"  placeholder="请和上面密码保持一致" v-on:change="confirm"></i-input>
                <i-input v-model="confirmPassword" v-if="confirmShow" title="确认密码" type=""  placeholder="请和上面密码保持一致" v-on:change="confirm"></i-input>
                <i-con i-class="Xcuo" v-if="confirmShow" type="browse_fill" size="22" color="#5e5e5e" @click="confirmSubmit"></i-con>
                <i-con i-class="Xcuo" v-if="confirmIsShow" type="browse_fill" size="22" color="#d6d6d6" v-on:click="confirmSubmit"></i-con>
              </div>
          </div>
          <div class="Wbtn">
              <i-button i-class="btn-submit" @click="submit">确&nbsp&nbsp认</i-button>
          </div>
          <!-- <div style="width:100%;">
            <p style="width:40%;margin:0 auto;font-size:24rpx;">
              <span style="border-bottom:1rpx solid #ff3f00;color:#ff3f00;" @click="getLogin">已通过认证 ,&nbsp;直接登录！</span>
            </p>
          </div> -->
          <div class="bottom">
            <!-- <img src="../../../static/images/checkbox_active.png" alt=""> -->
            <!-- <p class="yr"><i-con type="right" size="18" color="#fff" /> </p> -->
            <!-- <p>点击“确认”即代表您同意<span style="color:#ff3f00;">《<span style="border-bottom:1rpx solid #ff3f00;">Aplus学车宝用户服务条款</span>》</span></p> -->
            <p style="text-align:center;color:#ff3f00;">
              <span style="border-bottom:1rpx solid #ff3f00;margin-left:-80rpx;" @click="getLogin">
                已通过认证，直接登录
              </span>
              <span style="font-weight:bold;margin-left:10px;margin-right:10px;">|</span>
              <span style="border-bottom:1rpx solid #ff3f00;" @click="getReturn">
                返回首页
              </span>
            </p>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      array: ["身份证", "身份证（香港）", "身份证号（台湾）"],
      index: 0,
      select: false,
      Ident: "",
      tlPhone: "",
      password: "",
      confirmPassword: "",
      cluesInfo: ["身份证", "护照", "军官证", "其他"],
      isShow: true,
      show: false,
      confirmIsShow:true,
      confirmShow:false
    };
  },
  onLoad: function() {
  },
  created() {
    // this.getData();
  },
  methods: {
    // 返回首页
    getReturn(){
      wx.switchTab({
        url: "/pages/cover/main"
      });
    },
    cerType(val) {
      console.log(val);
      this.select = !this.select;
    },
    // 证件号码
    Identification(val) {
      this.Ident = val.target.detail.value;
    },
    // 手机号
    phone(val) {
      this.tlPhone = val.target.detail.value;
    },
    // 删除输入的手机号
    getCall() {
      this.tlPhone = "";
    },
    getIdent(){
      this.Ident = "";
    },
    // 密码
    getPassword(val) {
      this.password = val.target.detail.value;
    },
    // 显示密码
    showPass() {
      this.isShow = !this.isShow;
      this.show = !this.show;
    },
    confirmSubmit(){
      this.confirmIsShow = !this.confirmIsShow;
      this.confirmShow = !this.confirmShow;
    },
    // 确认密码
    confirm(val) {
      this.confirmPassword = val.target.detail.value;
    },
    submit() {
      let array = this.array[this.index];
      // // 判读身份证号
      // let reg =  /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      // // 判断手机号
      // let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      // let tlPhone = this.tlPhone;
      // let Ident = this.Ident;
      // if (this.Ident == "") {
      //   wx.showToast({
      //     title: "证件号码不能为空",
      //     icon: "success",
      //     duration: 2000
      //   });
      //   return false;
      // }else if(!reg.test(Ident)){
      //   wx.showToast({
      //     title:"身份证不合法",
      //     icon:"success",
      //     duration:2000
      //   })
      // }else if (this.tlPhone == "") {
      //   wx.showToast({
      //     title: "手机号不能为空",
      //     icon: "success",
      //     duration: 2000
      //   });
      //   return false;
      // } else if (!myreg.test(tlPhone)) {
      //   wx.showToast({
      //     title: "手机号有误！",
      //     icon: "success",
      //     duration: 1500
      //   });
      //   return false;
      // } else if (this.password == "") {
      //   wx.showToast({
      //     title: "密码不能为空",
      //     icon: "success",
      //     duration: 2000
      //   });
      //   return false;
      // } else if (this.confirmPassword == "") {
      //   wx.showToast({
      //     title: "请确认密码",
      //     icon: "success",
      //     duration: 2000
      //   });
      //   return false;
      // } else if (this.confirmPassword != this.password) {
      //   wx.showToast({
      //     title: "密码输入不一致",
      //     icon: "success",
      //     duration: 2000
      //   });
      //   return false;
      // } else if (this.password.length < 6) {
      //   wx.showToast({
      //     title: "密码过于简单",
      //     icon: "success",
      //     duration: 2000
      //   });
      //   return false;
      // }else {
      this.$httpWX.post({
        url:'/v1/aplus-jx-public/universal/user/appAuthentication',
        data:{
          cardCode:this.Ident,
          phone:this.tlPhone,
          password:this.password,
          confirmPassword:this.confirmPassword,
        }
      }).then(res=>{
        // console.log(res);
        let Ident = wx.setStorageSync("Ident", this.Ident);
        wx.setStorageSync("phone", this.tlPhone);
        wx.showToast({
            title: res.status.message,
            icon: 'none',
            duration: 1000,
            mask:true
        });
        if(res.status.code == '10'){
          wx.redirectTo({
            url: "/pages/login/main"
          });
        }
        this.Ident = "";
        this.tlPhone = "";
        this.password = "";
        this.confirmPassword = "";
      })
      // }
    },
    // 直接登录
    getLogin(){
      wx.redirectTo({
        url: "/pages/login/main"
      });
    }
    // 证件类型
    // bindPickerChange(e) {
    //   console.log(e.mp.detail.value);
    //   this.index = e.mp.detail.value;
    // },
    // getData() {
    //   this.$httpWX
    //     .post({
    //       url: "/v1/aplus-jx-study/student/authentication",
    //       data: {
    //         loginName: "login",
    //         password: "123456"
    //       }
    //     })
    //     .then(res => {
    //       console.log(res);
    //     });
    // }
  }
};
</script>
<style>
.wrap {
  width: 100%;
  height: 100%;
}
.wrap .container {
  width: 90%;
  margin: 0 auto;
}
.wrap .boxHeader {
  width: 100%;
  color: #fff;
  /* overflow: hidden;
  background: #fff;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx; */
}
.wrap .boxHeader h1{
  color: #fff;
  font-weight: 200;
  margin-left: 10rpx;
}
.wrap .boxHeader h1 span{
  font-size: 80rpx;
  font-weight: bold;
  color:#fff;
}
.wrap .boxHeader p {
  font-size: 26rpx;
  color: #fff;
  margin-left: 30rpx;
  /* padding: 25rpx; */
}
.wrap .center {
  width: 100%;
  /* height: 750rpx; */
  height: auto;
  border-radius: 20rpx;
  overflow: hidden;
  background: #fff;
  margin: 50rpx 0;
}
.wrap .center .section .picker {
  position: relative;
}
.wrap .center .section .picker .Types {
  position: absolute;
  right: 10px;
  top: 25%;
}
.wrap .center .select_box {
  /* padding: 0 10rpx; */
  width: 100%;
  overflow: hidden;
  animation: myfirst 0.5s;
  text-align: center;
  font-size: 24rpx;
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
}
.wrap .center .select_box .select_one {
  line-height: 50rpx;
}
.wrap .Wbtn .btn-submit {
  width:65%;
  margin:0 auto;
  background:#ff3f00!important;
  border-radius: 50rpx !important;
  /* background: -webkit-linear-gradient(left, #f41856, #e65179) !important; */
  color: #fff !important;
  margin-top:130rpx!important;
}
.wrap .center .viewWrap {
  position: relative;
}
.Xcuo {
  position: absolute;
  right: 10px;
  z-index: 1;
  top: 25%;
}
.wrap .Wbtn {
  width: 100%;
  margin: 30rpx 0;
}
.wrap .bottom {
  width: 100%;
  overflow: hidden;
  /* text-align: center; */
  font-size: 24rpx;
  color: #5e5e5e;
  overflow: hidden;
  /* margin-top:100rpx; */
  position: absolute;
  bottom:30rpx;
}
.wrap .bottom .yr{
  width: 40rpx;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 50%;
  background: #ff3f00;
  text-align: center;
  float:left;
}
.wrap .bottom img {
  width: 38rpx;
  height: 38rpx;
  vertical-align: middle;
  float: left;
  margin-left: 20rpx;
}
.wrap .bottom p {
  text-align: center;
}
</style>

<template>
  <div class="wrap">
    <div class="content">
      <form>
        <div class="box">

          <i-input
            title="姓名："
            v-model="form.name"
            autofocus
            placeholder="请输入姓名"
            @change="changeName"
          />
          <p class="clearicon">*</p>
        </div>

        <div class="box">

          <i-input
            title="手机号："
            v-model="form.phone"
            autofocus
            placeholder="请输入手机号"
            type="number"
            maxlength="11"
            @change="changePhone"
          />
          <p class="clearicon">*</p>
        </div>
        <picker class="gasBox" v-model="index" :range="array" @change="bindPickerChange">
          <i-input title="性别：" :value="array[index]" disabled placeholder="请选择性别"></i-input>
        </picker>
        <i-input
          type="idcard"
          title="身份证号："
          v-model="form.cardCode"
          autofocus
          placeholder="请输入身份证号"
          @change="changeIdNumber"
        />
        <!-- <i-input title="备注：" v-model="form.context" autofocus  placeholder="请输入备注"></i-input> -->
        <div class="center">
          <!-- <i-input type="text" title="备注：" disabled></i-input> -->
          <textarea
            class="text"
            name="textarea"
            v-model="form.remark"
            id
            cols="20"
            rows="10"
            maxlength="1000"
            placeholder="这里添加备注......"
            @change="onKeyTarea"
          ></textarea>
        </div>
      </form>
    </div>
    <i-button i-class="ibtn" type="primary" @click="getSubmit">提交</i-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        sex: "",
        cardCode: "",
        remark: ""
      },
      index: "",
      array: ["男", "女"],
      mode: "",
      id: "",
      coachSign:"",
      code:"",
      schoolId:""
    };
  },
  onLoad(options) {
    console.log(options)
    let code = options.code.split('?');
    this.code = code[0];
    this.schoolId = this.code.substring(0,this.code.length-12);
  },
  methods: {
    changeName(e) {
      console.log(e);
      this.form.name = e.target.detail.value;
    },
    changePhone(e) {
      this.form.phone = e.target.detail.value;
    },
    bindPickerChange(e) {
      console.log(e);
      this.index = e.mp.detail.value;
      this.index == 0
        ? (this.form.sex = "XB001")
        : this.index == 1
          ? (this.form.sex = "XB002")
          : "";
    },
    changeIdNumber(e) {
      this.form.cardCode = e.target.detail.value;
    },
    onKeyTarea(e) {
      console.log(e);
      this.form.remark = e.mp.detail.value;
    },
    getSubmit() {
      console.log(this.form.name);
      if (this.form.name == "") {
        wx.showToast({
          title: "姓名不可为空",
          icon: "none"
        });
        return false;
      } else if (this.form.phone == "") {
        wx.showToast({
          title: "手机号不可为空",
          icon: "none"
        });
        return false;
      }else {
          wx.showLoading({
            title: '加载中' // 数据请求前loading
          })
          return new Promise((resolve, reject) => {
            var that = this;
            wx.request({
              url:that.$api.clue.trial+"?service-pre="+this.schoolId,
              // url: 'https://test.api.aplusx.com/yingxiaoTest/v1/aplus-jx-schooladministration/clue/save?service-pre='+this.schoolId,
              method: 'POST',
              data: {
                coachSign: this.code,
                name: this.form.name,
                phone: this.form.phone,
                sex: this.form.sex,
                cardCode: this.form.cardCode,
                remark: this.form.remark
              },
              header: {
                'content-type': 'application/json', // 默认值
              },
              success: function (res) {

                wx.showLoading();
                wx.hideLoading();
                setTimeout( () => {
                  wx.showToast({
                    title: res.data.status.message,
                    icon: "none",
                    duration: 2000,
                    mask:true
                  });
                  setTimeout( () =>{
                    wx.hideToast();  
                    if(res.data.status.code * 1 === 10){
                      const url = "/pages/cover/main";
                      wx.switchTab({ url: url });
                    }
                  },1000)
                },10);


                // if(res.data.status.code * 1 === 10){
                  // setTimeout(()=>{
                    // const url = "/pages/cover/main";
                    // wx.switchTab({ url: url });
                  // },3000)
                // }
              },
              fail: function (res) {
                wx.hideLoading()
                resolve(res.data)
              },
              complete: function () {
                wx.hideLoading()
                // reject(false)
              }
            })
          })

        // this.$httpWX
        //   .post({
        //     url: "/v1/aplus-jx-schooladministration/clue/save",
        //     data: {
        //       coachSign: this.code,
        //       name: this.form.name,
        //       phone: this.form.phone,
        //       sex: this.form.sex,
        //       cardCode: this.form.cardCode,
        //       remark: this.form.remark
        //     }
        //   })
        //   .then(res => {
        //     console.log(res);
        //     wx.showToast({
        //       title: res.status.message,
        //       icon: "none"
        //     });
        //     if (res.status.code === 10) {
        //       const url = "/pages/cover/main";
        //       wx.navigateTo({ url: url });
        //     }
        //   });
      }
    }
  }
};
</script>
<style>
.wrap {
  width: 100%;
  height: 100%;
}
.wrap .content {
  width: 90%;
  height: auto;
  margin: 30rpx auto;
  /* border:1rpx solid black; */
  border-radius: 20rpx;
}
.wrap .content .box{
  position: relative;
}
.wrap .content .box .clearicon{
  position:absolute;
  top:30%;
  left:10rpx;
  color:red;
}
.wrap .content .input-textarea {
  height: 300px;
  width: 100%;
  padding: 3px;
  background: #fff;
}
.wrap .center{
  background: #fff;
}
.wrap .center .text {
  width: 90%;
  margin: 0 auto;
  text-align: left;
  /* margin-left: 30rpx; */
  font-size: 28rpx;
  background: #fff;
}
.wrap .ibtn{
  background: #ff3f00!important;
  margin-top: 100rpx;
  border-radius:50rpx;
}
</style>

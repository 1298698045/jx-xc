<template>
  <div class="outDiv">
    <div class='topImg'><image src='http://yx.aplusx.com/wximg/jiaxiao/xc_bg.jpg'></image></div>
    <div class="form_box">
      <div class='form_info'>
        <form action="">
           <i-input title="尊称" v-model.lazy = "name" placeholder="请输入尊称" @change="nameChange"/>
           <i-input title="手机号" v-model.lazy = "telphone" placeholder="请输入手机号" type="number" @change="phoneChange"/>
        </form>
        <view><button @click="handleClick" shape="circle" size="large" class="sendBtn">提交学车意向</button></view>
      </div>
    </div>
    <div style="padding:0 15px;">
      <image src='http://yx.aplusx.com/wximg/jiaxiao/xc_two.png' class="tipText"></image>
    </div>
     <div class="loadMore" id="loadMore" @click="scrollBottom"><image src='../../static/images/icon_arrow_b.png' style="height:18px;width:34px;"></image></div>
      <image src='http://yx.aplusx.com/wximg/jiaxiao/xc_three.jpg' class='img_text'></image>
    <div class="bottom_">
      <image src='http://yx.aplusx.com/wximg/jiaxiao/img_ewm.png'></image>
    </div>
    <div class="url_">
      <image src='../../static/images/img_url.png' style="width:80%;height:10px;"></image>
    </div>
     
  </div>
</template>
<script>
export default {
  data() {
    return {
     telphone:'',
     name:''
    };
  },

  created() {

  },
  onLoad(){
    this.name = '';
    this.telphone = '';
  },
  onShow(){

  },
  methods: {
    phoneChange(v){
      this.telphone = v.target.detail.value;
    },
    nameChange(v){
       this.name = v.target.detail.value;
    },
    handleClick(){
      if(this.name==''||this.telphone==''){
        wx.showToast({
              title: '请填写用户名或手机号',
              icon: "none",
            });
      }else{
        if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(this.telphone))){
          wx.showToast({
              title: '请填写正确格式手机号',
              icon: "none",
            });
        }else{
          this.$httpWX
          .post({
            url: this.$api.home.save,
            data: {
              telphone: this.telphone,
              name: this.name,
              channel:"aplusxuechebao"
            }
          }).then(res=>{
            debugger
              wx.showToast({
                title: res.status.message,
                icon: "none",
              });
          })
        }
      }
    },
    scrollBottom(){
      
    }
  },
  onShareAppMessage(res){
    return {
      title:'Aplus邀您一起好好学车！',
      path:'/pages/learn/main',
      imageUrl: ''
    }
  }
};
</script>

<style>
page {
  height: 100%;
  background: #ff7200;
}

.outDiv {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
}
.topImg image{
  width:100%;
  height: 300px;
}
.form_box{
  margin: 0 20px;
  padding:10px;
}
.form_info{
  border-radius: 10px;
  background:#fff;
  padding: 10px;
}
.sendBtn{
  background: #ff5e00!important;
  color: #fff;
  border-radius: 30px;
  margin-top:15px;
}
.loadMore{
  text-align: center;
}
.bottom_{
  text-align: center;
}
.bottom_ image{
  width:195px;
  height:240px;
}
.url_ {
text-align: center;
margin: 10px 0;
}
.tipText{
  height:24rpx;
  width:100%;
}
.img_text{
  width:100%;
  height:1500rpx;
}
</style>

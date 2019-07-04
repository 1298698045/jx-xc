<template>
  <div class="outDiv">
    <image src='http://yx.aplusx.com/wximg/jiaxiao/xc_youshi.png' style="width:100%;height:150px;"></image>
    <div class="content">
      <div class="item">
        <p><image src='../../static/images/us1.png'></image></p>
        <p>收费透明</p>
        <p>标准一致  政策透明</p>
      </div>
      <div class="item">
        <p><image src='../../static/images/us2.png'></image></p>
        <p>安全第一</p>
        <p>互动教学  安全预判</p>
      </div>
      <div class="item">
        <p><image src='../../static/images/us3.png'></image></p>
        <p>学车保障</p>
        <p>保险伴随  安全一生</p>
      </div>
      <div class="item">
        <p><image src='../../static/images/us4.png'></image></p>
        <p>快速拿证</p>
        <p>随约随学  据情教学</p>
      </div>
      <div class="item">
        <p><image src='../../static/images/us5.png'></image></p>
        <p>免费再学</p>
        <p>一次缴费  两次机会</p>
      </div>
      <div class="item">
        <p><image src='../../static/images/us6.png'></image></p>
        <p>品牌优势</p>
        <p>自营驾校  连锁品牌</p>
      </div>
      <div class="item">
        <p><image src='../../static/images/us7.png'></image></p>
        <p>先学后付</p>
        <p>免费试学  正式付费</p>
      </div>
      <div class="item">
        <p><image src='../../static/images/us8.png'></image></p>
        <p>便捷高效</p>
        <p>线上预约  线下教学</p>
      </div>
      <div class="item">
        <p><image src='../../static/images/us9.png'></image></p>
        <p>王牌教练</p>
        <p>质量保障  高通过率</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },

  created() {

  },
  onLoad(){

  },
  onShow(){

  },
  methods: {
  },
  onShareAppMessage(res){
    return {
      title:'Aplus邀您一起好好学车！',
      path:'/pages/cover/main',
      imageUrl: ''
    }
  }
};
</script>

<style>
page {
  height: 100%;
  background: #fff;
}
.outDiv {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
}
.content {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 10px;
}
.content >.item{
    width: 31%;
    height: 150px;
}
.content >.item p{
  text-align: center;
}
.content >.item p:nth-child(3){
  color: #454545;
  font-size: 12px;
}
.content >.item p:nth-child(2){
  color: #000;
  font-size: 20px;
}
.item image{
  height: 23px;
  width: 20px;
}
</style>

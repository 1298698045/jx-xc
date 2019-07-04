<template>
  <div class="outDiv">
    <image src='http://yx.aplusx.com/wximg/jiaxiao/xc_spring.jpg'></image>
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
      title:'春蕾行动，钜惠出击。学车还能拿大礼！',
      path:'/pages/bannerInfor/main',
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
image{
  width:100%;
  height:185%;

}
</style>

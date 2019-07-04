<template>
  <div class="outDiv">
    <div style="font-size:12px;color:#000;line-height:20px;text-indent:2em">
      可填写报名意向，客服将在24小时内与您联系，安排试学时间及场地。试学内容包括熟悉场地，教练教学，体验服务，试学满意再报名。
    </div>
    <image src='http://yx.aplusx.com/wximg/jiaxiao/xc_liucheng.png'></image>
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
  padding: 20px;
}
image{
  width:90%;
  height:340px;
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);

}
</style>

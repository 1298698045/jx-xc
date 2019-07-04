<template>
  <div class="outDiv">
    <image src='http://yx.aplusx.com/wximg/jiaxiao/xc_us.png' style="width:100%;height:150px;"></image>
    <div style="font-size:14px;padding:20px;color:#454545">
      <p style="text-indent:2em">
          北京好好科技有限公司（以下简称 公司）专注驾培行业的+互联网赋能变革。以帮助驾校精细化运营和多元化发展，实现驾培行业生态全产业化布局为最终使命。旗下运营品牌【Aplus】，简称【A+】。
      </p>
      <p style="text-indent:2em">
          公司总部位于北京，基于 “帮助驾校解决问题、制定驾校发展规划”的业务主线，提供品牌管理、技术服务、运营管理、人才培训4大服务体系。已入驻山西、山东、河北、吉林、江苏等省份落地实施驾校管理工作，并配套营销与运营服务，取得量化的显著成效。
      </p>
      <p style="text-indent:2em">
          公司定位于驾校生态服务运营商，基于业务和财务双内核的数据驱动理念为驾校提供一站式精细化运营的SaaS驾校管理系统和落地实施解决方案。通过打造新移动时代的超级APP系统矩阵、社会化营销策略、管理及运营人才输出帮助驾校为学员提供品质服务的同时进入后市场，
      从而助力驾校实现多元化发展。同时，为学员带了多（场地多）、快（拿本快）、好（教练好）、省（花钱省）的学车体验。
      </p>
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
</style>

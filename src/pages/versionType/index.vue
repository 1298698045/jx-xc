<template>
    <div class="wrap">
        <div class="boxHeader">
            <p>以下是您所在班型的约课规则，请仔细阅读，如有疑问</p>
            <p>请联系客服。</p>
        </div>
        <div class="container">
            <div class="center">
                <!-- <i-panel i-class="boxWrap" title="基本信息"></i-panel> -->
                <h3>
                    <!-- <span>|</span> -->
                    基本信息
                </h3>
                <div class="box">
                  <div class="boxWrap">
                      <div class="left">
                          班级编号：<span>{{classInfo.classCode}}</span>
                      </div>
                      <div class="left">
                          班型名称：<span>{{classInfo.className}}</span>
                      </div>
                      <div class="left">
                          分配模式：<span>{{classInfo.pattern}}</span>
                      </div>
                  </div>
                </div>
                <h3>
                    <!-- <span>|</span> -->
                    增值服务
                </h3>
                <div class="boxs">
                  
                  <p class="ps">
                    <i-con type="addressbook_fill" size="28" color="#fb731b" v-if="classInfo.valueAddedServicesStr!=null" />
                    {{classInfo.valueAddedServicesStr==null?'':classInfo.valueAddedServicesStr}}</p>
                </div>
                <!-- <i-panel i-class="boxWrap" title="约课规则"></i-panel> -->
                <h3>
                  <!-- <span>|</span> -->
                  关联课时
                </h3>
                <div class="box">
                  <p class="ps active" v-for="(item,i) in arr" :key="i">
                    <span>{{item}}</span>
                  </p>
                </div>
                <h3>
                    <!-- <span>|</span> -->
                    约课规则
                </h3>
                <div class="box">
                    <ul>
                        <li>允许预约日：<span>{{classInfo.allow_days=='0'?'周末':classInfo.allow_days=='1'?'周一至周日':classInfo.allow_days=='2'?'周一至周五':''}}</span></li>
                        <li>学员上限/车：<span>{{classInfo.userCount}}</span></li>
                        <li>提前预约天数：<span>{{classInfo.pre_days}}</span></li>
                        <li>单日最长学时课时：<span>{{classInfo.hours}}</span></li>
                        <li style="display:flex;flex: 1"><i style="display:block;width:65px">取消规则：</i><div><span>课程开始前{{classInfo.dis_hours==null?0:classInfo.dis_hours}}小时内禁止取消</span><br><span>预约成功后{{classInfo.dis_pre==null?0:classInfo.dis_pre}}小时内禁止取消</span></div></li>
                    </ul>
                </div>
                <!-- <i-panel i-class="boxWrap" title="班型介绍"></i-panel> -->
                <h3>
                    <!-- <span>|</span> -->
                    班型介绍
                </h3>
                <div class="box">
                  <p>{{classInfo.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      interval:"",
      overtimeInterval:"",
      classInfo: 
        {
          name:"绑定教练",
          serial: "LQ-GB-001",
          type: ["普通班", "高等班", "优惠班"],
          student: 1,
          number: 10,
          longesthours: 8,
          minhours: 1,
          appointment: ["周一至周日"],
          X: 1,
          Y: 2,
          content:
            "许预约日：周一至周日允许预约日：周一至周日允许预约日：周一至周日允许预约许预约日：周一至周日允许预约日：周一至周日允许预约日：周一至周日允许预约"
        },
        arr:[]
      
    };
  },
  onLoad(){
    this.getQuery();
  },
  methods: {
    getQuery(){
      this.$httpWX.get({
        url: this.$api.my.classtype + "/" +wx.getStorageSync('classTypeId'),
        data:{

        }
      }).then(res=>{
        console.log(res);
        this.classInfo = res.content;
        var str = this.classInfo.timeInterval.overtimeInterval.split(",");
        var arr = this.classInfo.timeInterval.interval.split(",");
        this.arr = arr.concat(str);
        console.log(this.arr);
        // this.overtimeInterval = this.classInfo.timeInterval.overtimeInterval.replace(/,/g,'/');
        // this.interval = this.classInfo.timeInterval.interval.replace(/,/g,'/')
        // console.log(this.classInfo.timeInterval.interval.replace(/,/g,'/'))
      })
    }
  }
};
</script>
<style scoped>
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
  padding: 10rpx 0;
	background-color: #fff4e1;
  text-align: center;
}
.wrap .boxHeader p {
  font-size: 24rpx;
  color: #fb6f14;
}
.wrap .container .center {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding-bottom: 100rpx;
}
.wrap .container .center h3{
    padding:20rpx 0;
    font-size: 24rpx;
    font-weight: bold;
}
.wrap .container .center h3 span{
    color: #ff3f00;
    font-size: 28rpx;
}
.wrap .container .center .box {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  font-size: 24rpx;
  color: #7a7a7a;
  /* display: flex; */
  border-radius: 12rpx;
  overflow: hidden;
}
.wrap .container .center .box .active{
  float: left;
  padding: 30rpx 40rpx!important;
}
.wrap .container .center .box .boxWrap{
  overflow: hidden;
  padding:30rpx;
}
.wrap .container .center .boxs{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  font-size: 24rpx;
  color: #7a7a7a;
  border-radius: 12rpx;
}
.wrap .container .center .boxs .ps{
  /* width: 90%;
  margin: 0 auto;
  padding: 15rpx 0; */
  color: #3b3b3b;
  font-weight: bold;
  border-bottom:1rpx solid #bfbfbf;
}
.wrap .container .center .boxs .ps:last-child{
  border-bottom: none;
}
.wrap .container .center .box .left {
  width: 50%;
  float: left;
  /* flex: 1; */
  font-size: 24rpx;
  /* text-align: center; */
}
.wrap .container .center .box .left:last-child{
  margin-top: 20rpx;
}
.wrap .container .center .box .left span {
  color: #3b3b3b;
  font-weight: bold;
}
.wrap .container .center .box .right {
  flex: 1;
  font-size: 24rpx;
  padding: 40rpx 15rpx;
  text-align: center;
}
.wrap .container .center .box .right span {
  color: #3b3b3b;
  font-weight: bold;
}
.wrap .container .center .box ul {
  padding: 30rpx;
  border-radius: 12rpx;
}
.wrap .container .center .box ul li {
  padding: 6rpx 0;
}
.wrap .container .center .box ul li span {
  color: #3b3b3b;
  font-weight: bold;
}
/* .wrap .container .center .box ul li:last-child {
  color: #3b3b3b;
  font-weight: bold;
} */
.wrap .container .center .box p {
  padding: 30rpx;
  color: #3b3b3b;
  /* font-weight: bold; */
}
</style>

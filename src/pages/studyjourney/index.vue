<template>
  <div class="wrap">
    <div class="header">
      <i-row>
        <i-col span="12">
          <p>
            <span style="color:#fb731b;font-size:30px;">{{betweenDays}}</span>
            <span style="color:#ababab;font-size:24rpx;margin-left:5rpx;">天</span>
          </p>
          <p style="padding:10rpx 0;">
            <i class="iconfont icon-wodeyemian-wancheng" style="display:inline-block;color:#ababab;font-size:22px;"></i>
            <span style="color:#4f4f4f;font-size:28rpx;margin-left:5rpx;">已学天数</span>
          </p>
        </i-col>
        <i-col span="12">
           <p>
            <span style="color:#fb731b;font-size:30px;">{{coursedCount}}</span>
            <span style="color:#ababab;font-size:24rpx;margin-left:5rpx;">课</span>
          </p>
          <p  style="padding:10rpx 0;">
            <i class="iconfont icon-wodeyemian-lishi" style="display:inline-block;color:#ababab;font-size:22px;"></i>
            <span style="color:#4f4f4f;font-size:28rpx;margin-left:5rpx;">已上课时</span>
          </p>
        </i-col>
      </i-row>
    </div>
    <!-- <div class="header">
      <i-row>
        <i-col span="12"><i class="iconfont icon-wodeyemian-lishi" style="display:inline-block;color:#ff3f00;font-size:30px;"></i><span class="size-big">{{betweenDays}}天</span></i-col>
        <i-col span="12"><i class="iconfont icon-wodeyemian-wancheng" style="display:inline-block;color:#ff3f00;font-size:30px;"></i><span class="size-big">{{coursedCount}}课时</span></i-col>
      </i-row>
    </div> -->
    <div class="contents">
          <i-steps i-class="steps" :current="verticalCurrent" direction="vertical">
            <i-step i-class="linecolor" icon=""  v-for="(item,index) in stepList" :key="index">
                <view slot="title">
                    <p class="ps" :class="index==0?'active':''">{{item.time}}</p>
                </view>
                <view slot="title" v-if="item.action=='COURSE_RECORD'">
                  <span>{{item.kmValue}}</span>
                  <span style="margin-left:20rpx;font-weight:200;">{{item.memos.startTime+'-'+item.memos.endTime}}</span>
                </view>
                <view slot="title"  v-if="item.action=='REPORT_FINISHED_DOCUMENT'">
                   <!-- v-if="item.type=='STUDY'"{{v=='已受理'?'':v}} -->
                   <!-- <span v-for="(v,i) in title[index]" :key="i" :class="i==1?'pactive':i==2?'pactive':''">{{v}}</span> -->
                  <span  :class="i==1?'pactive':i==2?'pactive':''">已受理</span>
                      <!-- {{item.title}} -->
                </view>
                <view slot="title" v-if="item.action=='STUDENT_GRADE'">
                  <span>{{item.memos.kmCode}}</span>
                  <span  class="spans">{{item.memos.examScore}}</span>
                  <!-- {{item.title}} -->
                </view>
                <view slot="content" v-if="item.action=='COURSE_RECORD'">
                  <view class="stepdetails">
                      <span style="color:black;">{{item.memos.kmValue}}</span>
                  </view>
                </view>
                <view slot="content" v-if="item.action=='COURSE_RECORD'">
                    <view class="stepdetails">
                      <view class="tipbtn" :class="item.common=='待签到'?'tipbtn_blue':''">待签到</view>
                      <view class="tipbtn" :class="item.common=='待签到;待确认'?'tipbtn_blue':''">待确认</view>
                      <view class="tipbtn" :class="item.memo.recordStatus==null?'tipbtn_blue':''">已完成</view>
                  </view>
                </view>
                <view slot="content" v-if="item.action=='STUDENT_GRADE'">
                    <view class="stepdetails">
                      <view>{{item.memos.examResult==1?'通过':item.memos.examResult==2?'未通过':item.memos.examResult==3?'缺考':''}}</view>
                  </view>
                </view>
            </i-step>
        </i-steps>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import { getDictValue } from '../../utils/public';
import { getDictData } from '../../utils/util'

export default {
  components: {

  },

  data () {
    return {
        coursedCount:"",
        betweenDays:"",
        stepList:[],
        title:[],
        common:[],
        days:'10',
        classtime:'66',
        current : 2,
        verticalCurrent :0,
        listData:[],
        studentId:""
    }
  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  },
  onLoad(options){
    this.studentId = wx.getStorageSync('studentId');
    getDictData().then(( dictionary )=>{
      var that = this;
      that.listData = dictionary;
    })
    console.log(options);
    this.coursedCount = options.coursedCount;
    this.betweenDays = options.betweenDays;
    this.getQuery();
    this.title = [];
  },
  methods:{
    getQuery(){
      this.$httpWX.post({
        url:this.$api.my.studyHistory,
        data:{
          params:{
            id:this.studentId
          }
        }
      }).then(res=>{
        console.log(res);
        this.stepList = res.data.list;
        this.stepList.forEach(item=>{
          var time_str = item.createTime;
          var newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(time_str)
          var documentedTime = newDate[0];
          this.$set(item,'time',documentedTime);

          console.log(item.memo);
          var memo = item.memo!=""?JSON.parse(item.memo):'';
          this.$set(item,'memos',memo);
          console.log(memo);
          var kmValue = getDictValue(this.listData,'km',memo.kmCode);
          this.$set(item,'kmValue',kmValue);
          // this.title.push(item.title.split(';'));
          // this.common.push(item.common.split(';'))
        })
        console.log(this.stepList);
      })
    }
  },
       /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      this.getQuery();
      wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    
    }
}
</script>

<style>
@font-face {
    font-family: 'iconfont';
    src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAfMAA0AAAAADhQAAAd0AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCCQhEICo50i1QLFAABNgIkAyQEIAWFCAeBJRt4CxFVrHsg+5EYg9vof+hzcidbxNpUuucjJJm9njb9fXeH3ZGQBIs4Ea1RlUhNkNRJRemvCX+aqxi0Dl4xvGqk5qTth6u4f1An68OEsPz9qa/WKy2Qf56NxSme8VbmEipFpAYF63nv26/VnZPo7aLNnacLhUdN8xfbv4hKE/EGzUogRNUo6S94yd47MTIcG7r1O0yvmnhDuigPAKDjIbw5lwsAcKNVcLXIbb18AJDomBeLAxcQEMMBECFEy4E1912EXQKAZdjHo9dQD3EBMGDhIJ/YfVjpEGj9LPWZDKcjtH43g1oA5JSL87nJJmiejUgXAeluAojGZ7JIhLPUsoSn4WoRGxRNArYGBvKfBwGoRZFIqc08iGNJCZgWABemJJQTwAYWcAAHTMhPTCwpFYrFSMDn87KT+XxJQqw0hi+Ly9AxjCoUUoTDSt5AXb+u3nVNqKk0+EJD+XojAG2iohRGWpxvMkjVlMEiRWaziq+2zJIUmPUiBelOWUDGjdnHND3EtCyoZmptY1LXXU+y/JfrLjZtFW8tttlEdN7mLJFRZLJtDfyKDzrFFqnUkeSnLM7sg01MB8UH461XRJtDgwLhcJgyXCz0Fzqk5uqmh3JcLv2IsGJFJGnc19QXLEC+EwXb1krtuZZci9Qyy55or7WtWmLM8uR5dgA9esMWg/WStcH6RrPZInWfPrg1wWQUqc1hzYkgQwX2h8PhFP9GhmFK4Dooi0hdlYibRhim5ttqhqmejhsK5pZqNkJ5OpyxPlRyhsncdF25+QgdMBydVd1Pz6js25tZ3E6bVWTEio1gCiuvX5fOcuWY7Q63+Pzx+FBotMWPEAW01+CXIrNP7wEgkf3QAZikUtdIHzyclFxK8SdW7K9Jsthdm0VGT5bLJzGvD2UV2y5XkPtOpLLWnWxk8c/ykaGQggiHlZRh+zad3kN7xXuPp2Bhu+MM079CZY4rxErx7zIZpEqHW2b5Nqspg9NGWzeTpN5ln+Vwqyinl/ZkkS7fLL/OGUgAo2gIZj3y3lciYQ2PHoopQWW2I3yYWYIcR3NHb/bEYzZvdpQ77QISsQnqUEhBKtVkvxmu0DMqs8tjFXtavBPD1Pk0BJu6fv10DBesXa+VQPcudNtsa53Ad8zZBN/z8eMefDpavy5xhAZV0dhATFNVpdnvSlchDRo4k15WsYy9gJPInsZp1rZEFiVrJ+fLR4/CJpH8TmItbVpSIo+Sc4xbNILr+f9OFllgF0+jys6+M6DjoUx/xwHVPbNVkvicDle3T77W/eP7DUuMMeensxLoxEbP5siJt+86l4TeB7vLGv8zcUN8Qmv3YtThRuL/aexi1a+UDjmD3nl6l6salCVJxWWnZmNXiWyFjh3ksrCK0f0rl34Xo9baLTRbDvU1nAtnheyZLyXhvfPw7vSb7mdLe7ZOSc9rPlkUn1xaX1XeRy9bFdVc8XOYxl08Q2PkOTzt2TM0lQXHinpU7C+LaiAMcfeMKatVXDLi2LlyLv9Yc1trzdB2U6SvVkNSRlWWUHMSx3cs15KtOaM0OKTjIxfh+/fji3iTgi069LpXcI+RIocCSpywqI0WW7YM0xJd13N7j8bESRdg2miItveGrl2SErumxHpakJhkDWna7sqwZsObD282LOX21EALog3yz3Va7Xbv6dlzvh/GimbkT0Y3cSW1UO1Fp7wOe6isjZBoE2gBQy5eaRfNv8aPlqfKogZEZ6bWE3gNuFAmmn8rT5kskAsyRTIhnhkte42/92K8u5DW9anao0P1YiAD6ZxL+2hpoWDJvTofiAXEhzoPMlNlgjagroC2C6CtWt0G3RPVqyccrBPIU+QPGqQ6FqVq1FZVkTwowvmX9iYpkuwme7uelemc9Mqe7RIy7MmKHTA+NEGw9lfqz7UCue/P1F9r8x/7x0XqRMaR79D647kdJRS/9pHayv+p2EExca8G98Yz3VimtmPtBWuG3Phz6ltbaW8poEqOwf8bKIGzMuktMpWxHx7EKjneAPHnD3Gk65Rlk5d1wx3BmtXMhdfUOFfXBM/uv04h77zm6a4BS1v1Oz5sHBzxKQIb8SlDF0MfEpv3IHegoPlXLkXAgH1khG4CTrMALixE+iBbVItpfKUdtPEahh6AAFE3TIFDsq1fliRDxADPWZxODACJESBCfZxfvLVilooIlwIxHGMQx7UACOtGZKGcRDauh0gq3O1yinCbg+IBQAEAiMS4ISZaf8TFGICwvpFF4oNsMb5IUvl3UnJWRsPbaaFQzyMTRmRJVrFKibbpHQC5q8hHd/z3iZXBVx7YXw7QE2KDXKgFb0fO1fvc2WQV1OroeMPn8MCq09Z9xwsK5bIMPnM5u3dGLMi4etRAWpNe6NxXFJ0olz/VRm3fmUJxbp0DDix7diMHfU/rVPx0Pl8sZr5jXg0wIv7O2pWLV6KYqx1xmrmwiZBLgfk4fMqEz0qmBsBrQLDhE3BEIBZiI05yhsuw7IiFhqXNWLIMSqROYZUHy84OHK6elTpmQl1FL1OV4CeEZSxY8r6TUOcBLD1iXbl2ogAAAA==) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
    font-weight: normal;
    font-style: normal;
}
.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-keyueyemian-genghuanjiaolian:before { content: "\e61e"; }

.icon-keyueyemian-lianxi:before { content: "\e61f"; }

.icon-keyueyemian-weizhi:before { content: "\e620"; }

.icon-wodeyemian-wancheng:before { content: "\e621"; }

.icon-shaixuan:before { content: "\e622"; }

.icon-wodeyemian-lishi:before { content: "\e623"; }
page{
  background:#fff;
}
.wrap{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header{
  width: 80%;
  margin:0 auto;
  /* background:#282828; */
  /* color:#fff; */
  font-size:12px;
  text-align:center;
  padding:10px 0;
  border-bottom: 1rpx solid #c8c8c8;
}
.contents{
  text-align:left;
  padding:20px;
  font-size:14px;
  color:#5E5E5E;
}
.contents .steps{
  margin-left: 58px;
}
.stepdetails{
  /* background:#F2F2F2;
  padding:10px;
  border-radius:6px; */
}
.linecolor{
  color:red;
}
.linecolor .ps{
  width: 150rpx;
  background: #cacaca;
  text-align: center;
  font-size: 20rpx;
  color: #fff;
  position: absolute;
  left: -65px;
  top:0;
}
/* .steps:nth-child(1) .linecolor .ps{
  width: 150rpx;
  background: #ff3f00;
  text-align: center;
  font-size: 20rpx;
  color: #fff;
  position: absolute;
  left: -65px;
  top:0;
} */
.linecolor .ps.active{
  background: #ff3f00;
}
.linecolor .spans{
  display:inline-block;
  width:100rpx;
  background:#3bdb91;
  font-size:24rpx;
  text-align:center;
  font-size:24rpx;
  color:#fff;
  font-weight:200;
  border-radius:30rpx;
  margin-left: 20rpx;

}
.tipbtn{
  display:inline-block;
  color:#cacaca;
  margin: 0 10rpx;
  /* background:#35BE26;
  color:#fff;
  padding:3px 15px;
  border-radius:9px;
  margin-left:18px; */
}
.size-big{
  font-size:16px;
  display: inline-block;
  margin-left: 20rpx;
}
.tipbtn_blue{
  /* background:#4661F0; */
  color:#ff3f00;
}
.tipbtns{
  color:#ff3f00;
}
.pactive{
  display: inline-block;
  margin-left: 20rpx;
}
</style>

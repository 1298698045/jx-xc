<template>
  <div class="outDiv">
    <swiper
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        class='swiperDiv'
      >
        <block v-for="(item,index) in imgUrls" :key = 'index'>
          <swiper-item>
            <image :src="item" class="slide-image" width="355" @click='changeAutoplay(index)'/>
          </swiper-item>
        </block>
      </swiper>
      <div class='topList top_tittle'>
        <div class="list_title"><image src='../../static/images/top_one.png'></image>完整教学</div>
        <div class="list_title"><image src='../../static/images/top_two.png'></image>质量教学</div>
        <div class="list_title"><image src='../../static/images/top_three.png'></image>规范教学</div>
        <div class="list_title"><image src='../../static/images/top_four.png'></image>优质服务</div>
      </div>
      <!-- <div class="cityList">
        <picker @change="bindPickerChange" :value="index" :range="cityList">
          <view class="picker" style="padding-left:5px;font-size:12px;">
            <image src='../../static/images/dingwei.png' style="height:17px;width:14px"></image>
            {{cityList[index]}}
            <image src='../../static/images/jiantou.png' style="height:8px;width:13px;vertical-align:middle"></image>
          </view>
        </picker>
      </div> -->
      <div class='topList toplistWrap'>
        <div class='list_ list1' @click="handelTo(1)">
          <p class="icon">
            <i class="iconfont icon-woxiangxueche"></i>
          </p>
          <p class="text">我想学车</p>
        </div>
        <div class='list_ list2' @click="handelTo(2)">
          <p class="icon">
            <i class="iconfont icon-pingtaiyoushi"></i>
          </p>
          <p class="text">平台优势</p>
        </div>
        <div class='list_ list3' @click="handelTo(3)">
          <p class="icon">
            <i class="iconfont icon-fuwuliucheng"></i>
          </p>
          <p class="text">服务流程</p>
        </div>
        <div class='list_ list4' @click="handelTo(4)">
          <p class="icon">
            <i class="iconfont icon-guanyuwomen"></i>
          </p>
          <p class="text">关于我们</p>
        </div>
      </div>
      <!-- <i-row i-class="row">
        <i-col span="12">
          <i class="iconfont icon-xunlianchangdi"><span>训练场地</span></i>
        </i-col>
        <i-col span="12" i-class="right">
          <p @click="handelTo(5)">更多
            <i-icon type="enter" />
          </p>
        </i-col>
      </i-row>
        <div class="box-wrap" slot="content">
          <div class='placeList'>
            <div class='list_'><image src='../../static/images/boxcar.png'  style="width: 60px; height: 46px;" /></div>   
            <div class='list_'>
              <div class='list_text'>
                <p>王台训练场</p>
                <p>地址：晋城市城区北石店镇太平村</p>
              </div>
            </div>
          </div>
          <div class='placeList'>
            <div class='list_'><image src='../../static/images/boxcar.png'  style="width: 60px; height: 46px;" /></div>   
            <div class='list_'>
               <div class='list_text'>
                 <p>金村训练场</p>
                 <p>地址：晋城市城区金村镇金村村口</p>
               </div>
            </div>
          </div>
        </div> -->
      <div class="footer">
        <p>
          <i class="iconfont icon-wodefuli"><span>学员福利</span></i>
        </p>
        <div class="content">
          <!-- <view  @click="handelTo(6)">
            <image src='http://yx.aplusx.com/wximg/jiaxiao/advertise_one.jpg' style="height:220rpx;width:100%"></image>
          </view>
          <view  @click="handelTo(7)">
            <image src='http://yx.aplusx.com/wximg/jiaxiao/advertise_two.jpg' style="height:220rpx;width:100%"></image>
          </view> -->
          <div class="activity"  @click="handelTo(9)">
            <image src='../../static/images/activity.png'></image>
            <p>
              我的活动
              <span><i-icon type="enter" color="#fff" /></span>
            </p>
          </div> 
          <div class="activity" @click="handelTo(8)">
            <image src='http://yx.aplusx.com/wximg/jiaxiao/advertise_three.png' style="height:220rpx;width:100%"></image>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
//import card from "@/components/card";
export default {
  data() {
    return {
      imgUrls: [
        'http://yx.aplusx.com/wximg/jiaxiao/banner1.png'
      ],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      cityList:['晋城'],
      index:0,
      openid:""  // 用户唯一标识
    };
  },

  created() {
    console.log('created')
    const logs = wx.getStorageSync("logs") || [];
  },
  onLoad(){
   console.log('onload')
  },
  onShow(){
    console.log('onShow')
  },
  methods: {
    changeAutoplay(e) {
     if(e==1){
       wx.navigateTo({
        url: '/pages/bannerInfor/main'
      })
     }
  },
  handelTo(num){
    if(num==1){
      wx.navigateTo({
        url: '/pages/learn/main'
      })
    }else if(num==2){
      wx.navigateTo({
        url: '/pages/goodness/main'
      })
    }else if(num==3){
      wx.navigateTo({
        url: '/pages/learnstep/main'
      })
    }else if(num==4){
      wx.navigateTo({
        url: '/pages/aboutUS/main'
      })
    }else if(num==5){
      wx.navigateTo({
        url: '/pages/place/main'
      })
    }else if(num==6){
      wx.navigateTo({
        url: '/pages/maodou/main'
      })
    }else if(num==7){
      wx.navigateTo({
        url: '/pages/guazi/main'
      })
    }else if(num==8){
      wx.navigateTo({
        url: '/pages/tanche/main'
      })
    }else if(num==9){
      var that = this;
      wx.login({
        success(res){
          if(res.code){
                const code = res.code;
                that.$httpWX.get({
                    url:that.$api.home.getOpenid+"/"+code,
                    data:{

                    }
                }).then(res=>{
                    that.openid = res.content.openid;
                    wx.setStorageSync('openid',that.openid);
                })
            }
          console.log(res);
          if(res.code){
            const url = '/pages/activity/main'
            wx.navigateTo({url:url});
          }
        }
      })
    }
  },
    formSubmit() {
      this.$httpWX
        .post({
          url: that.$api.home.authentication,
          data: {
            loginName: this.phone,
            password: this.password,
            clientType:"student_app"
          }
        })
        .then(res => {
       
        });
    },
    bindPickerChange(e) {
      this.index = e.target.value;
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // this.setData({
    //   index: e.detail.value
    // })
  },
  },
  onShareAppMessage(res){
    return {
      title:'分享',
      path:'/pages/cover/main'
    }
  }
};
</script>

<style lang="scss">
@font-face {
    font-family: 'iconfont';
    src: url(data:font/truetype;charset=utf-8;base64,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) format('truetype');
    font-weight: normal;
    font-style: normal;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-fuwuliucheng:before {
  content: "\e636";
}

.icon-location:before {
  content: "\e637";
}

.icon-guanyuwomen:before {
  content: "\e638";
}

.icon-guifanjiaoxue:before {
  content: "\e639";
}

.icon-pingtaiyoushi:before {
  content: "\e63a";
}

.icon-wanzhengjiaoxue:before {
  content: "\e63b";
}

.icon-wodefuli:before {
  content: "\e63c";
}

.icon-woxiangxueche:before {
  content: "\e63d";
}

.icon-xunlianchangdi:before {
  content: "\e63e";
}

.icon-youzhifuwu:before {
  content: "\e63f";
}

.icon-zhiliangjiaoxue:before {
  content: "\e640";
}

page {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.slide-image{
  height:100%;
  width:100%;
}
.outDiv {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
}
.swiperDiv{
  height: 187px;
}
.topList{
  display:flex;
  display:-webkit-flex;
  flex-wrap: nowrap;
  justify-content:space-around;
  align-items:center;
}
.toplistWrap{
  margin-top: 10px;
}
.top_tittle{
  position:absolute;
  /* transform:translatex(-50%);
  left:50%; */
  top:298rpx;
  width:100%;
}
.row{
  padding: 20px 10px 5px 10px;
  i{
    color: #fb6f14;
    span{
      font-size: 28rpx;
      color: #4f4f4f;
      margin-left:10rpx;
    }
  }
  .right{
    text-align: right;
    font-size: 26rpx;
    color: #4f4f4f;
  }
}
.box-wrap{
  background: #fff;
}
.placeList{
  display:flex;
  display:-webkit-flex;
  flex-wrap: nowrap;
  align-items:center;
  border-top:1px solid #eee;
  padding: 5px 0;
  position: relative;
}
.placeList_title{
  display:flex;
  display:-webkit-flex;
  flex-wrap: nowrap;
  justify-content:space-between;
  align-items:center;
  border-top:1px solid #eee;
  padding: 0 0 12px 0;
}
.placeList .list_{
  // height: 100px;
  padding: 6px;
}
.topList .list_{
  // height:90px;
  width:20%;
  padding:20rpx 0;
  .icon{
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 50%;
    margin: 0 auto;
    text-align: center;
    border:1rpx solid #fb6f14;
    i{
      font-size: 30px;
      color: #fb6f14;
    }
  }
  .text{
    font-size: 28rpx;
    color: #4f4f4f;
    text-align: center;
    padding-top:5px;
  }
}
.list_text{
  // position:absolute;
  // transform:translatey(-50% );
  // top:50%;
  // color: #414141;
  p{
    color: #979797;
    font-size: 24rpx;
  }
}
.list_text p:nth-child(1){
  font-size: 14px;
  color: #414141;
   font-weight: 800;
}
.topList .list_title{
  background:rgba(0, 0, 0, 0.7);
  color:#fff;
  border-radius:15px;
  padding:4px 6px;
  font-size:12px;
  text-align:center;
}
.list_title image{
  height:19px;
  width:19px;
  vertical-align:bottom;
  margin-right:2px

}
.footer{
  margin-top: 10px;
  background: #fff;
  p{
    padding: 10px 0 0 10px;
    i{
      color: #fb6f14;
      span{
        color: #4f4f4f;
        font-size: 28rpx;
        font-weight: 800;
        margin-left:10rpx;
      }
    }
  }
  .content{
    padding-bottom:20rpx;
    .activity{
      width:351px;
      height:109px;
      margin: 10px auto;
      text-align: center;
      position: relative;
      image{
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
      p{
        position: absolute;
        top: 30%;
        right: 30px;
        color: #fff;
        font-size: 20px;
        font-weight: 200;
        span{
          width: 29px;
          height: 29px;
          line-height: 1.3;
          border-radius: 50%;
          background: #ff6227;
          display: inline-block;
        }
      }
    }
  }
}
.cityList{
  position:absolute;
  top:0;
  color:#fff;
}
.cityList image{
  vertical-align:top;
}
.list1{
  border-radius: 8px;
  background: #fff;
  /* background:url('http://yx.aplusx.com/wximg/jiaxiao/title_one.png') no-repeat;
  background-size:contain; */
}
.list2{
  border-radius: 8px;
  background: #fff;
  /* background:url('http://yx.aplusx.com/wximg/jiaxiao/title_two.png') no-repeat;
  background-size:contain; */
}
.list3{
  border-radius: 8px;
  background: #fff;
  /* background:url('http://yx.aplusx.com/wximg/jiaxiao/title_three.png') no-repeat;
  background-size:contain; */
}
.list4{
  border-radius: 8px;
  background: #fff;
  /* background:url('http://yx.aplusx.com/wximg/jiaxiao/title_four.png') no-repeat;
  background-size:contain; */
}
</style>

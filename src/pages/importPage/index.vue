<template>
  <div class="wrap" style="background:url('http://testyx.aplusx.com/jiaxiao/img/car.jpg')no-repeat;background-size:100% 100%;">
    <view style="text-align:center;"> 
      <image style="width:188px;height:48px;margin:91px 0;" src="/static/images/logoOne.png"></image>
    </view>
    <div class="boxitem">
        <a href="/pages/firstBinding/main" class="counter">初次使用</a> 
    </div>
    <div class="boxitemTwo">
        <a href="/pages/login/main" class="counter">已绑定个人信息</a> 
    </div>
    <view style="text-align:center;font-size:12px;color:#ff3f00;margin-top:180px;"><img src="/static/images/haohao.png" style="width:180rpx;height:30rpx;" alt=""></view>
  </div>
</template>

<script>
// import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      current: 'tab1',
        current_scroll: 'tab1'
    }
  },

  components: {

  },

  methods: {
    handleChange (detail) {
        this.current = detail.target.key;
    },
    handleChangeScroll (detail ) {
        this.current_scroll = detail.target.key;
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style>
page{
  height: 100%;
}
.wrap{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.wrap .boxitem{
  width: 60%;
  height:50px;
  line-height: 50px;
  font-size: 30rpx;
  background: #3BDB91;
  text-align: center;
  color: #fff;
  border-radius: 30px;
  margin: 0 auto;
}
.wrap .boxitemTwo{
  width: 60%;
  height:50px;
  line-height: 50px;
  font-size: 30rpx;
  background: #ff3f00;
  text-align: center;
  color: #fff;
  border-radius: 30px;
  margin: 30px auto;
}
</style>

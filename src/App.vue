<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
    let that = this;
        wx.login({
            success(res){
                if(res.code){
                    const code = res.code;
                    that.$httpWX.get({
                        url:that.$api.home.getOpenid+"/"+code,
                        data:{
                            
                        }
                    }).then(res=>{
                        console.log("crtead:",res);
                        that.openid = res.content.openid;
                        wx.setStorageSync('openid',that.openid)
                    })
                }
            }
        })
  },
  onHide(){
    console.log('监听事件')
  }
}
</script>

<style>
.txt-right{
  text-align: right;
}
.icon-success{
 display:inline-block;text-align:center;margin-top:20rpx;width:24px;height:24px;border-radius:50%;line-height: 24px;
}

page{
  background: #f2f2f2;
}
</style>

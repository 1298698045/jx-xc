<script>
export default {
  created () {
    let that = this;
        wx.login({
            success(res){
                if(res.code){
                    const code = res.code;
                    that.$fetch.get({
                        url:that.$api.home.getOpenid+"/"+code,
                        data:{
                            
                        }
                    }).then(res=>{
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

<template>
  <div class="outDiv">
    <image src='http://yx.aplusx.com/wximg/jiaxiao/xc_fuli2.png' style="width:100%;height:395px;"></image>
    <div class="form_box">
      <div class='form_info'>
        <form action="">
           <i-input title="尊称" :focus='flage' v-model.lazy = "name" placeholder="请输入尊称" @change="nameChange"/>
           <i-input title="手机" :focus='flage' v-model.lazy = "phone" placeholder="请输入手机号" type="number" @change="phoneChange"/>
           <i-input title="备注" :focus='flage' v-model.lazy = "node" placeholder="请输入意向车型、预算等"  @change="nodeChange"/>
        </form>
        <view><button @click="handleClick" shape="circle" size="large" class="sendBtn">提交购车意向</button></view>
      </div>
    </div>
    <i-divider content="提交后专属客服会及时与您联系，请保持手机畅通！" color="#80848f"></i-divider>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name:'',
      phone:'',
      node:'',
      flage:false
    };
  },

  created() {
    this.name = '';
    this.phone = '';
    this.node = '';
  },
  onLoad(){
    this.name = '';
    this.phone = '';
    this.node = '';
  },
  onShow(){

  },
  methods: {
    phoneChange(v){
      this.phone = v.target.detail.value;
    },
    nameChange(v){
      this.name = v.target.detail.value;
    },
    nodeChange(v){
      this.node = v.target.detail.value;
    },
    handleClick(){
      if(this.phone==''||this.name==''){
        wx.showToast({
              title: '请填写尊称或手机号',
              icon: "none",
            });
      }else{
        if(!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(this.phone))){
          wx.showToast({
              title: '请填写正确格式手机号',
              icon: "none",
            });
        }else{
        this.$httpWX
        .post({
          url: "/v1/aplus-jx-index/index/activity/user/save",
          data: {
            telphone: this.phone,
            name: this.name,
            remark:this.node,
            channel:"aplusxuechebao",
            type:1
          }
        }).then(res=>{
            wx.showModal({
              title: '提示',
              content: res.status.message,
              showCancel:false,
              success(res) {
                if (res.confirm) {
                  wx.switchTab({
                    url:"/pages/cover/main"
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
        })
        }
      }    
    }
  },
   onShareAppMessage(res){
    return {
      title:'Aplus向您推荐学员福利！',
      path:'/pages/guazi/main',
      imageUrl: ''
    }
  }
};
</script>

<style>
page {
  height: 100%;
}
.outDiv {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
}
.form_box{
  margin: 0 20px;
  padding:10px;
}
.form_info{
  border-radius: 10px;
  background:#fff;
  padding: 10px;
}
.sendBtn{
  background: #ff5e00!important;
  color: #fff;
  border-radius: 30px;
  margin-top:15px;
}
</style>

<template>
    <div class="wrap">
        <div class="textarea-box">
            <textarea class="textarea" v-model="content"  name="textarea" placeholder="请输入反馈意见"  maxlength="300"></textarea>
            <span>{{contentSize}}/{{totalCount}}</span>
        </div>
        <button class="btn-cus-submit" @click="activeUpdSubmit">提交</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            content:"",
            totalCount: 300,
            name:""
        }
    },
    computed: {
        contentSize () {
            return this.content.length || 0
        }
    },
    onShow(){
        this.content = "";
    },
    onLoad(options){
        this.name = options.name;
    },
    methods:{
        activeUpdSubmit () {
            if (this.content === '') {
                wx.showToast({
                    title: '请输入反馈意见',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
            let url = this.$api.my.addOrUpdate;
            let params = {
                content: this.content,
                source: 'STUDYCAR',
                status: 'UNHANDLE',
                feedbackName: this.name,
                feedbackPhone: wx.getStorageSync('telphone'),
                schoolId: wx.getStorageSync('schoolId'),
            }
            this.$httpWX.post({
                url,
                data: params
            }).then(res => {
                wx.showToast({
                    title: res.msg,
                    duration: 2000,
                    success: () => {
                        if (res.code * 1 === 200) {
                            setTimeout(() => {
                                wx.switchTab({url:'/pages/my/main'})
                            }, 1000);
                        }
                    }
                })
            })
        }
         
    }
}
</script>
<style lang="scss">
.textarea-box{
	width: 347px;
	margin: 10px auto 24px;
	background-color: #ffffff;
	border-radius: 6px;
	border: solid 1px #f4f4f4;
    padding: 14px;
    box-sizing: border-box;
    textarea{
        border: none;
        width: 100%;
        height: 300px;
        font-size:28rpx;
        line-height: 2
    }
    span{
        display: block;
        text-align: right;
        color: #b4b4b4;
        font-size: 13px;
        padding-top:10px;
        margin-right:10px;
    }
    
}
.btn-cus-submit{
  width:480rpx;
  height:80rpx;
  background-image:linear-gradient(90deg, #fc8902 0%, #fb4003 100%);
  box-shadow:0 4rpx 20rpx 0 rgba(253, 135, 2, 0.6);
  border-radius:42rpx;
  color:#fff;
  font-size:28rpx;
  line-height:80rpx;
  letter-spacing: 5px;
}
</style>

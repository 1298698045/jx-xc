<template>
    <div class="wrap">
        <div class="header">
            <img :src="imgUrl+detail.pictureUrl" alt="">
        </div>
        <div class="content">
            <div class="boxHeader">
                <i-row i-class="rowT" v-if="type=='REDUCTION'">
                    <i-col style="color:#fb6809;font-size:24rpx;" span="6">最低:￥<span style="font-size:35rpx;font-weight:bold;">{{detail.price - detail.discountsRestrictions}}</span></i-col>
                    <i-col span="6">
                        <p style="text-decoration:line-through;margin-top:8rpx;color:#979797;font-size:24rpx;">原价{{detail.price}}</p>
                    </i-col>
                    <i-col span="12" style="text-align:right;">
                        <p style="font-size:24rpx;color:#4f4f4f;">
                            每多一人，团价减<span style="color:#fb6809;font-weight:bold;">{{detail.discountsMoney}}</span>元
                        </p>
                    </i-col>
                </i-row>
                <i-row i-class="rowT"  v-if="type=='COMMON'">
                        <i-col style="color:#fb6809;font-size:28rpx;" span="7">团购价:￥<span style="font-size:35rpx;font-weight:bold;">{{detail.discountsRestrictions}}</span></i-col>
                        <i-col span="6">
                            <p style="text-decoration:line-through;color:#979797;font-size:24rpx;">原价{{detail.price}}</p>
                        </i-col>
                        <i-col span="11">
                            <p style="color:#4f4f4f;font-size:24rpx;">
                                <span style="color:#fb6809;">{{detail.peopleRestrictions}}</span>人团
                            </p>
                        </i-col>
                    </i-row>
                <p class="text-name">{{detail.name}}</p>
                <p class="activ">活动归属：{{detail.schoolName}}</p>
                <p class="activ">活动时间：{{detail.startTime}}～{{detail.endTime}}</p>
            </div>

            <div class="detailWrap">
                <h3>
                    <span class="span-title">
                        参团列表
                    </span>
                </h3>
                <p class="title" v-if="type=='REDUCTION'">参团 <span>{{detail.joinGroupUserNum}}</span> 人，团价<span>-{{detail.realPrice}}</span>元 现价:￥<span>{{detail.realMoney}}</span></p>
                <p class="title" v-if="type=='COMMON'">参团 <span>{{detail.joinGroupUserNum}}</span> 人，成团还差<span>{{detail.peopleRestrictions-detail.joinGroupUserNum}}</span>人</p>
                <div class="imgList">
                    <div v-for="(item,index) in imgList" class="img-wrap" :key="index">
                        <img :src="item.headUrl" alt="">
                        <p v-if="item.sign=='LEADER'" class="icon">
                            团购
                        </p>
                        <!-- <i-tag  v-if="item.sign=='LEADER'" class="icon" name="团购"  color="red">
                            团长
                        </i-tag> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgUrl:'http://aplusyx.oss-cn-beijing.aliyuncs.com/',
            scrollTop:"",
            imgList:[1,2,3,4,5,56,7,7,8,8],
            id:"",
            docid:"",
            detail:{},
            type:""
        }
    },
    onLoad(options){
        console.log(options)
        this.id = options.configId;
        this.docid = options.id;
        this.type = options.type;
        this.getQuery();
    },
    methods: {
        getQuery(){
            this.$httpWX.post({
                url:this.$api.activity.list,
                data:{
                    // id:this.id,
                    docid:this.docid
                }
            }).then(res=>{
                console.log(res);
                this.detail = res.content;
                this.imgList = res.content.aplusGroupWxUserList;
            })
        },
        getPhone(){
            wx.makePhoneCall({
                phoneNumber: '1340000' // 仅为示例，并非真实的电话号码
            })
        }
    },
    onPageScroll:function(e){ // 获取滚动条当前位置
        var that = this;
        that.scrollTop = e.scrollTop;
        console.log(e)
        console.log(e.scrollTop)//获取滚动条当前位置的值
    },
}
</script>
<style lang="scss">
    .wrap{
        width: 100%;
        height: 100%;
        .header{
            width: 100%;
            height: 208px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                vertical-align: middle;
            }
        }
        .content{
            width: 100%;
            height: auto;
            .boxHeader{
                padding: 20rpx;
                font-size: 28rpx;
                background: #fff;
                .text-name{
                    font-size: 16px;
                    color:#4f4f4f;
                    padding: 10rpx  0;
                    font-weight: bold;
                }
                .activ{
                    font-size: 24rpx;
                    color: #979797;
                }
            }
            .detailWrap{
                background: #fff;
                padding: 20rpx 0;
                margin-top:20rpx;
                h3{
                    text-align: center;
                    padding: 15rpx 0;
                    .span-title{
                        font-size: 16px;
                        font-weight: bold;
                        padding-bottom:5rpx;
                        color:#4f4f4f;
                        border-bottom:2px solid #fb6809;
                    }
                }
                .title{
                    font-size: 24rpx;
                    text-align: center;
                    padding-top: 10rpx;
                    color:#4f4f4f;
                    span{
                        font-weight: bold;
                        color:#fb6809;
                    }
                }
                .imgList{
                    display: flex;
                    // justify-content: space-between;
                    flex-wrap: wrap;
                    padding:20rpx;
                    .img-wrap{
                        width: 38px;
                        height: 38px;
                        line-height: 38px;
                        border-radius: 50%;
                        margin:0 20rpx;
                        text-align: center;
                        padding:10rpx 0;
                        position: relative;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .icon{
                            width: 35px;
                            height: 16px;
                            line-height: 16px;
                            color: #fff;
                            text-align: center;
                            background: #fb6809;
                            border-radius:8px;
                            font-size:10px;
                            position: absolute;
                            left: 30rpx;
                            top: 0;
                        }
                    }
                }
            }
        }
    }
</style>

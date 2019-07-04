<template>
    <div class="wrap">
        <!-- <i-tabs :current="current" color="#ff3f00" @change="handleChange">
            <i-tab i-class="tab" key="tab1" title="活动列表"></i-tab>
            <i-tab i-class="tab" key="tab2" title="我的活动"></i-tab>
        </i-tabs> -->
        <div class="box" v-if="list==''">
            <div class="img-wrap">
                <img src="/static/images/no-content.png" alt="">
                <p>暂无活动</p>
            </div>
        </div>
        <div class="content" v-if="list!=''">
            <i-panel i-class="panel" hide-border="false" v-for="(item,index) in list" :key="index">
                <i-row i-class="top">
                    <i-col span="9">
                        <div class="colLeft">
                            <image :src="imgUrl+item.pictureUrl" alt=""></image>
                            <!-- <p v-if="current!='tab2'" class="icon">团购</p> -->
                            <i-tag  v-if="item.type=='REDUCTION'" i-class="icon" name="团购"  color="#fb6809">
                                团购
                            </i-tag>
                            <p class="pactive">{{item.docStatus=="ACTIVE"?"进行中~":'已结束'}}</p>
                        </div>
                    </i-col>
                    <i-col span="15" i-class="colRight">
                        <h3>{{item.name}}</h3>
                        <div class="box">
                            <p>最低：<span style="font-weight:bold;">{{item.price-item.discountsRestrictions}}</span> </p>
                            <p style="text-decoration:line-through;margin:5rpx 10rpx;color:#979797;font-size:20rpx;">原价{{item.price}}</p>
                            <p style="margin-left:10rpx;">现价: <span style="font-weight:bold;">{{item.realMoney || ''}}</span> </p>
                        </div>
                        <p style="font-size:20rpx;color:#979797;">活动归属：{{item.schoolName}}</p>
                    </i-col>
                </i-row>
                <div class="bottom">
                    <p style="margin-top:8rpx;color:#979797;font-size:20rpx;">参团数：
                        <span style="color:#fb6809;font-weight:bold;">{{item.joinGroupUserNum || ''}}</span></p>
                    <!-- <p style="color:red;margin-top:8rpx;">{{item.docStatus=="ACTIVE"?"进行中~":'已结束'}}</p> -->
                    <i-button i-class="ibtn" type="primary"  @click="getRouter(item)">查看详情</i-button>
                </div>
            </i-panel>
            <i-divider content="没有更多了"></i-divider>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            imgUrl:'http://aplusyx.oss-cn-beijing.aliyuncs.com/',
            pageNo:1,
            pageSize:5,
            current:'tab1',
            date:"",
            list:[
                
            ],
            arr:[],
            type:""
        }
    },
    onLoad(){
        this.pageNo = 1;
        this.pageSize = 5;
        this.getQuery();
        var that = this;
        // setInterval(function () {
        //     that.countdown();
        // }, 1000)
    },
    mounted() {
        
    },
    methods: {
        getQuery(){
            this.$httpWX.post({
                url:this.$api.activity.myGroups,
                data:{
                    openid:wx.getStorageSync('openid'),
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                }
            }).then(res=>{
                console.log(res);
                // this.list = res.content.item;
                
                if(this.pageNo * this.pageSize <= res.content.totalNum){
                    this.isPage = true;
                }else {
                    this.isPage = false;
                }
                let temp = [];
                if(this.pageNo == 1){
                    console.log(1)
                    temp = res.content.item;
                }else {
                    console.log(2);
                    temp = this.list.concat(res.content.item);
                }
                this.list = temp;
                console.log(this.list);
                // var list = this.list;


                
                // for(var i=0; i<list.length; i++){
                //     // var remaining = list[i].remaining.replace(/-/g, '/');
                //     var remaining = list[i].remaining;
                //     this.countdown(remaining,i);
                // }
                // var that = this;
                // this.list.forEach(item=>{
                //     console.log(item.remaining);
                //     setInterval(function () {
                //         that.countdown(item.remaining);
                //     }, 1000)
                // })
            })
        },
        handleChange(e){
            this.current = e.mp.detail.key;
            if(this.current=='tab1'){

            }else if(this.current=='tab2'){

            }
        },
        countdown (remaining,i) {
            console.log('*********',remaining,i);
            // 目标日期时间戳
            var remaining = remaining.replace(/-/g, '/');
            // 目标日期时间戳
            const end = Date.parse(new Date(remaining))
            // // 当前时间戳
            const now = Date.parse(new Date())
            // 相差的毫秒数
            const msec = end - now
            // 计算时分秒数
            let day = parseInt(msec / 1000 / 60 / 60 / 24)
            let hr = parseInt(msec / 1000 / 60 / 60 % 24)
            let min = parseInt(msec / 1000 / 60 % 60)
            let sec = parseInt(msec / 1000 % 60)
            // 个位数前补零
            // hr = hr > 9 ? hr : '0' + hr
            // min = min > 9 ? min : '0' + min
            // sec = sec > 9 ? sec : '0' + sec
            // 控制台打印
            // console.log(`${day*24+hr}小时 ${min}分钟 ${sec}秒`)
            var arr = [];
            this.date = `${day*24+hr}小时 ${min}分钟 ${sec}秒`;
            arr.push(this.date);
            // for(var i=0;i<arr.length;i++){
            //     console.log('duiying',arr[i]);
            //     this.arr = arr[i];
            // }
            console.log(arr);
        },
        getRouter(item){
            const id = item.docid;
            const configId = item.id;
            const type = item.type;
            const url = '/pages/activityDetail/main?id='+id+'&configId='+configId+'&mode='+"0"+'&type='+type;
            wx.navigateTo({url:url});
        }
    },
        // 下拉刷新
    onPullDownRefresh() {
        this.isPage = true;
        this.pageNo = 1;
        this.getQuery();
        wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (this.isPage) {
            this.pageNo++;
            this.getQuery();
        }
    }
}
</script>

<style lang="scss">
    .box{    
        .img-wrap{
            width: 65px;
            height: 56px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            img{
                width: 100%;
                height: 100%;
                vertical-align: middle;
            }
        }
        p{
            font-size: 28rpx;
            text-align: center;
            color: #a5a5a5;
        }
    }
    .panel{
        background: #fff;
        padding: 15rpx;
        .top{
            padding-bottom:10rpx;
            .colLeft{
                width:100%;
                height: 160rpx;
                // overflow: hidden;
                position: relative;
                image{
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                }
                .icon{
                    font-size: 20rpx;
                    position: absolute;
                    top: 0;
                    left:0;
                    color: #fff;
                    background: #fb6809!important;
                    border:none!important;
                }
                .pactive{
                    width: 100%;
                    height: 22px;
                    line-height: 22px;
                    font-size:24rpx;
                    text-align: center;
                    color:#fff;
                    background: rgba(0,0,0,.5);
                    position: absolute;
                    bottom:0;
                    left:0;
                }
            }
            .colRight{
                padding: 0 10rpx;
                font-size: 28rpx;
                h3{
                    color:#4f4f4f;
                    font-weight:bold;
                }
                .box{
                    padding: 15rpx 0;
                    display: flex;
                    color:#fb6809;
                }
            }
        }
        .bottom{
            padding:15rpx 0;
            display:flex;
            border-bottom:0.5px solid #efefef;
            font-size:28rpx;
            p{
                flex: 1;
            }
            .ibtn{
                flex: 1;
                width: 80px;
                height: 26px;
                line-height: 26px;
                text-align: center;
                margin: 0;
                background-image: linear-gradient(90deg, 
                #fc8902 0%, 
                #fb4003 100%)!important;
                box-shadow: 0px 2px 10px 0px 
                rgba(253, 135, 2, 0.6)!important;
                border-radius:21px;
            }
        }
    }
</style>

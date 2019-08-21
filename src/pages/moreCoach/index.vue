<template>
    <div class="wrap">
        <div class="header">
            <div class="box">
                <picker  @change="bindPickerChange" v-model="index" range-key="title" :range="array">
                    <i-row i-class="row">
                        <i-col span="20"><p style="margin-left:30rpx;">{{array.length>0?array[index].title:''}}</p></i-col>
                        <i-col span="4">
                            <p style="text-align:center;">
                                <i-icon type="enter" />
                            </p>
                        </i-col>
                    </i-row>
                </picker>
            </div>
        </div>
        <!-- <div class="rowHeader">不选择上面的条件时，系统将随机给您分配课程</div> -->
        <div class="center">
            <i-row i-class="row" v-for="(item,index) in list" :key="index">
                <i-col span="5">
                    <img src="/static/images/man.png" alt="" style="width:46px;height:46px;">
                </i-col>
                <i-col span="13">
                    <div class="box">
                        <p>{{item.name}}</p>
                        <p>{{item.siteName}}</p>
                        <!-- <site :siteValue="item.siteId"></site> -->
                        <!-- <p class="pcol">{{item.adress}}</p> -->
                    </div>
                </i-col>
                <i-col span="5" i-class="left">
                    <i-button i-class="btn" type="primary" @click="getOrder(item)">选择</i-button>
                </i-col>
            </i-row>
        </div>
        <i-modal i-class="modal" :visible="isModal" :show-cancel="flase" @ok="getOk" >
            <div>
                <i-icon type="remind_fill" size="28" color="#fb6809" />
                <span>提示</span>
            </div>
            <p>您的约课模式不符，如果想预约更多课程，</p>
            <h3>请联系客服！</h3>
        </i-modal>
    </div>
</template>
<script>
import site from '../../components/site'
export default {
    components:{
        site
    },
    data(){
        return {
            index:0,
            array:[],
            list:[],
            id:"",
            isModal:false,
            siteId:"",
            employeeId:"",
            km:"",
            departId:""
        }
    },
    onLoad(options){
        this.km = options.km;
        this.departId = options.departId;
        this.getAllField();
        this.getQuery();
    },
    methods:{
        // 全部训练场
        getAllField(){
            this.$httpWX.post({
                url:this.$api.coach.querySite,
                data:{
                    params:{
                        status:1
                    }
                }
            }).then(res=>{
                if(res.code==0){
                    this.array = res.data.list;
                    this.array.unshift({title:"全部训练场"});
                }
            })
        },
        // 查询教练
        getQuery(){
            if(this.index!=0){
                var params = {
                    siteId:this.siteId,
                    km:this.km
                }
            }else {
                params = {
                    km:this.km
                }
            }
            this.$httpWX.post({
                url:this.$api.coach.queryAllCoach,
                data:{
                params:params
            }
            }).then(res=>{
                this.list = res.data.list;
                // this.list.forEach(item=>{
                //     console.log(item);
                //     this.getSiteName(item.siteId);
                // })
                this.list =  this.list.map(item=>{
                    const siteName = this.getSiteName(item.siteId);
                    item.siteName = siteName;
                    return item;
                })
                console.log('list',this.list);
            })
        },
        getSiteName(siteId){
          const site =   this.array.find(item=>item.id===siteId);
        //   console.log('site',site);
          if(site){
            //   this.list.forEach(item=>{
            //       this.$set(item,'siteName',site.title);
            //   })
              return site.title;
          }
        //  console.log('lists',this.list);
          return '暂无'
        },
        bindPickerChange(e){
            this.index = e.mp.detail.value;
            this.siteId = e.mp.detail.value;
            this.getQuery();
        },
        getOrder(item){
            console.log(item);
            this.employeeId = item.employeeId;
            const url = '/pages/reducible/main?employeeId='+this.employeeId+'&ident='+true;
            wx.reLaunch({url:url});
            // this.isModal = true;
        },
        getOk(){
            this.isModal = false;
        }
    }
}
</script>
<style lang="scss">
.wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .header{
        background:#f6f6f6;
        .box{
            flex: 1;
            font-size: 28rpx;
            .row{
                padding: 20rpx 0;
            }
        }
    }
    .rowHeader{
        width: 100%;
        height: 33px;
        line-height: 33px;
        font-size: 24rpx;
        color: #fb6f14;
        text-align: center;
        background: #fff4e1;
    }
    .center{
        width: 100%;
        padding: 0 20rpx;
        background: #fff;
        .row{
            padding: 10rpx 0;
            font-size: 24rpx;
            border-bottom: 1rpx solid #faf9f9;
            .box{
                margin-top: 10rpx;
                .pcol{
                    color: #979797;
                }
            }
            .left{
                padding: 25rpx 0;
                .btn{
                    width: 70px!important;
                    height: 24px!important;
                    line-height: 24px!important;
                    margin: 0!important;
                    border:1rpx solid #fb7015!important;
                    background: #fff!important;
                    color: #fb7015!important;
                    font-size: 24rpx!important;
                    border-radius: 8rpx!important;
                    // margin-top:20%!important
                }
            }
        }
    }
    .modal{
        div{
            span{
            font-size: 28rpx;
            color: #4f4f4f;
            font-weight: bold;
            margin-left: 10rpx;
            }
        }
        p{
            color: #888888;
            padding: 15rpx 0;
        }
        h3{
            color: #888888;
        }
    }
}
</style>

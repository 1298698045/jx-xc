<template>
    <div class="wrap">
        <div class="header">
            <image v-if="detail.pictureUrl" :src="imgUrl+detail.pictureUrl"></image>
        </div>
        <div class="container" style="margin-bottom:80px;">
            <div class="content" v-if="detail.joinStatus!='UNOPEN'">
                <i-panel i-class="groutp">
                    <p class="count-down"  v-if="detail.joinStatus!='JOIN'&&detail.joinStatus!='UNJOIN'">
                        <span>已结束</span>
                    </p>
                    <p class="count-down" v-else-if="detail.joinStatus=='JOIN'||detail.joinStatus=='UNJOIN'">
                        距结束
                        <span class="span-box">{{hour}}</span> <span class="m">:</span>
                        <span class="span-box">{{minute}}</span> <span class="m">:</span>
                        <span class="span-box">{{second}}</span>
                        <!-- <i-count-down i-class="countDown" :target="targetTime" :format="myFormat" :clear-timer="clearTimer" @callback="myLinsterner"></i-count-down> -->
                    </p>
                    <i-row i-class="row-avatar">
                        <i-col span="18">
                            <div class="boxImg">
                                <p v-for="(item,index) in imgList" :key="index">
                                    <i-icon type="add" size="28" v-if="aplusGroupWxUserList!=null" />
                                    <img :src="item.headUrl" alt="" style="width:100%;height:100%;">
                                    <span v-if="item.sign=='LEADER'" class="icon">
                                        团长
                                    </span>
                                    <!-- <i-tag  v-if="item.sign=='LEADER'" class="icon" name="团购"  color="red">
                                        团长
                                    </i-tag> -->
                                </p>
                            </div>
                        </i-col>
                        <i-col span="6" @click="getGroupList">
                            <p style="font-size:28rpx;color:#fb6809;margin-top:15px;">参团列表 <i-icon type="enter" size="24" color="#fb6809" /></p>
                        </i-col>
                    </i-row>
                    <div class="rowrap">
                        <p class="left" v-if="type=='REDUCTION'">
                            参团 <span>{{detail.joinGroupUserNum}}</span> 人，团价<span>-{{detail.realPrice}}</span>元 现价：￥<span>{{detail.realMoney || ''}}</span>
                        </p>
                        <p class="left" v-if="type=='COMMON'">
                            参团人数<span>{{detail.joinGroupUserNum}}</span> 人，成团还差<span>{{detail.peopleRestrictions-detail.joinGroupUserNum}}</span>人
                        </p>
                    </div>
                </i-panel>
            </div>
            <div class="content">
                <i-panel i-class="panel"  hide-border="false">
                    <i-row i-class="rowT"  v-if="type=='REDUCTION'">
                        <i-col style="color:#fb6809;font-size:28rpx;" span="7">最低:￥<span style="font-size:35rpx;font-weight:bold;">{{detail.price-detail.discountsRestrictions}}</span></i-col>
                        <i-col span="6">
                            <p style="text-decoration:line-through;color:#979797;font-size:24rpx;">原价{{detail.price}}</p>
                        </i-col>
                        <i-col span="11">
                            <p style="color:#4f4f4f;font-size:24rpx;">
                                每多一人，团价 <span style="color:#fb6809;">-{{detail.discountsMoney}}元</span>
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
                </i-panel>
            </div>
            <div class="content">
                <i-panel i-class="panels"   hide-border="false" v-if="contInfo">
                    <i-row class="rows">
                        <i-col span="4" i-class="leftImg">
                            <div class="avatarUrl">
                                <img v-if="contInfo" :src="contInfo.avatarUrl" alt="">
                            </div>
                        </i-col>
                        <i-col span="13">
                            <p style="margin-top:20rpx;color:#4f4f4f;font-size:28rpx;">
                                <span style="color:#fb6809;">{{contInfo.employeeName}}</span>
                                邀您一起好好学车</p>
                        </i-col>
                        <i-col span="7">
                            <i-button i-class="btnPhone" type="" @click="getPhone(contInfo.employeePhone)">电话咨询</i-button>
                        </i-col>
                    </i-row>
                </i-panel>
            </div>
            <div class="content">
                <i-panel i-class="boxPanel">
                    <div class="process-wrap">
                        <div style="line-height:82rpx;">发起拼团</div>
                        <h3>
                            <i-icon type="enter" size="30" color="#ffa76f" />
                        </h3>
                        <div style="background:#ff873a;">
                            <p>转发好友</p>
                            <p>邀请拼团</p>
                        </div>
                         <h3>
                            <i-icon type="enter" size="30" color="#ff873a" />
                        </h3>
                        <div style="background:#fc7302;line-height:82rpx;">好友参与</div>
                         <h3>
                            <i-icon type="enter" size="30" color="#fc7302" />
                        </h3>
                        <div style="background:#fb4003;" v-if="type=='REDUCTION'">
                            <p>人数越多</p>
                            <p>价格越低</p>
                        </div>
                        <div style="background:#fb4003;" v-if="type=='COMMON'">
                            <p>达到人数</p>
                            <p>拼团成功</p>
                        </div>
                    </div>
                </i-panel>
            </div>
            <div class="content">
                <h3>
                    <span class="span-title">
                        活动说明
                    </span>
                </h3>
                <!-- <p style="text-align:center;font-size:28rpx;padding:20rpx 0;background:#ff3f00;color:#fff;">活动说明</p> -->
                <wxParse :content="article" @preview="preview" @navigate="navigate" />
            </div>
        </div>
        <div class="footer">
            <button type="primary" class="btn-time" :class="disabled==true?'active':''" open-type="getUserInfo" v-if="detail.joinStatus=='UNOPEN'" @getuserinfo="bindGetUserInfo('0')" :disabled="disabled">我要开团</button>
            <button type="primary" class="btn-time" open-type="share" v-if="detail.joinStatus=='JOIN'">邀请好友参团</button>
        </div>
        <div class="footer">
            <button type="primary" class="btn-time" :class="disabled==true?'active':''" open-type="getUserInfo" @getuserinfo="bindGetUserInfo('0')"  v-if="detail.joinStatus=='OVERTIME'" :disabled="disabled">时间超出结束，重新开团</button>
            <p v-if="type=='REDUCTION'">
                <button type="primary" class="btn-time" :class="disabled==true?'active':''" open-type="getUserInfo" @getuserinfo="bindGetUserInfo('0')"  v-if="detail.joinStatus=='FULL'" :disabled="disabled">达到人数上限结束，重新开团</button>
            </p>
            <p v-if="type=='COMMON'">
                <button type="primary" class="btn-time" :class="disabled==true?'active':''" open-type="getUserInfo" @getuserinfo="bindGetUserInfo('0')"  v-if="detail.joinStatus=='FULL'" :disabled="disabled">该团已成团结束，重新开团</button>
            </p>
        </div>
        <div class="footer" v-if="detail.joinStatus=='UNJOIN'">
            <i-row i-class="row-btn">
                <i-col span="12">
                    <button type="primary" class="my-btn" :class="disabled==true?'active':''" open-type="getUserInfo" @getuserinfo="bindGetUserInfo('0')" :disabled="disabled">我要开团</button>
                </i-col>
                <i-col span="12">
                    <button type="primary" :class="disabled==true?'active':'btnac'" open-type="getUserInfo" @getuserinfo="bindGetUserInfo('1')" :disabled="disabled">立即参团</button>
                </i-col>
            </i-row>
        </div>
        <!-- 指引用户操作 -->
        <div class="rightBlock" @click="showList" v-if="show">
            <div style="text-align:center;font-size:28rpx;color:#fff;padding:30rpx 0;">
                展开，点击转发发送给微信好友或微信群聊
            </div>
        </div>
        <i-modal i-class="modal" :visible="isModal" title="请填写参团信息" cancel-text="取消" @ok="getSubmit" @cancel="goCancel">
            <view>
                <!-- <p>用户授权登录，使用完整功能，安全快捷</p> -->
                <!-- <i-input v-if="isModal" :value="value1" title="姓名" autofocus placeholder="请输入姓名" />
                <i-input v-if="isModal" :value="value1" title="手机号" maxlength="11" autofocus placeholder="请输入姓名" /> -->
                <van-field
                    :value="userName"
                    required
                    clearable
                    label="姓名"
                    placeholder="请输入您的尊称"
                    @change="changeName"
                ></van-field>
                <van-field
                    :value="userPhone"
                    type="number"
                    maxlength="11"
                    required
                    clearable
                    label="手机号"
                    placeholder="请输入您的手机号"
                    @change="changePhone"
                ></van-field>
            </view>
            <div style="padding:20rpx;color:#fb6f14!important;font-size24rpx;">
                温馨提示：1、手机号是您参团的凭证，请正确填写
                <p style="color:#fb6f14!important;font-size:24rpx;margin-left:45px;">2、为方便查看活动，请添加该小程序</p>
            </div>
            <!-- <view class="slot">
                <i-button i-class="leftBtn" @click="goCancel">取消</i-button>
                <i-button i-class="rightBtn" type="primary" size="large" @click="getSubmit">确认</i-button>
            </view> -->
        </i-modal>
        <i-modal i-class="modal" :visible="endModal" cancel-text="确定" :show-ok="false" @cancel="getCanel">
            <div>
                <i-icon type="remind_fill" size="28" color="#fb6809" />
                <span>提示</span>
            </div>
            <p>该活动已结束，请参加其他活动</p>
        </i-modal>
        <i-action-sheet :visible="visibleSheet" :actions="actions" show-cancel @cancel="handleCancel" @click="handleClickItem" />
        <i-modal i-class="modal" :visible="successModal" :show-cancel="false" :show-ok="false">
            <div class="icon-box">
                <i-icon type="success_fill" size="80" color="#7ed321" />
            </div>
            <h3>参团成功</h3>
        </i-modal>
    </div>
</template>
<script>
import wxParse from 'mpvue-wxparse'
export default {
    components:{
        wxParse
    },
    data(){
        return {
            mode:"",
            detail:{},
            imgUrl:'http://oss-dev.aplusx.com/',
            targetTime: 21038240918,
            myFormat: ['时', '分', '秒'],
            myFormat1: ['天', '时', '分', '秒'],
            status: '进行中...',
            clearTimer: false,
            isModal:false,
            date:"",
            hour:"",
            minute:"",
            second:"",
            isShow:false,
            userInfo:"",
            imgList:[],
            userName:"",
            userPhone:"",
            article: "",
            show:false,
            avatarUrl:"",
            openid:"", // 用户唯一标识
            startTime:"",
            endTime:"",
            id:"",
            configId:"",
            contInfo:{},
            param:"",
            num:"",
            timeName:null,
            remaining:"", //倒计时
            endModal:false,
            disabled:false,
            visibleSheet:false,
            actions: [
                {
                    name: '去分享',
                    icon: 'share',
                    openType: 'share'
                }
            ],
            successModal:false,
            foreard:{},
            coachMark:false , //教练标识
            open:false , // 从分享页面打开
            coachForward:"",
            type:""
        }
    },
    onShow(){
        this.isModal = false;
    },
    onReady(){
        
    },
    created(){
        let that = this;
        wx.login({
            success(res){
                if(res.code){
                    const code = res.code;
                    that.$fetch.get({
                        url:that.$api.home.getOpenid+"/"+code,
                        data:{
                            params:{
                                code:res.code
                            }
                        }
                    }).then(res=>{
                        that.openid = res.content.openid;
                        wx.setStorageSync('openid',that.openid)
                    })
                }
            }
        })
    },
    onLoad(options){
        // wx.hideShareMenu() // 页面转发
        this.detail = {};
        this.login().then(()=>{
            this.queryDetail();
        });
        console.log('查看',options);
        if(options.type){
            this.type = options.type;
        }
        // 好友从分享链接进来
        if(options.param){
            this.open = options.open;
            this.param = JSON.parse(options.param);
            this.id = this.param.id;
            this.contInfo.avatarUrl = this.param.avatarUrl;
            this.contInfo.employeeName = this.param.employeeName;
            this.contInfo.employeeId = this.param.employeeId;
            this.contInfo.schoolId = this.param.schoolId;
            this.param.openid = this.openid;
            console.log('分享',this.param)
            console.log(options.coachForward);
            this.coachForward = JSON.parse(options.coachForward);
            if(this.open){
                var coachForward = {
                    employeeId:this.coachForward.employeeId?this.coachForward.employeeId:this.contInfo.employeeId,
                    employeeName:this.coachForward.employeeName,
                    schoolId:this.coachForward.schoolId,
                    schoolName:this.coachForward.schoolName,
                    configId:this.coachForward.configId,
                    configName:this.coachForward.configName,
                    type:"BROWSEANDVISITOR",
                    openid:wx.getStorageSync('openid')
                }
                console.log('coachForward',coachForward);
                this.$fetch.post({
                    url:this.$api.activity.statistics,
                    data:coachForward
                }).then(res=>{
                    console.log(res);
                })
            }
        }
        
        if(options.id){
            console.log(this.openid);
            this.mode = options.mode;
            this.id = options.id;
            this.configId = options.configId;
            this.param = {
                id:options.id,
                configId:options.configId,
                openid:this.openid
            }
        }
        
        if(options.userInfo){
            this.contInfo = JSON.parse(options.userInfo);
            wx.setStorageSync('employeeId',this.contInfo.employeeId);
            wx.setStorageSync('schoolId',this.contInfo.schoolId);
            this.coachMark = this.contInfo.coachMark;
            console.log('contInfo',this.contInfo);
            this.configId = this.contInfo.id;
            this.mode = this.contInfo.mode;
            this.param = {
                configId:this.contInfo.id,
                openid:this.openid
            };
            // 统计教练转发次数使用
            this.foreard = {
                configId:this.contInfo.id,
                openid:this.openid,
                employeeId:this.contInfo.employeeId,
                employeeName:this.contInfo.employeeName,
                schoolId:this.contInfo.schoolId
            }
            this.avatarUrl = this.contInfo.avatarUrl;
        }
        // if(this.detail.remaining!=null){
        //     this.countdown();
        // }
        if(this.detail.joinStatus=='JOIN'){
            this.countdown();
        }
        // this.time();
        // this.targetTime= new Date().getTime() + this.remaining;
        
    },
    onUnload() {
        // this.clearTimer = true;
        // 清楚定时器
        clearInterval(this.timeName)
    },
    methods:{
        login(){
            return new Promise((resolve,rejects)=>{
                var that = this;
                wx.login({
                    success(res) {
                        if(res.code){
                            const code = res.code;
                            that.$fetch.get({
                                url:that.$api.home.getOpenid+"/"+code,
                                data:{
    
                                }
                            }).then(res=>{
                                that.openid = res.content.openid;
                                resolve();
                            })
                        }
                        wx.getSetting({
                            success(res) {
                                if (res.authSetting['scope.userInfo']) {
                                    that.isShow = true;
                                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                                    wx.getUserInfo({
                                        success(res) {
                                            that.isShow = true;
                                            that.userInfo = res.userInfo;
                                        }
                                    })
                                }else {
                                    // that.isModal = true;
                                }
                            }
                        })
                    }
                })
            })
        },
        timer(){
            var that = this;
            let timerCount = setInterval(function () {
                console.log(that.remaining);
                // var timestamp = (new Date()).getTime();  // 当前时间戳
                // console.log(that.remaining);
                that.remaining = that.remaining - 1000;
                // let clientTime = Date.parse(new Date());
                // console.log('*****************',that.remaining);
                if (that.remaining > 0) {
                    // console.log(Math.floor(times/60/60%24) + '时')
                    // console.log(Math.floor(times/60%60) + '分')
                    // console.log(Math.floor(times%60) + '秒')
                    //  let day = parseInt(that.remaining / 1000 / 60 / 60 / 24)
                    let h = parseInt(that.remaining / 1000 / 60 / 60 % 24)
                    let m = parseInt(that.remaining / 1000 / 60 % 60)
                    let s = parseInt(that.remaining / 1000 % 60)
                    // var h = Math.floor(that.remaining/60/60%24);
                    // var m = Math.floor(that.remaining/60%60);
                    // var s = Math.floor(that.remaining%60);
                    that.date = `${h}小时${m}分${s}秒`
                }
            }, 1000)
        },
        countdown () {
            var remaining = this.remaining.replace(/-/g, '/');
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
            this.hour = day*24+hr;
            this.minute = min;
            this.second = sec;
            this.date = `${day*24+hr}小时 ${min}分钟 ${sec}秒`;
            // 一秒后递归
            var that =this;
            this.timeName = setTimeout(function () {
                that.countdown()
            }, 1000)
        },
        queryDetail(){
            this.param.openid = this.openid;
            console.log(this.param);
            this.$fetch.post({
                url:this.$api.activity.detail,
                data:this.param
            }).then(res=>{
                this.detail = res.content;
                this.detail.overStatus==0?this.endModal = true:this.endModal=false;
                this.detail.overStatus==0?this.disabled = true:this.disabled=false;
                this.detail.employee!=null?this.contInfo.avatarUrl = this.detail.employee.headUrl:'';
                this.detail.employee!=null?this.contInfo.employeeName = this.detail.employee.employeeName:'';
                this.detail.employee!=null?this.contInfo.employeePhone = this.detail.employee.employeePhone:'';
                this.article = res.content.profile;
                this.remaining = this.detail.remaining;
                this.contInfo?this.contInfo.employeeId = this.detail.employee.employeeId:'';
                this.contInfo?this.contInfo.schoolId = this.detail.employee.schoolId:'';
                this.imgList = this.detail.aplusGroupWxUserList;
                if(this.detail.joinStatus=='JOIN'||this.detail.joinStatus=='UNJOIN'){
                    this.countdown();
                }
            })
        },
        // 查看是否授权
        bindGetUserInfo(num){
            this.num = num;
            var that = this;
            wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        wx.getUserInfo({
                            success(res) {
                                that.userName = "";
                                that.userPhone = "";
                                that.isModal = true;
                                console.log(that.isModal)
                                console.log(res.userInfo)
                                that.userInfo = res.userInfo;
                            }
                        })
                    }
                }
            })
        },
        goCancel(){
            this.isModal = false;
        },
        getSubmit(){
            if(this.userName == ""){
                wx.showToast({
                    title: "姓名不能为空！",
                    icon: 'success',
                    duration: 2000
                })
                return false;
            }else if(this.userPhone == ""){
                x.showToast({
                    title: "手机号不能为空！",
                    icon: 'success',
                    duration: 2000
                })
                return false;
            }else {
                console.log(this.openid);
                if(this.num)
                this.$fetch.post({
                    url:this.$api.activity.saveUser,
                    data:{
                        openid:this.openid,
                        headUrl:this.userInfo.avatarUrl,
                        phone:this.userPhone,
                        name:this.userName
                    }
                }).then(res=>{
                    console.log(res);
                    wx.showToast({
                        title: res.status.message,
                        icon: 'success',
                        duration: 2000
                    })
                    this.isModal = false;

                    if(res.status.code * 1 === 10){
                        if(this.num=='0'){
                            console.log('开团',this.openid,this.detail.id,this.contInfo.employeeId,this.userPhone,this.contInfo.schoolId)
                            // 开团
                            this.$fetch.post({
                                url:this.$api.activity.saveGroupDoc,
                                data:{
                                    openid:this.openid,
                                    configId:this.detail.id,
                                    employeeId:this.contInfo.employeeId,
                                    phone:this.userPhone,
                                    schoolId:this.contInfo.schoolId,
                                    name:this.userName
                                }
                            }).then(res=>{
                                console.log(res);
                                this.id = res.content;
                                
                                this.param = {
                                    id:this.id,
                                    configId:this.detail.id,
                                    openid:this.openid
                                }
                                console.log('获取详情',this.param);
                                if(res.status.code * 1 === 10){
                                    var that = this;
                                    this.successModal = true;
                                    setTimeout(()=>{
                                        that.successModal = false;
                                    },1000)
                                    this.queryDetail();
                                }else {
                                    wx.showToast({
                                        title: res.status.message,
                                        icon: 'success',
                                        duration: 2000
                                    })
                                }
                            })
                        }else if(this.num=='1'){
                            this.getParticipate();
                        }
                    }
                })
            }
        },
        changeName(e){
            console.log(e);
            this.userName = e.mp.detail;
        },
        changePhone(e){
            console.log(e);
            this.userPhone = e.mp.detail;
        },
        // 获取手机号
        getPhoneNumber(e) {
            console.log(e);
        },
        // 电话咨询
        getPhone(phone){
            wx.makePhoneCall({
                phoneNumber: String(phone) // 仅为示例，并非真实的电话号码
            })
        },
        // 跳转参团列表
        getGroupList(){
            const url = '/pages/groupList/main?configId='+this.configId+'&id='+this.id+'&type='+this.type;
            wx.navigateTo({url:url});
        },
        preview(src, e) {
            // do something
        },
        navigate(href, e) {
            // do something
        },
        showList(){
            this.show = false;
        },
        // 邀请好友参团
        getInvitation(){
            // this.show = true;
            this.visibleSheet = true;
        },
        // 立即参团
        getParticipate(){
            console.log('参数:',this.openid,this.id,this.userPhone)
            this.$fetch.post({
                url:this.$api.activity.joinGroup,
                data:{
                    openid:this.openid,
                    docId:this.id,
                    phone:this.userPhone,
                    name:this.userName
                }
            }).then(res=>{
                console.log(res);
                this.queryDetail();
            })
        },
        getCanel(){
            this.endModal = false;
        },
        handleCancel(){
            this.visibleSheet = false;
        },
        handleClickItem () {
        },
    },
    
    onShareAppMessage(options){
        var that = this;
        console.log('onShareAppMessage',this.coachMark,this.detail.employee);
        this.param.employeeId = this.coachMark==true?this.foreard.employeeId:this.param.employeeId;
        this.param.schoolId = this.coachMark==true?this.foreard.schoolId:this.param.schoolId;
        this.param.avatarUrl =  this.contInfo!=null?this.contInfo.avatarUrl:'';
        this.param.employeeName = this.contInfo!=null?this.contInfo.employeeName:'';
        console.log(this.param);
        var param = JSON.stringify(this.param);

        var coachForward = {
            employeeId:this.coachMark==true?this.foreard.employeeId:this.detail.employee!=null?this.detail.employee.employeeId:this.param.employeeId,
            employeeName:this.coachMark==true?this.foreard.employeeName:this.param.employeeName,
            schoolId:this.detail.schoolId,
            schoolName:this.detail.schoolName,
            configId:this.param.configId,
            configName:this.detail.name,
            type:this.coachMark==true?'EMPLOYEEFORWARD':"OTHERFORWARD",
            openid:this.openid
        }
        var coach = JSON.stringify(coachForward);
        console.log('coachForward',coachForward);
        this.$fetch.post({
            url:this.$api.activity.statistics,
            data:coachForward
        }).then(res=>{
            console.log('统计',res);
        })
        return{
                title:this.userInfo.nickName+"邀您一起好好学车！",
                imageUrl:this.imgUrl+this.detail.pictureUrl,
                path:"/pages/activityDetail/main?param="+param+"&open="+'true'+"&coachForward="+coach
            }
        },
             // 下拉刷新
    onPullDownRefresh() {
        this.queryDetail();
        wx.stopPullDownRefresh();
    }
}
</script>
<style lang="scss">
@import url("~mpvue-wxparse/src/wxParse.css");
.rich{
    color:red;
}
.wrap{
    .rightBlock{
        display: block;
        width: 750rpx;
        height: 100%;
        z-index: 12;
        position: fixed;
        top:0;
        background:rgba(0,0,0,0.4);
    }
    width: 100%;
    height: auto;
    .header{
        width: 100%;
        height: 208px;
        overflow: hidden;
        image{
            width: 100%;
            height: 100%;
            vertical-align: middle;
        }
    }
    .content{
        background: #fff;
        margin-bottom: 20rpx;
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
        .panel{
            padding: 20rpx 10rpx;
            font-size: 28rpx;
            .rowT{
                padding: 10rpx 0;
                height: 50rpx;
                line-height: 50rpx;
            }
            .text-name{
                font-size: 16px;
                color: #4f4f4f;
                font-weight: 500;
                padding-top: 20rpx;
            }
            .activ{
                font-size: 24rpx;
                color: #979797;
            }
        }
        .boxPanel{
            margin-top: 20rpx;
            padding:0 10rpx;
            .process-wrap{
                font-size: 24rpx;
                overflow: hidden;
                padding: 30rpx;
                div{
                    width:120rpx;
                    // padding:0 30rpx;
                    height:41px;
                    float:left;
                    background:#ffa76f;
                    color:#fff;
                    border-radius:4px;
                    text-align: center;
                }
                h3{
                    float: left;
                }
            }
        }
        .groutp{
            font-size: 28rpx;
            text-align: center;
            .count-down{
                text-align: center;
                color:#2e2e2e;
                padding-top: 20rpx;
                .span-box{
                    width:22px;
                    height:22px;
                    line-height:22px;
                    background:#2e2e2e;
                    display:inline-block;
                    color:#fff;
                    font-weight:bold;
                    font-size: 12px;
                }
                .m{
                    font-size: 12px;
                    font-weight: bold;
                    margin:0 5rpx;
                }
            }
            .countDown{
                display: block;
                padding-bottom: 20rpx;
            }
            .row-avatar{
                padding: 20rpx 0;
                .boxImg{
                    display: flex;
                    // justify-content: space-between;
                    // flex-wrap: wrap;
                    padding:20rpx;
                    p{
                        width: 39px;
                        height: 39px;
                        line-height: 39px;
                        border-radius: 50%;
                        // border:1rpx dashed #000;
                        margin:0 20rpx;
                        text-align: center;
                        position: relative;
                        .icon{
                            width: 35px;
                            height: 16px;
                            text-align: center;
                            line-height: 16px;
                            font-size: 10px;
                            font-weight: 500;
                            border-radius: 8px;
                            background: #fb6809;
                            color: #fff;
                            position: absolute;
                            left: -15rpx;
                            top: 0;
                        }
                    }
                }
            }
            .rowrap{
                padding-bottom:20rpx;
                .left{
                    text-align: center;
                    font-size:24rpx;
                    color: #4f4f4f;
                    span{
                        color:#fb6809;
                        font-weight: bold;
                    }
                }
            }
        }
        .panels{
            padding:20rpx 20rpx;
            .rows{
                font-size: 28rpx;
                .avatarUrl{
                    width: 46px;
                    height: 46px;
                    img{
                        width: 100%;
                        height: 100%;
                        vertical-align: middle;
                    }
                }
                .btnPhone{
                    width:92px!important;
                    height: 26px!important;
                    line-height: 26px!important;
                    font-size: 24rpx;
                    border-radius: 21px;
                    background-image: linear-gradient(90deg, 
                    #fc8902 0%, 
                    #fb4003 100%)!important;
                    box-shadow: 0px 2px 10px 0px 
                    rgba(253, 135, 2, 0.6)!important;
                    color:#fff;
                    margin-top:15rpx!important;
                }
            }
        }
    }
    .footer{
        width: 100%;
        position: fixed;
        bottom: 20rpx;
        left:0;
        right: 0;
        .row-btn{
            padding: 0 20rpx;
        }
        button{
            font-size: 28rpx;
            // padding: 10rpx 0;
            height: 40px;
            line-height: 40px;
            border-radius: 21px;
            background-image: linear-gradient(90deg, 
            #fc8902 0%, 
            #fb4003 100%);
            // box-shadow: 0px 2px 10px 0px 
            // rgba(253, 135, 2, 0.6);
        }
        .my-btn{
            background: #fff;
            border:1px solid #fb4303;
            color:#fb4303;
            margin:0 20rpx
        }
        .btnac{
            margin:0 20rpx
        }
        .btn-time{
            width: 240px;
            height: 40px;
            line-height: 40px;
            padding:0!important;
        }
        button.active{
            font-size: 28rpx;
            padding: 10rpx 0;
            background: #ccc;
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
        .icon-box{
            padding:20rpx 0;
        }
        h3{
            font-size: 22px;
            font-weight: 500;
            color: #4f4f4f;
            padding-bottom: 20rpx;
        }
    }
}
</style>

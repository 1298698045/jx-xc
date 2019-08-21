<template>
  <div class="wrap">
    <div class="headerBox">
      <div class="box">
        <div class="message">
          <div class="row">
            <div class="left" style="">
              教练：
              <span>{{coachName}}</span>
            </div>
            <div class="left">
              车辆：
              <span>{{car}}</span>
            </div>
            <div class="right" @click="goReplace">
              科目：<span>{{km=='km2'?'二':km=='km3'?'三':''}}</span>
              <i-con v-if="show2" i-class="Types kmSelect" type="refresh" size="22" color="#ccc"></i-con>
              <i-con v-if="show1" i-class="Types kmSelect" type="refresh" size="22" color="#ff3f00"></i-con>
            </div>
          </div>
          <i-row i-class="rowNav">
            <i-col span="8" @click="getCall">
              <p>
                <i-con i-class="Types" type="mobilephone" size="22" color="#ff3f00"></i-con>联系教练
              </p>
            </i-col>
            <i-col span="8" @click="goMap">
              <p>
                <i-con i-class="Types" type="coordinates" size="22" color="#ff3f00"></i-con>场地位置
              </p>
            </i-col>
            <!-- <i-col span="8" @click="goReplace">
              <p>
                <i-con v-if="show2" i-class="Types" type="refresh" size="22" color="#ccc"></i-con>
                <i-con v-if="show1" i-class="Types" type="refresh" size="22" color="#ff3f00"></i-con>切换科目
              </p>
            </i-col> -->
            <i-col span="8">
              <p @click="getMoreCoach">
                <i-con i-class="more" type="more" size="15" color="#ff3f00"></i-con>更多教练
              </p>
            </i-col>
          </i-row>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="navTab">
        <scroll-view class="navBarWrap" scroll-x="true">
          <view
            class="navbar-item"
            :class="item.selected==false?'active':''"
            v-for="(item,index) in listArr"
            :key="index"
            @click="submit(item,index)"
          >
            <p :class="{active:num==index}">{{item.time}}</p>
            <text class="navbar-text"  :class="{active:num==index}">{{item.time==date?"今日":item.day}}</text>
          </view>
        </scroll-view>
      </div>
      <div class="content">
        <div class="txt" v-if="!list">
          <div class="img-wrap">
            <img src="/static/images/no-content.png" alt="">
          </div>
          <p>今日已无可约课程!</p>
        </div>
        <div class="ulsWrap">
          <div class="boxCont" :class="item.isBook==false?'activeT':item.bookNumber==item.placeNum?'activeT':item.isBooked==1?'activeT':number==index?'active':'boxCont'" v-for="(item,index) in list" :key="index" @click="tabClick(item,index)">
            <div class="padBox">
              <p class="pTil">
                <span class="l">{{item.startTimes}}</span>
                <span class="r">{{item.startTime}}-{{item.endTime}}</span>
              </p>
              <i-row i-class="rows">
                <i-col span="8">
                  <div class="colLeft" :class="item.isBook==false?'active':item.booked=='2'?'activeS':item.isBooked==1?'active':''">{{item.isBooked==1?'已约':item.bookNumber==item.placeNum?'更多':(item.placeNum)<(item.bookNumber)?'可约':''}}</div>
                </i-col>
                <i-col span="16">
                  <div class="colRight">
                    <p>
                      科目：<span style="color: #4f4f4f;font-weight:bold;">{{ km=='km2'?'科目二':km=='km3'?'科目三':'' }}</span>
                    </p>
                    <p>
                      人数：<span style="color: #4f4f4f;font-weight:bold;">{{item.placeNum}}/{{item.bookNumber}}</span>
                    </p>
                  </div>
                </i-col>
              </i-row>
            </div>
          </div>
        </div>
        
        <div class="btn-wrap">
          <button class="fBtn fBtn_more" @click="getMore"><i-con type="task_fill" size="20" />批量预约</button>
          <button class="fBtn" :class="!flag?'fBtn-active':''" v-on:click="subscribe" :disabled="disabled"><i-con type="task_fill" size="20" />预约</button>
        </div>

        <!-- <button class="subtn" v-on:click="subscribe" :disabled="disabled"><i-con type="task_fill" size="24" />预&nbsp&nbsp约</button> -->
        <div class="title">
          <div class="sigma">
            <div class="text">约课规则</div>
          </div>
        </div>
        <ul class="list">
          <li>
            <icon class="yuandian"></icon>
            &nbsp&nbsp允许预约日：
            <span>{{classType.allowDays}}</span>
          </li>
          <li>
            <icon class="yuandian"></icon>
            &nbsp&nbsp学员上限/车：
            <span>{{classType.bookNum}}</span>
          </li>
          <li>
            <icon class="yuandian"></icon>
            &nbsp&nbsp提前预约天数：
            <span>{{classType.preDays}}</span>
          </li>
          <li>
            <icon class="yuandian"></icon>
            &nbsp&nbsp单日最长学时课时：
            <span>{{classType.lessonsPerDay}}</span>
          </li>
          <!-- <li>
            <icon class="yuandian"></icon>&nbsp&nbsp禁止取消范围（小时）：
            <span>{{classType.dis_hours}}</span>
          </li> -->
          <li style="display:flex;flex: 1">
            <icon class="yuandian"></icon>
            &nbsp;&nbsp;&nbsp;取消规则：
            <div>
              <p>课程开始前{{classType.noncancelableBefore}}小时内禁止取消</p>
              <p>预约成功后{{classType.noncancelableIn}}小时内禁止取消</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <i-modal i-class="modal" :visible="visible1" @ok="goConfirm('0')" @cancel="goCancel">
      <div class="title">
        <i-con type="remind_fill" size="28" color="#fb6809" />
        <span>课程确认</span>
      </div>
      <div class="center">
        <p>教练：
          <span>{{coachName}}</span>
        </p>
        <p>
          时段：
          <span>{{starTimes}} {{startTime}}&nbsp;-&nbsp;{{endTime}}</span>
        </p>
        <p>
          日期：
          <span>{{trainingDate}}</span>
        </p>
        <!-- <p>已约：
          <span>{{bookNumber}}</span>
        </p> -->
        <p>
          场地：
          <span>{{address}}</span>
        </p>
        
      </div>
      <!-- <h3>确认要预约以上课程吗?</h3> -->
    </i-modal>
    <!-- 预约中 -->
    <i-modal i-class="modal" :visible="visible2" :show-ok="false" :show-cancel="false">
      <div class="title">
        <i-con type="remind_fill" size="28" color="#fb6809" />
        <span>快速为您约课中</span>
      </div>
      <div class="center">
        <p>教练：
          <span>{{coachName}}</span>
        </p>
        <p>
          时段：
          <span>{{starTimes}} {{startTime}}&nbsp;-&nbsp;{{endTime}}</span>
        </p>
        <p>
          日期：
          <span>{{trainingDate}}</span>
        </p>
        <!-- <p>已约：
          <span>{{bookNumber}}</span>
        </p> -->
        <p>
          场地：
          <span>{{address}}</span>
        </p>
        
      </div>
      <!-- <h3>确认要预约以上课程吗?</h3> -->
    </i-modal>

    <!-- 预约结果 -->
    <i-modal i-class="modal" :visible="visible3" :show-cancel="false" @ok="goConfirm('1')">
      <div class="title">
        <i-con type="remind_fill" size="28" color="#fb6809" />
        <span>{{title}}</span>
      </div>
      <div class="center">
        <p>教练：
          <span>{{coachName}}</span>
        </p>
        <p>
          时段：
          <span>{{starTimes}} {{startTime}}&nbsp;-&nbsp;{{endTime}}</span>
        </p>
        <p>
          日期：
          <span>{{trainingDate}}</span>
        </p>
        <!-- <p>已约：
          <span>{{bookNumber}}</span>
        </p> -->
        <p>
          场地：
          <span>{{address}}</span>
        </p>
        
      </div>
      <!-- <h3>确认要预约以上课程吗?</h3> -->
    </i-modal>


    <i-modal i-class="modal" :visible="isVisible" :show-ok="false" :show-cancel="false">
      <view>
        <p>您的学习科目进度不符，无可预约</p>
        <p>课程，如有疑问，请联系客服！</p>
      </view>
    </i-modal>


    <!-- 不是学员 -->
    <i-modal i-class="modal" :visible="typeModal" :show-ok="false" :show-cancel="false">
      <view>
        <p>您还未报名学车！</p>
      </view>
    </i-modal>

    <!-- 不能切换科目提示 -->
    <i-modal i-class="modal" :visible="isShows" @ok="getVisible" :show-cancel="false">
      <div class="title">
        <i-con type="remind_fill" size="28" color="#fb6809" />
        <span>提示</span>
      </div>
      <view style="font-size: 14px;color: #888888;padding:20rpx 0;">
        <p>您的学习科目进度不符，无可预约课程，</p>
        <p>如有疑问，请联系客服！</p>
      </view>
    </i-modal>

    
    <i-modal i-class="modal" :visible="showModal" :show-ok="false" :show-cancel="fasle">
      <i class="iconfont icon-cuo" style="color:#fb6809;font-size:60px;"></i>
      <p style="font-size: 18px;color: #4f4f4f;">预约失败</p>
      <p style="font-size: 14px;color: #888888;padding:20rpx 0;">{{message}}</p>
    </i-modal>
  </div>
</template>
<script>
// var util = require("../../utils/utils.js");
import { getDictValue } from '../../utils/public';
import { getDictData } from '../../utils/util'
export default {
  data() {
    return {
      studentId:"",
      isModal:false,
      disabled:true,
      date:"",
      coachName:'',
      coachId:'',
      car:'',
      id: "",
      examTime: "",
      location: "",
      visible1: false,
      show: false,
      num: 0,
      number: -1,
      time: "",
      year:'', // 年
      classType: {
      },
      navbar: [
     
      ],
      list: [

      ],
      weekRestrict:'',
      trainingDate:'',
      startTime:'',
      endTime:'',
      subjectCode:"",
      subject:'',
      mytime:'',
      latitude:"",
      longitude:"",
      name:"",
      address:"",
      regularizationFlag:wx.getStorageSync('regularizationFlag'),
      phone:"",
      partTwoStatus:"",  // 科目二状态
      partThreeStatus:"",  // 科目三状态
      twoSubjectCode:"",
      isVisible:false,
      isShows:false,
      show1:false,
      show2:false,
      Hours:"",
      htime:"",
      flag:false,
      starTimes:"",
      showModal:false,
      message:"",
      booked:"", //课程的状态
      listArr:[],
      listData:[],
      batchNo:"",
      bookNumber:"",
      siteId:"",
      classId:"",
      coachId:"",
      km:"",
      km2CoachId:"",
      km3CoachId:"",
      visible2:false,
      visible3:false,
      title:"",
      kmStatus:"",
      km2Status:"",
      km3Status:"",
      intensiveStatus:"",
      type:"",
      typeModal:false,
      departId:"",
      currentDate:"",   // 当前日期
      ident:false
    };
  },
  onLoad(options) {
    this.type = wx.getStorageSync('type') || '';
    if(this.type==""){
      const url = '/pages/newLogin/main';
      wx.reLaunch({url:url});
    }else if(this.type=='student_not_found'){
      this.typeModal = true;
    }
    this.studentId = wx.getStorageSync('studentId');
    // 教练id
    this.ident = options.ident;
    this.coachId = options.employeeId;
    getDictData().then(( dictionary )=>{
      var that = this;
      that.listData = dictionary;
    })
    var myDate = new Date();//获取系统当前时间
    this.year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1;
    var strDate = myDate.getDate();
    var Hours = myDate.getHours();
    var htime = myDate.getTime();
    this.htime = htime; // 当前时间戳
    var min = myDate.getMinutes();
    this.date =this.year+'-'+ month+'-'+strDate;

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    this.currentDate = this.year+'-'+ month+'-'+strDate;
    this.Hours = Hours+':'+ min;
    this.studentDetail().then(()=>{
      this.classTypeQuery();
      this.calendarQuery();
      this.getQuery(this.date);
      this.coachDetail().then(()=>{
        var that = this;
        that.siteDetail();
      });
    });
  },
  // computed:{
  //   navarr(){
  //     let listArr = this.listArr;
  //     listArr.forEach(item=>{
  //       var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]; 
  //       var myDate = new Date(item.courseDate);
  //       this.$set(item,'day',weekDay[myDate.getDay()]);
  //       this.$set(item,'time',item.courseDate.slice(5))
  //     })
  //     return listArr;
  //   }
  // },
  methods: {
    studentDetail(){
      return new Promise((resolve,reject)=>{
        this.$httpWX.post({
          url:this.$api.public.studentDetail,
          data:{
  
          }
        }).then(res=>{
          console.log(res);
          this.classId = res.data.classId;
          this.departId = res.data.departId;
          this.km2CoachId = res.data.km2CoachId;
          this.km3CoachId = res.data.km3CoachId;
          var km2CoachId = res.data.km2CoachId;
          var km3CoachId = res.data.km3CoachId;
          let km2Status = res.data.km2Status;
          let km3Status = res.data.km3Status;
          // 0:待激活 1:进行中 2:集训中 9:已完成 6:委培进行中
          // 选择更多教练
          if(this.ident){
            this.coachId = this.coachId;
          }else if((km2Status=="1"||km2Status=="2")&&(km3Status=="1"||km3Status=="2")){
            this.coachId = km2CoachId;
            this.km = 'km2';
            this.kmStatus = km2Status;
            this.km2Status = km2Status;
            this.km3Status = km3Status;
            this.show1 = true;
          }else if((km2Status!="1"||km2Status!="2")&&(km3Status=='1'||km3Status=='2')){
            this.coachId = km3CoachId;
            this.km = 'km3';
            this.kmStatus = km3Status;
            this.show2 = true;
          }
          // 科目二进行中 科目三带激活
          else if((km2Status=='1'||km2Status=='2')&&(km3Status!='1'&&km3Status!='2')){
            console.log('fadlsksafdg');
            this.coachId = km2CoachId;
            this.km = 'km2';
            this.kmStatus = km2Status;
            this.show2 = true;
          } 
          else if((km2Status!='1'||km2Status!='2')&&(km3Status!='1'||km3Status!='2')){
            this.isVisible = true;
          }
          
          console.log(this.coachId);
          resolve();
        })
      })
    },
    // 教练详情
    coachDetail(){
      var that = this;
      return new Promise ((resolve,reject)=>{
        that.$httpWX.post({
          url:this.$api.coach.coachDetail,
          data:{
            params:{
              employeeId:that.coachId
            }
          }
        }).then(res=>{
          console.log(res);
          this.coachName = res.data.name;
          this.phone = res.data.mobile;
          this.siteId = res.data.coachInfo.siteId;
          resolve();
        })
      })
    },
    // 场地详情
    siteDetail(){
      this.$httpWX.post({
        url:this.$api.coach.siteDetail,
        data:{
          params:{
            siteId:this.siteId
          }
        }
      }).then(res=>{
        console.log(res);
        this.latitude = res.data.lat;
        this.longitude = res.data.lng;
        this.name = res.data.title;
        this.address = res.data.address;
      })
    },
    // 班型
    classTypeQuery(){
      this.$httpWX.post({
        url:this.$api.classType.query,
        data:{
          params:{
            id:this.classId
          }
        }
      }).then(res=>{
        console.log(res);
        this.classType = res.data;
        this.classType.allowDays = getDictValue(this.listData,'week_day',this.classType.allowDays);
      })
    },
    calendarQuery(){
      this.$httpWX.post({
        url:this.$api.reducible.calendar+'/'+this.studentId,
        data:{

        }
      }).then(res=>{
        console.log(res);
        this.listArr = res.data;
        this.listArr.forEach(item=>{
          var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]; 
          var myDate = new Date(item.courseDate);
          this.$set(item,'day',weekDay[myDate.getDay()]);
          this.$set(item,'time',item.courseDate.slice(5))
        })
        
      })
    },
    // 课程查询
    getQuery(date) {
      this.$httpWX.post({
          url: this.$api.reducible.queryAll,
          data: {
            params:{
              coachId:this.coachId,
              km:this.km,
              courseDate:date,
              studentId:this.studentId
            },
            pagination:{
              current:1,
              pageSize:30
            }
          }
        })
        .then(res => {
          console.log("课程", res);
          this.list = res.data.list;
          for(var key in this.list){
            console.log('key',this.list[key].courses);
            this.list = this.list[key].courses;
          }
          console.log(this.list,'list');
          this.list.forEach(item=>{
            if(this.currentDate==item.courseDate){
              // console.log('endTime',this.currentDate,this.Hours,item.courseDate+' '+item.endTime);
              var m = item.courseDate.replace(/-/g, '/')+' '+item.endTime;
              var date = new Date(m);
              var time = date.getTime()+30*60*1000;
              if(this.htime>time){
                this.$set(item,'isBook',false);
              }else {
                this.$set(item,'isBook',true);
              }
            }
            var kmValue = getDictValue(this.listData,'km',item.kmCode)
            this.$set(item,'startTimes',item.startTime.slice(0,2)<12?'上午':'下午');
            this.$set(item,'kmValue',kmValue);
            this.$set(item,'bookNumber', Math.max.apply(null,item.bookNum.split(',')));
          })
          console.log("*******",this.list);
          // if(this.list==""){
          //   this.disabled = true;
          // }
          // this.navbar.unshift('今天')
        });
    },
     // 校验token
    getToken(){
      let token = wx.getStorageSync('token');
      this.$httpWX.get({
        url: this.$api.public.checkAuthentication + "/" +token,
        data:{

        }
      }).then(res=>{
        console.log('token',res);
        if(res.status.code * 1 !== 10){
          wx.showLoading();
          wx.hideLoading();
          setTimeout( () => {
            wx.showToast({
              title: '请重新登录!',
              icon: "none",
            });
            setTimeout( () =>{
              wx.hideToast();  
            },2000)
          },10);
          wx.reLaunch({
            url:"/pages/newLogin/main"
          })
        }
      })
    },
    // 更多教练
    getMoreCoach(){
      const url = "/pages/moreCoach/main?km="+this.km+"&departId="+this.departId;
      wx.navigateTo({url:url})
    },
    getMore(){
      const url = "/pages/batch/main?km="+this.km+'&studentId='+this.studentId+'&coachId='+this.coachId;
      wx.navigateTo({url:url})
    },
    getCar(){
      let siteId = wx.getStorageSync('siteId');
      this.$httpWX.get({
        url:this.$api.reducible.queryById + "/" + siteId,
        data:{

        }
      }).then(res=>{
        console.log(res);
        this.latitude = res.content.lat;
        this.longitude = res.content.lng;
        this.name = res.content.name;
        this.address = res.content.address;
      })
    },
    // 约课规则
    getContractRules() {

    },
    // 切换日期
    submit(item,index) {
      
      if(item.selected==false){
        return false;
      }else {
        this.num = index;
        this.date = item.courseDate;
        this.number = -1;
        this.getQuery(item.courseDate);
      }
    },
    // 选择科目
    tabClick(item, idx) {
      console.log(item)
      // item.isBooked==1?'已约':item.bookNumber==item.placeNum?'更多':(item.placeNum)<(item.bookNumber)?'可约':''
      if(item.isBooked==1){
        this.booked = '1';
      }else if(item.isBook==false){
        this.booked = '1';
      }else  if((item.placeNum)<(item.bookNumber)){
        this.number = idx;
        this.booked = '';
        this.flag = true;
      }
      this.id = item.id;
      this.disabled = false;
      this.bookNumber = item.placeNum + "/"+item.bookNumber;
      this.trainingDate = item.courseDate;
      this.startTime = item.startTime;
      this.starTimes = item.startTime.slice(0,2);
      this.starTimes = this.starTimes<12?'上午':'下午';
      this.endTime = item.endTime;
      this.intensiveStatus = item.intensiveStatus;
      if(item.bookNumber==item.placeNum){
        const selectCoach = JSON.stringify(item);
        console.log(selectCoach);
        const url = "/pages/choiceCoach/main?selectCoach="+selectCoach+'&studentId='+this.studentId+'&km='+this.km;
        wx.navigateTo({url:url});
      }
    },
    handleFruitChange(e){
      console.log(e);
      this.subject = e.mp.detail.value;
    },
    // 预约
    subscribe() {
      console.log('status',this.kmStatus,this.intensiveStatus);
      if((this.kmStatus == 1 && this.intensiveStatus ==0)||(this.kmStatus == 2 && this.intensiveStatus ==1)){
        
        if(this.booked == '1'){
          wx.showToast({
            title: '请选择课程',
            icon: 'success',
            duration: 2000
          })
          return false;
        }else if(this.number == '-1'){
          wx.showToast({
            title: '请选择课程',
            icon: 'success',
            duration: 2000
          })
          return false;
        }else {
          this.visible1 = true;
        }
      }else {
        wx.showToast({
          title: '科目状态不符',
          icon: 'success',
          duration: 2000
        })
      }
      // 跳转预约课程
      // wx.navigateTo({
      //   url: "/pages/reservations/main"
      // });
    },
    getCall(){
      // this.phone = wx.getStorageSync('phone');
      wx.makePhoneCall({
        phoneNumber: this.phone,
          success:function(){
          console.log("拨打电话成功！")
        },
        fail:function(){
          console.log("拨打电话失败！")
        }
      })
    },
    // 进去可约之后取消
    goCancel() {
      this.visible1 = false;
    },
    // 切换科目
    goReplace(){
      if(!this.show1){
        this.isShows = true;
      }else {
        if(this.km=='km2'){
          this.coachId = this.km3CoachId;
          this.km = 'km3';
          this.kmStatus = this.km3Status;
          this.num = 0;
          this.coachDetail().then(()=>{
            this.siteDetail();
            this.getQuery(this.date);
          });
        }else if(this.km=='km3'){
          this.coachId = this.km2CoachId;
          this.km = 'km2';
          this.kmStatus = this.km2Status;
          this.num = 0;
          this.coachDetail().then(()=>{
            this.siteDetail();
            this.getQuery(this.date);
          })
        }
      }
    },

    // 更换教练弹框
    modalSubmit(){
      this.isModal = false;
    },
    goConfirm(v) {
      if(v=='0'){
        return new Promise ((resolve,reject)=>{
          this.$httpWX
            .post({
              url: this.$api.reducible.book,
              data: {
                params:{
                  studentId:this.studentId,
                  courseId:this.id,
                  kmCode:this.km
                }
              }
            })
            .then(res => {
              console.log("预约", res);
              this.batchNo = res.data;
              this.visible1 = false;
              if(res.code==0){
                resolve(this.getBookQuery());
              }else {
                this.title = res.msg;
                this.visible3 = true;
              }
              // if(res.code == 0){
              //   this.getQuery();
              //   wx.switchTab({
              //     url: "/pages/already/main"
              //   });
              //   wx.showToast({
              //     title: res.data,
              //     icon: 'none',
              //     duration: 2000,
              //     mask:true
              //   })
              //   this.visible1 = false;
              // }else{
              //   this.visible1 = false;
              //    this.message = res.data;
              //   var that = this;
              //   this.showModal = true;
              //   setTimeout(()=>{
              //     that.showModal = false;
              //   },2000)
              // }
            });
        })
      }else if(v=='1'){
        this.visible3 = false;
      }
    },
    getBookQuery(){
      if(this.batchNo==''){
        this.title = '预约失败，请重新预约！'
      }
      return new Promise ((resolve,reject)=>{
        this.$httpWX.post({
          url:this.$api.reducible.bookQuery,
          data:{
            params:{
              studentId:this.studentId,
              courseId:this.id,
              batchNo:this.batchNo||''
            }
          }
        }).then(res=>{
          console.log('结果',res);
          this.visible2 = true;
          if(res.code==-112){
              setTimeout(()=>{
                var that = this;
                this.getBookQuery();
              },3000)
          }else {
            this.title = '恭喜您，预约成功！';
            this.visible2 = false;
            this.visible3 = true;
            this.getQuery(this.date);
          }
        })
      })
    },
    // 位置
    goMap() {
      var that = this;
      // wx.getLocation({
      //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      //   success: function (res) {
      //     var latitude = res.latitude
      //     var longitude = res.longitude
      //     console.log(that.latitude,that.longitude);
          wx.openLocation({
            latitude: Number(that.latitude),
            longitude: Number(that.longitude),
            scale: 28,
            name: that.name,
            address:that.address
          })
      //   }
      // })
    },
    getVisible(){
      this.isShows = false;
    }
  },
       /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      console.log(this.date);
      this.getQuery(this.date);
      wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    
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

.icon-qiehuanxitong:before {
  content: "\e61f";
}

.icon-dui:before {
  content: "\e645";
}

.icon-cuo:before {
  content: "\e646";
}

.wrap {
  width: 100%;
  height: 100%;
}
.wrap .headerBox {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  /* background: -webkit-gradient(linear, 0 0, 100% 100%, from(#1e222b), to(#575c62)); */
  /* background: #1e222b; */
}
.wrap .headerBox .box {
  width: 100%;
  height: auto;
  margin: 0 auto;
  /* background: #fff; */
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  /* box-shadow:0 -6px 6px 0 #f2f2f2 inset; */
}
.wrap .headerBox .box .message {
  /* width: 80%;
  margin: 0 auto; */
  padding-top: 30rpx;
}
.wrap .headerBox .box .message .rowNav{
  width: 90%;
  font-size: 28rpx;
  margin: 0 auto;
  padding: 20rpx 0;
}
.wrap .headerBox .box .message .rowNav p{
  text-align: center;
  color: #a4a4a4;
}
.wrap .headerBox .box .message .rowNav p .more{
  border: 1rpx solid #ff3f00;
  border-radius:50%;
  margin:0 10rpx 6rpx 0;
}
.wrap .headerBox .box .message .row {
  width: 100%;
  font-size: 28rpx;
  color: #8f8f8f;
  display: flex;
  padding: 0 30rpx;
}
.wrap .headerBox .box .message .row:last-child {
  margin-top: 20rpx;
}
.wrap .headerBox .box .message .row .left {
  // flex: 1;
  padding: 0 30rpx;
}
.wrap .headerBox .box .message .row .left span {
  color: #1e222b;
  font-weight: bold;
}
.wrap .headerBox .box .message .row .left .su {
  font-size: 30rpx;
  font-weight: 200;
  color: #555555;
  margin-left: 5rpx;
}
.wrap .headerBox .box .message .row .center .su {
  font-size: 30rpx;
  font-weight: 200;
  color: #555555;
  margin-left: 5rpx;
}
.wrap .headerBox .box .message .row .right {
  flex: 1;
}
.wrap .headerBox .box .message .row .right .kmSelect{
  margin-left: 10rpx!important;
}
.wrap .headerBox .box .message .row .right span {
  color: #1e222b;
  font-weight: bold;
}
.wrap .headerBox .box .message .row span {
  color: #1e222b;
  font-weight: bold;
}
.wrap .headerBox .box .message .row:nth-child(2) {
  padding-top: 10rpx;
}
.wrap .headerBox .box .message .row .center {
  flex: 1;
}
.wrap .headerBox .box .message .row:nth-child(3) {
  padding: 30rpx 0;
  color: #555555;
}
.wrap .center {
  width: 100%;
  overflow: hidden;
}
.wrap .center .navTab {
  width: 100%;
  height: auto;
  background: #fff;
  // box-shadow: 0 6px 6px 0 #f2f2f2 inset;
}
.wrap .center .navTab .navBarWrap {
  width: 100%;
  overflow: hidden;
  display: flex;
  white-space: nowrap;
}
.wrap .center .navTab .navBarWrap .navbar-item {
  flex: 1;
  text-align: center;
  font-size: 26rpx;
  color: #333333;
  white-space: nowrap;
  display: inline-block;
  padding: 20rpx 20rpx;
}
.wrap .center .navTab .navBarWrap .navbar-item.active{
  color: #bfbfbf;
}
.wrap .center .navTab .navBarWrap .navbar-item p {
  padding-top: 10rpx;
}
.wrap .center .navTab .navBarWrap .navbar-item p.active {
  color: #fb4103;
}
.wrap .center .navTab .navBarWrap .navbar-item .navbar-text {
  display: inline-block;
  white-space: nowrap;
  padding: 5rpx 0;
  margin: auto;
}
.wrap .center .navTab .navBarWrap .navbar-item .navbar-text.active {
  display: inline-block;
  white-space: nowrap;
  padding: 5rpx 0;
  margin: auto;
  color: #fb4103;
  border-bottom: 5rpx solid #fb4103;
}
.wrap .center .content {
  width: 100%;
  height: 100%;
  // margin: 0 auto;
  .txt{
    margin-top:100px;
    .img-wrap{
      text-align: center;
      img{
        width:65px;
        height:56px;
        vertical-align: middle;
      }
    }
    p{
      color: #a5a5a5;
      font-size: 28rpx;
      text-align: center;
    }
}
  .ulsWrap{
    width: 95%;
    height:auto;
    overflow: hidden;
    padding: 20rpx 0;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    .boxCont{
      width: 337rpx;
      height: 102px;
      background-color: #ffffff;
      border-radius: 6px;
      justify-content: space-between;
      margin: 10rpx;
      box-sizing: border-box;
      border: solid 1rpx #eaeaea;
      // float: left;
      // margin:12rpx;
      .padBox{
        width: 80%;
        margin: 0 auto;
        .pTil{
          border-bottom: 1rpx solid #eaeaea;;
          padding:10rpx 0;
          .l{
            font-size:20rpx;
            color: #999999;
            margin-left: 20rpx;
          }
          .r{
            font-size: 28rpx;
            color: #fb6402;
            margin-left: 20rpx;
            font-weight: bold;
          }
        }
        .rows{
          font-size: 24rpx;
          padding: 20rpx 0;
          .colLeft{
            font-size: 24rpx;
            width: 34px;
            height: 34px;
            line-height: 34px;
            background-color: #6bb857;
            text-align: center;
            border-radius: 50%;
            color: #fff;
          }
          .colLeft.active{
            background-color: #b6ddac;
          }
          .colLeft.activeS{
            background-color: #d1d1d1;
          }
          .colRight{
            font-size: 24rpx;
            color: #a4a4a4;
          }
        }
      }
    }
    .boxCont.active{
          box-shadow: 0px 4px 10px 0px 
      rgba(252, 132, 2, 0.5);
      box-sizing:border-box;
      border: solid 1rpx #fc8802!important;
    }
    .boxCont.activeT{
      background-color: #f6f6f6;
    }
  }
  .btn-wrap{
    width: 100%;
    position: fixed;
    bottom: 10px;
    z-index: 999;
    display: flex;
  }
  .fBtn_more{
    background: #fff;
    background-image: none!important;
    border: 1rpx solid #fc8802;
    color: #fc8802!important;
    box-shadow: none!important;
  }
  .fBtn{
    width:160px;
    height:40px;
    // box-shadow: 0px 2px 10px 0px 
		// rgba(253, 135, 2, 0.6);
    background-image: linear-gradient(90deg, #fc8902 0%, #fb4003 100%);
    line-height:40px;
    font-size:28rpx;
    color:#fff;
    border-radius:21px;
  }
  .fBtn.fBtn-active{
    box-shadow: none;
    background: #ccc!important;
  }
}
.wrap .center .content .uls {
  /* overflow: hidden; */
  /* margin: 30rpx 0; */

  overflow: scroll;
  height: 322px;
}
.wrap .center .content .uls .rows {
  border-radius: 20rpx;
  background: #fff;
  padding:0 0 0 30rpx;
  margin: 25rpx 0;
}
.wrap .center .content .uls .rows.active {
  background: #dedcdd !important;
}
.wrap .center .content .uls .rows.actives{
  background:#ccc !important;
}
.wrap .center .content .uls .rows.rowActive {
  box-sizing: border-box;
  border: 3rpx solid #ff3f00;
}
.wrap .center .content .uls .rows .yuan {
  padding: 25rpx 0;
}
.wrap .center .content .uls .rows .yuan p {
  width: 50rpx;
  height: 50rpx;
  /* margin: 0 auto; */
  border-radius: 50%;
  background: #afadae;
  color: #fff;
  text-align: center;
  line-height: 50rpx;
  font-size: 24rpx;
}
.wrap .center .content .uls .rows .yuan p.active {
  background: #666666;
}
.wrap .center .content .uls .rows .sizes {
  padding: 30rpx 0;
}

.wrap .center .content .uls .rows .sizes p {
  font-size: 24rpx;
  color: #5e5e5e;
}
.wrap .center .content .uls .rows .sizes p.pink {
  color: #45db94;
}
.wrap .center .content .uls .rows .sizes p.active {
  color: #a4a4a4;
}
.wrap .center .content .uls .rows .mac {
  /* padding: 30rpx 0; */
}
.wrap .center .content .uls .rows .mac p {
  width: 90rpx;
  height: 40rpx;
  color: #fff;
  font-size: 24rpx;
  text-align: center;
  line-height: 40rpx;
  background: -webkit-linear-gradient(left, #f41856, #e65179);
  border-radius: 10rpx;
}
.wrap .center .content .uls .rows .mac p.yiman {
  background: #afadae;
}
.wrap .center .content .uls .rows .mac p.yiyue {
  background: #feacc3;
}
.wrap .center .content .uls li {
  width: 47%;
  height: 200rpx;
  float: left;
  margin: 0 auto;
  background: #fff;
  border-radius: 15rpx;
  text-align: center;
  font-size: 24rpx;
  padding: 10rpx 0;
  box-sizing: border-box;
  margin: 10rpx 10rpx 10rpx 10rpx;
}
.wrap .center .content .uls li.actives {
  background: #dedcdd;
}
.wrap .center .content .uls li.active {
  border: 1rpx solid #eb3d6e;
  box-sizing: border-box;
}
.wrap .center .content .uls li p {
  padding: 5rpx 0;
}
.wrap .center .content .uls li p.pactive {
  color: #eb3d6e;
}
.wrap .center .content .uls li .yiman {
  width: 75rpx;
  height: 26rpx;
  line-height: 26rpx;
  font-size: 20rpx;
  background: #7c7c7c;
  margin: 0 auto;
  border-radius: 10rpx;
  color: #fff;
}
.wrap .center .content .uls li .keyue {
  width: 75rpx;
  height: 26rpx;
  line-height: 26rpx;
  font-size: 20rpx;
  background: -webkit-linear-gradient(left, #f41856, #e65179) !important;
  margin: 0 auto;
  border-radius: 10rpx;
  color: #fff;
}
.wrap .center .content .subtn {
  border-radius: 50rpx;
  /* background: -webkit-linear-gradient(left, #f41856, #e65179) !important; */
  background: #ff3f00!important;
  color: #fff !important;
  width:66%;
  margin-top:10px;
  margin-bottom:10px;
  font-size:35rpx;
}
.wrap .center .content .title {
  text-align: center;
  font-size: 24rpx;
}
.wrap .center .content .title .sigma::before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #999;
  position: relative;
  top: 10px;
  left: 0;
}
.wrap .center .content .title .sigma .text {
  display: inline-block;
  background: #f2f2f2;
  padding: 0 18rpx 0 18rpx;
  position: relative;
  font-size: 24rpx;
}
.wrap .center .content .list {
  padding: 30rpx 0;
  font-size: 24rpx;
  color: #7c7c7c;
  margin-left: 50rpx;
  margin-bottom:50px;
}
.wrap .center .content .list li {
  padding: 10rpx 0;
}
/* .wrap .center .content .list li:last-child {
  color: #3b3b3b;
} */
.wrap .center .content .list li span {
  color: #3b3b3b;
}
.wrap .center .content .list li .yuandian {
  width: 20rpx;
  height: 20rpx;
  background: #5e5e5e;
  border-radius: 50%;
}
.wrap .bottom {
  width: 100%;
  height: 500rpx;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  padding-top: 100rpx;
}
.wrap .bottom p {
  font-size: 28rpx;
  color: #202020;
  padding: 5rpx 0;
}
.wrap .bottom p span {
  color: #5e5e5e;
}
.wrap .bottom .towBtn {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
}
.wrap .bottom .towBtn .one {
  border-radius: 50rpx;
  flex: 1 !important;
  background: -webkit-linear-gradient(left, #f41856, #e65179) !important;
}
.wrap .bottom .towBtn .tow {
  border-radius: 50rpx;
  flex: 1 !important;
  background: -webkit-linear-gradient(left, #f41856, #e65179) !important;
}

.modal {
  .title{
    span{
      font-size: 28rpx;
      color: #4f4f4f;
      font-weight: bold;
      margin-left: 10rpx;
    }
  }
  .center{
    width: 254px;
    // height: 89px;
    // background: #fcece4;
    border-radius: 10rpx;
    margin: 20rpx auto;
    font-size: 28rpx;
    text-align:left;
    padding:20rpx 30rpx;
    p{
      color: #a4a4a4;
      span{
        color: #fb6809;
      }
    }
  }
  h3{
    font-size: 28rpx;
    color: #888888;
    padding-top: 20rpx;
  }
}
.modal .slot {
  text-align: center;
  display: flex;
}
.modal .slot .leftBtn {
  width: 200rpx;
  height: 30px;
  line-height: 30px;
  text-align: center;
  flex: 1 !important;
  border-radius: 40rpx;
  /* background: -webkit-linear-gradient(left, #878787, #b1b1b1) !important; */
  background: #414141!important;
  color: #fff !important;
  margin-left: 50rpx;
}
.modal .slot .rightBtn {
  width: 200rpx;
  height: 30px;
  line-height: 30px;
  flex: 1 !important;
  border-radius: 40rpx;
  /* background: -webkit-linear-gradient(left, #f41856, #e65179) !important; */
  background: #ff3f00!important;
  color: #fff !important;
}
.modal .slot .centerBtn{
  width: 200rpx;
  height: 30px;
  line-height: 30px;
  border-radius: 40rpx;
  background: #ff3f00;
  color: #fff!important;
  margin:10rpx auto;
}
.modal .slot .rightBtn {
  flex: 1 !important;
}
.imodal .modalSize{
  font-size:30rpx;
  color:black;
  font-weoght:bold;
}
.msize{
  padding:16rpx 0;
}
.imodal .modalBtn{
  width: 200rpx;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  border-radius: 40rpx;
  background: #ff3f00!important;
}
</style>

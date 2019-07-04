<template>
  <div class="wrap">
    <div class="headerBox">
      <div class="box">
        <div class="message">
          <div class="row">
            <div class="left">
              科目：<span>{{twoSubjectCode=='KM002'?'二':twoSubjectCode=='KM003'?'三':''}}</span>
              <!-- <span>{{twoSubjectCode=='KM002'?'科目二':twoSubjectCode=='KM003'?'科目三':''}}</span> -->
            </div>
            <div class="left" style="">
              教练：
              <span>{{coachName}}</span>
            </div>
            <div class="right">
              车辆：
              <span>{{car}}</span>
            </div>
          </div>
          <!-- <div class="row">场地：<span>XXXXXXXXXXXXXXXXXX</span></div> -->

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
            <i-col span="8" @click="goReplace">
              <p>
                <i-con v-if="show2" i-class="Types" type="refresh" size="22" color="#ccc"></i-con>
                <i-con v-if="show1" i-class="Types" type="refresh" size="22" color="#ff3f00"></i-con>切换科目
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
            v-for="(item,index) in navbar"
            :key="index"
            @click="submit(item,index)"
          >
            <p :class="{active:num==index}">{{item.time}}</p>
            <text class="navbar-text"  :class="{active:num==index}">{{item.time==date?"今日":item.day}}</text>
          </view>
        </scroll-view>
      </div>
      <div class="content">
        <div class="txt" v-if="!flag">
          <div class="img-wrap">
            <img src="/static/images/no-content.png" alt="">
          </div>
          <p>今日已无可约课程!</p>
        </div>
        <div class="ulsWrap">
          <div class="boxCont" :class="item.booked=='2'?'activeT':item.booked=='3'?'activeT':number==index?'active':'boxCont'" v-for="(item,index) in list" :key="index" @click="tabClick(item,item.id,item.trainingDate,index)">
            <div class="padBox">
              <p class="pTil">
                <span class="l">{{item.startTimes}}</span>
                <span class="r">{{item.startTime}}-{{item.endTime}}</span>
              </p>
              <i-row i-class="rows">
                <i-col span="8">
                  <div class="colLeft" :class="item.booked=='2'?'activeS':item.booked=='3'?'active':''">{{item.booked=='1'?'可约':item.booked=='2'?'已满':item.booked=='3'?'已约':''}}</div>
                </i-col>
                <i-col span="16">
                  <div class="colRight">
                    <p>
                      科目：<span style="color: #4f4f4f;font-weight:bold;">{{twoSubjectCode=='KM002'?'二':twoSubjectCode=='KM003'?'三':''}}</span>
                    </p>
                    <p>
                      人数：<span style="color: #4f4f4f;font-weight:bold;">{{item.bookedNum==null?'0':item.bookedNum}}/{{item.bookEnableNum}}</span>
                    </p>
                  </div>
                </i-col>
              </i-row>
            </div>
          </div>
        </div>
        
        <div class="btn-wrap">
          <button class="fBtn" :class="!flag?'fBtn-active':''" v-on:click="subscribe" :disabled="disabled"><i-con type="task_fill" size="20" />预约</button>
        </div>








        <!-- <div class="uls" v-if="flag">
          <div
            :class="item.booked=='2'?'active':item.booked=='3'?'active':item.booked=='4'?'actives':number==idx?'rowActive':'rows'"
            class="rows"
            v-for="(item,idx) in list"
            :key="idx"
            @click="tabClick(item,item.id,item.trainingDate,idx)"
          >
            <i-row>
              <i-col i-class="yuan" span="4">
                <p :class="item.booked=='1'?'active':''">{{item.bookedNum==null?'0':item.bookedNum}}/{{item.bookEnableNum}}</p>
              </i-col>
              <i-col i-class="sizes" span="8">
                <p
                  :class="item.booked=='3'?'pink':item.booked=='2'?'active':''"
                >{{item.startTime}}-{{item.endTime}}</p>
              </i-col>
              <i-col i-class="sizes" span="8">
                <p
                  :class="item.booked=='3'?'pink':item.booked=='2'?'active':''"
                >{{item.subjectCode=='KM002'?'科目二':item.subjectCode=='KM003'?'科目三':''}}</p>
              </i-col>
              <i-col i-class="mac" span="4" style="position: relative;">
                <image v-if="item.booked=='1'" src="/static/images/act1.png" style="width:50px;height:50px;vertical-align:middle;margin-left:5rpx;"></image>
                <image v-if="item.booked=='2'" src="/static/images/act2.png" style="width:50px;height:50px;vertical-align:middle;margin-left:5rpx;"></image>
                <image v-if="item.booked=='3'" src="/static/images/act3.png" style="width:50px;height:50px;vertical-align:middle;margin-left:5rpx;"></image>
              </i-col>
            </i-row>
          </div>
        </div> -->
        
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
            <span>{{classType.allow_days=='1'?'周一至周日':classType.allow_days=='0'?'周末':classType.allow_days=='2'?'周一至周五':''}}</span>
          </li>
          <li>
            <icon class="yuandian"></icon>
            &nbsp&nbsp学员上限/车：
            <span>{{classType.userCount}}</span>
          </li>
          <li>
            <icon class="yuandian"></icon>
            &nbsp&nbsp提前预约天数：
            <span>{{classType.pre_days}}</span>
          </li>
          <li>
            <icon class="yuandian"></icon>
            &nbsp&nbsp单日最长学时课时：
            <span>{{classType.hours}}</span>
          </li>
          <!-- <li>
            <icon class="yuandian"></icon>&nbsp&nbsp禁止取消范围（小时）：
            <span>{{classType.dis_hours}}</span>
          </li> -->
          <li style="display:flex;flex: 1">
            <icon class="yuandian"></icon>
            &nbsp;&nbsp;&nbsp;取消规则：
            <div>
              <p>课程开始前{{classType.dis_hours==null?0:classType.dis_hours}}小时内禁止取消</p>
              <p>预约成功后{{classType.dis_pre==null?0:classType.dis_pre}}小时内禁止取消</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <i-modal i-class="modal" :visible="visible1" @ok="goConfirm" @cancel="goCancel">
      <div class="title">
        <i-con type="remind_fill" size="28" color="#fb6809" />
        <span>提示</span>
      </div>
      <div class="center">
        <p>科目：
          <span>{{twoSubjectCode=='KM002'?'二':twoSubjectCode=='KM003'?'三':''}}</span>
        </p>
        <p>
          日期：
          <span>{{time}}</span>
        </p>
        <p>
          时间：
          <span>{{starTimes}} {{startTime}}&nbsp;-&nbsp;{{endTime}}</span>
        </p>
      </div>
      <h3>确认要预约以上课程吗?</h3>
      <!-- <view style="color:#5e5e5e;padding-bottom:20rpx;">{{trainingDate}}&nbsp;&nbsp;{{startTime}}-{{endTime}}
        07/12 今日&nbsp;&nbsp;2节共4课时
        <span>的课程</span>
      </view> -->

      <!--去掉的内容-->
      <!--<v-if class="viewrap" v-if="subjectCode==null">
        <view style="color:black;">本次预约科目</view>
        <radio-group class="raido-group" @change="handleFruitChange">
          <label class="radio">
            <radio value="KM002" label="科目二" />科目二
            <radio value="KM003" label="科目三" />科目三
          </label>
        </radio-group>
      </v-if>
      -->
      <!-- <view class="viewrap" v-if="subject=='KM002'||subject=='KM003'"> -->
            <!-- <view style="color:black;">本次预约科目</view> -->
            <!-- <i-radio-group :current='current' @change="handleFruitChange">
              <i-radio v-for="(item,idx) in fruit" :key="idx" :value="item.name" style="font-size:24rpx;float:left;"></i-radio>
            </i-radio-group> -->
            <!-- <radio-group class="radio-group" @change="handleFruitChange">
              <label class="radio">
                <radio :value="subject" :label="subject" />{{subject=='KM002'?'科目二':subject=='KM003'?'科目三':''}}
              </label>
            </radio-group> -->
      <!-- </view> -->
      <!-- <view class="slot">
        <i-button i-class="leftBtn" v-on:click="goCancel">取消</i-button>
        <i-button i-class="rightBtn" type="primary" size="large" v-on:click="goConfirm">确认</i-button>
      </view> -->
    </i-modal>


    <i-modal i-class="modal" :visible="isVisible" :show-ok="false" :show-cancel="false">
      <view>
        <p>您的学习科目进度不符，无可预约</p>
        <p>课程，如有疑问，请联系客服！</p>
      </view>
      <!-- <view class="slot">
        <p class="centerBtn" v-on:click="getVisible">确认</p>
      </view> -->
    </i-modal>


    <i-modal i-class="modal" :visible="isShows" @ok="getVisible" :show-cancel="false">
      <div class="title">
        <i-con type="remind_fill" size="28" color="#fb6809" />
        <span>提示</span>
      </div>
      <view style="font-size: 14px;color: #888888;padding:20rpx 0;">
        <p>您的学习科目进度不符，无可预约课程，</p>
        <p>如有疑问，请联系客服！</p>
      </view>
      <!-- <view class="slot">
        <p class="centerBtn" v-on:click="getVisible">确认</p>
      </view> -->
    </i-modal>

    
    <i-modal i-class="modal" :visible="showModal" :show-ok="false" :show-cancel="fasle">
      <i class="iconfont icon-cuo" style="color:#fb6809;font-size:60px;"></i>
      <p style="font-size: 18px;color: #4f4f4f;">预约失败</p>
      <p style="font-size: 14px;color: #888888;padding:20rpx 0;">{{message}}</p>
    </i-modal>

    <!-- 更换教练弹框 -->
    <!--<i-modal i-class="imodal" :visible="isModal" :show-ok="false" :show-cancel="false">
      <view class="modalSize">更换教练,</view>
      <view class="modalSize msize">请联系驾校客服人员!</view>
      <view class="slot" style="text-align:center;">
        <i-button i-class="modalBtn" type="primary" size="large" @click="modalSubmit">确认</i-button>
      </view>
    </i-modal>-->
    <!-- <div class="bottom" v-if="show">
          <p>
            <span>确认是否预约</span>
            07/12 今日
          </p>
          <p>（10:00-12:00、14:00-16:00）</p>
          <p>
            2节共4课时
            <span>的课程</span>
          </p>
          <div class="towBtn">
            <i-button i-class="one">取消</i-button>
            <i-button i-class="tow">确认</i-button>
          </div>
    </div>-->
  </div>
</template>
<script>
var util = require("../../utils/utils.js");
export default {
  data() {
    return {
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
        // userCount: "",
        // pre_days: "",
        // hours: "",
        // dis_hours: "",
        // allow_days: "",
        // dis_forbid: ""
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
      booked:"" //课程的状态
    };
  },
  onShow(){
    this.getToken();
    // this.getMyDetail();
    
    // this.getContractRules();
    // this.num=1,
    // this.getContractRules();
  },
  onLoad() {
    this.getMyDetail().then(res=>{
      this.getContractRules();
    });
    if(this.regularizationFlag == '3'){
      this.disabled = true;
    }
    // this.coachName = wx.getStorageSync('schoolCoachName');
    // this.coachId = wx.getStorageSync('schoolCoach');
    this.car = wx.getStorageSync('car');
    // this.time = util.formatTime(new Date());
    var myDate = new Date();//获取系统当前时间
    this.year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1;
    var strDate = myDate.getDate();
    this.Hours = myDate.getHours();
    this.htime = myDate.getTime();
    console.log(this.htime);
    console.log(this.Hours);
    this.date = month+'-'+strDate;
    console.log(this.date);
    // this.getTime();
    // this.getContractRules();
    this.getCar();
    // this.getQuery();
  },
  methods: {
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
      return new Promise((resolve,reject)=>{
        this.$httpWX
          .post({
            url: this.$api.reducible.getStudentByCondition,
            data: {
              majorCardCode: wx.getStorageSync("majorCardCode"),
              telphone: wx.getStorageSync("telphone")
            }
          })
          .then(res => {
            console.log("约车规则", res);
            if(res.status.code == '10'){
              this.classType = res.content.report.classType;
              console.log(123,this.navbar);
              console.log(this.classType.pre_days);
              // if(this.Hours < 12){
              //   this.navbar.splice(this.classType.pre_days,15-this.classType.pre_days)
              // }else {
              //   this.navbar.splice(this.classType.pre_days+1,15-this.classType.pre_days)
              // }
              this.getTime();
              wx.setStorageSync('maxBookNum',res.content.report.classType.userCount)
              // this.weekRestrict = this.classType.allow_days=='周一至周五'?'1':this.classType.allow_days=='周末'?'2':this.classType.allow_days=='周一至周日'?'':'';
              this.weekRestrict = this.classType.allow_days;
              setTimeout(()=>{
                this.getQuery();
              },500)
              resolve();
            }
          }).catch(err=>{
            console.log(err);
          });
      })
    },
    // 课程查询
    getQuery() {
      if(this.weekRestrict=='1'){
        this.weekRestrict = null;
      }
      this.$httpWX
        .post({
          url: this.$api.reducible.queryAll,
          data: {
            enableFlag: 1,
            trainingDate: this.time,
            webQuery: 0,
            maxBookNum: this.classType.userCount=='1'?null:this.classType.userCount,
            weekRestrict: this.weekRestrict,
            studentId: wx.getStorageSync("studentId"),
            coachId:this.coachId,
            subjectCode:this.twoSubjectCode,
            pageSize:"50",
            timestamp:this.htime
          }
        })
        .then(res => {
          console.log("课程", res);
          this.flag = res.content.item.length>0?true:false;
          this.list = res.content.item;
          this.list.forEach(item=>{
            this.$set(item,'startTimes',item.startTime.slice(0,2)<12?'上午':'下午');
          })
          console.log("*******",this.list);
          if(this.list==""){
            this.disabled = true;
          }
          // this.navbar.unshift('今天')
        });
    },
    // tab
    submit(item,index) {
      var mydate = new Date();
      this.htime = mydate.getTime();
      this.number = -1;
      var myDate = new Date();//获取系统当前时间
      var M =  myDate.getMonth() + 1; //月份
      var d =  myDate.getDate(); //日
      var cont = M+'-'+d;
      this.mytime = this.year + '-' + item.time;
      this.time = this.mytime;
      // var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];  
      // var myDatea = new Date(Date.parse(myDate));  
      // console.log(weekDay[myDatea.getDay()]);    
      this.num = index;
      if(index == 0){
        this.$httpWX
        .post({
          url: this.$api.reducible.queryAll,
          data: {
            enableFlag: 1,
            trainingDate: this.mytime,
            webQuery: 0,
            maxBookNum: this.classType.userCount=='1'?null:this.classType.userCount,
            weekRestrict: this.weekRestrict,
            studentId: wx.getStorageSync("studentId"),
            coachId:this.coachId,
            subjectCode:this.twoSubjectCode,
            pageSize:"50",
            timestamp:this.htime
          }
        })
        .then(res => {
          console.log("课程", res);
          this.flag = res.content.item.length>0?true:false;
          this.list = res.content.item;
          this.list.forEach(item=>{
            this.$set(item,'startTimes',item.startTime.slice(0,2)<12?'上午':'下午');
          })
          console.log("*******",this.list);
          if(this.list==""){
            this.disabled = true;
          }else{
            this.disabled = false;
          }
        });
      }else{
        this.$httpWX
          .post({
            url: this.$api.reducible.queryAll,
            data: {
              enableFlag: 1,
              trainingDate:this.mytime,
              webQuery: 0,
              maxBookNum: this.classType.userCount=='1'?null:this.classType.userCount,
              weekRestrict: this.weekRestrict,
              studentId: wx.getStorageSync("studentId"),
              coachId:this.coachId,
              subjectCode:this.twoSubjectCode,
              pageSize:"50",
              timestamp:this.htime
            }
          })
          .then(res => {
            console.log("课程", res);
            this.flag = res.content.item.length>0?true:false;
            this.list = res.content.item;
            this.list.forEach(item=>{
              this.$set(item,'startTimes',item.startTime.slice(0,2)<12?'上午':'下午');
            })
          console.log("*******",this.list);
            if(this.list==""){
            this.disabled = true;
            }else{
              this.disabled = false;
            }
          });
      }
    },
    // 选择科目
    tabClick(item,id, trainingDate, idx) {
      if(this.regularizationFlag == '3'){
        return false;
      }
      this.disabled = false;
      console.log(item);
      this.booked = item.booked; // 已约
      this.trainingDate = item.trainingDate;
      this.startTime = item.startTime;
      this.starTimes = item.startTime.slice(0,2);
      this.starTimes = this.starTimes<12?'上午':'下午';
      this.endTime = item.endTime;
      this.number = idx;
      this.id = id;
      this.subjectCode=item.subjectCode
      this.subject=item.subjectCode
      this.examTime = trainingDate;
      console.log(this.subject);
      console.log(id, trainingDate, idx);
    },
    handleFruitChange(e){
      console.log(e);
      this.subject = e.mp.detail.value;
    },
    // 预约
    subscribe() {
      console.log(this.number);
      if(this.booked == '2' || this.booked == '3'){
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
    // 更换教练
    // goReplace() {
      // this.isModal = true;


      // 这一版暂且不用
      // if(this.regularizationFlag == '3'){
      //   return false;
      // }
      // let pre_days = this.classType.pre_days;
      // wx.navigateTo({
      //   url: "/pages/reservations/main?pre_days="+pre_days+'&weekRestrict='+this.weekRestrict
      // });
    // },

    // 切换科目
    goReplace(){
      if(this.partTwoStatus == 'KM002-XXJD002' && this.partThreeStatus == 'KM003-XXJD002'){
        if(this.twoSubjectCode == 'KM002'){
          this.$httpWX.get({
            url:this.$api.public.me+"/"+ wx.getStorageSync('studentId'),
            data:{

            }
          }).then(res=>{
            this.coachName = res.content.partThreeCoach?res.content.partThreeCoach.name:'';
            this.car = res.content.partThreeCar?res.content.partThreeCar.licenceNum:'无';
            this.phone = res.content.partThreeCoach?res.content.partThreeCoach.phone:'';
            this.twoSubjectCode = 'KM003';
            this.coachId = res.content.partThreeCoach?res.content.partThreeCoach.id:'';
            this.siteId = wx.setStorageSync("siteId",res.content.partThreeCar?res.content.partThreeCar.siteId:'');
            this.getCar();
            this.getContractRules();
          })
        }else if(this.twoSubjectCode == 'KM003'){
            this.$httpWX.get({
              url:this.$api.public.me+"/"+ wx.getStorageSync('studentId'),
              data:{

              }
            }).then(res=>{
            this.coachName = res.content.employee?res.content.employee.name:'';
            this.car = res.content.car?res.content.car.licenceNum : '无';
            this.phone = res.content.employee?res.content.employee.phone:'';
            this.twoSubjectCode = 'KM002';
            this.coachId = res.content.employee?res.content.employee.id:'';
            this.siteId = wx.setStorageSync("siteId",res.content.car?res.content.car.siteId:'');
            this.getCar();
            this.getContractRules();
          })
        }
      }else {
        console.log('不能切换');
        this.isShows = true;
      }
      // if(this.partTwoStatus == 'KM002-XXJD002' && this.partThreeStatus == 'KM003-XXJD002'){
      //   this.$httpWX.get({
      //     url:'/v1/aplus-jx-study/student/api/me/'+ wx.getStorageSync('studentId'),
      //     data:{

      //     }
      //   }).then(res=>{
      //     this.coachName = res.content.partThreeCoach?res.content.partThreeCoach.name:'';
      //     this.car = res.content.partThreeCar?res.content.partThreeCar.licenceNum:'无';
      //     this.phone = res.content.partThreeCoach?res.content.partThreeCoach.phone:'';
      //     this.twoSubjectCode = 'KM003';
      //     this.getContractRules();
      //   })
      // }
    },

    // 更换教练弹框
    modalSubmit(){
      this.isModal = false;
    },
    goConfirm() {
      console.log(this.twoSubjectCode);
      if(this.subject!=''){
        this.subjectCode = this.subject;
      }
      this.$httpWX
        .post({
          url: this.$api.reducible.book,
          data: {
            studentId: wx.getStorageSync("studentId"),
            courseId: this.id,
            subject:this.twoSubjectCode
          }
        })
        .then(res => {
          console.log("预约", res);
          if(res.status.code == '10'){
            // this.time = this.mytime;
            console.log(this.time);

            this.getQuery();
            wx.switchTab({
              url: "/pages/already/main"
            });
            wx.showToast({
              title: res.status.message,
              icon: 'none',
              duration: 2000,
              mask:true
            })
            this.visible1 = false;
          }else{
            // wx.showToast({
            //   title: res.status.message,
            //   icon: 'none',
            //   duration: 2000,
            //   mask:true
            // })
            this.visible1 = false;
             this.message = res.status.message;
            // this.visible1 = false;
            var that = this;
            this.showModal = true;
            setTimeout(()=>{
              that.showModal = false;
            },2000)
          }
        });
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

    // 我的接口
    getMyDetail(){
      return new Promise((resolve,reject)=>{
        this.$httpWX.get({
          url:this.$api.public.me+"/"+ wx.getStorageSync('studentId'),
          data:{
          }
        }).then(res=>{
          this.departmentCode = res.content.student.departmentCode;
          wx.setStorageSync('majorCardCode',res.content.student.baseInfo.majorCardCode)
          wx.setStorageSync('telphone',res.content.student.baseInfo.telphone)
          wx.setStorageSync('classTypeId',res.content.student.classTypeId)
          // this.coachId = res.content.student.report.schoolCoach;
          // this.coachName = res.content.employee.name;
          wx.setStorageSync('schoolCoach',res.content.student.report.schoolCoach);
          wx.setStorageSync('schoolCoachName',res.content.employee?res.content.employee.name:'');
          wx.setStorageSync('phone',res.content.employee?res.content.employee.phone:'');
          // this.phone = res.content.employee.phone;
          wx.setStorageSync('car',res.content.car?res.content.car.licenceNum :'无');
          wx.setStorageSync('siteId',res.content.car?res.content.car.siteId:'');
          wx.setStorageSync('departmentCode',res.content.student.departmentCode)
          wx.setStorageSync('regularizationFlag',res.content.student.regularizationFlag)
          this.reportId = res.content.student.report.id;
          this.partTwoStatus = res.content.student.partTwoStatus; // 科目二状态
          this.partThreeStatus = res.content.student.partThreeStatus;  // 科目三状态
          let employee = res.content.employee; // 科目二教练
          let partThreeCoach = res.content.partThreeCoach;  // 科目三教练
          let userId = wx.getStorageSync("studentId");
          if(this.partTwoStatus != "KM002-XXJD004" && employee == null){
            wx.reLaunch({
              url: "/pages/coach/main?departmentCode="+this.departmentCode + '&reportId='+this.reportId + '&userId='+userId
            });
          }else 
          if(this.partThreeStatus != "KM003-XXJD003" &&partThreeCoach == null){
            wx.reLaunch({
              url: "/pages/coachThree/main?departmentCode="+this.departmentCode + '&reportId='+this.reportId + '&userId='+userId
            });
          }
          if(this.partTwoStatus == 'KM002-XXJD002' && this.partThreeStatus != 'KM003-XXJD002'){
            this.coachName = res.content.employee?res.content.employee.name:'';
            this.car = res.content.car?res.content.car.licenceNum : '无';
            this.phone = res.content.employee?res.content.employee.phone:'';
            this.twoSubjectCode = 'KM002';
              this.coachId = res.content.employee?res.content.employee.id:''
            this.show2 = true;
            this.show1 = false;
            this.isVisible = false;
          }else if(this.partTwoStatus == 'KM002-XXJD002' && this.partThreeStatus == 'KM003-XXJD002'){
            this.coachName = res.content.employee?res.content.employee.name:'';
            this.phone = res.content.employee?res.content.employee.phone:'';
            this.car = res.content.car?res.content.car.licenceNum : '无';
            this.twoSubjectCode = 'KM002';
              this.coachId = res.content.employee?res.content.employee.id:''
            this.show1 = true;
            this.show2 = false;
            this.isVisible = false;
          }else if(this.partTwoStatus != 'KM002-XXJD002' && this.partThreeStatus == 'KM003-XXJD002'){
            this.coachName = res.content.partThreeCoach?res.content.partThreeCoach.name:'';
            this.car = res.content.partThreeCar?res.content.partThreeCar.licenceNum:'无';
            this.phone = res.content.partThreeCoach?res.content.partThreeCoach.phone:'';
            this.twoSubjectCode = 'KM003';
              this.coachId = res.content.partThreeCoach?res.content.partThreeCoach.id:''
            this.show2 = true;
            this.show1 = false;
            this.isVisible = false;
          }else if(this.partTwoStatus != 'KM002-XXJD002' && this.partThreeStatus != 'KM003-XXJD002'){
            this.isVisible = true;
            this.show2 = true;
            this.show1 = false;
          }
          resolve();

        })
      })
    },
    // 刷新使用我的接口
    getRefresh(){
      this.$httpWX.get({
          url:this.$api.public.me+"/"+ wx.getStorageSync('studentId'),
          data:{
          }
        }).then(res=>{
          this.departmentCode = res.content.student.departmentCode;
          wx.setStorageSync('majorCardCode',res.content.student.baseInfo.majorCardCode)
          wx.setStorageSync('telphone',res.content.student.baseInfo.telphone)
          wx.setStorageSync('classTypeId',res.content.student.classTypeId)
          wx.setStorageSync('schoolCoach',res.content.student.report.schoolCoach);
          wx.setStorageSync('schoolCoachName',res.content.employee?res.content.employee.name:'');
          wx.setStorageSync('phone',res.content.employee?res.content.employee.phone:'');
          wx.setStorageSync('car',res.content.car?res.content.car.licenceNum :'无');
          wx.setStorageSync('siteId',res.content.car?res.content.car.siteId:'');
          wx.setStorageSync('departmentCode',res.content.student.departmentCode)
          wx.setStorageSync('regularizationFlag',res.content.student.regularizationFlag)
          this.reportId = res.content.student.report.id;

          this.partTwoStatus = res.content.student.partTwoStatus; // 科目二状态
          this.partThreeStatus = res.content.student.partThreeStatus;  // 科目三状态

          if(this.twoSubjectCode == 'KM002'){
            this.coachName = res.content.employee?res.content.employee.name:'';
            this.phone = res.content.employee?res.content.employee.phone:'';
            this.car = res.content.car?res.content.car.licenceNum : '无';
            this.coachId = res.content.employee?res.content.employee.id:''
            this.twoSubjectCode = 'KM002';
            if(this.partTwoStatus == 'KM002-XXJD002' && this.partThreeStatus != 'KM003-XXJD002'){
              this.show2 = true;
              this.show1 = false;
              this.isVisible = false;
              this.twoSubjectCode = 'KM002';
            }else if(this.partTwoStatus == 'KM002-XXJD002' && this.partThreeStatus == 'KM003-XXJD002'){
              this.show1 = true;
              this.show2 = false;
              this.isVisible = false;
              this.twoSubjectCode = 'KM002';
            }else if(this.partTwoStatus != 'KM002-XXJD002' && this.partThreeStatus == 'KM003-XXJD002'){
              this.show2 = true;
              this.show1 = false;
              this.isVisible = false;
              this.twoSubjectCode = 'KM003';
            }else if(this.partTwoStatus != 'KM002-XXJD002' && this.partThreeStatus != 'KM003-XXJD002'){
              this.isVisible = true;
              this.show2 = true;
              this.show1 = false;
            }
          }else if(this.twoSubjectCode == 'KM003'){
            this.coachName = res.content.partThreeCoach?res.content.partThreeCoach.name:'';
            this.car = res.content.partThreeCar?res.content.partThreeCar.licenceNum:'无';
            this.phone = res.content.partThreeCoach?res.content.partThreeCoach.phone:'';
            this.coachId = res.content.partThreeCoach?res.content.partThreeCoach.id:''
            this.twoSubjectCode = 'KM003';
            if(this.partTwoStatus == 'KM002-XXJD002' && this.partThreeStatus != 'KM003-XXJD002'){
              this.show2 = true;
              this.show1 = false;
              this.isVisible = false;
            }else if(this.partTwoStatus == 'KM002-XXJD002' && this.partThreeStatus == 'KM003-XXJD002'){
              this.show1 = true;
              this.show2 = false;
              this.isVisible = false;
            }else if(this.partTwoStatus != 'KM002-XXJD002' && this.partThreeStatus == 'KM003-XXJD002'){
              this.show2 = true;
              this.show1 = false;
              this.isVisible = false;
            }else if(this.partTwoStatus != 'KM002-XXJD002' && this.partThreeStatus != 'KM003-XXJD002'){
              this.isVisible = true;
              this.show2 = true;
              this.show1 = false;
            }
          }

      })
    },
    getVisible(){
      // this.isVisible = false;
      this.isShows = false;
    },

    // 获取15天的日期
    getTime(time) {
      //格式化日期
      Date.prototype.Format = function(fmt) {
        var o = {
          "Y+": this.getFullYear(), //月份
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      //使用
      var sdfDate = new Date().Format("YY年MM月dd日");
      //获取两个时间之间的日期 并格式化
      function getBetween(day1, day2) {
        var dateArr = new Array();
        var currentDate;
        var getDate = function(str) {
          var tempDate = new Date();
          var list = str.split("-");
          tempDate.setFullYear(list[0]);
          tempDate.setMonth(list[1] - 1);
          tempDate.setDate(list[2]);
          return tempDate;
        };
        var date1 = getDate(day1);
        var date2 = getDate(day2);
        if (date1 > date2) {
          var tempDate = date1;
          date1 = date2;
          date2 = tempDate;
        }
        date1.setDate(date1.getDate() + 1);
        var dateArr = [];
        var i = 0;
        while (
          !(
            date1.getFullYear() == date2.getFullYear() &&
            date1.getMonth() == date2.getMonth() &&
            date1.getDate() == date2.getDate()
          )
        ) {
          var dayStr = date1.getDate().toString();
          if (dayStr.length == 1) {
            dayStr = "0" + dayStr;
          }
          // dateArr[i] = (date1.getMonth() + 1) + "月"+ dayStr+"日";
          dateArr[i] = date1.getFullYear()+ '-'+parseInt(date1.getMonth() + 1 )+ "-" + dayStr;
          i++;
          date1.setDate(date1.getDate() + 1);
        }
        currentDate = new Date(day1).Format("YY-MM-dd");
        dateArr.push(currentDate);
        return dateArr;
      }
      console.log(getBetween("2017-9-30", "2017-9-10"));
      var that = this;
      //获取今天到前十五天之间的日期
      var starTime;
      var endTime;
      function getDay() {
        //获取当前日期
        let d = new Date();
        d.setDate(d.getDate()-1);
        starTime = d.Format("yyyy-MM-dd"); //Format("输入你想要的时间格式:yyyy-MM-dd,yyyyMMdd")

        //结束时间
        var date = new Date(); //获取当前时间
        if(that.Hours < 12 ){
          date.setDate(date.getDate() + that.classType.pre_days); //设置天数 15 天
        }else {
          date.setDate(date.getDate() + that.classType.pre_days+1); //设置天数 15 天
        }
        endTime = date.Format("yyyy-MM-dd"); //加完15天以后的时间
      }
      getDay();
      // console.log(getBetween(endTime, starTime));
      // this.navbar = getBetween(endTime, starTime);
      this.navbar = [];
      getBetween(endTime, starTime).forEach(item=>{
        item = item.replace(/-/g, '/');
        console.log(item);
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];  
        var myDate = new Date(Date.parse(item));
        // this.name.push(weekDay[myDate.getDay()]);
        this.navbar.push({time:item.slice(5).replace("/","-"),day:weekDay[myDate.getDay()]})
       
      })
      this.navbar.pop();
      if(time){
        console.log(time);
        this.time = time;
      }else {
        this.time =this.year+'-'+this.navbar[0].time;
      }
    }
  },
       /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      // this.time = this.mytime;
      // this.getMyDetail();
      var myDate = new Date();
      this.Hours = myDate.getHours();
      this.htime = myDate.getTime();
      console.log(this.time);
      this.getTime(this.time);
      this.getRefresh();
      // setTimeout(()=>{
        // this.getContractRules();
        this.getQuery();
      // },50)
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
  }
  .fBtn{
    width:240px;
    height:40px;
    box-shadow: 0px 2px 10px 0px 
		rgba(253, 135, 2, 0.6);
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
    background: #fcece4;
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

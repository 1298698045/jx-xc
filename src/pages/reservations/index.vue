<template>
    <div class="wrap">
      <div class="boxWrap" v-if="true">
        <div class="navTab">
            <scroll-view class='navBarWrap' scroll-x="true">
                <view class="navbar-item" v-for="(item,index) in navbar" :key="index" @click="submit(item,index)">
                    <p :class="{active:num==index}">{{item.time}}</p>
                    <text class="navbar-text" :class="{active:num==index}">{{item.time==date?"今日":item.day}}</text>
                </view>
            </scroll-view>
            <div class="rightBox" @click="getScreen">
              <p><i class="iconfont icon-shaixuan"></i></p>
            </div>
        </div>
        <div class="centerWrap" v-if="num1==1">
            <div class="leftTab">
                <scroll-view scroll-y="true" :style="style1"  class="left_tabbar_list">
                    <view v-on:click="changeTab(index)" class="left_tabbar_item" :class="activeIndex==index?'active':''" v-for="(item,index) in tabslist" :key="index">
                      <div class="box" :class="activeIndex==index?'active':'box'" v-for="(timer,idx) in item" :key="idx" @click="getClassHour(item,index)">
                          <p>{{timer}}</p>
                          <span v-if="item.time">一</span>
                          <p>{{item.time}}</p>
                      </div>
                    </view>
                </scroll-view>
            </div>
            <div class="rightTab">
                <scroll-view scroll-y="true"  class="tab_panel">
                    <view>
                        <!-- <view v-if="activeIndex==0"> -->
                        <view>
                            <div class="content" v-for="(item,index) in contentList" :key="index">
                              <div class="pTop">
                                <p>
                                  教练：
                                  <span>{{item.coachName}}</span>
                                </p>
                                <p>
                                  科目：
                                  <span>{{item.subjectCode=='KM003'?'科目三':item.subjectCode=='KM002'?'科目二':''}}</span>
                                </p>
                                <!-- <p>
                                  预约人数：
                                  <span>{{item.molecule}}</span>/<span>{{item.Denominator}}</span>
                                </p> -->
                              </div>
                              <div class="pTop">
                                <p>
                                  车辆：
                                  <span>{{item.coach!=null?item.coach.carLicenceNum==null?'未绑定':item.coach.carLicenceNum:''}}</span>
                                </p>
                                <p>
                                  预约人数：
                                  <span>{{item.bookedNum==null?'0':item.bookedNum}}</span>/<span>{{item.bookEnableNum}}</span>
                                </p>
                              </div>
                              <div class="pCenter">
                                <!-- <p v-if="item.coach!=null?item.coach.carSiteName==null:''" style="height:30rpx;"></p> -->
                                <i-con type="coordinates_fill" size="22" color="#ff3f00" v-if="item.coach!=null?item.coach.carSiteName==null:''"></i-con>
                                <i-con type="coordinates_fill" size="22" color="#ff3f00" v-if="item.coach!=null?item.coach.carSiteName!=null:''" @click="goMap(item.coach)"></i-con>
                                <span>{{item.coach!=null?item.coach.carSiteName==null?'暂不明确':item.coach.carSiteName:''}}</span>
                              </div>
                              <div class="boxBtn" @click="appointment(item,index)">
                                预约
                              </div>
                              <!-- <div class="pBtn">
                                <i-button i-class="btnLeft" v-on:click="getLocation()">场地定位</i-button>
                                <i-button i-class="btnRight" v-on:click="appointment()">预约</i-button>
                              </div> -->
                            </div>
                        </view>
                    </view>
                </scroll-view>
            </div>
        </div>
      </div>
      <div class="show" v-if="false">
        <img src="../../../static/images/car01.png" alt="">
        <p>小伙伴们赶快约起来吧~</p>
      </div>
      <i-modal i-class="modal" :visible="visible" :show-ok="false" :show-cancel="false">
          <view class="title">确认是否预约</view>
          <!-- <view class="title">07-12 今日 2节课 共4课时</view> -->
          <view class="title">{{trainingDate}}&nbsp;&nbsp;{{day}}
            &nbsp;&nbsp;{{startTime}}-{{endTime}}</view>
          <!-- <view class="title">2节课 共4课时</view> -->
           <view v-if="subjectCode==null">
              <view style="color:black;">本次预约科目</view>
              <radio-group class="raido-group" @change="handSubject">
                <label class="radio">
                  <radio value="KM002" label="科目二" />科目二
                  <radio value="KM003" label="科目三" />科目三
                </label>
              </radio-group>
            </view>
          <view class="viewrap">
                <view style="color:black;">变更原因</view>
                <radio-group class="radio-group" @change="handleFruitChange">
                  <label class="radio" v-for="(item,index) in fruit" :key ="index" :value="item.id" style="text-align:left">
                    <radio :value="item.id" />
                    {{item.name}}
                  </label>
                </radio-group>
          </view>
          <view class="slot">
            <i-button i-class="leftBtn" v-on:click="goCancel">取消</i-button>
            <i-button i-class="rightBtn" type="primary" size="large" v-on:click="getConfirm">确认</i-button>
          </view>
      </i-modal>
      <i-drawer mode="right" :visible="showLeft1" v-on:close="showLeft1">
        <!-- <div class="boxRigthFlex" v-if="isShow"> -->
        <div class="boxRigthFlex">
          <div class="leftBox">
            <p style="width:100rpx;height:100rpx;line-height: 100rpx;color:#fff;background: #ff3f00;border-top-left-radius: 50%;border-bottom-left-radius: 50%;text-align:center;" @click="getCancel">
              <i class="iconfont icon-shaixuan"></i>
            </p>
          </div>
          <div class="rightBox">
            <div class="subject">
              <h2>科目</h2>
              <ul class="row">
                <li class="col" :class="{active:number==index}" v-for="(item,index) in subject" :key="index" @click="clickTab(index)"><p>{{item}}</p></li>
              </ul>
            </div>
          </div>
        </div>
       </i-drawer>
    </div>
</template>
<script>
var util = require('../../utils/utils.js');
export default {
  data() {
    return {
      pre_days:"",
      date:"",
      showLeft1: false,
      courseId:'',
      time:'',
      year:'',
      myDate:'',
      reason:'',
      isShow: false,
      number: "",
      typeIndex: "",
      visible: false,
      current: "",
      deviceWidth: "",
      deviceHeight: "",
      activeIndex: 0,
      content: "菜單一",
      day:"",
      // fruit: ["不满意教练", "时段不合适", "自主更换教练"],
      fruit:[
        {
          id:'2',
          name:'时段不合适'
        },
        {
          id:'1',
          name:'不满意-更换教练'
        },
        {
          id:'3',
          name:'满意-更换教练'
        }
      ],
      subject: ["科目二", "科目三"],
      classType: [
        // {
        //   type: "VIP班",
        //   car: "1",
        //   people: "1"
        // },
        // {
        //   type: "普通班",
        //   car: "1",
        //   people: "4"
        // },
        // {
        //   type: "普通班",
        //   car: "1",
        //   people: "8"
        // }
      ],
      tabslist: [
        // {
        //   tabName: "全部时段"
        // },
        {
          tabName: "8:00",
          time: "9:00"
        },
        {
          tabName: "10:00",
          time: "12:00"
        },
        {
          tabName: "13:00",
          time: "15:00"
        },
        {
          tabName: "16:00",
          time: "18:00"
        }
      ],
      contentList: [
        // {
        //   coach: "杨修元",
        //   subject: "科目二",
        //   vehicle: "京N12345",
        //   molecule: 1,
        //   Denominator: 4,
        //   address: "北京市西城区月坛南好好学车驾校"
        // }
      ],
      num: 1,
      num1:1,
      navbar: [],
      deviceHeight: "",
      teachSubject:"",
      mydate:"",
      trainingDate:"",
      startTime:
      "",
      endTime:"",
      oneTime:"",
      towTime:"",
      idx:"",
      aStartTime:"",
      aEndTime:"",
      weekRestrict:"",
      coachName:"",
      coachId:"",
      carSiteId:"",
      latitude:"",
      longitude:"",
      name:"",
      address:"",
      subjectCode:""
    };
  },
  onShow(){
      this.num = 1;
      this.num1 = 1;
  },
  onLoad(options){
    console.log(options);
    this.weekRestrict = options.weekRestrict;
    // console.log(options.pre_days);
    this.pre_days = options.pre_days;
    // this.mydate = util.formatTime(new Date());
    var myDate = new Date();//获取系统当前时间
    this.year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1;
    var strDate = myDate.getDate();
    this.date = month+'-'+strDate;
    this.getTime();
    this.mydate = this.year + '-'+ this.navbar[1].time;
    this.navbar.splice(options.pre_days,15-options.pre_days)
    // this.getQuery();
    // this.getClassType();
    this.getTimeInterval(this.mydate); // 课时时段
  },
  computed: {},
  methods: {
    // 筛选
    getScreen() {
        this.showLeft1=!this.showLeft1
    },
    getCancel(){
      this.showLeft1 = false;
    },
    // 课程查询
    getQuery() {
      let maxBookNum = wx.getStorageSync('maxBookNum');
      this.$httpWX
        .post({
          url: "/v1/aplus-jx-study/course/queryAll",
          data: {
            enableFlag: 1,
            trainingDate: this.mydate,
      
            webQuery: 0,
            maxBookNum: maxBookNum=='1'?'':maxBookNum,
            weekRestrict: this.weekRestrict,
            studentId: wx.getStorageSync("studentId"),
            // coachId:wx.getStorageSync('schoolCoach')
            trainingStartTime:this.oneTime,
            trainingEndTime:this.towTime,
            switchCoachFlag:1,
            belongSliceCode :wx.getStorageSync('departmentCode')
          }
        })
        .then(res => {
          console.log("课程", res);
          this.contentList = res.content.item;
          // this.navbar.unshift('今天')
        });
    },
    // 获取所有班型
    // getClassType(){
    //   this.$httpWX.post({
    //     url:'/v1/aplus-class/classtype/getList',
    //     data:{
    //       schoolId:wx.getStorageSync('studentId')
    //     }
    //   }).then(res=>{
    //     console.log(res);
    //     this.classType = res.content;
    //   })
    // },
    // 课时时段
    getTimeInterval(myDate){
      this.myDate = myDate;
      this.$httpWX.get({
        url:'/v1/aplus-jx-study/time/interval/getInterval/' + myDate,
        data:{

        }
      }).then(res=>{
        console.log('课时时段',res);
        this.oneTime = res.content[0][0];
        this.towTime = res.content[0][1];
        this.tabslist = res.content;
        console.log(this.tabslist);
        this.getQuery();
      })
    },
    // 下拉刷新使用
    getInterval(myDate){
      this.myDate = myDate;
      this.$httpWX.get({
        url:'/v1/aplus-jx-study/time/interval/getInterval/' + myDate,
        data:{

        }
      }).then(res=>{
        console.log('课时时段',res);
        this.oneTime = res.content[0][0];
        this.towTime = res.content[0][1];
        this.tabslist = res.content;
        console.log(this.tabslist);
      })
    },
    // 根据时段查询 
    getClassHour(item,index){
      this.idx = index;
      // console.log(item);
      this.aStartTime = item[0];
      this.aEndTime = item[1];
      let trainingStartTime = item[0];
      let trainingEndTime = item[1];
      let maxBookNum = wx.getStorageSync('maxBookNum');
      this.$httpWX
        .post({
          url: "/v1/aplus-jx-study/course/queryAll",
          data: {
            enableFlag: 1,
            trainingDate: this.myDate,
      
            webQuery: 0,
            maxBookNum: maxBookNum=='1'?'':maxBookNum,
            weekRestrict: this.weekRestrict,
            studentId: wx.getStorageSync("studentId"),
            // coachId:wx.getStorageSync('schoolCoach'),
            trainingStartTime:trainingStartTime,
            trainingEndTime:trainingEndTime,
            switchCoachFlag:1,
            belongSliceCode :wx.getStorageSync('departmentCode')
          }
        })
        .then(res => {
          console.log("课程", res);
          this.contentList = res.content.item;
        });
    },
    // 更换教练
    getConfirm(){
      this.$httpWX.post({
        url:'/v1/aplus-jx-study/course/booked/record/bookAndSwitch',
        data:{
          studentId:wx.getStorageSync('studentId'),
          courseId:this.courseId,
          reason:this.reason,
          subject:this.teachSubject
        }
      }).then(res=>{
        console.log(res);
        wx.showToast({
          title: res.status.message,
          icon: 'none',
          duration: 2000
        })
        this.visible = false;
        // if(res.status.code == 10){
        //   wx.setStorageSync('schoolCoachName',this.coachName);
        //   wx.setStorageSync('schoolCoach',this.coachId);
        // }
      }).catch(err=>{
        console.log(err);
      })
    },
    submit(item,index) {
      console.log(this.date);
      this.navbar.splice(this.pre_days,15-this.pre_days)
      this.activeIndex = 0;
      console.log(this.year+'-'+item.time);
      let myDate = this.year+'-'+item.time;
      this.mydate = myDate;
      console.log(myDate);
      this.getInterval(myDate);
      this.num = index;
      let maxBookNum = wx.getStorageSync('maxBookNum');
        this.$httpWX
          .post({
            url: "/v1/aplus-jx-study/course/queryAll",
            data: {
              enableFlag: 1,
              trainingDate: myDate,
              switchCoachFlag:1,

              webQuery: 0,
              maxBookNum: maxBookNum=='1'?'':maxBookNum,
              weekRestrict: this.weekRestrict,
              studentId: wx.getStorageSync("studentId"),
              trainingStartTime:this.oneTime,
              trainingEndTime:this.towTime,
              belongSliceCode :wx.getStorageSync('departmentCode')
              // coachId:wx.getStorageSync('schoolCoach')
            }
          })
          .then(res => {
            console.log("课程", res);
            this.contentList = res.content.item;
            // this.getTimeInterval(myDate);
          });
    },
    changeTab(e) {
      this.activeIndex = e;
    },
    // 获取导航经纬度
    getCar(){
      let siteId = wx.getStorageSync('siteId');
      this.$httpWX.get({
        url:"/v1/aplus-jx-finance/site/queryById/"+this.carSiteId,
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
    // 位置
    goMap(coach) {
      console.log(coach);
      this.carSiteId = coach.carSiteId;
      this.getCar();
      var that = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.openLocation({
            latitude: Number(that.latitude),
            longitude: Number(that.longitude),
            scale: 28,
            name: that.name,
            address:that.address
          })
        }
      })
    },
    // 场地定位
    getLocation() {
      wx.getLocation({
        type: "gcj02", //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          wx.openLocation({
            latitude,
            longitude,
            scale: 28
          });
        }
      });
    },
    // 预约
    appointment(item,index) {
      console.log(item)
      this.coachName = item.coachName;
      this.coachId = item.coachId;
      console.log(this.coachName);
      this.trainingDate = item.trainingDate;
      var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];  
      var myDate = new Date(Date.parse(this.trainingDate));
      console.log(weekDay[myDate.getDay()])
      this.day = weekDay[myDate.getDay()];
      this.startTime = item.startTime;
      this.endTime = item.endTime;
      this.courseId = item.id;
      this.teachSubject = item.subjectCode;
      this.subjectCode = item.subjectCode;
      console.log(this.teachSubject);
      console.log(index);
      this.visible = true;
      // this.contentList.forEach(item => {
      //   console.log(item);
      // })
      // console.log(this.contentList[index]);
    },
    // 选择科目
    handSubject(e){
      console.log(e);
      this.teachSubject = e.mp.detail.value;
      console.log(this.teachSubject);
    },
    handleFruitChange(e) {
      console.log(e);
      this.reason = e.mp.detail.value;
      if(this.reason == 1 || this.reason == 3){
        wx.setStorageSync('schoolCoachName',this.coachName);
        wx.setStorageSync('schoolCoach',this.coachId);
      }
      // this.current = e.mp.detail.value;
    },
    // 筛选
    // getScreen() {
    //   this.isShow = true;
    // },
    // 科目
    clickTab(index) {
      this.number = index;
      if(index==0){
        index = 'KM002';
      }else if(index == 1){
        index = 'KM003';
      }
      this.$httpWX
        .post({
          url: "/v1/aplus-jx-study/course/queryAll",
          data: {
            enableFlag: 1,
            trainingDate: this.mydate,
            webQuery: 0,
            maxBookNum: wx.getStorageSync('maxBookNum'),
            weekRestrict: this.weekRestrict,
            studentId: wx.getStorageSync("studentId"),
            // coachId:wx.getStorageSync('schoolCoach'),
            subjectCode:index,
            switchCoachFlag:1,
            belongSliceCode :wx.getStorageSync('departmentCode')
          }
        })
        .then(res => {
          if(res.status.code == 10){
            this.contentList = res.content.item;
            this.showLeft1 = false;
            this.isShow = false;
          }
        });
    },
    // 班型
    classTab(id,index) {
      this.typeIndex = index;
      this.$httpWX
        .post({
          url: "/v1/aplus-jx-study/course/queryAll",
          data: {
            enableFlag: 1,
            trainingDate: this.mydate,
            webQuery: 0,
            maxBookNum: 4,
            weekRestrict: this.weekRestrict,
            studentId: wx.getStorageSync("studentId"),
            // coachId:wx.getStorageSync('schoolCoach'),
            subjectCode:'JXKM003',
            classTypeId:id,
            belongSliceCode :wx.getStorageSync('departmentCode')
          }
        })
        .then(res => {
          if(res.status.code == 10){
            this.contentList = res.content.item;
            this.showLeft1 = false;
            this.isShow = false;
          }
        });
    },
    // 预约modal-取消
    goCancel() {
      this.visible = false;
    },
    // 获取15天的日期
    // 获取15天的日期
    getTime() {
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
        date.setDate(date.getDate() + 15); //设置天数 15 天
        endTime = date.Format("yyyy-MM-dd"); //加完15天以后的时间
      }
      getDay();
      getBetween(endTime, starTime).forEach(item=>{
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];  
        var myDate = new Date(Date.parse(item));
        this.navbar.push({time:item.slice(5),day:weekDay[myDate.getDay()]})
       
      })
      this.navbar.pop();
      this.navbar.splice(this.pre_days,15-this.pre_days)
    }
  },
  mounted(options) {
    var vm = this;
    wx.getSystemInfo({
      success: res => {
        console.log(res);
        console.log(this);
        vm.deviceWidth = res.windowWidth;
        vm.deviceHeight = res.windowHeight;
      }
    });
  },
      /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh() {
      this.activeIndex = this.idx;
      this.oneTime = this.aStartTime;
      this.towTime = this.aEndTime;
      this.getTime();
      this.navbar.splice(this.pre_days,15-this.pre_days)
      this.getQuery();
      // this.getClassType();
      // this.getTimeInterval(this.mydate); // 课时时段
      this.getInterval(this.mydate);
      wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    
    }
};
</script>
<style>
@font-face {
    font-family: 'iconfont';
    src: url(data:application/font-woff2;charset=utf-8;base64,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) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
    font-weight: normal;
    font-style: normal;
}
.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-keyueyemian-genghuanjiaolian:before { content: "\e61e"; }

.icon-keyueyemian-lianxi:before { content: "\e61f"; }

.icon-keyueyemian-weizhi:before { content: "\e620"; }

.icon-wodeyemian-wancheng:before { content: "\e621"; }

.icon-shaixuan:before { content: "\e622"; }

.icon-wodeyemian-lishi:before { content: "\e623"; }
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.wrap .navTab {
  width: 100%;
  height: auto;
  background: #fff;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 6px 6px 0 #f2f2f2 inset;
  position: fixed;
  top: 0;
  left: 0;
}
.wrap .navTab .navBarWrap {
  width: 85%;
  float: left;
  overflow: hidden;
  display: flex;
  white-space: nowrap;
}
.wrap .navTab .rightBox {
  width: 15%;
  height: auto;
  float: left;
  text-align: center;
  font-size: 28rpx;
  padding:28rpx 0;
}
.wrap .navTab .rightBox p{
  width: 88%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  margin-left: 15rpx;
  color:#fff;
  background: #ff3f00;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}
.wrap .navTab .navBarWrap .navbar-item {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #8e8e8e;
  white-space: nowrap;
  display: inline-block;
  padding: 20rpx 20rpx;
}
.wrap .navTab .navBarWrap .navbar-item p {
  padding-top: 10rpx;
}
.wrap .navTab .navBarWrap .navbar-item p.active {
  color: #ff3f00;
}
.wrap .navTab .navBarWrap .navbar-item .navbar-text {
  display: inline-block;
  white-space: nowrap;
  padding: 5rpx 0;
  margin: auto;
}
.wrap .navTab .navBarWrap .navbar-item .navbar-text.active {
  display: inline-block;
  white-space: nowrap;
  padding: 5rpx 0;
  margin: auto;
  color: #ff3f00;
  border-bottom: 5rpx solid #ff3f00;
}
.wrap .centerWrap {
  width: 100%;
  height: 100%;
  /* margin-top: 85px; */
  margin-top: 130rpx;
  overflow: hidden;
  display: flex;
}
.wrap .centerWrap .leftTab {
  width: 15%;
  height: 1000rpx;
  overflow: scroll;
  position: fixed;
  /* top: 85px; */
  left: 0;
}
.wrap .centerWrap .leftTab .left_tabbar_list {
  color: #7c7c7c;
  font-size: 26rpx;
  width: 100%;
  text-align: center;
  border-bottom: 1rpx solid #fff;
}
.wrap .centerWrap .leftTab .left_tabbar_list .left_tabbar_item {
  font-size: 20rpx;
  background: #f2f2f2;
  border-bottom: 1rpx solid #bfbfbf;
}
.wrap .centerWrap .leftTab .left_tabbar_list .left_tabbar_item .box{
  width: 50%;
  margin: 0 auto;
  padding: 20rpx 0;
  /* border-bottom: 1rpx solid #bfbfbf; */
}
.wrap .centerWrap .leftTab .left_tabbar_list .left_tabbar_item .box.active {
  border-bottom: none;
}
.wrap .centerWrap .leftTab .left_tabbar_list .left_tabbar_item.active {
  background: #fff;
  color: #ff3f00;
  transition: all 0.5s;
  animation: show 0.5s;
}
.wrap .centerWrap .rightTab {
  width: 85%;
  height: 1000rpx;
  overflow: scroll;
  padding-bottom: 100rpx;
  background: #fff;
  margin-left: 56px;
  /* width:85%;
  height:1000rpx;
  overflow:scroll;
  position:fixed;
  top:170rpx;
  left:56px;
  background:#fff; */
}
.wrap .centerWrap .rightTab .tab_panel {
  display: inline-block;
  white-space: nowrap;
}
.wrap .centerWrap .rightTab .tab_panel .content {
  width: 90%;
  height: auto;
  font-size: 22rpx;
  overflow: hidden;
  margin: 0 auto;
  padding: 20rpx 0 10rpx 0;
  border-bottom: 1rpx solid #bfbfbf;
  position: relative;
}
.wrap .centerWrap .rightTab .tab_panel .content .pTop {
  display: flex;
}
.wrap .centerWrap .rightTab .tab_panel .content .pTop p {
  color: #979797;
  flex: 1;
}
.wrap .centerWrap .rightTab .tab_panel .content .pTop p:nth-child(3) {
  text-align: right;
}
.wrap .centerWrap .rightTab .tab_panel .content .pTop p span {
  color: #3c3c3c;
}
.wrap .centerWrap .rightTab .tab_panel .content .pCenter {
  padding: 10rpx 0;
  color: #979797;
}
.wrap .centerWrap .rightTab .tab_panel .content .pCenter span {
  color: #3c3c3c;
}
.wrap .centerWrap .rightTab .tab_panel .content .boxBtn {
  width: 100rpx;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 24rpx;
  color: #fff;
  text-align: center;
  /* background: -webkit-linear-gradient(left, #f21f59, #e54d77); */
  background: #ff3f00;
  border-radius: 20rpx;
  position: absolute;
  right: 0;
  top: 20%;
}
.wrap .centerWrap .rightTab .tab_panel .content .pBtn {
  width: 100%;
  overflow: hidden;
}
.wrap .centerWrap .rightTab .tab_panel .content .pBtn .btnLeft {
  width: 180rpx;
  height: 30px;
  line-height: 30px;
  font-size: 24rpx;
  float: left !important;
  border-radius: 40rpx;
  background: #fff !important;
  color: #ff3f00 !important;
  border: 1rpx solid #ff3f00 !important;
  margin-left: 33%;
}
.wrap .centerWrap .rightTab .tab_panel .content .pBtn .btnRight {
  width: 180rpx;
  height: 30px;
  line-height: 30px;
  font-size: 24rpx;
  border-radius: 40rpx;
  /* background: -webkit-linear-gradient(left, #f21f59, #e54d77) !important; */
  background: #ff3f00!important;
  color: #fff !important;
}
.wrap .show {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
}
.wrap .show img {
  width: 150rpx;
  height: 150rpx;
  vertical-align: middle;
  padding-bottom: 30rpx;
}
.wrap .show p {
  color: #999999;
  font-size: 28rpx;
}
.modal .title {
  font-size: 24rpx;
  color: black;
}
.modal .viewrap {
  margin-top: 15rpx;
  /* border-top: 1rpx solid #ccc; */
}
.modal .viewrap .radio-group .radio{
  display:block;
  margin-left:30%;
  margin-top:5px;

}
.wrap .boxRigthFlex {
  width: 81%;
  height: 1200rpx;
  overflow: scroll;
  /* background: rgba(0,0,0,.1); */
  /* position: absolute; */
  position: relative;
  top: 0;
  /* right: 0; */
  left: 19%;
  z-index: 999;
  /* padding: 0 20rpx; */
  overflow: hidden;
  /* box-shadow:#fff 0px 0px 0px 10rpx; */
}
.wrap .boxRigthFlex .leftBox{
  width:10%;
  height: 100%;
  /* background: rgba(0,0,0,.1); */
  float: left;
}
.wrap .boxRigthFlex .rightBox{
  width:77%;
  height: 100%;
  float: right;
  background: #414141;
  padding: 0 20rpx;
}
.wrap .boxRigthFlex .btn{
  position: relative;
  top:86%;
  left:63%;
}
.wrap .boxRigthFlex .btn .btnsubmit{
  width:150rpx;
}
.wrap .boxRigthFlex .rightBox .subject {
  margin-top: 50rpx;
}
.wrap .boxRigthFlex .rightBox .subject h2 {
  font-size: 26rpx;
  color:#fff;
  font-weight: bold;
}
.wrap .boxRigthFlex .rightBox .subject .row {
  margin: 20rpx 0;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.wrap .boxRigthFlex .rightBox .subject .row .col {
  width:500rpx;
  color: black;
  background: #fff;
  padding: 25rpx 0;
  /* border: 1rpx solid #ccc; */
  margin: 0 10rpx;
  text-align: center;
  font-size: 24rpx;
  border-radius: 20rpx;
  margin-top: 20rpx;
}
.wrap .boxRigthFlex .rightBox .subject .row .col.active {
  /* border: 1rpx solid red; */
  background: #ff3f00;
  color: #fff;
}
.wrap .boxRigthFlex .rightBox .classType {
  margin: 30rpx 0;
}
.wrap .boxRigthFlex .rightBox .classType h2 {
  font-size: 26rpx;
  font-weight: bold;
}
.wrap .boxRigthFlex .rightBox .classType .uls .lis {
  height: auto;
  padding: 20rpx 10rpx;
  font-size: 24rpx;
  border: 1rpx solid #ccc;
  overflow: hidden;
  margin: 20rpx 0;
}
.wrap .boxRigthFlex .rightBox .classType .uls .lis.active {
  border: 1rpx solid red;
  color: red;
}
.wrap .boxRigthFlex .rightBox .classType .uls .lis p {
  float: left;
}
.wrap .boxRigthFlex .rightBox .classType .uls .lis p:nth-child(2) {
  margin-left: 60rpx;
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
.modal .slot .rightBtn {
  flex: 1 !important;
}
</style>

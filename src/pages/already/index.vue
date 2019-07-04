<template>
    <div class="wrap">
      <div class="boxWrap" v-if="true">
        <i-row i-class="topTitle">
          <i-col span="5" >
            <!-- <span class="borderRight">|</span> -->
            <span style="font-weight:bold;">今日课时</span> 
          </i-col>
          <i-col span="10">
            <p class="orderLength" style="font-weight:bold;">{{today_hours}}课时</p>
          </i-col>
          <i-col span="9" i-class="colRight">
            <p>{{date}}{{day}}</p>
          </i-col>
        </i-row>
        
        <div class="boxActive" v-if="todayclass==''" style="padding:50px 0;">
          <div style="text-align:center;">
            <img src="/static/images/no-content.png" style="width:65px;height:56px;" alt="">
          </div>
          <p style="font-size: 11px;color: #a5a5a5;text-align:center;">今日暂无课时</p>
        </div>
        
        <div class="rowWrap"  v-for="(v,i) in todayclass" :key ="i">
          <i-row i-class="rows">
            <i-col span="5" i-class="left">
              <p style="color: #999999;font-size: 10px;">{{v.day}}</p>
              <p style="font-weight:bold;">{{v.trainingStartTime}}</p>
              <!-- <p style="transform: rotate(-90deg);">-</p> -->
              <p style="font-weight:bold;">|</p>
              <p style="font-weight:bold;">{{v.trainingEndTime}}</p>
            </i-col>
            <i-col span="9" i-class="center">
              <p>
                教练：
                <span style="font-weight:bold;">{{v.coachName}}</span>
                <van-icon name="phone-o" size="40rpx" color="#fb6402" @click="getCall(v.coachPhone)" style="margin-left:10rpx;" />
              </p>
              <p>
                车辆：
                <span style="font-weight:bold;">{{v.coach.carLicenceNum==null?'无':v.coach.carLicenceNum}}</span>
              </p>
              <p>
                科目：
                <span style="font-weight:bold;">{{v.course.subjectCode=='KM003'?'科目三':'科目二'}}</span>
              </p>
              <p>
                学员：
                <span style="font-weight:bold;">{{v.course.bookedNum+'/'+ v.course.bookEnableNum}}</span>
              </p>
            </i-col>
            <i-col span="8" i-class="right">
              <div class="boxBtn">
                <button class="topBtn" v-if="v.status=='YKZT001'"  @click="signUp(v)"><i-icon type="task_fill" size="20" />签到</button>
                <button class="btn" v-if="v.status=='YKZT002'"><i-icon type="task_fill" size="20" />待确认</button>
                <button class="btnActive" v-if="v.status=='YKZT004'"><i-icon type="right" size="20" color="#fff" />已完成</button>
              </div>
            </i-col>
          </i-row>
        </div>



        <!-- <i-row>
          <i-card v-for="(v,i) in todayclass" :key ="i" :title="v.trainingStartTime+'-'+ v.trainingEndTime" :extra="v.trainingDate" i-class="">
              <view slot="content">
                <i-col span="16" i-class="textPadding">
                  <i-col span="12">
                    <view>
                      <text class="titleName">教练：</text><text>{{v.coachName}}</text>
                    </view>
                    <view>
                    <text class="titleName">车辆：</text>{{v.coach.carLicenceNum==null?'无':v.coach.carLicenceNum}}<text></text>
                    </view>
                  </i-col>
                  <i-col span="12">
                      <view>
                        <text class="titleName">学员：</text><text>{{v.course.bookedNum+'/'+ v.course.bookEnableNum}}</text>
                      </view>
                      <view>
                      <text class="titleName">科目：</text><text>{{v.course.subjectCode=='KM003'?'科目三':'科目二'}}</text>
                    </view>
                  </i-col>
                </i-col>
                <i-col span="8" i-class="textPadding">
                  <div class="btnDivs" style="margin-top:0rpx;" @click="getCall(v.coachPhone)"><i class="iconfont icon-keyueyemian-lianxi" style="font-size:30px;"></i></div>
                  <button class="btnDiv" style="background:#ff3f00;color:#fff;" v-if="v.status=='YKZT001'" @click="signUp(v.id)">签</button><button class="btnDiv btn_color" disabled v-if="v.status=='YKZT002'">待确认</button><button class="btnDiv btn_border" disabled v-if="v.status=='YKZT004'">完成</button>
                </i-col>
              </view>
            </i-col>
          </i-card>
        </i-row> -->
        <i-row i-class="topTitle titleColor">
          <i-col span="5" i-class>
            <!-- <span class="borderRight">|</span> -->
            <span style="font-weight:bold;">后续课程</span>
            
          </i-col>
          <i-col span="5" i-class="orderLength" style="font-weight:bold;">{{after_hours}}课时</i-col>
        </i-row>

        
        <div class="boxActive" v-if="lastclass==''" style="padding:50px 0;">
          <div style="text-align:center;">
            <img src="/static/images/no-content.png" style="width:65px;height:56px;" alt="">
          </div>
          <p style="font-size: 11px;color: #a5a5a5;text-align:center;">后续暂无课时</p>
        </div>

         <div class="rowWrap"  v-for="(v,i) in lastclass"  :key="i">
           <div style="text-align:center;color:#fb6402;font-size: 12px;margin-bottom:-20px;padding-top:10px;">
             {{v.trainingDate}}{{v.day}}
           </div>
          <i-row i-class="rows">
            <i-col span="5" i-class="left">
              <p style="color: #999999;font-size: 10px;">{{v.dayType}}</p>
              <p style="font-weight:bold;">{{v.trainingStartTime}}</p>
              <!-- <p style="transform: rotate(-90deg);">-</p> -->
              <p style="font-weight:bold;">|</p>
              <p style="font-weight:bold;">{{v.trainingEndTime}}</p>
            </i-col>
            <i-col span="9" i-class="center">
              <p>
                教练：
                <span style="font-weight:bold;">{{v.coachName}}</span>
                <van-icon name="phone-o" size="40rpx" color="#fb6402" @click="getCall(v.coachPhone)" style="margin-left:10rpx;" />
              </p>
              <p>
                车辆：
                <span style="font-weight:bold;">{{v.coach.carLicenceNum==null?'无':v.coach.carLicenceNum}}</span>
              </p>
              <p>
                科目：
                <span  style="font-weight:bold;">{{v.subjectCode=="KM002"?'科目二':'科目三'}}</span>
              </p>
              <p>
                学员：
                <span style="font-weight:bold;">{{v.course.bookedNum+'/'+ v.course.bookEnableNum}}</span>
              </p>
            </i-col>
            <i-col span="8" i-class="right">
              <div class="boxBtn">
                <button class="cancelBtn" @click="quietOrder(v)"><i-icon type="close" size="16" color="#9d9d9d;" i-class="cancel-icon" />取消预约</button>
              </div>
            </i-col>
          </i-row>
        </div>

        <i-modal i-class="modal" :visible="visible1" @ok="goConfirm" @cancel="goCancel(0)">
            <div class="title">
              <i-icon type="remind_fill" size="28" color="#fb6809" />
              <span>提示</span>
            </div>
            <div class="center">
              <p>科目：
                <span>{{subjectCode}}</span>
              </p>
              <p>
                日期：
                <span>{{date}}</span>
              </p>
              <p>
                时间：
                <span>{{days}} {{startTime}}&nbsp;-&nbsp;{{endTime}}</span>
              </p>
            </div>
            <h3>确认要签到以上课程吗？</h3>
        </i-modal>


        <i-modal i-class="modal" :visible="isModal" @ok="getCancelQuite" @cancel="goCancel(1)">
            <div class="title">
              <i-icon type="remind_fill" size="28" color="#fb6809" />
              <span>提示</span>
            </div>
            <div class="center">
              <p>科目：
                <span>{{subjectCode}}</span>
              </p>
              <p>
                日期：
                <span>{{date}}</span>
              </p>
              <p>
                时间：
                <span>{{days}} {{startTime}}&nbsp;-&nbsp;{{endTime}}</span>
              </p>
            </div>
            <h3>确认要取消预约以上课程吗？</h3>
        </i-modal>

        <!-- <i-row>
          <view class="card-box" v-for="(v,i) in lastclass"  :key="i" i-class="cardBottom">
            <div class="box-heard">
              <i-row>
                <i-col span="12"><div>{{v.trainingStartTime+'-'+ v.trainingEndTime}}</div></i-col>
                <i-col span="6"><div class="word_right">{{v.trainingDate}}</div></i-col>
                <i-col span="6"><div class="word_right">{{v.day}}</div></i-col>
              </i-row>
            </div>
              <view class="detail">
                <i-col span="16" i-class="textPadding">
                  <i-col span="12">
                    <view>
                      <text class="titleName">教练：</text><text>{{v.coachName}}</text>
                    </view>
                    <view>
                    <text class="titleName">车辆：</text>{{v.coach.carLicenceNum==null?'无':v.coach.carLicenceNum}}<text></text>                
                    </view>
                  </i-col>
                  <i-col span="12">
                    <view>
                      <text class="titleName">科目：</text><text>{{v.subjectCode=="KM002"?'科目二':'科目三'}}</text>
                    </view>
                    <view>
                      <text class="titleName">学员：</text><text>{{v.course.bookedNum+'/'+ v.course.bookEnableNum}}</text>
                    </view>
                  </i-col>
                </i-col>
                <i-col span="8" i-class="textPadding">
                  <div class="btnDivs" @click="getCall(v.coachPhone)">
                    <i class="iconfont icon-keyueyemian-lianxi" style="font-size:30px;"></i>
                  </div>
                  <div class="btnDiv btnDiv_last" @click="quietOrder(v.id)"><span>取消</span></div>
                </i-col>
              </view>
          </view>
        </i-row> -->
      </div>
      <div class="show" v-if="false">
        <img src="../../../static/images/car01.png" alt="">
        <p>小伙伴们赶快约起来吧~</p>
      </div>
    </div>
</template>
<script>
    export default {
      data () {
        return {
          navbar:[],
          studentId:wx.getStorageSync("studentId"),
          today_hours:0,
          after_hours:0,
          todayclass:[
            // {
            //   trainingDate:'',
            //   trainingStartTime:'',
            //   trainingEndTime:'',
            //   coachName:'',
            //   studentName:'',
            //   status:'',
            //   hours:'',
            //   coach:{
            //     carLicenceNum:''
            //   },
            //   course:{
            //     bookedNum:'',     
            //     bookEnableNum:''
            //   }
            // }
          ],
            lastclass:[
              // {
              //   trainingDate:'',
              //   trainingStartTime:'',
              //   trainingEndTime:'',
              //   coachName:'',
              //   studentName:'',
              //   status:'',
              //   hours:'',
              //   coach:{
              //   carLicenceNum:''
              // },
              //   course:{
              //   bookedNum:'',
              //   bookEnableNum:''
              //  }
              // }
            ],
            date:[],
            visible1:false,
            id:"",
            startTime:"",
            endTime:"",
            subjectCode:"",
            day:"",
            days:"",
            isModal:false,
            partTwoStatus:"",
            partThreeStatus:""
        }
      },
      /**
     * 生命周期函数--监听页面显示
     */
      onShow: function () {
        this.getToken();
        this.today_hours = 0;
        this.after_hours = 0;
        this.studentId = wx.getStorageSync("studentId");
        this.getDatas();
      },
      onLoad(){
        var myDate = new Date();
        var year =  myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        var month =  myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
        var day =  myDate.getDate();        //获取当前日(1-31)
        var day1 = myDate.getDay();
        var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        console.log("今天是：" + weekday[day1]);
        this.date = `${year}年${month}月${day}日`
        this.day = weekday[day1];
        console.log(this.date);
        this.today_hours = 0;
        this.after_hours = 0;
        this.studentId = wx.getStorageSync("studentId");
        this.getApime();
        this.getDatas();
      },
      created() {
        console.log('doudou')
       // this.getDatas();
      },
      methods: {
        goCancel(v){
          if(v=='0'){
            this.visible1 = false;
          }else if(v=='1'){
            this.isModal = false;
          }
        },
        getApime(){
          this.$httpWX.get({
            url:this.$api.public.me+"/"+wx.getStorageSync('studentId'),
            data:{

            }
          }).then(res=>{
            console.log(res);
            let departmentCode = res.content.student.departmentCode;
            let reportId = res.content.student.report.id;
            let userId = wx.getStorageSync("studentId");
            let employee = res.content.employee;
            let partThreeCoach = res.content.partThreeCoach;

            this.partTwoStatus = res.content.student.partTwoStatus; // 科目二状态
            this.partThreeStatus = res.content.student.partThreeStatus;  // 科目三状态
            if(this.partTwoStatus != "KM002-XXJD004" && employee == null){
              wx.reLaunch({
                url: "/pages/coach/main?departmentCode="+departmentCode + '&reportId='+reportId + '&userId='+userId
              });
            }else 
            if(this.partThreeStatus != "KM003-XXJD003" && partThreeCoach == null){
              wx.reLaunch({
                url: "/pages/coachThree/main?departmentCode="+departmentCode + '&reportId='+reportId + '&userId='+userId
              });
            }
          })
        },
        // 校验token
        getToken(){
          let token = wx.getStorageSync('token');
          this.$httpWX.get({
            url:this.$api.public.checkAuthentication+"/"+token,
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
        getDatas(){
           this.$httpWX.get({
            url: this.$api.already.alreadyBooked + "/" + this.studentId,
            data: {
              studentId: this.studentId,
            }
          })
        .then(res => {
          console.log(res);
         this.todayclass =  res.content.todayRecord;
         this.lastclass =  res.content.afterRecord;
         this.todayclass.forEach(item=>{
           this.$set(item,'day',item.trainingStartTime.slice(0,2)<12?'上午':'下午')
         })
         this.lastclass.forEach(item=>{
           this.$set(item,'dayType',item.trainingStartTime.slice(0,2)<12?'上午':'下午')
         })
         this.lastclass.forEach(item=>{
          //  console.log(item.trainingDate);
           var items = item.trainingDate;
           var weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];  
           var myDate = new Date(Date.parse(items));
           // this.name.push(weekDay[myDate.getDay()]);
          //  this.navbar.push({day:weekDay[myDate.getDay()]});
           //item.day = weekDay[myDate.getDay()];
           this.$set(item,'day',weekDay[myDate.getDay()])
         })
         console.log(this.lastclass);
        //  for(var i=0;i<this.todayclass.length;i++){
        //    this.today_hours += parseInt(this.todayclass[i].hours);
        //  };
        //   for(var i=0;i<this.lastclass.length;i++){
        //    this.after_hours += parseInt(this.lastclass[i].hours);
        //  }
         this.today_hours = this.todayclass.length;
         this.after_hours = this.lastclass.length;
        });
        },
        signUp(item){
          this.id = item.id;
          this.startTime = item.trainingStartTime;
          this.days = item.trainingStartTime.slice(0,2)<12?'上午':'下午';
          this.endTime = item.trainingEndTime;
          this.subjectCode = item.course.subjectCode=='KM003'?'科目三':'科目二';
          this.visible1 = true;
        },
        goConfirm(){
           this.$httpWX.post({
            url: this.$api.already.sign,
            data: {
              courseRecordId: this.id,
              userType: "student"
            }
          })
        .then(res => {
          this.visible1 = false;
          if(res.status.code=='10'){
            setTimeout( () => {
              wx.showToast({
                title: res.status.message,
                icon: "none",
              });
              setTimeout( () =>{
                wx.hideToast();  
              },2000)
            },10);
            //   wx.showToast({
            //     title: res.status.message,
            //     icon: 'succes',
            //     duration: 2000,
            //     mask:true
            // })
             this.getDatas();//重新加载数据
          }else{
            this.visible1 = false;
            setTimeout( () => {
              wx.showToast({
                title: res.status.message,
                icon: "none",
              });
              setTimeout( () =>{
                wx.hideToast();  
              },2000)
            },10);
            // wx.showToast({
            //     title: res.status.message,
            //     icon: 'succes',
            //     duration: 2000,
            //     mask:true
            // })
            this.getDatas();//重新加载数据
          }
        });
        },
        quietOrder(item){
          this.id = item.id;
          this.date = item.trainingDate;
          this.startTime = item.trainingStartTime;
          this.days = item.trainingStartTime.slice(0,2)<12?'上午':'下午';
          this.endTime = item.trainingEndTime;
          this.subjectCode = item.course.subjectCode=='KM003'?'科目三':'科目二';
          this.isModal = true;
        },
        getCancelQuite(){
           this.$httpWX.get({
            url: this.$api.already.cancel+"/"+this.id,
            data: {
              // id: ids,
            }
          })
        .then(res => {
          console.log(res);
          this.isModal = false;
          //  wx.showToast({
          //     title: res.status.message,
          //     icon: 'succes',
          //     duration: 1000,
          //     mask:true
          // });
          wx.showLoading();
          wx.hideLoading();
          setTimeout( () => {
            wx.showToast({
              title: res.status.message,
              icon: "none",
            });
            setTimeout( () =>{
              wx.hideToast();  
            },2000)
          },0);
          this.getDatas();//重新加载数据
        });
        },
        getCall(phone){
          wx.makePhoneCall({
            phoneNumber: phone,
              success:function(){
              console.log("拨打电话成功！")
            },
            fail:function(){
              console.log("拨打电话失败！")
            }
          })
        }
      },
        /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
      onPullDownRefresh() {
        this.today_hours = 0;
        this.after_hours = 0;
        this.getDatas();
        wx.stopPullDownRefresh();
      },
      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {
      
      }
    }
</script>
<style lang="scss">
@font-face {
    font-family: 'iconfont';
    src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAfMAA0AAAAADhQAAAd0AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCCQhEICo50i1QLFAABNgIkAyQEIAWFCAeBJRt4CxFVrHsg+5EYg9vof+hzcidbxNpUuucjJJm9njb9fXeH3ZGQBIs4Ea1RlUhNkNRJRemvCX+aqxi0Dl4xvGqk5qTth6u4f1An68OEsPz9qa/WKy2Qf56NxSme8VbmEipFpAYF63nv26/VnZPo7aLNnacLhUdN8xfbv4hKE/EGzUogRNUo6S94yd47MTIcG7r1O0yvmnhDuigPAKDjIbw5lwsAcKNVcLXIbb18AJDomBeLAxcQEMMBECFEy4E1912EXQKAZdjHo9dQD3EBMGDhIJ/YfVjpEGj9LPWZDKcjtH43g1oA5JSL87nJJmiejUgXAeluAojGZ7JIhLPUsoSn4WoRGxRNArYGBvKfBwGoRZFIqc08iGNJCZgWABemJJQTwAYWcAAHTMhPTCwpFYrFSMDn87KT+XxJQqw0hi+Ly9AxjCoUUoTDSt5AXb+u3nVNqKk0+EJD+XojAG2iohRGWpxvMkjVlMEiRWaziq+2zJIUmPUiBelOWUDGjdnHND3EtCyoZmptY1LXXU+y/JfrLjZtFW8tttlEdN7mLJFRZLJtDfyKDzrFFqnUkeSnLM7sg01MB8UH461XRJtDgwLhcJgyXCz0Fzqk5uqmh3JcLv2IsGJFJGnc19QXLEC+EwXb1krtuZZci9Qyy55or7WtWmLM8uR5dgA9esMWg/WStcH6RrPZInWfPrg1wWQUqc1hzYkgQwX2h8PhFP9GhmFK4Dooi0hdlYibRhim5ttqhqmejhsK5pZqNkJ5OpyxPlRyhsncdF25+QgdMBydVd1Pz6js25tZ3E6bVWTEio1gCiuvX5fOcuWY7Q63+Pzx+FBotMWPEAW01+CXIrNP7wEgkf3QAZikUtdIHzyclFxK8SdW7K9Jsthdm0VGT5bLJzGvD2UV2y5XkPtOpLLWnWxk8c/ykaGQggiHlZRh+zad3kN7xXuPp2Bhu+MM079CZY4rxErx7zIZpEqHW2b5Nqspg9NGWzeTpN5ln+Vwqyinl/ZkkS7fLL/OGUgAo2gIZj3y3lciYQ2PHoopQWW2I3yYWYIcR3NHb/bEYzZvdpQ77QISsQnqUEhBKtVkvxmu0DMqs8tjFXtavBPD1Pk0BJu6fv10DBesXa+VQPcudNtsa53Ad8zZBN/z8eMefDpavy5xhAZV0dhATFNVpdnvSlchDRo4k15WsYy9gJPInsZp1rZEFiVrJ+fLR4/CJpH8TmItbVpSIo+Sc4xbNILr+f9OFllgF0+jys6+M6DjoUx/xwHVPbNVkvicDle3T77W/eP7DUuMMeensxLoxEbP5siJt+86l4TeB7vLGv8zcUN8Qmv3YtThRuL/aexi1a+UDjmD3nl6l6salCVJxWWnZmNXiWyFjh3ksrCK0f0rl34Xo9baLTRbDvU1nAtnheyZLyXhvfPw7vSb7mdLe7ZOSc9rPlkUn1xaX1XeRy9bFdVc8XOYxl08Q2PkOTzt2TM0lQXHinpU7C+LaiAMcfeMKatVXDLi2LlyLv9Yc1trzdB2U6SvVkNSRlWWUHMSx3cs15KtOaM0OKTjIxfh+/fji3iTgi069LpXcI+RIocCSpywqI0WW7YM0xJd13N7j8bESRdg2miItveGrl2SErumxHpakJhkDWna7sqwZsObD282LOX21EALog3yz3Va7Xbv6dlzvh/GimbkT0Y3cSW1UO1Fp7wOe6isjZBoE2gBQy5eaRfNv8aPlqfKogZEZ6bWE3gNuFAmmn8rT5kskAsyRTIhnhkte42/92K8u5DW9anao0P1YiAD6ZxL+2hpoWDJvTofiAXEhzoPMlNlgjagroC2C6CtWt0G3RPVqyccrBPIU+QPGqQ6FqVq1FZVkTwowvmX9iYpkuwme7uelemc9Mqe7RIy7MmKHTA+NEGw9lfqz7UCue/P1F9r8x/7x0XqRMaR79D647kdJRS/9pHayv+p2EExca8G98Yz3VimtmPtBWuG3Phz6ltbaW8poEqOwf8bKIGzMuktMpWxHx7EKjneAPHnD3Gk65Rlk5d1wx3BmtXMhdfUOFfXBM/uv04h77zm6a4BS1v1Oz5sHBzxKQIb8SlDF0MfEpv3IHegoPlXLkXAgH1khG4CTrMALixE+iBbVItpfKUdtPEahh6AAFE3TIFDsq1fliRDxADPWZxODACJESBCfZxfvLVilooIlwIxHGMQx7UACOtGZKGcRDauh0gq3O1yinCbg+IBQAEAiMS4ISZaf8TFGICwvpFF4oNsMb5IUvl3UnJWRsPbaaFQzyMTRmRJVrFKibbpHQC5q8hHd/z3iZXBVx7YXw7QE2KDXKgFb0fO1fvc2WQV1OroeMPn8MCq09Z9xwsK5bIMPnM5u3dGLMi4etRAWpNe6NxXFJ0olz/VRm3fmUJxbp0DDix7diMHfU/rVPx0Pl8sZr5jXg0wIv7O2pWLV6KYqx1xmrmwiZBLgfk4fMqEz0qmBsBrQLDhE3BEIBZiI05yhsuw7IiFhqXNWLIMSqROYZUHy84OHK6elTpmQl1FL1OV4CeEZSxY8r6TUOcBLD1iXbl2ogAAAA==) format('woff2'),
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


.rowWrap{
  width: 93%;
  margin: 0 auto;
  background-color: #ffffff;
	box-shadow: 0px 4px 10px 0px 
		rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  .rows{
    padding: 20rpx;
    font-size: 28rpx;
    margin:20rpx 0;
    .left{
      text-align: center;
      box-sizing: border-box;
      border-right: solid 1px #eaeaea;
      p{
        font-size: 18px;
        color: #fb6402;
      }
    }
    .center{
      margin-left:30rpx;
      p{
        font-size: 24rpx;
        color: #a4a4a4;
        padding-top:5px;
      }
      span{
        color: #4f4f4f;
      }
    }
    .right{
      .boxBtn{
        padding:44rpx 0;
        margin-left:40rpx;
        button{
          width: 94px;
          height: 30px;
          line-height:2.4;
          font-size: 12px;
          margin-top:30rpx;
          .cancel-icon{
            margin-top: -5rpx;
          }
        }
        .topBtn{
          background-image: linear-gradient(90deg, 
          #fc8902 0%, 
          #fb4003 100%);
          box-shadow: 0px 2px 10px 0px 
            rgba(253, 135, 2, 0.6);
          border-radius: 21px;
          color: #ffffff;
        }
        .btn{
          background-image: linear-gradient(90deg, 
          #fc8902 0%, 
          #fb4003 100%);
          box-shadow: 0px 2px 10px 0px 
            rgba(253, 135, 2, 0.6);
          border-radius: 21px;
          opacity: 0.4;
          color: #fff;
        }
        .btnActive{
          background-color: #d4d4d4;
          border-radius: 21px;
          opacity: 0.6;
          border-radius: 21px;
          color:#fff;
        }
        .cancelBtn{
	        border: solid 1px rgba(79, 79, 79, 0.3);
          border-radius: 21px;
          // opacity: 0.6;
          border-radius: 21px;
          background: #fff;
          color: #535353;
          font-weight: 500;
        }
      }
    }
  }
}



.card-box{
  width:90%;
  margin:15px auto;
  box-shadow:0 1px 6px rgba(0,0,0,.2);
  background:#fff;
  font-size:12px;
  border-radius:6px;
  font-size:14px;
}
.card-box .box-heard{
  border-radius:6px 6px 0 0;
  padding:8px;
  /* border-bottom:1px solid #d3d3d3; */
}
.card-box .detail{
  padding:10px;
  overflow: hidden;
  /* overflow:auto; */
}
.word_right{
  text-align:right;
}
.i-card{
  margin:15px;
}
.i-card-header {
  /* background:-webkit-linear-gradient(left, #F41856 , #E65179)!important; */
  background: #fff!important;
}
.borderRight{
  color: #ff3f00;
  font-weight:900;
  margin-right:6px;
}
.orderLength{
  width: 58px;
	height: 20px;
  line-height:20px;
  /* background:-webkit-linear-gradient(left, #F41856 , #E65179); */
  background-color: rgba(251, 100, 2, 0.1);
  margin-top:10px;
  color:#fff;
  font-size:11px;
  text-align:center;
  border-radius: 10px;
  color: #fb6809;
}
.colRight{
  font-size: 20rpx;
  color: #a4a4a4;
  text-align: right;
}
.topTitle{
  height:40px;
  font-size:14px;
  line-height:40px;
  padding:0 20px;
}
.btn_color{
  color:#ff3f00!important;
  background:#fff;
}
.btn_border{
  border:none;
  color:#fff;
}
.titleColor{
  
}
.cardBottom{

}
.btnDivs{
  width:36px;
  height: 60px;
  line-height: 60px;
  border:1px solid #3bdb91;
  display:inline-block;
  border-radius: 10rpx;
  font-size: 30px;
  color:#3bdb91;
  text-align: center;
  margin-top: 10rpx;
  float: left;
}
.btnDiv{
  height:60px;
  line-height:60px;
  width:100rpx;
  border-radius:10rpx;
  /* border:1px solid #ff3f00; */
  display:inline-block;
  margin:0 6px;
  text-align:center;
  color:#ff3f00;
  padding:0;
}
.textPadding{
  /* padding:10px 0; */
}
.btnDiv_last{
  background:#555555;
  border-color:#555;
  color:#fff;
  float: left;
  margin-top: 10rpx;
}
.titleName{
  color:#AFAFAF;
}
.wrap .show{
  width: 100%;
  text-align: center;
  position: absolute;
  left: 50%;
  top:42%;
  transform: translate(-50%,-50%);
}
.wrap .show img{
  width: 150rpx;
  height: 150rpx;
  vertical-align: middle;
  padding-bottom: 30rpx;
}
.wrap .show p{
  color:#999999;
  font-size: 28rpx;
}
</style>
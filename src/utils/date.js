//格式化日期
Date.prototype.Format = function(fmt) {
    var o = {
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
  var sdfDate = new Date().Format("MM月dd日");
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
      dateArr[i] = date1.getMonth() + 1 + "-" + dayStr;
      i++;
      date1.setDate(date1.getDate() + 1);
    }
    currentDate = new Date(day1).Format("MM-dd");
    dateArr.push(currentDate);
    return dateArr;
  }
  console.log(getBetween("2017-9-30", "2017-9-10"));

  //获取今天到前十五天之间的日期
  var starTime;
  var endTime;
  function getDay() {
    //获取当前日期
    starTime = new Date().Format("yyyy-MM-dd"); //Format("输入你想要的时间格式:yyyy-MM-dd,yyyyMMdd")
    //结束时间
    var date = new Date(); //获取当前时间
    date.setDate(date.getDate() + 15); //设置天数 15 天
    endTime = date.Format("yyyy-MM-dd"); //加完15天以后的时间
  }
  getDay();
  console.log(getBetween(endTime, starTime));
  this.navbar = getBetween(endTime, starTime);
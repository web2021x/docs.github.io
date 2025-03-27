/**
 * 获取当前的时间 格式为（YYYY-MM-DD）
 */
export function getNowTime() {
  var nowDate = new Date();
  var year = nowDate.getFullYear();
  var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
  var date = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
  return year + '-' + month + '-' + date;
}

/**
 *获取几个月前的输入日期
 *{param:DateTime} date 输入日期(YYYY-MM-DD)
 *{param:number } monthNum 月数
 */
export function GetPreMonthDay(date, monthNum) {
  var dateArr = date.split('-');
  var year = dateArr[0]; //获取当前日期的年份
  var month = dateArr[1]; //获取当前日期的月份
  var day = dateArr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  var year2 = year;
  var month2 = parseInt(month) - monthNum;
  if (month2 <= 0) {
    var absM = Math.abs(month2);
    year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
    month2 = 12 - (absM % 12);
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}

/**
 *获取几个月后的输入日期
 *{param:DateTime} date 输入日期(YYYY-MM-DD)
 *{param:number } monthNum 月数
 */
export function GetNextMonthDay(date, monthNum) {
  var dateArr = date.split('-');
  var year = dateArr[0]; //获取当前日期的年份
  var month = dateArr[1]; //获取当前日期的月份
  var day = dateArr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中的月的天数
  var year2 = year;
  var month2 = parseInt(month) + parseInt(monthNum);
  if (month2 > 12) {
    year2 = parseInt(year2) + parseInt(parseInt(month2) / 12 == 0 ? 1 : parseInt(month2) / 12);
    month2 = parseInt(month2) % 12;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }

  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}

// 获取当天的开始时间戳
export function getTodayStartTimestamp() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
}

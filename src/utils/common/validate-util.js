
export function isvalidUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

export function validateHttpURL(str_url) {
  // 验证url
  var strRegex = /(http|https):\/\/\S*/;
  var re = new RegExp(strRegex);
  return re.test(str_url);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
/*验证pad还是pc*/
export function vaildatePc() {
  const userAgentInfo = navigator.userAgent;
  const Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  let flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.includes(Agents[v])) {
      flag = false;
      break;
    }
  }
  return flag;
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateCode(rule, value, callback) {
  let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  if (value === "") {
    callback(new Error("请填写编码"));
  } else if (reg.test(value)) {
    callback(new Error("编码不能包含汉字!"));
  } else {
    callback();
  }
}

/**
 * 判断身份证号码
 */
export function isCard(code) {
  let list = [];
  let result = true;
  let msg = "";
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 ",
  };
  if (!this.validateNull(code)) {
    if (code.length == 18) {
      if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
        msg = "证件号码格式错误";
      } else if (!city[code.substr(0, 2)]) {
        msg = "地址编码错误";
      } else {
        //18位身份证需要验证最后一位校验位
        code = code.split("");
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2, "x"];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          msg = "证件号码校验位错误";
        } else {
          result = false;
        }
      }
    } else {
      msg = "证件号码长度不为18位";
    }
  } else {
    msg = "证件号码不能为空";
  }
  list.push(result);
  list.push(msg);
  return list;
}

/**
 * 判断手机号码是否正确
 */
export function  isvalidateMobile(phone) {
  let list = [];
  let result = true;
  let msg = "";
  var isPhone = /^0\d{2,3}-?\d{7,8}$/;
  //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  var isMob =
    /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|14[57][0-9]{8}|17[3678][0-9]{8})$/;
  if (!this.validateNull(phone)) {
    if (phone.length == 11) {
      if (isPhone.test(phone)) {
        msg = "手机号码格式不正确";
      } else {
        result = false;
      }
    } else {
      msg = "手机号码长度不为11位";
    }
  } else {
    msg = "手机号码不能为空";
  }
  list.push(result);
  list.push(msg);
  return list;
}

/**
 * 判断是否为整数
 */
export function validateInteger(num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}
/**
 * 判断是否为小数
 */
export function validateFloat(num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d.]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}

/**
 * 判断是否为空
 */
export function validateNull(val) {
  if (typeof val == "boolean") {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === "{}") return true;
  } else {
    if (
      val == "null" ||
      val == null ||
      val == "undefined" ||
      val == undefined ||
      val == ""
    )
      return true;
    return false;
  }
  return false;
}

/**
 * 验证用户名长度是否为6-15位数字或字母
 * @param val
 * @returns {boolean}
 */
export function validateUserAccount(val) {
  var patrn = /^(\w){6,15}$/;
  if (!patrn.exec(val)) {
    return false;
  }
  return true;
}

/**
 * 验证密码长度是否是8-15位大小写字母数字特殊符号组成
 * @param val
 * @returns {boolean}
 */
export function validateUserPass(val) {
  let pwdRegex = new RegExp(
    "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,15}"
  );
  return pwdRegex.test(val);
}

/**
 * 验证是否是国内运营商手机号码
 * @param val 手机号码
 * @returns {boolean}
 */
export function validatePhone(val) {
  let phoneRegex = new RegExp("^1[3456789]\\d{9}$");
  return phoneRegex.test(val);
}

// 是否含有中文（也包含日文和韩文）
export function isChineseChar(str) {
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  return reg.test(str);
}

// 是否含有全角符号的函数
export function isFullwidthChar(str) {
  var reg = /[\uFF00-\uFFEF]/;
  return reg.test(str);
}

// 是否包含中文和全角符号
export function isChineseCharAndFullwidthChar(str) {
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D-\uFF00-\uFFEF]/;
  return reg.test(str);
}

// 验证是否是统一社会信用代码格式
export function isSocialCode(socialCode) {
  const reg = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/;
  return reg.test(socialCode);
}

// 验证是否是固定电话 传真 格式
export function isTelPhoneFaxPhone(phone) {
  const reg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
  return reg.test(phone);
}

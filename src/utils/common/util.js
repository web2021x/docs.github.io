import JSEncrypt from 'jsencrypt';
import { CommonHrApi } from '@/api/CommonHrApi';
import { getToken } from '../token-util';
import { validateHttpURL } from '@/utils/common/validate-util';
import { TINYMCE_EDITOR_IMG_PREFIX_URL, API_BASE_PREFIX } from '@/config/setting';

// 定义公钥
const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCochIaKWEh6IIK1pJQcJPsYhZ2AJmGNc12XeC2lsj3dHkMO9vGrXN4ZJiN3qNLlO3hERtY0UZdN8Uz18zoiL60XoOclMuuwf1TwiMA3/4Vy2NOaQdX/RgLQ8XiRobVPLMe/JTteZ6eoPrWVC5jf4kdWD7LWwgdWrnzGs/4UiWnsQIDAQAB`;

//深度克隆
export function deepClone(obj) {
  let result;
  if (Array.isArray(obj)) {
    result = [];
  } else if (typeof obj === 'object' && obj !== null) {
    result = {};
  } else {
    return obj;
  }
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = deepClone(obj[key]);
    } else {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * rsa加密
 * @author: nxy
 * @Date: 2022-10-16 21:53:44
 */
export function RsaEncry(data) {
  // 使用 RSA 公钥加密 请求响应解密的key
  const myEncrypt = new JSEncrypt();
  myEncrypt.setPublicKey(publicKey);
  const cryptRespKeyStr = myEncrypt.encrypt(data);
  return cryptRespKeyStr;
}

/**
 * 查找树
 * @param {number} param
 * @returns {number}
 */
export function findTree(treeData = [], search, matchKey = 'id', childrenKey = 'children') {
  let result = [];
  treeData.forEach(treeItem => {
    let resultItem = {};
    if (treeItem[childrenKey] && treeItem[childrenKey].length) {
      resultItem[childrenKey] = findTree(treeItem[childrenKey], search, matchKey, childrenKey);
    }
    if (search === treeItem[matchKey]) {
      resultItem = { ...treeItem };
    }
    if (resultItem[matchKey]) {
      result.push(resultItem);
    }
    if (resultItem[childrenKey] && resultItem[childrenKey].length) {
      resultItem = { ...treeItem, childrenKey: resultItem[childrenKey] };
      result.push(resultItem);
    }
  });
  return result;
}

/**
 * 自定义搜索树，并返回
 * @param {*}
 * @param {*}
 * @returns
 */
export function searchTree(searchList, oldList, searchText, children = 'children', key = 'key', title = 'title') {
  let result = {
    arr: [],
    resultList: []
  };
  if (!searchText) {
    // oldList是searchList的原始数据
    result.resultList = oldList;
    return result;
  }
  function fn(list, str) {
    let resultList = [];
    list.forEach(item => {
      if (item[title].indexOf(str) >= 0) {
        result.arr.push(item[key]); //遍历找出 要展开的节点key
        resultList.push(item); //过滤数据 只保留能匹配上的数据
      } else if (item[children] && item[children].length > 0) {
        let reData = fn(item[children], str);
        if (reData && reData.length > 0) {
          let obj = {
            ...item
          };
          obj[children] = reData;
          resultList.push(obj); //如果叶子节点能匹配上就需要保留 树的父节点
        }
      }
    });
    return resultList;
  }
  result.resultList = fn(searchList, searchText);
  return result;
}

//驼峰转下划线
export function camelToUnderline(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

//下划线转驼峰
export function underlineToCamel(str) {
  return str.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());
}

/**
 * 下载文件
 * @param fileName
 * @param content
 */
export function downloadFile(fileName, content) {
  if (!content) {
    return;
  }
  if (!fileName) {
    fileName = 'noname.json';
  }
  if (typeof content === 'object') {
    content = JSON.stringify(content);
  }
  let blob = new Blob([content], { type: 'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
}

/**
 * 是否是移动端
 * @returns
 */
export function isMobile() {
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    return true; // 移动端
  } else {
    return false; // PC端
  }
}

/**
 * 获取随机数
 * @param {*} number
 * @returns
 */
export function getRandomNumber(number) {
  var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = 0; i < number; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

/**
 * 生成key
 * @param [formItem] 需要生成 key 的控件，可选，如果不传，默认返回一个唯一 key
 */
export async function getBusinessMaxSort(code) {
  if (code) {
    const res = await CommonHrApi.getBusinessMaxSort(code);
    return Number(res);
  }
  return 1000;
}

/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 32) => {
  const timestamp = Date.now().toString().slice(-13); // 获取当前时间戳的最后13位
  const remainingLength = randomLength - timestamp.length; // 计算随机部分的长度

  // 确保剩余长度大于0
  if (remainingLength <= 0) {
    throw new Error("randomLength must be greater than 13");
  }

  // 生成随机数字部分
  const randomPart = Math.floor(Math.random() * Math.pow(10, remainingLength)).toString().padStart(remainingLength, '0');

  return randomPart + timestamp;
};

/**
 * 生成随机数字
 * @param {*} length 
 * @returns 
 */
export const generateRandomId = (length) => {
  if (length < 1) {
    throw new Error('Length must be at least 1');
  }

  // 第一个字符不能为0，所以随机选择1-9
  let id = Math.floor(Math.random() * 9) + 1; // 随机生成第一个数字 (1-9)

  // 生成剩余的位数
  for (let i = 1; i < length; i++) {
    id += Math.floor(Math.random() * 10); // 随机生成0-9的数字
  }

  return id.toString(); // 返回字符串形式的ID
}

export function isString(p) {
  return typeof p === 'string';
}

export function isNumber(p) {
  return typeof p === 'number';
}

// 获取assets/icon静态资源
export async function getflowIcon() {
  const picture = import.meta.glob('../../assets/images/icon/*.png');
  const modules = await Promise.all(
    Object.keys(picture).map(async (item) => {
      const url = (await picture[item]()).default; // 动态加载图片
      const name_suffix = item.substring(item.lastIndexOf('/') + 1, item.length);
      const name = name_suffix.substring(0, name_suffix.indexOf('.'));
      return {
        url,
        name_suffix,
        name
      };
    })
  );

  return modules;
}

// 获取bpmn静态资源
export async function getBpmnFlowIcon() {
  const picture = import.meta.glob('../../assets/images/bpmn/*/*.svg');
  const modules = await Promise.all(
    Object.keys(picture).map(async (item) => {
      const url = (await picture[item]()).default;
      const name_suffix = item.substring(item.lastIndexOf('/') + 1, item.length);
      const name = name_suffix.substring(0, name_suffix.indexOf('.'));
      return {
        url,
        name_suffix,
        name
      };
    })
  );

  return modules;
}

// 获取流程静态资源
export async function getFlowBaseIcon() {
  const picture = import.meta.glob('../../assets/images/flow-base/*.svg');
  const modules = await Promise.all(
    Object.keys(picture).map(async (item) => {
      const url =  (await picture[item]()).default;
      const name_suffix = item.substring(item.lastIndexOf('/') + 1, item.length);
      const name = name_suffix.substring(0, name_suffix.indexOf('.'));
      return {
        url,
        name_suffix,
        name
      };
    })
  ) 

  return modules;
}

// 获取业务图静态资源
export async function getBusinessPraphIcon() {
  const picture = import.meta.glob('../../assets/images/business/*.svg');
  const modules = await Promise.all(
    Object.keys(picture).map(async (item) => {
      const url =  (await picture[item]()).default;
      const name_suffix = item.substring(item.lastIndexOf('/') + 1, item.length);
      const name = name_suffix.substring(0, name_suffix.indexOf('.'));
      return {
        url,
        name_suffix,
        name
      };
    })
  ) 

  return modules;
}

// 获取接口模块静态资源
export async function getApiModularIcon() {
  const picture = import.meta.glob('../../assets/api-modular/*.svg');
  const modules = await Promise.all(
    Object.keys(picture).map(async (item) => {
      const url =  (await picture[item]()).default;
      const name_suffix = item.substring(item.lastIndexOf('/') + 1, item.length);
      const name = name_suffix.substring(0, name_suffix.indexOf('.'));
      return {
        url,
        name_suffix,
        name
      };
    })
  ) 

  return modules;
}

// 获取门户设计静态资源
export async function getPortalDesignIcon() {
  const picture = import.meta.glob('../../assets/portal/*.svg');
  const modules = await Promise.all(
    Object.keys(picture).map(async (item) => {
      const url =  (await picture[item]()).default;
      const name_suffix = item.substring(item.lastIndexOf('/') + 1, item.length);
      const name = name_suffix.substring(0, name_suffix.indexOf('.'));
      return {
        url,
        name_suffix,
        name
      };
    })
  ) 

  return modules;
}

export function getNowTime() {
  // 创建一个新的 Date 对象
  var now = new Date();

  // 获取年、月、日、小时、分钟和秒
  var year = now.getFullYear();
  var month = now.getMonth() + 1; // 月份从 0 开始，所以要加 1
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // 格式化时间
  var formattedTime =
    year +
    '-' +
    (month < 10 ? '0' : '') +
    month +
    '-' +
    (day < 10 ? '0' : '') +
    day +
    ' ' +
    (hours < 10 ? '0' : '') +
    hours +
    ':' +
    (minutes < 10 ? '0' : '') +
    minutes +
    ':' +
    (seconds < 10 ? '0' : '') +
    seconds;
  return formattedTime;
}

/**
 * 查找给定 valueId 在树形结构中的所有数据及其父级 ID 列表
 * @param {Array} tree - 树形数组
 * @param {string|number} valueId - 资源 ID
 * @return {Object} - 包含所有父级 ID 列表和 valueId 数据的对象
 */
export function findResourceAndParents(tree, valueId, id = 'id', children = 'children') {
  const result = {
    parents: [],
    nodeData: null
  };

  function traverse(nodes, currentPath) {
    for (const node of nodes) {
      // 如果找到匹配的 valueId，记录当前路径上的 ID 并保存资源数据
      if (node[id] === valueId) {
        result.parents = [...currentPath];
        result.nodeData = node;
        return true; // 找到后停止遍历
      }

      // 遍历子节点
      if (node[children] && node[children].length > 0) {
        // 记录当前节点 ID，并进行递归
        if (traverse(node[children], [...currentPath, node[id]])) {
          return true;
        }
      }
    }
    return false;
  }

  traverse(tree, []);
  return result;
}

/**
 * 替换富文本字符串里面的fileId
 * @param {*} str 
 * @param {*} isPreview 是否是预览
 */
export function replaceTinymceEditorFileId(str, isPreview = false) {
  let result = '';
  if (isPreview) {
    result = str.replace(/<img\s+src="[^"]*fileId=(\d+)[^"]*"/g, (match, fileId) => {
      return `<img src="${TINYMCE_EDITOR_IMG_PREFIX_URL}${API_BASE_PREFIX}/sysFileInfo/private/preview?fileId=${fileId}&token=${getToken()}"`;
    });
  } else {
    result = str.replace(/<img\s+src="[^"]*fileId=(\d+)[^"]*"/g, (match, fileId) => {
      return `<img src="fileId=${fileId}"`;
    });
  }
  return result;
}

/**
 * 验证颜色是否正确
 * @param {*} color 
 * @returns 
 */
export function isValidColor(color) {
  // 十六进制颜色
  const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

  function isHexColor(color) {
    return hexColorRegex.test(color);
  }

  // RGB 颜色
  const rgbColorRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;

  function isRgbColor(color) {
    if (!rgbColorRegex.test(color)) return false;
    // 进一步检查 RGB 值是否在 0-255 范围内
    const [, r, g, b] = color.match(rgbColorRegex).map(Number);
    return [r, g, b].every(val => val >= 0 && val <= 255);
  }

  // RGBA 颜色
  const rgbaColorRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([0-1]|0?\.\d+)\)$/;

  function isRgbaColor(color) {
    if (!rgbaColorRegex.test(color)) return false;
    const [, r, g, b, a] = color.match(rgbaColorRegex).map(Number);
    return [r, g, b].every(val => val >= 0 && val <= 255) && a >= 0 && a <= 1;
  }

  // HSL 颜色
  const hslColorRegex = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;

  function isHslColor(color) {
    if (!hslColorRegex.test(color)) return false;
    const [, h, s, l] = color.match(hslColorRegex).map(Number);
    return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
  }
  // HSLA 颜色
  const hslaColorRegex = /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*([0-1]|0?\.\d+)\)$/;

  function isHslaColor(color) {
    if (!hslaColorRegex.test(color)) return false;
    const [, h, s, l, a] = color.match(hslaColorRegex).map(Number);
    return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100 && a >= 0 && a <= 1;
  }

  const colorNames = [
    "black", "white", "red", "green", "blue", "yellow", "cyan", "magenta",
    "gray", "lime", "maroon", "navy", "olive", "purple", "silver", "teal"
  ];

  // 颜色名称
  const colorNameRegex = new RegExp(`^(${colorNames.join('|')})$`, 'i');

  function isColorName(color) {
    return colorNameRegex.test(color);
  }

  return isHexColor(color) || isRgbColor(color) || isRgbaColor(color) || isHslColor(color) || isHslaColor(color) || isColorName(color);
}

/**
 * 将一维对象数组转换成对象
 * @param array 一维对象数组
 * @param key key
 * @returns {{}}
 */
export function arrayToObject(array, key) {
  // 判断数组是否为空
  if (!Array.isArray(array) || array.length === 0) {
    return {};
  }

  // 创建一个空对象
  const obj = {};

  // 遍历数组，将每个对象的键作为属性的名称，值作为属性的值
  for (let i = 0; i < array.length; i++) {
    const _key = array[i][key];
    obj[_key] = array[i];
  }

  return obj;
}

/**
 * 跳转链接
 * @param url 链接
 * @param openType 打开方式 1:本页打开 2:新标签页打开
 */
export function redirectUrl(url = '', openType = 1) {
  if (openType === 1) {
    window.location.href = url;
  } else {
    window.open('javascript:window.name;', '<script>location.replace("' + url + '")<\/script>');
  }
}

/**
 * 跳转路由
 * @param url 链接
 * @param openType 打开方式 1:本页打开 2:新标签页打开
 * @param router router
 */
export function redirectRouterUrl(url = '', openType = 2, router) {
  // 判断链接是否是带有http或者是https 如果不带有
  let params = null;
  if (!validateHttpURL(url)) {
    params = getParams('https://www.baidu.com/' + url);
  } else {
    params = getParams(url);
  }

  // 判断打开方式 1:本页打开 2:新标签页打开
  if (openType === 1) {
    router.push({
      path: url,
      query: params ? params : null
    });
  } else {
    const { href } = router.resolve({
      path: url,
      query: params ? params : null
    });
    window.open(href, '_blank');
  }
}

/**
 * 将数组转换为二维数组
 * @param array
 * @param length
 */
export function filtNavArr(array = [], length = 0) {
  const pages = [];
  array.forEach((v, i) => {
    const index = Math.floor(i / length);
    if (!pages[index]) {
      pages[index] = [];
    }
    pages[index].push(v);
  });
  return pages;
}

export function getParams(url) {
  const searchParams = new URLSearchParams(new URL(url).search);
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
}

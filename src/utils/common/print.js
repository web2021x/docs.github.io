/** 打印插件 */

/**
 * ie 打印预览控件
 */
const ieWebBrowser = '<object id="WebBrowser" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" width="0" height="0"></object>';

/**
 * iframe 打印窗口的 id
 */
const printFrameId = 'guns-printer-frame';

/**
 * 打印全局样式的 style 的 id
 */
const printStyleId = 'guns-printer-style';

/**
 * 打印方向设置的 style 的 id
 */
const printOptionId = 'guns-printer-set';

/**
 * 加载层 id
 */
const loadingElId = 'guns-printer-loading';

/**
 * 正在打印标识的 class
 */
const printingClass = 'guns-printer-printing';

/**
 * 打印时隐藏的 class
 */
const hideClass = 'guns-printer-hide';

/**
 * 打印时隐藏不占位置的 class
 */
const hideNoneClass = 'guns-printer-hide-none';

/**
 * 生成随机 id
 * @param length 长度
 */
export function uuid(length = 8) {
  const num = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let str = 'p_';
  for (let i = 0; i < length; i++) {
    str += num.charAt(Math.floor(Math.random() * num.length));
  }
  return str;
}

/**
 * 是否是 ie
 */
function isIE() {
  return !!window['ActiveXObject'] || 'ActiveXObject' in window;
}

/**
 * 获取的打印 iframe
 */
function getPrintFrame() {
  const pFrame = document.getElementById(printFrameId);
  if (pFrame && pFrame.parentNode) {
    pFrame.parentNode.removeChild(pFrame);
  }
  const elem = document.createElement('iframe');
  elem.id = printFrameId;
  elem.style.width = '0px';
  elem.style.height = '0px';
  elem.style.position = 'fixed';
  elem.style.visibility = 'hidden';
  document.body.appendChild(elem);
  elem.focus();
  return elem;
}

/**
 * 获取打印全局样式
 * @param isPrinting 是否已开始打印
 */
function getCommonCss(isPrinting = false) {
  return `
    @media print {
      html, body {
        padding: 0;
        margin: 0;
      }
    }

    /* 打印时不显示的元素 */
    .${hideClass}.${printingClass} {
      visibility: hidden !important;
    }
    .${hideClass} {
      ${isPrinting ? 'visibility: hidden !important;' : ''}
    }
    .${hideClass}.${printingClass}.${hideNoneClass},
    .${hideClass}.${hideNoneClass}${isPrinting ? '' : '-no'} {
      display: none !important;
    }

    /* 表格样式 */
    .guns-printer-table {
      width: 100%;
      border-collapse: collapse;
      border: none;
    }
    .guns-printer-table td, .guns-printer-table th {
      color: #333;
      padding: 9px 15px;
      border: 1px solid #333;
      word-break: break-all;
    }

    /* loading 样式 */
    #${loadingElId} {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: hsla(0, 0%, 100%, .9);
      z-index: 19000000;
    }
    #${loadingElId}:after {
      content: "";
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -20px auto auto -20px;
      border: 2px solid #3296FA;
      border-right-color: transparent;
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: guns-printer-loading-anim .8s linear infinite;
    }
    @keyframes guns-printer-loading-anim {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* 带页眉页脚页面样式 */
    .guns-printer-table-page {
      width: 100%;
      border-collapse: collapse;
      border: none;
    }
    .guns-printer-table-page td {
      padding: 0;
      border: none;
    }
  `;
}

/**
 * 获取分页打印的样式
 * @param padding 每一页边距
 * @param width 每一页宽度
 * @param height 每一页高度
 */
function getPageStyleHtml(padding, width, height) {
  return `
    <style>
      body {
        margin: 0 !important;
      }

      /* 自定义边距及宽高样式 */
      .guns-printer-page .guns-printer-page-item {
        width: ${width ?? 'auto'};
        height: ${height ?? 'auto'};
        padding: ${padding ?? '0'};
        page-break-after: always !important;
        box-sizing: border-box !important;
        border: none !important;
        position: relative;
      }

      /* 调试模式样式 */
      .guns-printer-page.guns-printer-debug .guns-printer-page-item {
        border: 1px solid red !important;
      }

      /* 全局样式 */
      ${getCommonCss(true)}
    </style>
  `;
}

/**
 * 生成控制打印的 html
 * @param option PrintHtmlOption
 */
function getOptionHtml(option) {
  const { beforeJs, doneJs } = addCallback(option.before, option.done);
  const blank = option.blank || (option.iePreview !== false && isIE());
  const closeJs = blank && option.close !== false ? 'window.close();' : '';
  const hideLoadJs = 'parent.hideElePrinterLoading&&parent.hideElePrinterLoading();';
  const optHtml = [];

  // 增加打印设置的 css
  optHtml.push(`<style type="text/css" media="print" id="${printOptionId}">`);
  optHtml.push('@page {');
  // 打印方向
  if (typeof option.horizontal !== 'undefined') {
    optHtml.push(`size: ${option.horizontal ? 'landscape' : 'portrait'};`);
  }
  // 页间距
  if (option.margin != null) {
    optHtml.push(`margin: ${option.margin};`);
  }
  optHtml.push(`}`);
  optHtml.push(`</style>`);

  // 增加打印和回调的 js
  if (option.iePreview !== false && isIE()) {
    // 兼容 ie 打印预览
    optHtml.push(ieWebBrowser);
    if (option.print !== false) {
      optHtml.push(`
        <script>
          window.onload = function() {
            ${beforeJs}
            try {
              window.WebBrowser.ExecWB(7, 1);
            } catch(e) {
              console.error(e);
              window.print();
            }
            ${hideLoadJs}
            ${doneJs}
            ${closeJs}
          }
        </script>
      `);
    }
  } else if (option.print !== false) {
    optHtml.push(`
      <script>
        window.onload = function() {
          ${beforeJs}
          window.print();
          ${hideLoadJs}
          ${doneJs}
          ${closeJs}
        }
      </script>
    `);
  }
  return optHtml.join('');
}

/**
 * 加入核心样式
 */
function addCommonCss() {
  if (!document.getElementById(printStyleId)) {
    const elem = document.createElement('style');
    elem.id = printStyleId;
    elem.setAttribute('type', 'text/css');
    elem.innerHTML = getCommonCss();
    document.body.appendChild(elem);
  }
}

/**
 * 增加页眉页脚
 * @param html 页面内容
 * @param header 页眉
 * @param footer 页脚
 */
function addHeaderFooter(html, header, footer) {
  if (!header && !footer) {
    return html ?? '';
  }
  let result = '<table class="guns-printer-table-page">';
  if (header) {
    result += `<thead><tr><td>${header}</td></tr></thead>`;
  }
  result += `<tbody><tr><td>${html ?? ''}</td></tr></tbody>`;
  if (footer) {
    result += `<tfoot><tr><td>${footer}</td></tr></tfoot>`;
  }
  return result + '</table>';
}

/**
 * 添加回调监听
 * @param before 打印前回调
 * @param done 打印后回调
 */
function addCallback(before, done) {
  const taskId = 'p' + uuid();
  if (!window['elePrinterBefore']) {
    window['elePrinterBefore'] = {};
  }
  if (!window['elePrinterDone']) {
    window['elePrinterDone'] = {};
  }
  if (before) {
    window['elePrinterBefore'][taskId] = before;
  }
  if (done) {
    window['elePrinterDone'][taskId] = done;
  }
  const beforeJs = `;parent.elePrinterBefore&&parent.elePrinterBefore.${taskId}&&parent.elePrinterBefore.${taskId}();`;
  const doneJs = `;parent.elePrinterDone&&parent.elePrinterDone.${taskId}&&parent.elePrinterDone.${taskId}();`;
  return { taskId, beforeJs, doneJs };
}

/**
 * 隐藏元素
 * @param elems 需要隐藏的元素
 * @param isNone 是否是隐藏不占位置
 */
function hideElem(elems, isNone) {
  Array.prototype.forEach.call(document.getElementsByClassName(hideClass), elem => {
    if (elem?.classList) {
      elem.classList.add(printingClass);
    }
  });
  if (!elems) {
    return;
  }
  const isArray = Array?.isArray(elems) || NodeList?.prototype?.isPrototypeOf(elems) || HTMLCollection?.prototype?.isPrototypeOf(elems);
  Array.prototype.forEach.call(isArray ? elems : [elems], elem => {
    if (typeof elem === 'string') {
      Array.prototype.forEach.call(document.querySelectorAll(elem), el => {
        if (el?.classList) {
          el.classList.add(hideClass);
          el.classList.add(printingClass);
          if (isNone) {
            el.classList.add(hideNoneClass);
          }
        }
      });
    } else if (elem?.classList) {
      elem.classList.add(hideClass);
      elem.classList.add(printingClass);
      if (isNone) {
        elem.classList.add(hideNoneClass);
      }
    }
  });
}

/**
 * 取消隐藏元素
 * @param elems 需要取消隐藏的元素
 */
function showElem(elems) {
  Array.prototype.forEach.call(document.getElementsByClassName(hideClass), elem => {
    if (elem?.classList) {
      elem.classList.remove(printingClass);
    }
  });
  if (!elems) {
    return;
  }
  const isArray = Array?.isArray(elems) || NodeList?.prototype?.isPrototypeOf(elems) || HTMLCollection?.prototype?.isPrototypeOf(elems);
  Array.prototype.forEach.call(isArray ? elems : [elems], elem => {
    if (typeof elem === 'string') {
      Array.prototype.forEach.call(document.querySelectorAll(elem), el => {
        if (el?.classList) {
          el.classList.remove(hideClass);
          el.classList.remove(printingClass);
          el.classList.remove(hideNoneClass);
        }
      });
    } else if (elem?.classList) {
      elem.classList.remove(hideClass);
      elem.classList.remove(printingClass);
      elem.classList.remove(hideNoneClass);
    }
  });
}

/**
 * 显示加载层
 */
function showLoading() {
  addCommonCss();
  let elem = document.getElementById(loadingElId);
  if (!elem) {
    elem = document.createElement('div');
    elem.id = loadingElId;
    document.body.appendChild(elem);
  }
  elem.style.display = 'block';
  window['hideElePrinterLoading'] = () => {
    hideLoading();
  };
  return elem;
}

/**
 * 关闭加载层
 */
function hideLoading() {
  const elem = document.getElementById(loadingElId);
  if (elem) {
    elem.style.display = 'none';
  }
}

/**
 * 打印当前页面
 * @param option 参数配置
 */
export function printThis(option = {}) {
  // 让当前窗口获取焦点
  window.focus();

  // 加入打印全局样式
  addCommonCss();

  // 增加打印设置的 css
  const optElem = document.getElementById(printOptionId);
  if (optElem && optElem.parentNode) {
    optElem.parentNode.removeChild(optElem);
  }
  const optStr = [];
  // 打印方向设置
  if (typeof option.horizontal === 'boolean') {
    optStr.push(`size: ${option.horizontal ? 'landscape' : 'portrait'};`);
  }
  // 页间距设置
  if (option.margin != null) {
    optStr.push(`margin: ${option.margin};`);
  }
  if (optStr) {
    const elem = document.createElement('style');
    elem.id = printOptionId;
    elem.setAttribute('type', 'text/css');
    elem.setAttribute('media', 'print');
    elem.innerHTML = `@page { ${optStr.join('')} }`;
    document.body.appendChild(elem);
  }

  // 隐藏打印时需要隐藏的内容
  hideElem(option.hide, option.isHideNone);

  // 设置窗口标题
  const oldTitle = document.title;
  if (option.title) {
    document.title = option.title;
  }

  let pWin;
  if (!option.blank) {
    // 当前窗口打印
    pWin = window;
    if (option.iePreview !== false && isIE()) {
      if (!document.getElementById('WebBrowser')) {
        const elem = document.createElement('object');
        elem.id = 'WebBrowser';
        elem.setAttribute('classid', 'clsid:8856F961-340A-11D0-A96B-00C04FD705A2');
        elem.style.display = 'none';
        document.body.appendChild(elem);
      }
      try {
        window['WebBrowser'].ExecWB(7, 1);
      } catch (e) {
        console.error(e);
        pWin.print();
      }
    } else {
      pWin.print();
    }
  } else {
    // 新窗口打印
    pWin = window.open('', '_blank');
    if (pWin) {
      pWin.focus();
      // 写入内容到打印窗口
      const pDoc = pWin.document;
      if (pDoc) {
        pDoc.open();
        let html = '<!DOCTYPE html>' + document.getElementsByTagName('html')[0]?.outerHTML;
        // 去除 js
        html = html.replace(/<script/g, '<div style="display:none;" ').replace(/<\/script>/g, '</div>');

        const addHtml = function (str) {
          html = html.replace(/<\/html>/, `${str}</html>`);
        };

        if (option.iePreview !== false && isIE()) {
          if (!document.getElementById('WebBrowser')) {
            addHtml(ieWebBrowser);
          }
          addHtml(`
          <script>
            window.onload = function() {
              try {
                window.WebBrowser.ExecWB(7,1);
              } catch(e) {
                console.error(e);
                window.print();
              }
              ${option.close !== false ? 'window.close();' : ''}
            }
          </script>
          `);
        } else {
          addHtml(`
          <script>
            window.onload = function() {
              window.print();
              ${option.close !== false ? 'window.close();' : ''}
            }
          </script>
          `);
        }

        pDoc.write(html);
        pDoc.close();
      }
    }
  }

  // 恢复窗口标题
  if (option.title) {
    document.title = oldTitle;
  }

  // 恢复隐藏的内容
  showElem(option.hide);

  return pWin;
}

/**
 * 打印任意内容
 * @param option
 */
export function printHtml(option) {
  if (option.loading !== false && option.blank !== true) {
    showLoading();
  }

  // 创建打印窗口
  let pWin, pDoc;
  if (option.blank || (option.iePreview !== false && isIE())) {
    // 新窗口打印
    pWin = window.open('', '_blank');
    pDoc = pWin?.document;
  } else {
    // 当前窗口打印
    const pFrame = getPrintFrame();
    pWin = pFrame.contentWindow;
    pDoc = pFrame.contentDocument || pWin?.document;
  }

  if (pWin) {
    // 让打印窗口获取焦点
    pWin.focus();
    // 写入内容到打印窗口
    if (pDoc && option.html) {
      pDoc.open();
      pDoc.write(`
        <!DOCTYPE html>
        <head>
          <meta charset="UTF-8"/>
          <title>${option.title ?? ''}</title>
          <style>
            ${getCommonCss(true)}
          </style>
          ${option.style ?? ''}
        </head>
        <html>
        <body>
          ${addHeaderFooter(option.html, option.header, option.footer)}
          ${getOptionHtml(option)}
        </body>
        </html>
      `);
      pDoc.close();
    }
  }
  return pWin;
}

/**
 * 分页打印
 * @param option PrintPageOption
 */
export function printPage(option) {
  if (option.loading !== false && option.blank !== true) {
    showLoading();
  }

  // 创建打印窗口
  let pWin, pDoc;
  if (option.blank || (option.iePreview !== false && isIE())) {
    // 新窗口打印
    pWin = window.open('', '_blank');
    pDoc = pWin?.document;
  } else {
    // 当前窗口打印
    const pFrame = getPrintFrame();
    pWin = pFrame.contentWindow;
    pDoc = pFrame.contentDocument || pWin?.document;
  }

  if (pWin && pDoc) {
    // 让打印窗口获取焦点
    pWin.focus();
    // 写入内容到打印窗口
    const content = option.pages?.map(h => `<div class="guns-printer-page-item">${h}</div>`).join('') ?? '';
    const pageClass = 'guns-printer-page' + (option.isDebug ? ' guns-printer-debug' : '');
    const contentHtml = `<div class="${pageClass}">${content}</div>`;
    pDoc.open();
    pDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8"/>
          <title>${option.title ?? ''}</title>
          ${getPageStyleHtml(option.padding, option.width, option.height)}
          ${option.style ?? ''}
        </head>
        <body>
        ${addHeaderFooter(contentHtml, option.header, option.footer)}
        ${getOptionHtml(option)}
        </body>
      </html>
    `);
    pDoc.close();
  }
  return pWin;
}

/**
 * 打印 pdf
 * @param option PrintPdfOption
 */
export function printPdf(option) {
  if (option.loading !== false) {
    showLoading();
  }
  const pFrame = getPrintFrame();
  const pWin = pFrame.contentWindow;
  pFrame.onload = () => {
    if (!pFrame.getAttribute('src')) {
      return;
    }
    pFrame.focus();
    option.before && option.before();
    pWin?.print();
    hideLoading();
    option.done && option.done();
  };

  // 开始打印
  function doPrint(arraybuffer) {
    const localPdf = new window.Blob([arraybuffer], {
      type: 'application/pdf'
    });
    // 兼容 IE
    if (window.navigator && window.navigator['msSaveOrOpenBlob']) {
      window.navigator['msSaveOrOpenBlob'](localPdf, 'print.pdf');
      hideLoading();
    } else {
      pFrame.setAttribute('src', window.URL.createObjectURL(localPdf));
    }
  }

  // 请求 pdf 数据
  if (option.arraybuffer) {
    doPrint(option.arraybuffer);
  } else if (option.url) {
    const req = new window.XMLHttpRequest();
    req.open('GET', option.url, true);
    req.responseType = 'arraybuffer';
    req.onload = () => {
      if ([200, 201].indexOf(req.status) === -1) {
        return option.error && option.error(req.status, req.statusText);
      }
      doPrint(req.response);
    };
    req.send();
  }
  return pWin;
}

/**
 * 生成表格 html
 * @param data 数据
 * @param cols 列配置
 */
export function makeTable(data, cols) {
  // 恢复 cols 参数初始状态
  cols.forEach(col => {
    col.forEach(c => {
      c.INIT_OK = void 0;
      c.key = void 0;
      c.colGroup = void 0;
      c.HAS_PARENT = void 0;
      c.parentKey = void 0;
      c.PARENT_COL_INDEX = void 0;
    });
  });

  // cols 转为嵌套结构
  const colArrays = [];
  let colIndex = 0;
  for (let i1 = 0; i1 < cols.length; i1++) {
    const item1 = cols[i1];
    for (let i2 = 0; i2 < item1.length; i2++) {
      const item2 = item1[i2];
      if (!item2) {
        item1.splice(i2, 1);
        continue;
      }
      // 合并单元格处理
      item2.key = i1 + '-' + i2;
      let CHILD_COLS = void 0;
      if (item2.colGroup || (item2.colspan && item2.colspan > 1)) {
        item2.colGroup = true;
        CHILD_COLS = [];
        colIndex++;
        let childIndex = 0;
        for (let i22 = 0; i22 < cols[i1 + 1].length; i22++) {
          const item22 = { ...cols[i1 + 1][i22] };
          if (item22.HAS_PARENT || (childIndex > 1 && childIndex == item2.colspan)) {
            cols[i1 + 1][i22] = item22;
            continue;
          }
          item22.HAS_PARENT = true;
          item22.parentKey = i1 + '-' + i2;
          item22.key = i1 + 1 + '-' + i22;
          item22.PARENT_COL_INDEX = colIndex;
          CHILD_COLS.push(item22);
          childIndex = childIndex + Number(item22.colspan && item22.colspan > 1 ? item22.colspan : 1);
          cols[i1 + 1][i22] = item22;
        }
      }
      item2.CHILD_COLS = CHILD_COLS;
      if (!item2.PARENT_COL_INDEX) {
        colArrays.push(item2);
      }
      cols[i1][i2] = item2;
    }
  }

  // 遍历嵌套结构 cols 的方法
  const eachCols = function (callback, arr) {
    if (!arr) {
      arr = colArrays;
    }
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      callback && callback(i, item);
      if (item.CHILD_COLS) {
        eachCols(callback, item.CHILD_COLS);
      }
    }
  };

  // 计算表格宽度
  let maxWidth = 1;
  let needSetWidth = true;
  const colgroupHtml = [];
  eachCols((_i, c) => {
    if (!c.colGroup) {
      colgroupHtml.push('<col');
      if (c.width) {
        colgroupHtml.push(` width="${c.width}"`);
      }
      colgroupHtml.push('/>');
      if (c.width && !/\d+%$/.test(String(c.width))) {
        maxWidth += c.width + 1;
      } else {
        needSetWidth = false;
      }
    }
  });

  // 表头
  const thHtml = cols
    .map(cs => {
      const th = cs
        .map(c => {
          return `<th
                    colspan="${c.colspan || 1}"
                    rowspan="${c.rowspan || 1}"
                    align="${c.thAlign || c.align || 'left'}"
                    style="${c.thStyle}">${c.title || ''}
                  </th>`;
        })
        .join('');
      return '<tr>' + th + '</tr>';
    })
    .join('');
  const headHtml = '<thead>' + thHtml + '</thead>';

  // 主体
  const trHtml = data
    .map((d, index) => {
      const tr = ['<tr>'];
      let colIndex = 0;
      eachCols((_i, c) => {
        if (!c.colGroup) {
          const value = c.field ? d[c.field] : '';
          const content = c.templet ? c.templet(d, index, colIndex) : value;
          const align = c.align || 'left';
          tr.push(`<td align="${align}" style="${c.style}">${content}</td>`);
          colIndex++;
        }
      });
      tr.push('</tr>');
      return tr.join('');
    })
    .join('');
  const bodyHtml = '<tbody>' + trHtml + '</tbody>';

  return `<table
            style="width: ${needSetWidth ? maxWidth + 'px' : '100%'};"
            class="guns-printer-table">
            <colgroup>${colgroupHtml.join('')}</colgroup>
            ${headHtml} ${bodyHtml}
          </table>`;
}

/**
 * 打印指定区域
 * @param elem HTMLElement
 * @param option 参数配置
 */
export function printElement(elem, option) {
  if (!elem) {
    return null;
  }
  const bodyChilds = Array.prototype.filter.call(document.body.children, el => {
    if (typeof el?.tagName === 'string' && ['style', 'script', 'link'].includes(el.tagName.toLowerCase())) {
      return false;
    }
    return true;
  });
  hideElem(bodyChilds, true);
  const parntEl = elem.parentNode;
  const nextEl = elem.nextElementSibling;
  document.body.append(elem);
  const pWin = printThis(option);
  if (nextEl) {
    parntEl?.insertBefore(elem, nextEl);
  } else {
    parntEl?.append(elem);
  }
  showElem(bodyChilds);
  return pWin;
}

// 是否可以拖拽
let movableIsUse = false;

/**
 * 弹窗支持拖动
 */
export function useModalMovable() {
  if (movableIsUse) {
    return;
  }
  movableIsUse = true;
  document.removeEventListener('mousedown', modalMovableListener);
  document.addEventListener('mousedown', modalMovableListener);
}

/**
 * 监听弹框移动
 * @param {*} event
 * @returns
 */
export function modalMovableListener(event) {
  const headerEl = queryParentByClass(event.target, 'ant-modal-header');
  if (!headerEl) {
    return;
  }
  const modalEl = headerEl.parentNode?.parentNode;
  const wrapEl = modalEl?.parentNode;
  const wrapClass = wrapEl?.classList;
  const moveOut = wrapClass?.contains('guns-modal-move-out');
  const moveOutPositive = wrapClass?.contains('guns-modal-move-out-positive');
  const multiple = wrapClass?.contains('guns-modal-multiple');
  if (!wrapClass?.contains('guns-modal-movable') && !moveOut) {
    return;
  }
  modalEl.style.userSelect = 'none';
  initModalStyle(modalEl);
  // 获取原始位置
  const downX = event.clientX;
  const downY = event.clientY;
  const downOL = modalEl.offsetLeft;
  const downOT = modalEl.offsetTop;

  // 鼠标移动事件
  const mousemoveFn = function (e) {
    let l = e.clientX - downX + downOL;
    let t = e.clientY - downY + downOT;
    // 边界判断
    if (!moveOut) {
      const limitL = wrapEl.clientWidth - modalEl.clientWidth - 1;
      if (l < 0) {
        l = 0;
      } else if (l > limitL) {
        l = limitL;
      }
      const limitT = wrapEl.clientHeight - modalEl.clientHeight - 1;
      if (t > limitT) {
        t = limitT;
      }
      if (t < 0) {
        t = 0;
      }
    } else if (moveOutPositive) {
      const limitL = wrapEl.clientWidth - 50;
      if (l < 0) {
        l = 0;
      } else if (multiple && l > limitL) {
        l = limitL;
      }
      const limitT = wrapEl.clientHeight - 50;
      if (multiple && t > limitT) {
        t = limitT;
      }
      if (t < 0) {
        t = 0;
      }
    }
    // 移动 dialog
    modalEl.style.left = l + 'px';
    modalEl.style.top = t + 'px';
    modalEl.style.transformOrigin = 'center';
  };

  // 鼠标抬起事件
  const mouseupFn = function () {
    modalEl.style.userSelect = '';
    document.removeEventListener('mousemove', mousemoveFn);
    document.removeEventListener('mouseup', mouseupFn);
  };

  // 添加鼠标事件监听
  document.addEventListener('mousemove', mousemoveFn);
  document.addEventListener('mouseup', mouseupFn);
}

/**
 * 初始化 modal 样式
 */
export function initModalStyle(modalEl) {
  modalEl.style.top = modalEl.offsetTop + 'px';
  modalEl.style.left = modalEl.offsetLeft + 'px';
  modalEl.style.bottom = 'auto';
  modalEl.style.right = 'auto';
  modalEl.style.margin = '0';
  modalEl.style.position = 'relative';
  modalEl.style.display = 'inline-block';
  modalEl.style.verticalAlign = 'top';
}

/**
 * 查找最近的父元素
 * @param el 目标元素
 * @param parentClass 父元素class
 */
export function queryParentByClass(el, parentClass, stopHandle) {
  if (el == null || el === document) {
    return;
  }
  if (el.classList?.contains(parentClass)) {
    return el;
  }
  if (stopHandle && stopHandle(el) === true) {
    return;
  }
  return queryParentByClass(el.parentNode, parentClass);
}

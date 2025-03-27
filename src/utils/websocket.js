import { getRandomNumber } from '@/utils/common/util'
/**
 * websocket类，进行websocket交互
 *
 * @author fengshuonan
 * @date 2021/6/11 14:22
 */
export class GunsWebsocket {
  /**
   * 构造函数
   *
   * @param {string} webSocketUrl    连接url
   * @author fengshuonan
   * @date 2021/6/11 14:22
   */
  constructor(webSocketUrl) {
    this.version = '1.0';

    // websocket连接实例
    this.webSocketInstance = null;

    // websocket连接url
    this.webSocketUrl = webSocketUrl;

    // 第一次数据交互标识
    this.firstDataFlag = true;

    // 当前会话的唯一id（服务端返回的）
    this.socketId = '';
    //
    this.heartbeatInterval = 5000;
    this.heartbeatTimer = null;
    this.connected = false;
  }

  /**
   * 初始化连接方法，打开websocket连接
   *
   * 使用此方法注意两点：
   * 第1点：参数传递回调函数
   * 第2点：initWebSocket().then(()={ //then里边接收到socketId，并调用后端接口告诉后端开始返回给socket哪些数据 })
   *
   * @param messageReceiveCallback 此参数传递接收到后端websocket的数据的回调函数
   * @author fengshuonan
   * @date 2021/6/11 14:47
   */
  initWebSocket(messageReceiveCallback) {
    // 判断浏览器是否支持websocket
    let agreeWebSocketFlag = window.WebSocket || window.MozWebSocket || 0;
    if (!agreeWebSocketFlag) {
      console.error('您的浏览器不支持WebSocket');
      return;
    }

    // // 创建初始化连接，并设置监听事件
    let webSocketUrl = this.webSocketUrl + '/' + getRandomNumber(8);
    this.webSocketInstance = new WebSocket(webSocketUrl);
    // // 方法的返回是一个Promise对象，为了拿到这次会话的唯一id
    return new Promise(resolve => {
      // 监听 WebSocket 的打开事件
      this.webSocketInstance.addEventListener('open', () => {
        console.log('WebSocket 已连接');
        this.connected = true;

        // 设置定时器，每隔 heartbeatInterval 毫秒发送一次心跳消息
        this.heartbeatTimer = setInterval(() => {
          this.send('PING');
        }, this.heartbeatInterval);
      });

      // 监听 WebSocket 的关闭事件
      this.webSocketInstance.addEventListener('close', () => {
        console.log('WebSocket 已关闭');
        this.connected = false;

        // 清除定时器
        clearInterval(this.heartbeatTimer);
      });
      // 监听 WebSocket 的消息事件
      this.webSocketInstance.addEventListener('message', event => {
        if (event.data != 'pong') {
          // 处理收到的消息
          messageReceiveCallback(JSON.parse(event.data));
        }
      });
    });
  }

  /**
   * 向连接发送数据
   *
   * @author majinaguo
   * @date 2021/6/15 11:07
   */
  send(data) {
    let currentWebSocketInstance = this.webSocketInstance;
    if (currentWebSocketInstance) {
      currentWebSocketInstance.send(data);
    } else {
      console.error('WebSocket实例不存在，请先建立连接');
    }
  }

  /**
   * 关闭连接
   *
   * @author fengshuonan
   * @date 2021/8/25 15:12
   */
  close() {
    let currentWebSocketInstance = this.webSocketInstance;
    if (currentWebSocketInstance) {
      currentWebSocketInstance.close();
    } else {
      console.error('WebSocket实例不存在，请先建立连接');
    }

    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
    }
  }
}

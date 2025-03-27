import { createApp } from 'vue';  // 使用 createApp 来创建应用实例
import App from './App.vue';      // 导入你自己的根组件
import Button from './components/button/index.vue';
export const components = {
    Button
};

export const install = (app) => {
  Object.keys(components).forEach((key) => {
    app.component(`zc-${key.toLowerCase()}`, components[key]);
  });
};
export default {
    install,
}

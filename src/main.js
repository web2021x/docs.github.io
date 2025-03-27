import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from "./router";
import './styles/index.less'
//把全局注册的组件引入
import { install } from './index'
createApp(App).use(Antd).use(install).use(router).mount('#app')

// ii//
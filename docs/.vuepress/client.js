import { defineClientConfig } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
// import CustomComponent from './theme/components-doc/Custom.vue'
import { ConfigProvider } from 'ant-design-vue'
import Antd from 'ant-design-vue';
import ApiTable from "./components/ApiTable.vue";
import './theme/styles/custom.css'

// 将 Ant Design Vue 的样式放在最后加载
import 'ant-design-vue/dist/antd.css';
import {install} from "../../src/index.js";
import commonTable from '../../src/components/table/index.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('ApiTable', ApiTable)
    app.component('commonTable', commonTable)
    // built-in components-doc
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components-doc
    // app.component('CustomComponent', CustomComponent)
    // app.component('DemoContainer', DemoContainer);

    app.use(Antd);
    app.use(install);
  },
})

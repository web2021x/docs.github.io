import { defineClientConfig } from 'vuepress/client'
import Tabs from '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/node_modules/vuepress-plugin-md-power/lib/client/components/Tabs.vue'
import CodeTabs from '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/node_modules/vuepress-plugin-md-power/lib/client/components/CodeTabs.vue'
import Plot from '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/node_modules/vuepress-plugin-md-power/lib/client/components/Plot.vue'
import FileTreeItem from '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/node_modules/vuepress-plugin-md-power/lib/client/components/FileTreeItem.vue'
import VPDemoBasic from '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/node_modules/vuepress-plugin-md-power/lib/client/components/VPDemoBasic.vue'
import VPDemoNormal from '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/node_modules/vuepress-plugin-md-power/lib/client/components/VPDemoNormal.vue'

import '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/node_modules/vuepress-plugin-md-power/lib/client/styles/index.css'

export default defineClientConfig({
  enhance({ router, app }) {
    app.component('Tabs', Tabs)
    app.component('CodeTabs', CodeTabs)
    app.component('Plot', Plot)
    app.component('FileTreeItem', FileTreeItem)
    app.component('VPDemoBasic', VPDemoBasic)
    app.component('VPDemoNormal', VPDemoNormal)
  }
})

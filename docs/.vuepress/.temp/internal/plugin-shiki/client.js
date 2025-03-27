import { enhanceTwoslash } from '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/node_modules/@vuepress-plume/plugin-shikiji/lib/client/composables/twoslash.js'
import { useCopyCode } from '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/node_modules/@vuepress-plume/plugin-shikiji/lib/client/composables/copy-code.js'
import { useCollapsedLines } from '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/node_modules/@vuepress-plume/plugin-shikiji/lib/client/composables/collapsed-lines.js'

export default {
  enhance({ app }) {
    enhanceTwoslash(app)
  },
  setup() {
    useCopyCode({
      selector: __CC_SELECTOR__,
      duration: __CC_DURATION__,
    })
    useCollapsedLines()
  },
}

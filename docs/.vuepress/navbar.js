import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '组件库', link: '/components/doc/README.md' },
  { text: 'markdown语法', link: '/preview/markdown.md' },
])

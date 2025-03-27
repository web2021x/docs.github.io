import { App, Plugin } from 'vue'

export const install: (app: App) => void

export const Button: Plugin

declare const _default: {
  install: typeof install
}

export default _default

// 全局组件类型声明
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Button: typeof Button
  }
} 
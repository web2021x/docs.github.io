<template><div><h4 id="使用组件" tabindex="-1"><a class="header-anchor" href="#使用组件"><span>使用组件</span></a></h4>
<div class="language-vue line-numbers-mode" data-ext="vue" data-title="vue"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span class="space"> </span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">zc-button</span><span class="space"> </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">primary</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">点击我</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">zc-button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><VPDemoBasic type="vue">
    <DemoIndex_vue />
    <template #code>
      <div class="language-vue line-numbers-mode" data-ext="vue" data-title="vue"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span class="space"> </span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span class="space"> </span><span class="space"> </span><span class="space"> </span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">zc-button</span><span class="space"> </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">primary</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666">@</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">btnClick</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">btn1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">点击我</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">zc-button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span class="space"> </span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span class="space"> </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">setup</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span class="space"> </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">const</span><span class="space"> </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">btn1</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666">=></span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span class="space"> </span><span class="space"> </span><span class="space"> </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">按钮1</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">style</span><span class="space"> </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">lang</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">scss</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span class="space"> </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">scoped</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>
    </template>
  </VPDemoBasic><h3 id="api" tabindex="-1"><a class="header-anchor" href="#api"><span>api</span></a></h3>
<ApiTable
title="API"
:columns="['参数', '说明', '类型', '默认值']"
:data="[
['block', '将按钮宽度调整为其父宽度的选项', 'boolean', 'false', ],
['danger', '设置危险按钮', 'boolean', 'false', ],
['disabled', '按钮失效状态', 'boolean', 'false', ],
['ghost', '幽灵属性，使按钮背景透明', 'boolean', 'false', ],
['href', '点击跳转的地址，指定此属性 button 的行为和 a 链接一致', 'string', '-', ],
['htmlType', '设置 button 原生的 type 值，可选值请参考 HTML 标准', 'string', 'button', ],
['icon', '设置按钮的图标类型', 'v-slot', '-', ],
['loading', '设置按钮载入状态', 'boolean | { delay: number }', 'false', ],
['shape', '设置按钮形状', 'default | circle | round', 'default', ],
['size', '设置按钮大小', 'large | middle | small', 'middle', ],
['target', '相当于 a 链接的 target 属性，href 存在时生效', 'string', '-', ],
['type', '设置按钮类型', 'primary | ghost | dashed | link | text | default', 'default', ]
]"
/>
<h3 id="事件" tabindex="-1"><a class="header-anchor" href="#事件"><span>事件</span></a></h3>
<ApiTable title="API":columns="['事件名称', '说明', '回调参数']"
:data="[
['btnClick', '点击按钮时的回调	',' (event) => void'],
]"/></div></template>


<script setup>
import DemoIndex_vue from '/Users/xieyuqing/Desktop/未命名文件夹/组件库以及组件库文档/zc-doc_副本/docs/components/vueComp/button/index.vue';
</script>
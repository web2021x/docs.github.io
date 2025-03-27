<template>
  <div>
      <a-button :type="type" :block="block" :danger="danger" @click="btnClick">
        <slot>按钮</slot>
      </a-button>
  </div>
</template>

<script setup>
const emits = defineEmits([
    'btnClick',

])
const btnClick = () => {
  emits('btnClick')
}
const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  block:{
    type: Boolean,
    default: false
  },
  danger:{
    type: Boolean,
    default: false
  },
  disabled:{
    type: Boolean,
    default: false
  },
  ghost:{
    type: Boolean,
    default: false
  },
  href:{
    type: String,
    default: ''
  },
  htmlType:{
    type: String,
    default: ''
  },
  icon:{
    type: String,
    default: ''
  },
  loading:{
    type: Boolean,
    default: false
  },
  shape:{
    type: String,
    default: ''
  },
  size:{
    type: String,
    default: ''
  },
  target:{
    type: String,
    default: ''
  },
});


</script>

<style lang="scss" scoped>

</style>
<template>
  <div>
    <zc-button type="primary" @btnClick="btn1">点击我</zc-button>
  </div>
</template>

<script setup>
 const btn1 = () => {
   console.log('按钮1')
 }
</script>

<style lang="scss" scoped>

</style>
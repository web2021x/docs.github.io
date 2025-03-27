<template>
  <div style="display: flex;align-items: center;justify-content: center;height: 100vh">
    <h1>写组件的话,在router里添加路由页面测试就可以</h1>

  </div>
</template>

<script setup>
const pagination= {
  current: 1,
  pageSize: 10,
  total: 2,
}
 const dataSource=[
   {
     key: '1',
     name: '小王',
     age: 32,
     address: '西湖区湖底公园1号',
   },
   {
     key: '2',
     name: '小李',
     age: 42,
     address: '西湖区湖底公园1号',
   },
 ]
  const columns=[
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ]

</script>

<style lang="scss" scoped>

</style>
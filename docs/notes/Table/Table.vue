<template>
  <div style="height: 300px;width: 100%">
    <zc-table bordered :columns="columns" :data-source="dataSource"  rowId="name" :pagination="pagination">
      <template #bodyCell="{column,record}">
        <span v-if="column.title==='操作'" >
          <a-button type="link" @click="()=>{console.log('编辑',record)}">编辑</a-button>
          <a-button type="link" @click="()=>{console.log('删除',record)}">删除</a-button>
        </span>
      </template>
    </zc-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const spanCol= { span: 12 }
const where= ref({
  searchText: '',
  statusFlag: '',
})
const superSearch= ref(false)
const labelCol=ref( { span: 6 })
const wrapperCol= ref({ span: 18 })
const statusList= ref([
  { id: 1, name: '状态1' },
  { id: 2, name: '状态2' },
  { id: 3, name: '状态3' },
])
const changeSuperSearch= () => {
  superSearch.value = !superSearch.value
}
const reload= () => {
  console.log('reload')
}
const clear= () => {
  console.log('clear')
}
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
      align: 'center',

    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center',

    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      align: 'center',

    },
    {
      title: '操作',
      align: 'center',
    },
  ]
</script>

<style lang="scss" scoped>

</style>
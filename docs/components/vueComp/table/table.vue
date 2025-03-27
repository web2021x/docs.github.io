<template>
  <h4>Demo1:常规表格</h4>
  <div style="height:350px;width: 100%">
    <common-table :columns="columns" :dataSource="data">
    </common-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    slots: { customRender: 'action' },
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const where = ref({
  searchText: '',
  statusFlag: '',
});
const superSearch = ref(false);

const labelCol = ref({ span: 6 });
const wrapperCol = ref({ span: 18 });

</script>

<style lang="scss" scoped>

</style>
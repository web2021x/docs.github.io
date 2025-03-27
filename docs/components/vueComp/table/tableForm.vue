<template>
  <h4>Demo2:带搜索的表格</h4>
  <div style="height:450px;width: 100%">
    <common-table :columns="columns" :dataSource="data">
      <template #toolLeft>
        <a-input
            v-model:value="where.searchText"
            :bordered="false"
            allowClear
            placeholder="姓名、账号（回车搜索）"
            @pressEnter="reload"
            style="width: 240px"
            class="search-input"
        >
          <template #prefix>
            <icon-font iconClass="icon-opt-search"/>
          </template>
        </a-input>
        <a-divider type="vertical" class="divider"/>
        <a @click="changeSuperSearch">{{ superSearch ? '收起' : '高级筛选' }} </a>
      </template>
      <template #toolBottom>
        <div class="super-search" style="margin-top: 8px" v-if="superSearch">
          <a-form :model="where" :labelCol="labelCol" :wrapper-col="wrapperCol">
            <a-row :gutter="10">
              <a-col  :span="8">
                <a-form-item label="状态:">
                  <a-select v-model:value="where.statusFlag" placeholder="请选择状态" style="width: 100%" allowClear>
                    <a-select-option :value="item.id" v-for="item in statusList" :key="item.id">{{
                        item.name
                      }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col  :span="8">
                <a-form-item label="姓名:">
                  <a-input v-model:value="where.searchText2" placeholder="请输入姓名" style="width: 100%" allowClear/>
                </a-form-item>
              </a-col>
              <a-col  :span="8">
                <a-form-item label="住址:">
                  <a-input v-model:value="where.searchText3" placeholder="请输入住址" style="width: 100%" allowClear/>
                </a-form-item>
              </a-col>
              <a-col  :span="8">
                <a-form-item label="手机号:">
                  <a-input v-model:value="where.searchText4" placeholder="请输入手机号" style="width: 100%" allowClear/>
                </a-form-item>
              </a-col>
<!--              <a-col  :span="8">-->
<!--                <a-form-item label="条件4:">-->
<!--                  <a-select v-model:value="where.statusFlag" placeholder="请选择状态" style="width: 100%" allowClear>-->
<!--                    <a-select-option :value="item.id" v-for="item in statusList" :key="item.id">{{-->
<!--                        item.name-->
<!--                      }}-->
<!--                    </a-select-option>-->
<!--                  </a-select>-->
<!--                </a-form-item>-->
<!--              </a-col>-->
              <a-col  :span="8">
                <a-form-item label="">
                  <a-button type="primary" @click="reload">查询</a-button>
                  <a-button @click="clear">重置</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'name'">
          <a >{{ record.name }}</a>
        </template>
        <template v-if="column.dataIndex == 'age'">
          <a >{{record.age}}岁</a>
        </template>
      </template>
    </common-table>

  </div>
</template>

<script setup>
import { ref } from 'vue';
const statusList = [
  { id: '0', name: '正常' },
  { id: '1', name: '禁用' },
];
const changeSuperSearch = () => {
  superSearch.value = !superSearch.value;
};
const reload = () => {
  console.log('reload');
};
const clear = () => {
  console.log('clear');
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    align: 'center',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100,
    align: 'center',

  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
    align: 'center',

  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    slots: { customRender: 'action' },
    align: 'center',
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
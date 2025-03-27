<template>
  <div style="height: 300px;width: 100%">
    <zc-table :columns="columns" :data-source="dataSource"  rowId="name" :pagination="pagination">
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
              <a-col  :span="6">
                <a-form-item label="状态:">
                  <a-select v-model:value="where.statusFlag" placeholder="请选择状态" style="width: 100%" allowClear>
                    <a-select-option :value="item.id" v-for="item in statusList" :key="item.id">{{
                        item.name
                      }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col  :span="6">
                <a-form-item label="条件2:">
                  <a-select v-model:value="where.statusFlag" placeholder="请选择状态" style="width: 100%" allowClear>
                    <a-select-option :value="item.id" v-for="item in statusList" :key="item.id">{{
                        item.name
                      }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col  :span="6">
                <a-form-item label="条件3:">
                  <a-select v-model:value="where.statusFlag" placeholder="请选择状态" style="width: 100%" allowClear>
                    <a-select-option :value="item.id" v-for="item in statusList" :key="item.id">{{
                        item.name
                      }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col  :span="6">
                <a-form-item label="条件4:">
                  <a-select v-model:value="where.statusFlag" placeholder="请选择状态" style="width: 100%" allowClear>
                    <a-select-option :value="item.id" v-for="item in statusList" :key="item.id">{{
                        item.name
                      }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col  :span="6">
                <a-form-item label="条件4:">
                  <a-select v-model:value="where.statusFlag" placeholder="请选择状态" style="width: 100%" allowClear>
                    <a-select-option :value="item.id" v-for="item in statusList" :key="item.id">{{
                        item.name
                      }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
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
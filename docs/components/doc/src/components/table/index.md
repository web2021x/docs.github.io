# 表格

#### 使用组件

````vue
<div>
    <common-table :columns="columns" :datasource="datasource" :where="where"></common-table>
</div>
<script setup>
  import {ref} from 'vue'
  //表头配置
  const columns =ref(
      [
          {title: '姓名', key: 'name', width: 100},
      ]
  )
  //表格数据   
  const datasource = ref(
      [
          {name: '张三'}
      ]
  )
  //搜索条件
  const where = ref(
      {
        orgId: null, statusFlag: null, searchText: ''
      }
  );
</script>
````
@[demo vue   ](../../../../vueComp/table/table.vue)
### {#tableForm}
@[demo vue ](../../../../vueComp/table/tableForm.vue)
### api
<ApiTable title="API":columns="['参数', '说明', '类型', '默认']"
:data="[
        ['columns', '表头配置 <a href=\'#column-detail\' >详情</a>', 'Array[obj]', '[]'],
        ['dataSource', '表格数据', 'Array', '[]'],
        ['where', '表单搜索条件', 'Object', '{}'],
        ['url', '列表接口地址', 'String', ''],
        ['methods', '请求方式', 'String', 'get'],
        ['isSort', '是否排序', 'Boolean', 'false'],
        ['bordered', '是否显示border', 'Boolean', 'false'],
        ['isPage', '是否展示分页', 'Boolean', 'true'],
        ['isInit', '是否在初始化的时候调用接口', 'Boolean', 'true'],
        ['rowSelection', '是否多选', 'Boolean', 'false'],
        ['isShowRowSelect', '是否开启当行选中', 'Boolean', 'false'],
        ['size', '表格大小', 'String', 'small'],
        ['checkStrictly', '父子是否关联--用于树形', 'Boolean', 'false'],
        ['customData', '自定义数据', 'Function', ''],
        ['dataSource', '数组列表(不推荐使用,推荐使用url搭配where)', 'Array', '[]'],
        ['isLoad', 'loading效果', 'Boolean', 'true'],
        ['selection', '多选选中数据', 'Array', []],
        ['defaultExpandedRowKeys', '默认展开的行', 'Array', []],
        ['expandedRowKeys', '展开的行控制属性', 'Array', []],
        ['childrenColumnName', 'children 名称', 'String', children],
        ['montageParams', '是否拼接参数到url上', 'Boolean', false],
        ['height100', '100%高度', 'Boolean', true],
]"/>

### events
<ApiTable title="事件":columns="['事件名称', '说明', '回调参数']" 
:data="[
    ['onSelect', '用户手动选择/取消选择某列的回调','Function(record, selected, selectedRows)'],
    ['onSelectAll', '用户手动选择/取消选择所有列的回调','Function(selected, selectedRows, changeRows)'],
    ['customRowClick', '行点击事件','Function( record, index)'],
    ['getTotal', '总条数','Function(总条数或者0)'],
]"/>

### columns 配置  {#column-detail}
[查看全部配置](https://3x.antdv.com/components/table-cn#Column) 

<ApiTable title="事件":columns="['参数', '说明', '类型','默认']"
:data="[
['title', '		列头显示文字','String','-'],
['width', '		列宽度','String|number','-'],
['align', '	设置列的对齐方式','left | right | center','left'],
['ellipsis', '	超过宽度将自动省略','boolean | { showTitle?: boolean }','false'],
]"/>

### 插槽
<ApiTable title="事件":columns="['名称', '说明']"
:data="[
['toolLeft', '详见Demo2'],
['toolBottom', '详见Demo2'],
['bodyCell', '详见Demo2'],
]"/>
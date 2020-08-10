<template>
  <div class="home">
    <h1>自构form表单的封装</h1>
    <FormCom :formItems="formItems" :coopBtns="coopBtns" />
    <HelloWorld id="123" />
    <h1><strong>重构 table 标签</strong></h1>
    <TableComRep
      :tableData="tableData"
      :tableHeader="tableHeaderRep"
      :style="{marginBottom: '5em'}"
    >
      <template #coop="{scope}">
        <el-link
          type="primary"
          @click="pub(scope.$index, scope.row)"
        >发布采购任务</el-link>
      </template>
      <template #mControl="{scope}">
        <div
          v-if="!scope.row[scope.column.property].edit"
          @dblclick="handle(scope.$index, scope.column.property, true)"
        >{{scope.row[scope.column.property].value?scope.row[scope.column.property].value:'编辑'}}</div>
        <el-input
          @blur="handle(scope.$index, scope.column.property, false)"
          :autofocus="true"
          v-else
          type="primary"
        ></el-input>
      </template>
      <!-- 多级表头的 插槽 -->
      <template #multiple="{scope}">
        <div v-if="scope.column.property === 'test2'">
          {{scope.column.property}}
        </div>
      </template>
    </TableComRep>
    <!-- <ul>
      <li v-for="(item,key) of list" :key="key" class="test">{{item.low}}</li>
    </ul> -->
    <table-com
      :tableData="tableData"
      :tableHeader="tableHeader"
      ref="table"
    >
      <template #coop="{scope}">
        <el-link
          type="primary"
          @click="pub(scope.$index, scope.row)"
        >发布采购任务</el-link>
      </template>
      <template #mControl="{scope}">
        <div
          v-if="!scope.row[scope.column.property].edit"
          @dblclick="handle(scope.$index, scope.column.property, true)"
        >{{scope.row[scope.column.property].value?scope.row[scope.column.property].value:'编辑'}}</div>
        <el-input
          @blur="handle(scope.$index, scope.column.property, false)"
          :autofocus="true"
          v-else
          type="primary"
        ></el-input>
      </template>
      <!-- 多级表头的 插槽 -->
      <template #multiple="{scope}">
        <div>
          <!-- 本来就属于 test2 的 自定义样式 -->
          <el-link
            v-if="scope.scope.column.property === 'test2'"
            type="primary"
            @click="pub(scope.scope.$index, scope.scope.row)"
          >test</el-link>
          <div v-else>另外的</div>
        </div>
      </template>
    </table-com>
  </div>
</template>

<script>
// @ is an alias to /src
import tableCom from '@/components/TableCom/index'
import HelloWorld from "@/components/HelloWorld.vue";
import TableComRep from '@/components/TableComRep/index'
import FormCom from '@/components/FormCom/index'

/* formCom 的 参数 */
const formItems = [
  {
    component: 'input',
    itemAttrs: {
      label: '第一个input'
    },
    attrs: {
      key: 'first',
      value: '初始值'
    }
  },
  {
    component: 'inputNumber',
    itemAttrs: {
      label: '第一个inputNumber'
    },
    attrs: {
      key: 'second',
      value: 2
    }
  },
  {
    component: 'select',
    itemAttrs: {
      label: '第一个select'
    },
    attrs: {
      key: 'thrid',
      value: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }]
    }
  },
  {
    component: 'datePicker',
    itemAttrs: {
      label: '第一个datePicker'
    },
    attrs: {
      key: 'forth',
      value: ''
    }
  },
  {
    component: 'timePicker',
    itemAttrs: {
      label: '第一个timePicker'
    },
    attrs: {
      key: 'fifth',
      value: ''
    }
  },
  {
    component: 'switch',
    itemAttrs: {
      label: '第一个switch'
    },
    attrs: {
      key: 'sixth',
      value: ''
    }
  },
  {
    component: 'checkbox',
    itemAttrs: {
      label: '第一个checkbox'
    },
    attrs: {
      key: 'seventh',
      value: '',
      label: '复选框'
    }
  },
  {
    component: 'checkboxGroup',
    itemAttrs: {
      label: '第一个checkboxGroup'
    },
    attrs: {
      key: 'eighth',
      value: [],
      options: [{
        label: '黄金糕'
      }, {
        label: '双皮奶'
      }, {
        label: '蚵仔煎'
      }]
    }
  },
  {
    component: 'radio',
    itemAttrs: {
      label: '第一个radio'
    },
    attrs: {
      key: 'nighth',
      value: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }]
    }
  }
]

const coopBtns = [
  {
    attrs: {
      plain: true,
      type: 'error'
    },
    // 自定义方法
    type: 'custom',
    text: '搜索',
    method () {
      console.log('执行了 method');
    }
  },
  {
    attrs: {
      plain: true,
      type: 'primary'
    },
    type: 'reset',
    text: '重置'
  }
]

/* 重构后的 tableHeaderRep 的 数据结构 */
const tableHeaderRep = [
  { attrs: { prop: '', label: '', type: 'selection', width: '50', align: 'center' } },
  { attrs: { prop: 'number', label: '采购包编号' } },
  { attrs: { prop: 'name', label: '采购包名称' } },
  { attrs: { prop: 'desc', label: '采购包概述' } },
  { attrs: { prop: 'user', label: '发起人' } },
  { attrs: { prop: 'createTime', label: '生成时间' } },
  { attrs: { prop: 'modifyTime', label: '变更时间' } },
  { attrs: { prop: 'status', label: '采购包状态' } },
  { attrs: { prop: 'coop', label: '操作' }, custom: true },
  { attrs: { label: '单项控制价', prop: 'mControl' }, custom: true },
  {
    attrs: { prop: 'test', label: 'test' },
    children: [
      {
        attrs: { prop: 'test1', label: 'test1' },
        children: [
          { attrs: { prop: 'test2', label: 'test2' }, custom: true }
        ]
      }
    ]
  }
]
const tableHeader = [
  { prop: '', label: '', type: 'selection' },
  { prop: 'number', label: '采购包编号' },
  { prop: 'name', label: '采购包名称' },
  { prop: 'desc', label: '采购包概述' },
  { prop: 'user', label: '发起人' },
  { prop: 'createTime', label: '生成时间' },
  { prop: 'modifyTime', label: '变更时间' },
  { prop: 'status', label: '采购包状态' },
  { prop: 'coop', label: '操作', custom: true },
  { label: '单项控制价', prop: 'mControl', align: '', custom: true },
  { prop: 'test', label: 'test', children: [{ prop: 'test1', label: 'test1', custom: true, children: [{ props: 'test2', label: 'test2', custom: true }] }] }
]
const tableData = [];
for (let i = 0; i < 4; i++) {
  tableData.push({
    number: '01',
    name: 'XXXXX',
    desc: 'XXXXX',
    user: '杨**',
    createTime: '2020.03.23   10:00:00',
    modifyTime: '2020.03.23   10:00:00',
    status: '共计X个标段 已发布Y个标段采购任务 ',
    mControl: { value: '', edit: false }
  });
}

import { type } from '@/utils'

export default {
  name: "Home",
  components: {
    HelloWorld,
    tableCom,
    TableComRep,
    FormCom
  },
  data () {
    return {
      test: "test",
      list: [],
      tableHeader,
      tableData,
      tableHeaderRep,
      formItems,
      coopBtns
    };
  },
  methods: {
    // 想要获取到 取消请求的方式 必须以 reqIns 结尾
    cacelGetListReqIns (source) {
      // console.log(source, '执行');
      this.$set(this.reqTokenInsConfig, 'cancelGetList', source);
    },
    pub (index, row) {
      console.log(index, row, 'pub')
    },
    handle (index, prop, bool) {
      console.log(index, prop);
      const tempArr = this.tableData;
      /* 如果 bool 是 true，把其他的 关了 */
      if (bool) {
        tempArr.forEach(obj => {
          Object.keys(obj).forEach(key => {
            if (obj[key] instanceof Object) {
              obj[key].edit = false;
            }
          })
        })
      }
      tempArr[index][prop].edit = bool;
      this.$set(this, 'tableData', tempArr);
      this.$refs.table.refresh();
    }
  },
  async mounted () {
    const cofnig = {
      serviceid: 'kline',
      body: {
        marketid: 1,
        stockcode: '002013',
        requesttype: 0,
        applysize: 1000,
        starttime: 20180101,
        wgtflag: 1
      }
    };
    const data = await this.$http.moduleA.getList(cofnig, this.cacelGetListReqIns);
    this.list = data.data.data.slice(0, 11);
    console.log(this.list);
  }
};
</script>
<style lang="scss" scoped>
.test {
  color: $primary-color;
}
</style>

<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    />
    <HelloWorld id="123" />
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
    tableCom
  },
  data () {
    return {
      test: "test",
      list: [],
      tableHeader,
      tableData
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

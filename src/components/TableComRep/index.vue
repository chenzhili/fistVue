<template>
  <el-table
    v-bind="setTableAttrs($attrs)"
    v-on="$listeners"
    :data="tableData"
  >
    <template v-for="column in tableHeader">
      <TableColumn
        :key="column.attrs.prop"
        v-if="!!column.children && !!column.children.length"
        :coloumn-header="column"
      >
        <template #multiple="{scope}">
          <slot
            name="multiple"
            :scope="scope"
          ></slot>
        </template>
      </TableColumn>
      <template v-else>
        <!-- 需要 把 type=selection 的 单独提出来 -->
        <el-table-column
          :key="column.attrs.prop"
          v-if="column.attrs.type === 'selection'"
          v-bind="setColumnAttrs(column.attrs)"
        ></el-table-column>
        <el-table-column
          :key="column.attrs.prop"
          v-else
          v-bind="setColumnAttrs(column.attrs)"
        >
          <template
            slot="header"
            slot-scope="scope"
          >
            <template v-if="column.customHeader">
              <slot
                :name="`${column.attrs.prop}Header`"
                :scope="scope"
              ></slot>
            </template>
            <template v-else>
              <span>{{column.attrs.label}}</span>
            </template>
          </template>
          <!-- 由于不能在 slot 之前 做 v-if 所以 我把 默认 body-cell 都重写了 -->
          <template slot-scope="scope">
            <!-- <template slot-scope="scope"> 这句话 是 body-cell（el-table 暴露的） 的 默认 插槽 -->
            <template v-if="column.custom === true">
              <slot
                :name="column.attrs.prop"
                :scope="scope"
              ></slot>
            </template>
            <template v-else>
              {{scope.row[column.attrs.prop]}}
            </template>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>
<script>
/* 这个组件重写，主要是对于 传参的 灵活性 以及 保持和element上的 绑定属性的 一致性上的 考虑，用到的知识点：
  1、v-bind 直接绑定 对象的用法；
  2、理解 $props 和 $attrs 的 运用 和 区别
  3、$listeners

  <Test
    test="aaa"
    @cilck="()=>{return () => 1}"
    :prop="test"
    :style="{color:'#ff0'}"
  />
  // 不在 组件 内部 显示声明 props 的 都是 $attrs 上的 属性，其他 都属于 $props

  注意：
  <HelloWorld v-bind="$attrs" data="tableData">
    测试 attrs 和 props 中同时有，怎么显示
  </HelloWorld>
  测试的时候证明 当前组件中声明的 data 属性 的 优先级 高于 v-bind="$attrs" 中的 优先级

  在vue3中，跟 声明的顺序相关了，不是 按照 vue2 的方式 处理
*/

/***
 * 
 * 未完成的就是对于 header-cell 的自定义，一样的做法
 * 
 * 
 */
import TableColumn from './TableColumn'
export default {
  name: 'TableComRep',
  components: {
    TableColumn
  },
  data () {
    return {}
  },
  /* 由于 有默认选项 把所有的 值 都在这里处理一层 */
  computed: {
    /**
     * attrs 获取到的attrs
     * :width="item.width || 'auto'"
        :align="item.align || 'center'"
     */
    setColumnAttrs (attrs) {
      return (attrs) => (Object.assign({}, { width: 'auto', align: 'center' }, attrs))
    },
    /* 
      style="width:100%;"
      :class="'table-com'"
      ref="tableRef"
    */
    setTableAttrs (attrs) {
      return (attrs) => (Object.assign({}, { ref: 'tableRef', border: true, style: { width: '100%' } }, attrs))
    }
  },
  mounted () {
    console.log('mounted', this);
    console.log('$props', this.$props);
    console.log('$attrs', this.$attrs);
  },
  props: {
    // table数据 还是 显示 的 声明 必填性
    tableData: {
      type: Array,
      required: true
    },
    // table 表头数据
    tableHeader: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
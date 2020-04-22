<template>
  <el-table
    :data="tableData"
    :border="configDefault.border"
    :row-style="rowStyle"
    :row-class-name="rowClassName"
    :height="height"
    style="width:100%;"
    :class="'table-com'"
    ref="tableRef"
  >
    <template v-for="item in tableHeader">
      <table-column
        v-if="item.children && item.children.length"
        :key="item.prop"
        :coloumn-header="item"
      >
        <template #multiple="{scope}">
          <slot
            name="multiple"
            :scope="scope"
          ></slot>
        </template>
        <!-- 动态 遍历生成 插槽有问题，没解决 -->
        <!-- <template
          v-for="child of item.children"
          v-slot:[child.prop]="{scope}"
        >
          <slot
            :name="child.prop"
            :scope="scope"
          ></slot>
        </template> -->
      </table-column>
      <!-- 对于 操作 类型 -->
      <el-table-column
        v-else-if="item.custom === true"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 'auto'"
        :align="item.align || 'center'"
        :fixed="item.fixed || null"
      >
        <template slot-scope="scope">
          <slot
            :name="item.prop"
            :scope="scope"
          ></slot>
          <!-- <slot name="test"  v-bind:scope="scope"></slot> -->
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 'auto'"
        :align="item.align || 'center'"
        :fixed="item.fixed || null"
        :type="item.type || ''"
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>
import tableColumn from './TableColumn'
/* 单元格 操作 数据 */
export default {
  name: 'tableCom',
  components: {
    tableColumn
  },
  computed: {},
  methods: {
    rowClassName ({ row, rowIndex: index }) {
      return index % 2 ? 'even' : 'odd';
    },
    rowStyle ({ row, rowIndex: index }) {
      /* 当 有用户自定义的 斑马条纹 */
      if (this.configDefault.odd && this.configDefault.even) {
        let background = '#fff';
        background = index % 2 === 0 ? this.configDefault.even : this.configDefault.odd;
        return {
          background
        }
      }
      // console.log(row, index);
    },
    /* 更新当前的table */
    refresh () {
      console.log('执行');
      this.$refs.tableRef.doLayout();
    }
  },
  mounted () {
    // console.log(this.coloumnHeader);
  },
  props: {
    // table数据
    tableData: {
      type: Array,
      required: true
    },
    // table 表头数据
    tableHeader: {
      type: Array,
      required: true
    },
    // 默认配置
    configDefault: {
      type: Object,
      default () {
        return {
          align: 'center',
          // odd: '#ddd',
          // even: '#fff',
          border: true,
          theme: 'primary'
        }
      }
    },
    height: {
      type: String || Number,
      default () {
        return null;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

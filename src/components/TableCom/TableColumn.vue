<template>
  <el-table-column
    :label="coloumnHeader.label"
    :prop="coloumnHeader.prop"
    align="center"
    :fixed="coloumnHeader.fixed || null"
  >
    <template v-for="item in coloumnHeader.children">
      <tableColumn
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
      </tableColumn>
      <!-- <el-table-column v-else :key="item.name" :label="item.label" :prop="item.prop" align="center" :fixed="item.fixed || null"></el-table-column> -->
      <el-table-column
        v-else-if="item.custom"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 'auto'"
        :align="item.align || 'center'"
        :fixed="item.fixed || null"
      >
        <template slot-scope="scope">
          <slot
            name="multiple"
            :scope="{scope}"
          ></slot>
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
  </el-table-column>
</template>

<script>
export default {
  name: 'tableColumn',
  props: {
    coloumnHeader: {
      type: Object,
      required: true
    },
    coop: {
      type: Function,
      default () {
        return () => { }
      }
    }
  },
  mounted () {
    console.log(this.coloumnHeader);
  }
}
</script>

<style lan="scss" scoped>
</style>

<template>
  <el-table-column v-bind="setColumnAttrs(coloumnHeader.attrs)">
    <template v-for="column in coloumnHeader.children">
      <tableColumn
        v-if="!!column.children && !!column.children.length"
        :key="column.prop"
        :coloumn-header="column"
      >
        <template #multiple="{scope}">
          <slot
            name="multiple"
            :scope="scope"
          ></slot>
        </template>
      </tableColumn>
      <template v-else>
        <el-table-column
          :key="column.attrs.prop"
          v-bind="setColumnAttrs(column.attrs)"
        >
          <template slot-scope="scope">
            <template v-if="column.custom === true">
              <slot
                name="multiple"
                :scope="scope"
              ></slot>
            </template>
            <template v-else>
              {{column.attrs.label}}
            </template>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'tableColumn',
  computed: {
    setColumnAttrs (attrs) {
      return (attrs) => (Object.assign({}, { align: 'center' }, attrs))
    }
  },
  props: {
    coloumnHeader: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // console.log(this.coloumnHeader);
  }
}
</script>

<style lan="scss" scoped>
</style>

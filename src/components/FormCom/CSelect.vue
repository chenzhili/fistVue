<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
  >
    <template v-for="option in options">
      <!-- （这里注意value,label必须都要显式的声明否则会报错，因为element组件内部会对传入的属性验证） -->
      <!-- 这个还未测试 -->
      <!-- 20200809 测试 el-option 不需要显示声明 value， label -->
      <el-option
        :key="option.value"
        v-bind="option"
      ></el-option>
    </template>
  </el-select>
</template>
<script>
export default {
  name: 'CSelect',
  data () {
    return {

    }
  },
  computed: {
    
  },
  mounted () {
    /* 这里证明 在 引用组件上 使用 v-model，会给 当前的 组件加上对应 的 prop 和 input 事件 */
    console.log(this.$listeners);
  },
  props: {
    value: {
      require: true
    },
    options: {
      require: true,
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped></style>
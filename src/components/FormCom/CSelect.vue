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
    console.log(this.$attrs);
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
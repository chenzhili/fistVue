<template>
  <el-checkbox-group
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
  >
    <template v-for="(option, index) in options">
      <el-checkbox
        :key="index"
        v-bind="option"
      ></el-checkbox>
    </template>
  </el-checkbox-group>
</template>
<script>
export default {
  name: 'CCheckbox',
  data () {
    return {

    }
  },
  computed: {

  },
  props: {
    value: {
      required: true
    },
    options: {
      required: true,
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped></style>
<template>
  <el-radio-group
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
  >
    <template v-for="(option, index) in options">
      <el-radio
        :key="index"
        v-bind="option"
      ></el-radio>
    </template>
  </el-radio-group>
</template>
<script>
export default {
  name: 'CRadio',
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
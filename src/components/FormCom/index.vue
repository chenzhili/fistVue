<template>
  <el-form
    :ref="name || 'formRef'"
    v-bind="setFormProp"
    v-on="$listeners"
  >
    <el-form-item v-for="(form, index) in formItems" :key="index" v-bind="form.itemAttrs">
      <!-- 有个问题 对于 el-select 组件这种的 处理有问题 -->
      <component :is="form.component" v-bind="form.attrs" v-on="form.listeners"></component>
    </el-form-item>
  </el-form>
</template>
<script>
/*
  设计大致分为以下几个部分

  表单配置项设计
  表单验证
  表单请求
  表单控件之间的联动
  调用后端接口生成表单控件的选项 
*/
/* 
  运用到的 知识点： 对于 vue 内置组件 component 的 用法
  
  衍生的问题：

  请留意，这个 attribute 可以用于常规 HTML 元素，但这些元素将被视为组件，这意味着所有的 attribute 都会作为 DOM attribute 被绑定。对于像 value 这样的 property，若想让其如预期般工作，你需要使用 .prop 修饰器

  .prop 的用法，让 value 绑定到 Property 而不是 attribute
  最后总的来讲就是 HTML属性 (attribute)和 DOM属性(property)，是相互关联的。多数情况attribute值仅用作初始DOM节点对象使用，而property更多用于页面交互，很多框架都是在与元素和指令的 property和事件打交道

*/
/* 
  form 组件 中 需要配置的 传入的属性：
  1、props：
            formItems：form项
            ref：标记当前 组件，内部有个 默认的 不是必填，formRef
  2、attrs：这些就是 el-form 上需要的 相同 属性  或者 方法

  formItem 组件 中 需要配置的 属性
  1、el-form-item 上 -> itemAttrs
  2、form 项上 包括 Input，picker... -> [attrs, listeners]

*/
export default {
  name: 'FormCom',
  data () {
    return {
      
    }
  },
  computed: {
    /* 默认需要的 参数 */
    setFormProp () {
      return Object.assign({},{ inline: true }, this.$attrs)
    }
  },
  props: {
    formItems: {
      require: true,
      type: Array
    },
    /* ref 的名称 */
    name: {
      type: String
    }
  }
}
</script>
<style lang="scss" scoped></style>
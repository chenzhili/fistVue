<template>
  <el-form
    :ref="name || 'formRef'"
    :model="model"
    v-bind="setFormProp"
    v-on="$listeners"
  >
    <el-form-item
      v-for="(item, index) in _formItems"
      :key="index"
      v-bind="item.itemAttrs"
      :prop="item.attrs.key"
    >
      <!-- 有个问题 对于 el-select 组件这种的 处理有问题 -->
      <!-- 就是将 el-select、el-checkbox-group、el-radio-group 都自己分装以 option 传参 方式解决 -->
      <!-- 疑问? ------/> v-model="model[item.attrs.key]" 这句话 实现了 数据的双向绑定，不知道为啥还需要在 c-select 上 绑定 value -->
      <!-- 如何 在 vue 工具中 查看 v-model 是否绑定生效
        vue官网的这句解释了为啥：一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的；
        当我在c-select 组件上 绑定了 v-on="$listeners" 的时候，在 内部 机制 做了 change 事件的 绑定
       -->
      <component
        :is="item.component"
        v-bind="item.attrs"
        v-on="item.listeners"
        v-model="model[item.attrs.key]"
      ></component>
    </el-form-item>
    <el-form-item>
      <el-button @click="test">test</el-button>
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
              [
                {
                  component: 'input',
                  itemAttrs: { // 是 el-form-item 需要的 props
                    
                  },
                  attrs: {  // component 需要的 props
                    key // 是 model 需要的
                    value // 对应的 初始值
                  }
                  
                }
              ]
            ref：标记当前 组件，内部有个 默认的 不是必填，formRef
  2、attrs：这些就是 el-form 上需要的 相同 属性  或者 方法

  formItem 组件 中 需要配置的 属性
  1、el-form-item 上 -> itemAttrs
  2、form 项上 包括 Input，picker... -> [attrs, listeners]

*/
// import CCheckbox from './CCheckbox'
// import CRadio from './CRadio'
// import CSelect from './CSelect'
import { deepClone } from '@/utils'
import formBase from './formBase'
export default {
  name: 'FormCom',
  components: {
    // 顺便测试下 异步加载 组件
    CCheckbox: import('./CCheckbox'),
    CRadio: import('./CRadio'),
    CSelect: () => import('./CSelect')
  },
  data () {
    return {
      model: {}
    }
  },
  watch: {
    formItems: {
      handler () {
        console.log('监听执行', this.formItems);
        const defaultValue = (component) => (formBase[component].attrs.defaultValue || '')
        this.formItems.forEach(item => {
          this.$set(this.model, item.attrs.key, item.attrs.value || defaultValue(item.component));
        })
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    /* 默认需要的 参数 */
    setFormProp () {
      return Object.assign({}, { inline: true }, this.$attrs)
    },
    /* 基础配置 formItems 的 所有 的初始化 */
    _formItems () {
      /* 不做 深拷贝 导致 watch formItems 发生 多次 调用 */
      return deepClone(this.formItems).map(item => this.computedFormItem(item));
    }
  },
  methods: {
    computedFormItem (formItem) {
      const component = formItem.component || 'input'; // 没有的时候初始使用
      const baseItem = formBase[component];
      formItem.component = baseItem.component;
      formItem.attrs = Object.assign({}, baseItem.attrs, formItem.attrs);
      return formItem
    },
    test () {
      console.log(this.model);
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
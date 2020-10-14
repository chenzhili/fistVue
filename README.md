# 初探 vue 的 全家桶 的使用 jS 层面：vue 路由：vue-rotuer ，一样提供了钩子 函数 去获取 在 路由 从加载 到 销毁 过程 都 暴露了钩子 函数 复杂数据统一管理：Vuex ，其实思路 跟 redux 的 管理模式 很像，用 统一入口 放到 vue 的 全局上；

# 此项目 相较于 管理端 manageVue

1、少了 mockjs
2、路由 没有 根据权限添加
3、加载的进度条没有

# 20200422 添加 统一 的 element-ui 的 table 组件，但是 只是完成了 基本的 ui 层

# 20201013 实现 loadTable，主要解决了 如何 动态 定义插槽（slot）

# 20201013 对于 vue 不知道的 几个 盲区 ---- 来源：https://mp.weixin.qq.com/s/PR-ui6AamopFbN1kp11Dlg

1、动态指令参数 --- []
这个就是实现，动态 定义 slot 的方法

```vue
<template #[slotName]></template> <template :[propName]></template>
```

2、hookEvent 就是可以 在 组件 外部 引用 组件内的 生命周期钩子

```md
# 解释 URL：https://blog.csdn.net/s1879046/article/details/107380024

# 在 vue 内，做了 对于 hook: 这种 事件的 特殊处理，处理的位置在 生命周期钩子的 地方
```

````md
# 例子 1
<!-- Parent -->
<child @hook:mounted="handleChildMounted"></child> <!-- 可以在 child 组件 内部 挂载 mounted 生命周期的 时候 执行 -->
<!-- 看实现的地址，是 在 子组件的 mounted 执行 了 以后 执行的 -->

# 例子 2 ---- 想 简写 多个 生命周期 来 停止定时器
<!-- child -->
```js
 mounted () {
  window.addEventListener('online', this.handleOnline)
  this.$once('hook:beforeDestroy', function () {
    window.removeEventListener('online', this.handleOnline)
  })
}
```
```

3、实际场景：就是现在 在做 模态的时候 需要，把 parent 的 visible 参数 作为 child 组件的值，控制 隐藏显示；vue 为了 数据的 一致性 不能 在 child 中 修改 visible；

```js
// 一般的 解决办法
// parent 
<child :visible="visible" @update:visible="(nv) => {visible = nv}"></child> 
// child --- js
this.$emit('update:visible', false);
```
**** 了解 vue 的 .sync 修饰符 ---- 相当于 在  props 上 做到 v-model 的效果（实现 父子 组件 数据的 双向绑定）
<!-- 注意：带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 v-model -->
```js
// parent
<child :visible.sync="visible"></child>  /*  等价于  */ <child :visible="visible" @update:visible="val => visible = val"></child>
// child
this.$emit('update:visible', false)
```

4、用 Object.freeze 来 较少 vue 的 对于 data 数据 响应式的 遍历 监听；
Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象


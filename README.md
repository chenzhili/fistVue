# 初探 vue 的 全家桶 的使用 jS层面：vue 路由：vue-rotuer ，一样提供了钩子 函数 去获取 在 路由 从加载 到 销毁 过程 都 暴露了钩子 函数 复杂数据统一管理：Vuex ，其实思路 跟 redux 的 管理模式 很像，用 统一入口 放到 vue 的 全局上；

# 此项目 相较于 管理端 manageVue 
1、少了mockjs
2、路由 没有 根据权限添加
3、加载的进度条没有

# 20200422 添加 统一 的 element-ui 的 table 组件，但是 只是完成了 基本的 ui层

# 20201013 实现 loadTable，主要解决了 如何 动态 定义插槽（slot）
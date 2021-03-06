import Vue from 'vue'
import './element';
import './registerServiceWorker'

import App from './App.vue'
import './request'

import router from './router'
import store from './store'

// mixin
// import reqMixin from './request/reqMixin'
import './request/reqMixin';

/* 全局 注册 指令 */
import '@/directives/index'

// 全局 注册 的 自定义组件
import './components/index'

/* 为了 微服务 测试 html entry 的 方式 */
import importHtml from 'import-html-entry'
console.log(importHtml);
test();
async function test () {
  const res = await importHtml('./test.html');
  
}

/* 测试 stock-market-graph 包的 可用性 */
import QLStockMarket from 'stock-market-graph'

console.dir(QLStockMarket);

Vue.config.productionTip = false

new Vue({
  // mixins: [reqMixin],
  router,
  store,
  render: h => h(App)
}).$mount('#app')

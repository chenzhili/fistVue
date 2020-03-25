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

Vue.config.productionTip = false

new Vue({
  // mixins: [reqMixin],
  router,
  store,
  render: h => h(App)
}).$mount('#app')

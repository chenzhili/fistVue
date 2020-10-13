import Vue from 'vue'

const install = function (Vue) {
  Vue.directive('pullmore', {
    bind (el, binding) {
      const selectWrap = el.querySelector('.el-table__body-wrapper') || el;
      selectWrap.addEventListener('scroll', function () {
        const sign = 0
        if (this.scrollTop <= sign) {
          binding.value()
        }
      })
    }
  })
}
function pullmore () {}
pullmore.install = install;
Vue.use(pullmore)

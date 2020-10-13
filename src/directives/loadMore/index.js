import Vue from 'vue'

const install = function (Vue) {
  Vue.directive('loadmore', {
    bind (el, binding) {
      const selectWrap = el.querySelector('.el-table__body-wrapper') || el;
      selectWrap.addEventListener('scroll', function () {
        const sign = 0
        const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
        if (scrollDistance <= sign) {
          binding.value()
        }
      })
    }
  })
}
function loadmore () {}
loadmore.install = install;
Vue.use(loadmore)

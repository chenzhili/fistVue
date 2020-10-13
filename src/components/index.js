/* 统一 全局 注册 组件 地方 */
import Vue from 'vue'
import RouterView from './RouterView.vue'
import TableCom from '@/components/TableCom'
import LoadTable from '@/components/LoadTable'

function uniformRegister () {}

uniformRegister.install = () => {
    Vue.component(RouterView.name, RouterView);
    Vue.component(TableCom.name, TableCom)
    Vue.component(LoadTable.name, LoadTable);
}

Vue.use(uniformRegister);
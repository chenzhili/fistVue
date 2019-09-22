import Vue from "vue";
// import test from "./component/test.vue"

const requireComponent = require.context("./",true,/\.vue$/); //注意这步 ，是在 webpack 环境下 用于 获取 指定文件的 目的，这里减少了 import 的引入的写法
console.dir(requireComponent);

export default {
    install(){
        console.log(requireComponent,requireComponent.keys(),requireComponent(requireComponent.keys()[0]).default);
        requireComponent.keys().forEach(com=>{
            let component = requireComponent(com).default;
            Vue.component(component.name,component)
        })
        // Vue.component(test.name,test);   
    }
}
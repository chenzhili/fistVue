<template>
  <div class="test"  v-bind:class="{active:isActive}">{{name}}</div>
  <!-- @click="showTips" -->
</template>
<script>
module.exports = {
  name: "test-vue",
  data: function() {
    return {
      name: "测试vue中 注册插件",
      isActive: false
    };
  },
  methods: {
    showTips() {
      this.isActive = true;
      setTimeout(()=>{
          this.isActive = false;
      },1000)
    }
  }
};
</script>
<style>
.test {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  min-height: 0;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #eee;
  transition: all 0.5s;
  text-align: center;
  opacity: 0;
  overflow:hidden;
}
.test.active {
  width: auto;
  min-height: 20px;
  opacity: 1;
}
</style>
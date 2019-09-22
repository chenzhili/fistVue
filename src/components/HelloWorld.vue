<template>
  <div class="hello">
    <div @click="showTips">sdfsdfsfsdfsdf</div>
    <test-vue ref="test"></test-vue> 
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    showTips(){
      this.$refs.test.showTips();
    }
  },
  mounted(){
    console.log(this.$refs.test.showTips);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

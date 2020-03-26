<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home/1/2">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/test">test</router-link>
    </div>
    <router-view></router-view>
    <router-view name='about'></router-view>
    <router-view name='test'></router-view>
    <!-- <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
        <router-view name='about'></router-view>
      </keep-alive>
    </transition> -->
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all .2s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>

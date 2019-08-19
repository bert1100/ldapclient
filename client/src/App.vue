<template>
  <div id="app">
    <div id="nav">
      <h1> CHSI 内部支撑系统</h1>
      <!-- <router-link to="/">首页</router-link> |
      <router-link to="/about">关于</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import MuseUI from 'muse-ui';
import Message from 'muse-ui-message';
import Loading from 'muse-ui-loading';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-message/dist/muse-ui-message.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';

Vue.use(Message);
Vue.use(MuseUI);
Vue.use(Loading);
export default {
  
}
</script>


<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
</style>

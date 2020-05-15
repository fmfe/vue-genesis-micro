<template>
  <div class="app">
    <div class="left">
      <ul class="list">
        <li class="list-item">
          <router-link to="/">首页</router-link>
        </li>
        <li class="list-item">
          <router-link to="/about/us">关于我们</router-link>
        </li>
      </ul>
    </div>
    <div class="right">
        <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "app",
  data() {
    return {
      installed: false,
      show: true
    };
  },
  mounted() {
    this.installed = true;
  },
  methods: {
    close() {
      this.show = false;
    }
  }
});
</script>
<style lang="less">
html,body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
body {
    overscroll-behavior-y:none;
}
</style>
<style lang="less" scoped>
.app {
    position: relative;
    max-width: 800px;
    padding: 20px 20px 20px 220px;
    height: 100%;
    box-sizing: border-box;
    margin: 0 auto;
}
.left {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
}
.list {
    height: 100%;
    width: 200px;
    padding: 15px;
    margin: 0;
}
.list-item {
    list-style: none;
    line-height: 38px;
}
</style>

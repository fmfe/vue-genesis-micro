<template>
    <div class="app">
        <header class="header">
            {{ $route.fullPath }}
            <button @click="$router.back()">Back</button>
            <button @click="$router.forward()">Borward</button>
            {{ isLogin ? '已登录' : '未登录' }}
            <button @click="isLogin = !isLogin">切换登录状态</button>
        </header>
        <div class="left">
            <h2 class="title">ssr-common</h2>
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
            <router-view />
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'app',
    data() {
        return {
            installed: false,
            show: true,
            isLogin: false
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
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
body {
    overscroll-behavior-y: none;
}
</style>
<style lang="less" scoped>
.title {
    text-align: center;
}
.app {
    position: relative;
    box-sizing: border-box;
    max-width: 800px;
    height: 100%;
    margin: 0 auto;
    padding: 20px 20px 20px 220px;
}
.header {
    position: fixed;
    top: 0;
    left: 0;
}
.left {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    border: 1px solid #ccc;
}
.list {
    width: 200px;
    height: 100%;
    margin: 0;
    padding: 15px;
}
.list-item {
    line-height: 38px;
    list-style: none;
}
</style>

<template>
    <div class="app">
        <h2 class="title">ssr-left</h2>
        <router-view />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component<App>({})
export default class App extends Vue {
}
</script>
<style lang="less" scoped>
.app {
    position: fixed;
    top: 0;
    right: 50%;
    bottom: 0;
    z-index: 100;
    width: 230px;
    height: 100%;
    margin-right: 360px;
    color: #555;
    font-size: 15px;
    background: #222;

    /deep/ a {
        color: #fff;
        text-decoration: none;
    }
}

.title {
    margin: 0;
    padding: 0 30px;
    color: #fff;
    line-height: 50px;
}

</style>

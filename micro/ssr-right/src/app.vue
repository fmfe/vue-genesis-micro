<template>
    <div class="app">
        <h2>ssr-right</h2>
        右侧模块
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
    bottom: 0;
    left: 50%;
    z-index: 100;
    box-sizing: border-box;
    width: 230px;
    height: 100%;
    margin-left: 360px;
    padding: 15px;
    color: #fff;
    font-size: 15px;
    background: #222;

    /deep/ a {
        color: #b7754a;
        text-decoration: none;

        &:hover {
            color: #ff6200;
        }
    }
}

</style>

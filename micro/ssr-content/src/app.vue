<template>
    <div class="app">
        <h2>ssr-center</h2>
        <router-view />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component<App>({

})
export default class App extends Vue {}
</script>
<style lang="less">
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>
<style lang="less" scoped>
.app {
    width: 618px;
    min-height: 100%;
    margin: 0 auto;
    padding: 50px;
    color: #555;
    font-size: 15px;
    background: #f6f6f6;

    /deep/ a {
        color: #b7754a;
        text-decoration: none;

        &:hover {
            color: #ff6200;
        }
    }
}

.list {
    margin: 0;
    padding: 0;
    line-height: 32px;
}

.list-item {
    list-style: none;
}

</style>

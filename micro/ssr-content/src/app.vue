<template>
    <div class="app">
        <h2>ssr-content</h2>
        <p>
            <router-link :to="{name: 'home'}">首页</router-link>
            <router-link :to="{name: 'about'}">关于我们</router-link>
        </p>
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
    margin: 0 auto;
    padding: 50px;
    color: #555;
    font-size: 15px;
    border: 1px solid #ccc;

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

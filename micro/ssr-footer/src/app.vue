<template>
    <div class="app">
        <h2>ssr-footer</h2>
        这个是页面底部
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
    /deep/ a {
        color: #b7754a;
        text-decoration: none;

        &:hover {
            color: #ff6200;
        }
    }
}

</style>

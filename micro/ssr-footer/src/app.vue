<template>
    <div class="app">
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
    width: 500px;
    height: 100px;
    margin: 0 auto;
    color: #555;
    font-size: 15px;

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

<template>
    <div class="app">
        <h2>Vue SSR for Genesis</h2>
        <ol class="list">
            <li class="list-item">页面标题：{{title}}</li>
            <li class="list-item">服务名称：{{name}}</li>
            <li class="list-item">渲染地址：{{url}}</li>
            <li class="list-item">官网网站：<a rel="noopener noreferrer" target="_blank" href="https://www.followme.com/">www.followme.com</a></li>
        </ol>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component<App>({})
export default class App extends Vue {
    @Prop({
        type: String,
        required: true
    })
    public name!: string;

    @Prop({
        type: String,
        required: true
    })
    public title!: string;

    @Prop({
        type: String,
        required: true
    })
    public url!: string;
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

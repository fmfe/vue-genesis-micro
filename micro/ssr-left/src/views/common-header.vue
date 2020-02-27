<template>
    <ul class="list">
        <li v-for="item in list" :key="item.name" :class="{active: item.name === $route.name}" class="list-item">
            <router-link :to="{name: item.name}">{{item.title}}</router-link>
        </li>
    </ul>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

export interface Item {
    name: string;
    title: string;
}

@Component<CommonHeader>({})
export default class CommonHeader extends Vue {
    public list: Item[] = [
        {
            name: 'blog-list',
            title: '首页'
        },
        {
            name: 'about',
            title: '关于我们'
        }
    ];
}
</script>
<style lang="less" scoped>
.list {
    width: 100%;
    margin: 0;
    padding: 0 10px;
    overflow: hidden;
}

.list-item {
    padding: 10px 20px;
    list-style: none;

    &.active a,
    a:hover {
        color: #ff6200;
    }
}
</style>

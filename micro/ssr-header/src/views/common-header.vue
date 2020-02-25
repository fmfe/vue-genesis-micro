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
            name: 'home',
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
    margin: 0;
    padding: 0 10px;
    overflow: hidden;
}

.list-item {
    float: left;
    padding: 0 20px;
    list-style: none;

    &.active a {
        color: #ff6200;
    }
}
</style>

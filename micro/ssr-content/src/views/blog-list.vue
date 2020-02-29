<template>
    <div>
        <ul class="list">
            <li v-for="item in list"
                :key="item.id"
                class="list-item">
                <router-link :to="{path: `/blog/${item.id}`}">{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Api } from '../api';
import { BlogList } from '../store';

@Component<BlogListView>({
    microRegister: {
        blogList: (square) => new BlogList(new Api(square.config))
    }
})
export default class BlogListView extends Vue {
    public get store () {
        return this.$square.blogList;
    }

    public serverPrefetch () {
        return this.store.getTopics();
    }

    public get list () {
        return this.store.list;
    }

    public mounted () {
        this.store.getTopics();
    }
}
</script>
<style lang="less" scoped>
.list {
    margin: 0;
    padding: 15px;
}

.list-item {
    line-height: 32px;
    list-style: none;
}
</style>

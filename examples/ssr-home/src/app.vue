<template>
    <div class="app">
        {{ $route.fullPath }}
        <ul>
            <li>
                <router-link to="/">首页</router-link>
                <router-link to="/?tab=new">最新</router-link>
            </li>
        </ul>
        <router-view />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'app',
    data() {
        return {
            installed: false,
            show: true
        };
    },
    mounted() {
        this.installed = true;
    },
    methods: {
        close() {
            this.show = false;
        }
    }
});
</script>
<style lang="less" scoped>
.app {
    text-align: center;
}
ul {
    margin: 0;
    padding: 0;
}
li {
    list-style: none;
}
</style>

<template>
    <div class="app">
        <ul>
            <li>
                <router-link to="/about/us">关于我们</router-link>
                <router-link to="/about/help">帮助</router-link>
            </li>
        </ul>
        <router-view></router-view>
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
    padding: 100px;
    text-align: center;
}
.text {
    color: #999;
    font-size: 14px;
    cursor: pointer;
}
</style>

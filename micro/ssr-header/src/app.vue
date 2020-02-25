<template>
    <div class="app">
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
    color: #555;
    font-size: 15px;

    /deep/ a {
        color: #222;
        text-decoration: none;
    }
}

</style>

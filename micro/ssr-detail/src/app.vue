<template>
    <div @click="$plus" class="app">
        这个是微博的内容{{count}}
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component<App>({})
export default class App extends Vue {
    public count = 0;
    public $plus () {
        this.count++;
    }
}
</script>

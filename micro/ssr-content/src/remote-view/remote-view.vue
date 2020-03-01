<template>
    <div v-html="html"></div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Store } from './store';

@Component<RemoteView>({
    microRegister: {
        remoteView: () => new Store()
    }
})
export default class RemoteView extends Vue {
    public url = 'http://localhost:3002';
    public async serverPrefetch () {
        return this.getHtml();
    }

    public get store () {
        return this.$square.remoteView;
    }

    public get html () {
        return this.store.html;
    }

    public getHtml () {
        return this.store.getView(this.url);
    }
}
</script>

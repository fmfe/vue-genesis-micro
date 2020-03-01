<template>
    <div v-html="html"></div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Store, Base64 } from './store';

@Component<RemoteView>({
    microRegister: {
        remoteView: () => new Store()
    }
})
export default class RemoteView extends Vue {
    public url = 'http://localhost:3002';
    public vm: Promise<Vue> | null = null;
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

    public async mounted () {
        if (!this.store.data) {
            return;
        }
        const data = JSON.parse(Base64.decode(this.store.data));
        const el = this.$el.querySelector(`[data-ssr-genesis-id="${data.id}"]`);
        if (!el) return;
        await Promise.all(
            data.preload.map(item => {
                return new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = item.file;
                    document.body.appendChild(script);
                    script.onload = resolve;
                    script.onerror = resolve;
                });
            })
        );
        this.vm = (window as any).genesis.install(data.name, {
            el,
            data: {
                name: data.name,
                url: data.url,
                id: data.id,
                state: data.state
            }
        });
    }

    public async beforeDestroy () {
        if (!this.vm) return;
        this.vm.then(app => {
            app.$destroy();
        });
    }
}
</script>

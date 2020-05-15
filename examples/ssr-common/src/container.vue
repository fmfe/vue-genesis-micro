<template>
    <div>
        <remote-view
            v-for="name in names"
            v-show="ssrname === name"
            :key="name"
            :clientFetch="() => clientFetch(name)"
            :serverFetch="() => serverFetch(name)"
        ></remote-view>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { RemoteView } from '@fmfe/genesis-remote';
import axios from 'axios';

interface Data {
    names: string[];
}
interface Methods {
    clientFetch: (ssrname: string) => Promise<void>;
    serverFetch: (ssrname: string) => Promise<void>;
}
interface Computed {
    ssrname: string;
}

export default Vue.extend<Data, Methods, Computed>({
    name: 'container',
    components: {
        RemoteView
    },
    data() {
        return {
            names: []
        };
    },
    computed: {
        ssrname() {
            return this.$route.meta.ssrname;
        }
    },
    watch: {
        ssrname() {
            if (this.names.indexOf(this.ssrname) > -1) return;
            this.names.push(this.ssrname);
        }
    },
    created() {
        this.names.push(this.ssrname);
    },
    methods: {
        /**
         * 客户端远程调用时，走 CSR 渲染
         */
        async clientFetch(ssrname: string) {
            const renderUrl = encodeURIComponent(this.$route.fullPath);
            const res = await axios.get(
                `http://localhost:3000/api/${ssrname}/render`,
                {
                    params: {
                        routerMode: 'history',
                        renderMode: 'csr-json',
                        renderUrl
                    }
                }
            );
            if (res.status === 200) {
                return res.data;
            }
            return null;
        },
        /**
         * 服务端远程调用时，走 SSR渲染
         */
        async serverFetch(ssrname: string) {
            const renderUrl = encodeURIComponent(this.$route.fullPath);
            const res = await axios.get(
                `http://localhost:3000/api/${ssrname}/render`,
                {
                    params: {
                        routerMode: 'history',
                        renderMode: 'ssr-json',
                        renderUrl
                    }
                }
            );
            if (res.status === 200) {
                return res.data;
            }
            return null;
        }
    }
});
</script>

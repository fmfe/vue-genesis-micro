import Vue from 'vue';
import { GenesisTypes } from '@fmfe/genesis-core';
import App from './app.vue';
import { Router } from './router';
import { Store } from './store';

import { Micro } from '../../genesis-micro';

Vue.use(Micro);

export default async (ctx: GenesisTypes.RenderContext) => {
    const router = new Router();
    const store = new Store();
    const micro = new Micro();
    await router.push(ctx.data.url);
    ctx.data.commits = micro.createServerCommit();
    return new App({
        router,
        micro,
        microRegister: {
            store: () => store
        }
    });
};

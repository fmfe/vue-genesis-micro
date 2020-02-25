import { GenesisTypes } from '@fmfe/genesis-core';
import App from './app.vue';
import { Router } from './router';

export default async (ctx: GenesisTypes.RenderContext) => {
    const router = new Router();
    await router.push(ctx.data.url);
    return new App({
        router
    });
};

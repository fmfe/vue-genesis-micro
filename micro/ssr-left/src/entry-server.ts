import { GenesisTypes } from '@fmfe/genesis-core';
import App from './app.vue';
import { Router } from './router';
import { createServerApp } from '@fmfe/genesis-micro';

export default async (context: GenesisTypes.RenderContext) => {
    const router = new Router();
    return createServerApp({
        App,
        context,
        vueOptions: {
            router
        }
    });
};

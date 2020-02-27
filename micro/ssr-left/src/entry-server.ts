import { GenesisTypes } from '@fmfe/genesis-core';
import App from './app.vue';
import { Router } from './router';
import { createApp } from '@fmfe/genesis-micro';

export default async (context: GenesisTypes.RenderContext) => {
    const router = new Router();
    return createApp({
        name: process.env.GENESIS_NAME!,
        App,
        context,
        vueOptions: {
            router
        }
    });
};

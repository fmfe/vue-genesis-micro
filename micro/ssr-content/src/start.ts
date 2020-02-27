import { GenesisTypes } from '@fmfe/genesis-core';
import { createApp } from '@fmfe/genesis-micro';
import App from './app.vue';
import { Router } from './router';
import { Config } from './utils/config';

export const start = async (context?: GenesisTypes.RenderContext) => {
    const router = new Router();
    const config = new Config();
    return createApp({
        name: process.env.GENESIS_NAME!,
        App,
        context,
        vueOptions: {
            router,
            microRegister: {
                config: () => config
            }
        }
    });
};

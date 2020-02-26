import { GenesisTypes } from '@fmfe/genesis-core';
import App from './app.vue';
import { Router } from './router';
import { Store } from './store';
import { createApp } from '../../genesis-micro/index';

export default async (context: GenesisTypes.RenderContext) => {
    return createApp({
        name: process.env.GENESIS_NAME!,
        App,
        context,
        vueOptions: {
            router: new Router(),
            microRegister: {
                store: () => new Store()
            }
        }
    });
};

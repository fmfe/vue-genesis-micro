import App from './app.vue';
import { Router } from './router';
import { createApp } from '@fmfe/genesis-micro';

const start = async () => {
    const router = new Router();
    return createApp({
        name: process.env.GENESIS_NAME!,
        App,
        vueOptions: { router }
    });
};

start();

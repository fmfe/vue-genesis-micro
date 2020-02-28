import App from './app.vue';
import { createApp } from '@fmfe/genesis-micro';

const start = async () => {
    return createApp({
        name: process.env.GENESIS_NAME!,
        App
    });
};

start();

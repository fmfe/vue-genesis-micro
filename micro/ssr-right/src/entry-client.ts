import App from './app.vue';
import { createApp } from '../../genesis-micro/index';

const start = async () => {
    return createApp({
        name: process.env.GENESIS_NAME!,
        App
    });
};

start();

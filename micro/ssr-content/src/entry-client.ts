import App from './app.vue';
import { Router } from './router';
import { createApp } from '../../genesis-micro/index';
import { Store } from './store';

const start = async () => {
    return createApp({
        name: process.env.GENESIS_NAME!,
        App,
        vueOptions: {
            router: new Router(),
            microRegister: {
                store: () => new Store()
            }
        }
    });
};

start();

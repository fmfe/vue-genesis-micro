import Vue from 'vue';
import App from './app.vue';
import { Router } from './router';
import { createApp, Micro } from '../../genesis-micro/index';
import { Store } from './store';

Vue.use(Micro);

const start = async () => {
    const router = new Router();
    const micro = new Micro({
        commits: window[process.env.GENESIS_NAME!].commits
    });
    const store = new Store();
    return createApp({
        name: process.env.GENESIS_NAME!,
        App,
        vueOptions: {
            router,
            micro,
            microRegister: {
                store: () => store
            }
        }
    });
};

start();

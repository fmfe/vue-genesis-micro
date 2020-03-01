import App from './app.vue';
import { Router } from './router';
import { createClientApp } from '@fmfe/genesis-micro';

const start = async ({ el, data }) => {
    const router = new Router();
    return createClientApp({
        el,
        data,
        App,
        vueOptions: { router }
    });
};

export default start;

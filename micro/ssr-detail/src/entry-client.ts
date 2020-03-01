import App from './app.vue';
import { createClientApp } from '@fmfe/genesis-micro';

const start = async ({ el, data }) => {
    console.log('>>>>>>>.', el, data, '??????????????');
    return createClientApp({
        el,
        data,
        App
    });
};

export default start;

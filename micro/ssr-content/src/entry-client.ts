import { createClientApp } from '@fmfe/genesis-micro';
import { createVueOptions } from './start';
import App from './app.vue';

export default ({ el, data }) => {
    return createClientApp({
        el,
        data,
        App,
        vueOptions: createVueOptions()
    });
};

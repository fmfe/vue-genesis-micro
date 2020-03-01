import { GenesisTypes } from '@fmfe/genesis-core';
import { createServerApp } from '@fmfe/genesis-micro';
import { createVueOptions } from './start';
import App from './app.vue';

export default (context: GenesisTypes.RenderContext) => {
    return createServerApp({
        App,
        context,
        vueOptions: createVueOptions()
    });
};

import { GenesisTypes } from '@fmfe/genesis-core';
import App from './app.vue';
import { createServerApp } from '@fmfe/genesis-micro';

export default async (context: GenesisTypes.RenderContext) => {
    return createServerApp({
        App,
        context
    });
};

import { GenesisTypes } from '@fmfe/genesis-core';
import App from './app.vue';
import { createApp } from '@fmfe/genesis-micro';

export default async (context: GenesisTypes.RenderContext) => {
    return createApp({
        name: process.env.GENESIS_NAME!,
        App,
        context
    });
};

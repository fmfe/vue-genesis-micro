import { RenderContext } from '@fmfe/genesis-core';
import { createServerApp } from '@fmfe/genesis-app/src/index';
import { createRouter } from './router';
import Vue from 'vue';
import App from './app.vue';

export default async (renderContext: RenderContext): Promise<Vue> => {
    return createServerApp({
        App,
        renderContext,
        vueOptions: {
            router: createRouter(renderContext.data.state)
        }
    });
};

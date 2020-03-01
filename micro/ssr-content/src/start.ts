import Vue, { ComponentOptions } from 'vue';
import { GenesisTypes } from '@fmfe/genesis-core';
import { Router } from './router';
import { Config } from './utils/config';

export const createVueOptions = (context?: GenesisTypes.RenderContext): ComponentOptions<Vue> => {
    const router = new Router();
    const config = new Config();
    return {
        router,
        microRegister: {
            config: () => config
        }
    };
};

import { GenesisTypes } from '@fmfe/genesis-core';
import App from './app.vue';

export default (ctx: GenesisTypes.RenderContext) => {
    ctx.data.title = 'vue-genesis-templace';
    return new App({});
};

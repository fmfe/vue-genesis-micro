import { Genesis } from '@fmfe/genesis-core';

export const ssrHeader = new Genesis({
    server: {
        port: 3003,
        renderMode: 'ssr-json'
    }
});

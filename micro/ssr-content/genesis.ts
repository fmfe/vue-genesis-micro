import { Genesis } from '@fmfe/genesis-core';

export const ssrContent = new Genesis({
    server: {
        port: 3001,
        renderMode: 'ssr-json'
    }
});

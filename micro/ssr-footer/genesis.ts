import { Genesis } from '@fmfe/genesis-core';

export const ssrFooter = new Genesis({
    name: 'ssr-footer',
    server: {
        port: 3002,
        renderMode: 'ssr-json'
    }
});

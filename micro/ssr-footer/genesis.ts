import { Genesis } from '@fmfe/genesis-core';

export const ssrFooter = new Genesis({
    server: {
        port: 3002,
        renderMode: 'ssr-json'
    }
});

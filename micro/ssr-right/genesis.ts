import path from 'path';
import { Genesis } from '@fmfe/genesis-core';

export const ssrRight = new Genesis({
    name: 'ssr-footer',
    server: {
        port: 3002,
        renderMode: 'ssr-json'
    },
    build: {
        baseDir: path.resolve(__dirname),
        includes: [path.resolve(__dirname, '../')]
    }
});

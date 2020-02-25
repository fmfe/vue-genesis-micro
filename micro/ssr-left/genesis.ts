import path from 'path';
import { Genesis } from '@fmfe/genesis-core';

export const ssrLeft = new Genesis({
    name: 'ssr-left',
    server: {
        port: 3003,
        renderMode: 'ssr-json'
    },
    build: {
        baseDir: path.resolve(__dirname),
        includes: [path.resolve(__dirname, '../')]
    }
});

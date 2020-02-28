import path from 'path';
import { Genesis } from '@fmfe/genesis-core';

export const ssrDetail = new Genesis({
    name: 'ssr-detail',
    server: {
        port: 3002,
        renderMode: 'ssr-json'
    },
    build: {
        baseDir: path.resolve(__dirname),
        includes: [path.resolve(__dirname, '../')]
    }
});

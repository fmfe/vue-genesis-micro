import express from 'express';
import { Renderer } from '@fmfe/genesis-core';
import { ssrList } from './genesis';
import { PageServer } from './server';

const start = async () => {
    ssrList.forEach(ssr => {
        const app = express();
        const renderer = new Renderer(ssr);
        app.use(renderer.staticPublicPath, express.static(renderer.staticDir, {
            immutable: true,
            maxAge: '31536000000'
        }));
        app.use(renderer.renderMiddleware);
        app.listen(ssr.port, () => console.log(`http://localhost:${ssr.port}`));
    });
    return new PageServer().start();
};
start();

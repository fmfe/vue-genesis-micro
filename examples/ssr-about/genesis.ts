import express from 'express';
import path from 'path';
import { SSR, Renderer } from '@fmfe/genesis-core';

/**
 * 创建一个应用程序
 */
export const app = express();

/**
 * 创建一个 SSR 实例
 */
export const ssr = new SSR({
    /**
     * 设置应用名称，不能重复
     */
    name: 'ssr-about',
    /**
     * 设置编译的配置
     */
    build: {
        /**
         * 设置项目的目录
         */
        baseDir: path.resolve(__dirname),
        transpile: [/@fmfe/]
    }
});

/**
 * 拿到渲染器后，启动应用程序
 */
export const startApp = (renderer: Renderer) => {
    const renderModes = ['ssr-html', 'ssr-json', 'csr-html', 'csr-json'];
    /**
     * 提供一个API允许外部渲染
     */
    app.use('/api/render', (req, res, next) => {
        // 获取渲染的地址
        const url = decodeURIComponent(String(req.query.renderUrl));
        // 获取路由渲染的模式
        const routerMode =
            ['abstract', 'history'].indexOf(String(req.query.routerMode)) > -1
                ? req.query.routerMode
                : 'history';
        // 渲染默认
        const mode: any =
            renderModes.indexOf(String(req.query.renderMode)) > -1
                ? String(req.query.renderMode)
                : 'ssr-json';

        renderer
            .render({
                url,
                mode,
                state: {
                    routerMode
                }
            })
            .then((r) => {
                res.send(r.data);
            })
            .catch(next);
    });
    /**
     * 使用默认渲染中间件进行渲染
     */
    app.use(renderer.renderMiddleware);
    /**
     * 监听端口
     */
    app.listen(3001, () => console.log(`http://localhost:3000`));
};

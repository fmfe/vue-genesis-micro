import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';
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
    name: 'ssr-common',
    /**
     * 设置编译的配置
     */
    build: {
        /**
         * 设置项目的目录
         */
        baseDir: path.resolve(__dirname)
    }
});

/**
 * 拿到渲染器后，启动应用程序
 */
export const startApp = (renderer: Renderer) => {
    const proxy = httpProxy.createProxyServer({});
    /**
     * ssr-home 服务静态文件代理
     */
    app.use('/ssr-home/', (req, res, next) => {
        proxy.web(
            req,
            res,
            {
                target: 'http://localhost:3002/ssr-home/',
                changeOrigin: true
            },
            (err) => {
                res.status(500).send(err.message);
            }
        );
    });
    /**
     * ssr-home api 代理
     */
    app.use('/api/ssr-home/', (req, res, next) => {
        proxy.web(
            req,
            res,
            {
                target: 'http://localhost:3002/api/',
                changeOrigin: true
            },
            (err) => {
                res.status(500).send(err.message);
            }
        );
    });
    /**
     * ssr-about 静态资源代理
     */
    app.use('/ssr-about/', (req, res, next) => {
        proxy.web(
            req,
            res,
            {
                target: 'http://localhost:3001/ssr-about',
                changeOrigin: true
            },
            (err) => {
                res.status(500).send(err.message);
            }
        );
    });
    /**
     * ssr-about api 代理
     */
    app.use('/api/ssr-about', (req, res, next) => {
        proxy.web(
            req,
            res,
            {
                target: 'http://localhost:3001/api/',
                changeOrigin: true
            },
            (err) => {
                res.status(500).send(err.message);
            }
        );
    });
    /**
     * 使用默认渲染中间件进行渲染，你也可以调用更加底层的 renderer.renderJson 和 renderer.renderHtml 来实现渲染
     */
    app.use(renderer.renderMiddleware);
    /**
     * 监听端口
     */
    app.listen(3000, () => console.log(`http://localhost:3000`));
};

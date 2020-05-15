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
        baseDir: path.resolve(__dirname)
    }
});

/**
 * 拿到渲染器后，启动应用程序
 */
export const startApp = (renderer: Renderer) => {
    /**
     * 使用默认渲染中间件进行渲染，你也可以调用更加底层的 renderer.renderJson 和 renderer.renderHtml 来实现渲染
     */
    app.use(renderer.renderMiddleware);
    /**
     * 监听端口
     */
    app.listen(3002, () => console.log(`http://localhost:3000`));
};
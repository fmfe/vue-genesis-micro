import Vue, { ComponentOptions } from 'vue';
import { GenesisTypes } from '@fmfe/genesis-core';
import { Micro } from './micro';

export interface CreateAppOptions {
    // 当前的服务名称
    name: string;
    // 当前需要渲染的组件
    App: typeof Vue;
    // 服务器端渲染的上下文
    context?: GenesisTypes.RenderContext;
    // vue 构建函数的参数
    vueOptions?: ComponentOptions<Vue>;
}

const createAppClient = async (options: CreateAppOptions) => {
    if (typeof options !== 'object') {
        throw new Error('Option cannot be empty');
    }
    if (typeof options.name !== 'string') {
        throw new Error('The name of the option is a string type');
    }
    const data = window[options.name];
    const script = document.querySelector(`script[ssr-name=${data.name}]`);
    if (!script) {
        throw new Error('Server side script tag not found');
    }
    const el = script.previousElementSibling;
    if (!el) {
        throw new Error('Server side DOM not found');
    }
    if (!data) {
        throw new Error('Server side data not found');
    }
    const { vueOptions, App } = options;
    const { router } = vueOptions as any || {};
    const renderMode = el.getAttribute('data-server-rendered') || 'false';
    // SSR 渲染
    if (router && renderMode === 'true') {
        await router.push(data.url);
    } else {
        el.removeAttribute('data-server-rendered');
    }
    const micro = new Micro({
        commits: data.commits
    });
    const app = new App({
        el,
        ...vueOptions,
        micro
    });
    const routeChangeName = 'vue-route-changed';
    if (router) {
        // 路由同步
        router.afterEach((to, from) => {
            const event = new CustomEvent(routeChangeName, {
                detail: to
            });
            window.dispatchEvent(event);
        });
        const onRouteChange = (event:any) => {
            const route = event.detail;
            if (route === router.currentRoute) return;
            router.push(route).catch(() => true);
        };
        window.addEventListener(routeChangeName, onRouteChange, false);
        app.$once('hook:beforeDestroy', () => {
            window.removeEventListener(routeChangeName, onRouteChange, false);
        });
        // CSR 渲染
        if (renderMode !== 'true') {
            await app.$nextTick();
            await router.push(data.url);
        }
    }
};

const createAppServer = async (options: CreateAppOptions) => {
    if (!options.context) {
        throw new Error('options.context parameter cannot be empty');
    }
    const { App, context, vueOptions } = options;
    const { router } = vueOptions || {};
    if (router) {
        await router.push(context.data.url);
    }
    const micro = new Micro();
    context.data.commits = micro.createServerCommit();
    const app = new App({
        ...vueOptions,
        micro
    });
    return app;
};

Vue.use(Micro);
export const createApp = async (options: CreateAppOptions) => {
    if (!options.App) {
        throw new Error('options.App component cannot be empty');
    }
    if (typeof window !== 'object') {
        return createAppServer(options);
    }
    return createAppClient(options);
};

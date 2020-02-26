import Vue, { ComponentOptions } from 'vue';

export interface CreateAppOptions {
    name: string;
    App: typeof Vue;
    vueOptions?: ComponentOptions<Vue>;
}

export const createApp = async (options: CreateAppOptions) => {
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
    const app = new App({
        el,
        ...vueOptions
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
    return app;
};

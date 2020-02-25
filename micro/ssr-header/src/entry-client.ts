import App from './app.vue';
import { Router } from './router';

const start = async () => {
    const data = window[process.env.GENESIS_NAME!];
    const el = document.querySelector(`[ssr-name=${data.name}]`)!.previousElementSibling!;
    const router = new Router();

    await router.push(data.url);
    window.addEventListener('vue-route-changed', (event) => {
        const route = (event as any).detail;
        if (route === router.currentRoute) return;
        router.push(route).catch(() => true);
    }, false);
    return new App({
        el,
        router,
        watch: {
            '$route' (route) {
                window.dispatchEvent(new CustomEvent('vue-route-changed', {
                    detail: route
                }));
            }
        }
    });
};

start();

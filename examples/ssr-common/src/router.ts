import { Router } from '@fmfe/genesis-app';
import Container from './container.vue';

export const createRouter = () => {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                meta: {
                    ssrname: 'ssr-home'
                },
                component: Container
            },
            {
                path: '/about/*',
                meta: {
                    ssrname: 'ssr-about'
                },
                component: Container
            }
        ]
    });
};

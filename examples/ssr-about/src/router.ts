import { RouterMode } from 'vue-router';
import { Router } from '@fmfe/genesis-app/src/index';

interface State {
    routerMode?: RouterMode;
}

export const createRouter = (state: State) => {
    return new Router({
        mode: state?.routerMode || 'history',
        routes: [
            {
                path: '/about/us',
                component: () =>
                    import(
                        /* webpackChunkName: "about-us" */ './views/about-us.vue'
                    ).then((m) => m.default)
            },
            {
                path: '/about/help',
                component: () =>
                    import(
                        /* webpackChunkName: "about-help" */ './views/about-help.vue'
                    ).then((m) => m.default)
            }
        ]
    });
};

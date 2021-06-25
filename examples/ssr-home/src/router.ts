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
                path: '/',
                component: () =>
                    import(
                        /* webpackChunkName: "home" */ './views/home.vue'
                    ).then((m) => m.default)
            }
        ]
    });
};

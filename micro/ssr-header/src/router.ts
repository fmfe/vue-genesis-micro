import Vue from 'vue';
import VueRouter from 'vue-router';
import CommonHeader from './views/common-header.vue';

Vue.use(VueRouter);

export class Router extends VueRouter {
    public constructor () {
        super({
            mode: 'history',
            routes: [
                {
                    path: '/',
                    name: 'home',
                    component: CommonHeader
                },
                {
                    path: '/about',
                    name: 'about',
                    component: CommonHeader
                }
            ]
        });
    }
}

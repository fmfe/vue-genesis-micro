import Vue from 'vue';
import { Micro, Router as VueRouter } from '@fmfe/genesis-micro';
import CommonHeader from './views/common-header.vue';

Vue.use(Micro);

export class Router extends VueRouter {
    public constructor () {
        super({
            mode: 'abstract',
            routes: [
                {
                    path: '/',
                    name: 'blog-list',
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

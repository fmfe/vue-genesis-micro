import { Router as VueRouter } from '@fmfe/genesis-micro';

const BlogList = () =>
	import(/* webpackChunkName: "home" */ './views/blog-list.vue');
const About = () =>
	import(/* webpackChunkName: "about" */ './views/about.vue');
const RemoteView = () =>
	import(/* webpackChunkName: "about" */ './remote-view/remote-view.vue');

export class Router extends VueRouter {
    public constructor () {
        super({
            mode: 'abstract',
            routes: [
                {
                    path: '/',
                    component: BlogList
                },
                {
                    path: '/about',
                    component: About
                },
                {
                    path: '*',
                    component: RemoteView
                }
            ]
        });
    }
}

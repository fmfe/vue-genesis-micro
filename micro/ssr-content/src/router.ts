import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const BlogList = () =>
	import(/* webpackChunkName: "home" */ './views/blog-list.vue');
const About = () =>
	import(/* webpackChunkName: "about" */ './views/about.vue');

export class Router extends VueRouter {
    public constructor () {
        super({
            mode: 'history',
            routes: [
                {
                    path: '/',
                    name: 'blog-list',
                    component: BlogList
                },
                {
                    path: '/about',
                    name: 'about',
                    component: About
                }
            ]
        });
    }
}

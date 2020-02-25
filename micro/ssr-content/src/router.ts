import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () =>
	import(/* webpackChunkName: "home" */ './views/home.vue');
const About = () =>
	import(/* webpackChunkName: "about" */ './views/about.vue');

export class Router extends VueRouter {
    public constructor () {
        super({
            mode: 'history',
            routes: [
                {
                    path: '/',
                    name: 'home',
                    component: Home
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

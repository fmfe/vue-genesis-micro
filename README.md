## 快速开始
```bash
# 拉取代码
git clone git@github.com:fmfe/vue-genesis-micro.git
# 进入项目目录
cd vue-genesis-micro
# 安装依赖
npm install
# 开发环境启动
npm run dev
# 打包生产环境代码
npm run build
# 生产环境运行
npm run start
```
## 微服务是什么？
微服务是一个新兴的软件架构，就是把一个大型的单个应用程序和服务拆分为数十个的支持微服务。

## 为什么需要微服务？
随着业务的发展，项目规模越来越大，给编译打包、合并的代码冲突带来了巨大的挑战，而服务的拆分可以获得更快的编译打包，独立部署、增量更新、不同的团队只需要负责自己的服务、更好的支持多端，在大型的项目中，使用微服务架构可以获得极大的收益。

## 微服务和微前端的区别
目前社区的微前端解决方案，基本上都是基于客户端去进行聚合的思路，而本项目却是完全基于后端微服务的概念而诞生的，页面的聚合既可以在服务端完成，也可以在客户端完成，一切取决于需求。

## 项目介绍
本项目基于 Vue 的[Genesis](https://github.com/fmfe/genesis)开发，一个编写了三个例子：
- `ssr-common` 公共的页面导航
- `ssr-home` 首页
- `ssr-about` 关于我们    
在学习完成本项目后，你可以搭建属于自己的微服务架构，并且深入的了解到[远程组件](https://fmfe.github.io/genesis-docs/remote/)它是怎么工作的。至此，你可以做到一个大型应用的微服务拆分下。

## 关于 Genesis
[Genesis](https://github.com/fmfe/genesis)是在[FOLLOWME5.0](https://www.followme.com/)升级而诞生的一个项目，它解决了以往架构的很多弊端，例如：
- 公共组件库更新，导致同时十几个项目要编译发布更新
- 页面和页面之间的切换，需要刷新整页，无法做到无刷新跳转
- 数百个页面，如果全部写到一个大的项目中做SSR渲染，只要其中一个地方出现BUG，就有可能导致整个服务挂掉或者不稳定，发生内存泄漏的问题时，也更加难以排查
- 大量的项目是基于CSR渲染，在国际化和SEO方面，导致 index.html 页面的标题、关键词和描述比较难做到国际化
- 不同的团队，互相交叉开发一个项目，合并代码时，很容易产生各种冲突，服务的拆分后，大大的减少了代码冲突

## 渲染接口
服务的拆分后，那么服务和服务之间的调用是必不可少的，这里提出了一个渲染接口的概念，它可能是这样子的
```ts
// 下面的接口，你可能需要做Nginx反向代理，来做到下面的接口
// /api/ssr-服务名称/render?url=渲染地址&mode=渲染模式&routerMode=路由模式
const renderModes = ['ssr-html', 'ssr-json', 'csr-html', 'csr-json'];
/**
 * 提供一个API允许外部渲染
 */
app.use('/api/render', (req, res, next) => {
    // 获取渲染的地址
    const url = decodeURIComponent(String(req.query.renderUrl));
    // 获取路由渲染的模式
    const routerMode =
        ['abstract', 'history'].indexOf(String(req.query.routerMode)) > -1
            ? req.query.routerMode
            : 'history';
    // 渲染默认
    const mode: any =
        renderModes.indexOf(String(req.query.renderMode)) > -1
            ? String(req.query.renderMode)
            : 'ssr-json';

    renderer
        .render({
            url,
            mode,
            state: {
                routerMode
            }
        })
        .then((r) => {
            res.send(r.data);
        })
        .catch(next);
});
```
这样第三方的服务，就可以随意的调用这个服务的渲染结果，传递需要渲染的地方渲染，比如Vue、React、或者其它的EJS模板引擎等等。本项目会使用渲染接口，来传递给远程组件进行渲染。

## 远程组件
当你需要调用其它服务的页面渲染时，你请求渲染接口，拿到渲染的结果，传递给远程组件，它就会负责帮你渲染该服务的内容。
```vue
<template>
    <div>
        <remote-view
            v-for="name in names"
            v-show="ssrname === name"
            :key="name"
            :clientFetch="() => clientFetch(name)"
            :serverFetch="() => serverFetch(name)"
        ></remote-view>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { RemoteView } from '@fmfe/genesis-remote';
import axios from 'axios';

interface Data {
    names: string[];
}
interface Methods {
    clientFetch: (ssrname: string) => Promise<void>;
    serverFetch: (ssrname: string) => Promise<void>;
}
interface Computed {
    ssrname: string;
}

export default Vue.extend<Data, Methods, Computed>({
    name: 'container',
    components: {
        RemoteView
    },
    data() {
        return {
            names: []
        };
    },
    computed: {
        ssrname() {
            return this.$route.meta.ssrname;
        }
    },
    watch: {
        ssrname() {
            if (this.names.indexOf(this.ssrname) > -1) return;
            this.names.push(this.ssrname);
        }
    },
    created() {
        this.names.push(this.ssrname);
    },
    methods: {
        /**
         * 客户端远程调用时，走 CSR 渲染
         */
        async clientFetch(ssrname: string) {
            const renderUrl = encodeURIComponent(this.$route.fullPath);
            const res = await axios.get(
                `http://localhost:3000/api/${ssrname}/render`,
                {
                    params: {
                        routerMode: 'history',
                        renderMode: 'csr-json',
                        renderUrl
                    }
                }
            );
            if (res.status === 200) {
                return res.data;
            }
            return null;
        },
        /**
         * 服务端远程调用时，走 SSR渲染
         */
        async serverFetch(ssrname: string) {
            const renderUrl = encodeURIComponent(this.$route.fullPath);
            const res = await axios.get(
                `http://localhost:3000/api/${ssrname}/render`,
                {
                    params: {
                        routerMode: 'history',
                        renderMode: 'ssr-json',
                        renderUrl
                    }
                }
            );
            if (res.status === 200) {
                return res.data;
            }
            return null;
        }
    }
});
</script>

```

## 目录说明
```
.
├── .vscode
│   ├── settings.json                         vscode的配置
├── examples                                  服务拆分的例子
│   ├── ssr-about                             关于我们服务
│   |   ├── src                                 Vue源码目录
│   |   |   ├── views                           页面目录
│   |   |   |   ├── about-help.vue              帮助中心页面
│   |   |   |   └── about-us.vue                关于我们页面
│   |   |   ├── app.vue                         页面入口文件，公共导航
│   |   |   ├── entry-client.ts                 客户端入口文件
│   |   |   ├── entry-server.ts                 服务端入口文件
│   |   |   ├── router.ts                       路由配置文件
│   |   |   └── shims-vue.d.ts                  .vue文件的TS声明
│   |   ├──   genesis.build.ts                  当前服务生产环境构建入口
│   |   ├──   genesis.dev.ts                    当前服务开发环境入口
│   |   ├──   genesis.prod.ts                   当前服务生产环境入口
│   |   └──   genesis.ts                        当前服务通用的服务端逻辑
│   ├── ssr-common                            基础的页面聚合服务，包含公共导航
│   |   ├── src                                 Vue源码目录
│   |   |   ├── views                           页面目录
│   |   |   |   ├── about-help.vue              帮助中心页面
│   |   |   |   └── about-us.vue                关于我们页面
│   |   |   ├── app.vue                         页面入口文件，公共导航
│   |   |   ├── container.vue                   子应用的容器
│   |   |   ├── entry-client.ts                 客户端入口文件
│   |   |   ├── entry-server.ts                 服务端入口文件
│   |   |   ├── router.ts                       路由配置文件
│   |   |   └── shims-vue.d.ts                  .vue文件的TS声明
│   |   ├──   genesis.build.ts                  当前服务生产环境构建入口
│   |   ├──   genesis.dev.ts                    当前服务开发环境入口
│   |   ├──   genesis.prod.ts                   当前服务生产环境入口
│   |   └──   genesis.ts                        当前服务通用的服务端逻辑
│   ├── ssr-home                              首页的服务
│   |   ├── src                                 Vue源码目录
│   |   |   ├── views                           页面目录
│   |   |   |   └── home.vue                    首页页面
│   |   |   ├── app.vue                         页面入口文件，公共导航
│   |   |   ├── container.vue                   子应用的容器
│   |   |   ├── entry-client.ts                 客户端入口文件
│   |   |   ├── entry-server.ts                 服务端入口文件
│   |   |   ├── router.ts                       路由配置文件
│   |   |   └── shims-vue.d.ts                  .vue文件的TS声明
│   |   ├──   genesis.build.ts                  当前服务生产环境构建入口
│   |   ├──   genesis.dev.ts                    当前服务开发环境入口
│   |   ├──   genesis.prod.ts                   当前服务生产环境入口
│   |   └──   genesis.ts                        当前服务通用的服务端逻辑
|   ├── .editorconfig                         编辑器配置
|   ├── .eslintignore                         eslint忽略配置
|   ├── .eslintrc.js                          eslint配置
|   ├── .gitignore                            git忽略配置
|   ├── .stylelintignore                      stylelint忽略配置
|   ├── genesis.build.ts                      所有服务生产构建
|   ├── genesis.dev.ts                        所有服务开发环境启动
|   ├── genesis.prod.ts                       所有服务生产环境入口
|   ├── stylelint.config.js                   stylelint配置
|   └── tsconfig.json                         TS的配置
│ 
└── package.json
```
注意：本项目是为了演示，才把几个服务全部放到一个仓库中，在实际的应用中，每一个服务，都应该放到独立的git仓库中。

## 最后
- 本项目源码地址：[vue-genesis-micro](https://github.com/fmfe/vue-genesis-micro)
- [Genesis](https://github.com/fmfe/genesis)官方仓库
- [Genesis](https://fmfe.github.io/genesis-docs/)文档地址
- [基于 Vue SSR 的微架构在 FOLLOWME5.0 实践](https://fmfe.github.io/genesis-docs/blog/followme5.0.html)
- [基于 Vue CSR 的微前端实现方案](https://fmfe.github.io/genesis-docs/blog/2020-05-25.html)    
如果你对微前端、和微服务这一块感兴趣，欢迎 Star ，也可以在留言区我和互动！

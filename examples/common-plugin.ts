import { Plugin, WebpackHookParams } from '@fmfe/genesis-core';
import { DynamicImportCdnPlugin } from 'webpack-dynamic-import-cdn-plugin';

export class CommonPlugin extends Plugin {
    public chainWebpack({ target, config }: WebpackHookParams) {
        if (target !== 'client') return;
        config.plugin('dynamic-import-cdn').use(
            new DynamicImportCdnPlugin({
                js: {
                    'vue-router': {
                        moduleName: 'VueRouter',
                        url:
                            'https://unpkg.com/vue-router@3.4.8/dist/vue-router.js'
                    },
                    vue: {
                        moduleName: 'VueRouter',
                        url: 'https://unpkg.com/vue@2.6.12/dist/vue.js'
                    }
                }
            })
        );
    }
}

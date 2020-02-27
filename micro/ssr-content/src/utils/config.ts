import Vue from 'vue';
import { Tms, Micro } from '@fmfe/genesis-micro';
import { Request } from './request';

Vue.use(Micro);

export class Config extends Tms {
    public baseApi = 'https://cnodejs.org'
    public request: Request;
    public constructor () {
        super();
        this.request = new Request(this);
        Object.defineProperty(this, 'request', {
            enumerable: false
        });
    }
}
declare module '@fmfe/genesis-micro/types/square' {
    interface Square {
        config: Config;
    }
}

import Tms from '@fmfe/tms.js';
import Vue from 'vue';
import { install } from './install';

export type MicroRid = string;
export interface SubscribeParams {
    type: string;
    payload: any;
    payloads: any[];
    target: Tms;
}
export interface TmsEvent {
    payload: any;
    payloads: any[];
    target: Tms;
    type: string;
}
export type Subscribe = (commit: Commit) => void;

export const log = (log: string) => {
    if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
        console.log(`[micro] ${log}`);
    }
};
const getType = (payload: any): string => {
    return Object.prototype.toString
        .call(payload)
        .replace(/^(.*?) |]$/g, '')
        .toLowerCase();
};

class MicroBase {
    public static install: any = install;
    private static _Vue: typeof Vue | null = null;
    public static setVue (_Vue: typeof Vue) {
        if (this._Vue) return;
        this._Vue = _Vue;
    }

    public static getVue (): typeof Vue {
        const _Vue = this._Vue;
        if (!_Vue) {
            throw new Error('Please install Vue.use(Micro);');
        }
        return _Vue;
    }

    private vm: Vue;
    private rid = 0;
    private useCount = 0;
    public constructor () {
        // 需要放到最后处理， 否则vue不会进行属性劫持
        this.vm = new Vue({
            data: {
                $$this: this
            }
        });
        Object.defineProperty(this, 'vm', {
            enumerable: false
        });
        Object.defineProperty(this, 'rid', {
            enumerable: false
        });
        Object.defineProperty(this, 'useCount', {
            enumerable: false
        });
        log('创建实例');
    }

    public addUse () {
        this.useCount++;
    }

    public reduceUse () {
        this.useCount--;
    }

    public get isUse () {
        return this.useCount > 0;
    }

    /**
   * 注册模块
   */
    public register (name: string, v: any): MicroRid {
        const rid: MicroRid = `${name}_${++this.rid}`;
        Micro.getVue().set(this, rid, v);
        log(`注册模块 ${rid}`);
        return rid;
    }

    /**
   * 获取模块
   */
    public getModule<T> (rid: MicroRid): T {
        return (this as any)[rid];
    }

    /**
   * 移除模块
   */
    public unregister (name: string, rid: MicroRid) {
        Micro.getVue().delete(this, rid);
        log(`注销模块 ${rid}`);
    }

    /**
   * 销毁实例，释放内存
   */
    public destroy () {
        log('销毁实例，释放内存');
        this.vm && this.vm.$destroy();
        (this as any)._vm = null;
    }
}
const deepRecursionTms = (
    target: any,
    rid: string[],
    fn: (target: Tms, path: string) => void
) => {
    if (typeof target !== 'object' || Array.isArray(target)) return;
    if (target instanceof Tms) {
        fn(target, rid.join('.'));
        Object.keys(target).forEach(k => {
            deepRecursionTms((target as any)[k], [...rid, k], fn);
        });
    }
};

export interface Commit {
    position: string;
    payloads: any[];
}

export interface MicroOptions {
    commits?: Commit[];
}
export interface CommandOptions {
    micro: Micro;
    position: string;
    payloads: any[];
    isShowError: boolean;
}

export function command ({
    micro,
    position,
    payloads,
    isShowError
}: CommandOptions) {
    const paths = position.split('.');
    const len = paths.length - 1;
    let current = micro as any;
    for (let i = 0; i < len; i++) {
        const name = paths[i];
        if (current[name] && current[name] instanceof Tms) {
            current = current[name];
        } else if (isShowError) {
            throw new Error(`${position} 的 ${name} class 不存在`);
        }
    }
    const fnName: string = paths[paths.length - 1];
    const fn: Function = current[fnName];
    if (typeof fn === 'function') {
        return fn.call(current, ...payloads);
    } else if (isShowError) {
        throw new Error(`${position} 的 ${fnName} 方法不存在`);
    }
}

export class Micro extends MicroBase {
    public debug: boolean = process.env.NODE_ENV !== 'production';
    private subs: Subscribe[] = [];
    private commits: Commit[] = [];
    public constructor (options?: MicroOptions) {
	    super();
	    Object.defineProperty(this, 'debug', {
	        enumerable: false
	    });
	    Object.defineProperty(this, 'subs', {
	        enumerable: false
	    });
	    Object.defineProperty(this, 'commits', {
	        enumerable: false
	    });
	    if (options && options.commits) {
	        this.commits = options.commits;
	    }
    }

    public register (name: string, installModule: any) {
        const rid = super.register(name, installModule);
	    deepRecursionTms(installModule, [rid], (target, path) => {
	        (target.dep as any)[`_micro_observe_${rid}`] = (event: TmsEvent) => {
	            const commit: Commit = {
                    position: `${path}.${event.type}`,
	                payloads: event.payloads
	            };
	            this.subs.forEach((fn) => fn(commit));
	            if (this.debug) {
	                // eslint-disable-next-line no-console
	                console.log(
                        `position   ${commit.position}(payload: ${getType(
                            event.payloads[0]
                        )});`,
                        '\n\rpayloads   ',
                        typeof event.payload === 'object'
						    ? JSON.parse(JSON.stringify(event.payloads))
						    : event.payloads
	                );
	            }
	        };
	        log(`订阅 Tms ${path}`);
	        target.dep.addSub((target.dep as any)[`_micro_observe_${rid}`]);
        });
	    // 还原状态
	    const { commits } = this;
	    if (commits.length) {
	        const re = new RegExp(`^${rid}`);
	        this.commits = commits.filter((event) => {
	            const isOk = re.test(event.position);
	            if (isOk) {
	                this.command({
	                    position: event.position.replace(/^[^.]+/, rid + '.'),
	                    payloads: event.payloads
	                });
	            }
	            return !isOk;
	        });
	    }
	    return rid;
    }

    public unregister (name: string, rid: string) {
	    const unModule = this.getModule<any>(rid);
	    super.unregister(name, rid);
	    deepRecursionTms(unModule, [name], (target, path) => {
	        target.dep.removeSub((target.dep as any)[`_micro_observe_${rid}`]);
	        log(`取消订阅 Tms ${path}`);
	        // 释放内存
	        (target.dep as any)[`_micro_observe_${rid}`] = null;
	    });
    }

    public subscribe (fn: Subscribe) {
	    this.subs.push(fn);
    }

    public unsubscribe (fn: Subscribe) {
	    const index = this.subs.lastIndexOf(fn);
	    if (index > -1) {
	        this.subs.splice(index, 1);
	    }
    }

    /**
	 * 只有在服务端才应该调用这个方法
	 */
    public createServerCommit () {
	    const commits: Commit[] = [];
	    this.subscribe((commit) => {
	        commits.push(commit);
	    });
	    return commits;
    }

    /**
	 * 执行某个命令
	 */
    public command (options: Omit<CommandOptions, 'micro' | 'isShowError'>) {
	    return command({
	        ...options,
	        micro: this,
	        isShowError: false
	    });
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        $micro: Micro;
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        micro?: Micro;
    }
}

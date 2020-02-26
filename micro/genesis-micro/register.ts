import Vue from 'vue';
import { MicroRid } from './micro';
import { Square } from './square';

export type MicroRegisterTypes = keyof Square;

export type MicroRegisterOptions = {
    [P in MicroRegisterTypes]: (square: Square) => Square[P];
};

export const R_NAME = '_MicroRegisterSquare';

type PartialSquare = Partial<MicroRegisterOptions>;

export const forEachSquare = (
    square: PartialSquare | undefined,
    cb: (square: PartialSquare, name: keyof PartialSquare) => void
) => {
    if (square && typeof square === 'object') {
        Object.keys(square).forEach((name: any) => {
            if (typeof (square as any)[name] === 'function') {
                cb(square, name);
            }
        });
    }
};

export interface RegisterItem {
    rid: MicroRid;
    name: MicroRegisterTypes;
}

export const microRegister = {
    beforeCreate (this: Vue) {
        // 添加一次使用的记录
        const micro = this.$options.micro;
        if (micro) {
            micro.addUse();
        }
        // 安装
        forEachSquare(this.$options.microRegister, (squares, name) => {
            const install = squares[name];
            if (!install) return;
            const v = install(
                this.$parent ? this.$parent.$square : new Square()
            );
            if (typeof v === 'undefined') return;
            const rid: MicroRid = this.$micro.register(name, v);
            const arr: RegisterItem[] = (this as any)[R_NAME] || [];
            arr.push({
                rid,
                name
            });
            (this as any)[R_NAME] = arr;
        });
        // 模块已经全部注册完成，允许 this.$square 的结果进行缓存
        (this as any)._squareCache = null;
    },
    destroyed (this: Vue) {
        if (Array.isArray((this as any)[R_NAME])) {
            (this as any)[R_NAME].forEach((item: RegisterItem) => {
                this.$micro.unregister(item.name, item.rid);
            });
        }
        const micro = this.$options.micro;
        if (!micro) return;
        micro.reduceUse();
        if (!micro.isUse) {
            micro.destroy();
        }
    }
};

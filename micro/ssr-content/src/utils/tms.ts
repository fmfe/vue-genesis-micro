import { Tms } from '@fmfe/genesis-micro';
import { BaseRequest } from './request';

export class BaseTms<T extends BaseRequest> extends Tms {
    public api: T;
    public constructor (api: T) {
        super();
        this.api = api;
    }
}

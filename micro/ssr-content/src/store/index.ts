import { BaseTms } from '../utils/tms';
import { Api } from '../api';

export class BlogList extends BaseTms<Api> {
    public res: any = null;
    public already = false;
    public get list () {
        if (this.res && this.res.data) {
            return this.res.data;
        }
        return [];
    }

    public $done (res: any) {
        this.res = res;
        this.already = true;
    }

    public async getTopics () {
        if (this.already) return true;
        this.$done(await this.api.getTopics());
    }
}

declare module '@fmfe/genesis-micro/types/square' {
    interface Square {
        blogList: BlogList;
    }
}

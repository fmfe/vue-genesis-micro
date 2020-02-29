import { BaseTms } from '../utils/tms';
import { Api } from '../api';
interface Item {
    id: string;
    title: string;
}

export class BlogList extends BaseTms<Api> {
    public list: Item[] = [];
    public already = false;

    public $done (list: Item[]) {
        this.list = list;
        this.already = true;
    }

    public async getTopics () {
        if (this.already) return true;
        const res = await this.api.getTopics();
        if (res.status === 200 && res.data.data) {
            // Control the data you need to reduce the rendering size of the page
            this.$done(res.data.data.map((item): Item => {
                return {
                    id: item.id,
                    title: item.title
                };
            }));
        }
    }
}

declare module '@fmfe/genesis-micro/types/square' {
    interface Square {
        blogList: BlogList;
    }
}

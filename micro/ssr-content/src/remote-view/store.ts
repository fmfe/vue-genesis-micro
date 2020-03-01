import { Tms } from '@fmfe/genesis-micro';
import axios from 'axios';

export class Store extends Tms {
    public data: any = null;
    public html = '';
    public $success (data: any) {
        this.data = data;
    }

    public $html (html: string) {
        this.html = html;
    }

    public async getView (url: string): Promise<string> {
        const res = await axios.get(url);
        if (res.status !== 200) return '';
        const html = res.data.style + res.data.html;
        this.$success({
            url: res.data.url,
            name: res.data.name,
            state: res.data.state
        });
        this.$html(html);

        return html;
    }
}

declare module '@fmfe/genesis-micro/types/square' {
    interface Square {
        remoteView: Store;
    }
}

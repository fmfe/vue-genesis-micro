import { Tms } from '@fmfe/genesis-micro';
import axios from 'axios';

export class Store extends Tms {
    public html = '';
    public state: any = null;
    public $success (html: string, state: any) {
        this.html = html;
        this.state = state;
    }

    public async getView (url: string) {
        const res = await axios.get(url);
        if (res.status !== 200) return;
        console.log(res);
        const html = res.data.style + res.data.html;
        this.$success(html, res.data.state);
    }
}

declare module '@fmfe/genesis-micro/types/square' {
    interface Square {
        remoteView: Store;
    }
}

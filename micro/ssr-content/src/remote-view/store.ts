import { Tms } from '@fmfe/genesis-micro';
import axios from 'axios';
export class Base64 {
    /**
   * 转码
   */
    public static encode (str: string): string {
        if (process.env.VUE_ENV === 'server') {
            return Buffer.from(str).toString('base64');
        }
        return btoa(encodeURIComponent(str));
    }

    /**
   * 解码
   */
    public static decode (str: string): string {
        if (process.env.VUE_ENV === 'server') {
            return Buffer.from(str, 'base64').toString();
        } else {
            return decodeURIComponent(atob(str));
        }
    }
}
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
        const html = res.data.style + res.data.html + res.data.script;
        this.$success(res.data);
        this.$html(html);

        return html;
    }
}

declare module '@fmfe/genesis-micro/types/square' {
    interface Square {
        remoteView: Store;
    }
}

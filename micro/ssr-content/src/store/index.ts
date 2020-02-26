import { Tms } from '../../../genesis-micro';

interface ListItem {
    name: string;
    title: string;
}

export class Store extends Tms {
    public list: ListItem[] =[];
    public $push (item: ListItem) {
        this.list.push(item);
    }
}

declare module '../../../genesis-micro/square' {
    export interface Square {
        readonly store: Store;
    }
}

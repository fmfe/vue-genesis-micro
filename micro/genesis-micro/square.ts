interface SquareModel {
    [x: string]: any;
}

export class Square implements SquareModel {}
declare module 'vue/types/vue' {
    interface Vue {
        $square: Square;
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        square?: Partial<Square>;
    }
}

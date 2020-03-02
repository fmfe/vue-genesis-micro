import { GenesisTypes } from '@fmfe/genesis-core';
import serialize from 'serialize-javascript';

export class StreamRender {
    /**
     * Styles or scripts that have already been rendered
     */
    public already = new Set<string>();
    /**
     * Rendering style, HTML, state, script
     */
    public render (data: GenesisTypes.RenderData) {
        return this.renderStyle(data) + this.renderHtml(data) + this.renderScript(data);
    }

    /**
     * Render HTML
     */
    public renderHtml (data: GenesisTypes.RenderData) {
        return data.html;
    }
    /**
     * Render style
     */

    public renderStyle (data: GenesisTypes.RenderData) {
        const arr = data.preload;
        const renderArr: string[] = [];
        let haveCss = false;
        arr.forEach(item => {
            if (item.extension !== 'css') return;
            haveCss = true;
            if (this.already.has(item.file)) {
                return '';
            }
            this.already.add(item.file);
            renderArr.push(`<link rel="stylesheet" href="${item.file}">`);
        });
        if (haveCss) {
            return renderArr.join('');
        }
        return data.style;
    }

    /**
     * Render script
     */
    public renderScript (data: GenesisTypes.RenderData) {
        const scriptJSON:string = serialize({
            url: data.url,
            id: data.id,
            name: data.name,
            state: data.state
        }, {
            isJSON: true
        });
        const scriptState = `<script data-ssr-genesis-name="${data.name}" data-ssr-genesis-id="${data.id}">window["${data.id}"]=${scriptJSON};</script>`;
        const script = data.preload.filter(item => {
            return item.extension === 'js' && !this.already.has(item.file);
        }).map(item => {
            this.already.add(item.file);
            return `<script src="${item.file}" defer></script>`;
        }).join('');
        return scriptState + script;
    }
}

import { ssrHeader } from './micro/ssr-header/genesis';
import { ssrContent } from './micro/ssr-content/genesis';
import { ssrFooter } from './micro/ssr-footer/genesis';

export const ssrList = [
    ssrContent,
    ssrFooter,
    ssrHeader
];

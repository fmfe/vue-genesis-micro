import { Build } from '@fmfe/genesis-compiler';
import { ssrList } from './genesis';

const start = () => {
    return Promise.all(ssrList.map(ssr => {
        return new Build(ssr).start();
    }));
};
export default start();

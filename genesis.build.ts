import { Build } from '@fmfe/genesis-compiler';
import { ssr } from './genesis';

const start = () => {
    return new Build(ssr).start();
};
export default start();

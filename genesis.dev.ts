import { DevServer } from '@fmfe/genesis-compiler';
import { ssr } from './genesis';

const start = () => {
    return new DevServer(ssr).start();
};
export default start();

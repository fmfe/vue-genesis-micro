import { DevServer } from '@fmfe/genesis-compiler';
import { ssrList } from './genesis';
import { PageServer } from './server';

const start = async () => {
    await Promise.all(ssrList.map(ssr => {
        return new DevServer(ssr).start();
    }));
    new PageServer().start();
};
export default start();

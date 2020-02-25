import express from 'express';

export class PageServer {
    public app = express();
    public constructor () {
        this.app.use((req, res, next) => {
            console.log('test');
            next();
        });
    }

    public start () {
        this.app.listen(3004, () => console.log(`http://localhost:${3004}`));
    }
}

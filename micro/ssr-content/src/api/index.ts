import { BaseRequest } from '../utils/request';

export class Api extends BaseRequest {
    public getTopics () {
        return this.get('/api/v1/topics');
    }
}

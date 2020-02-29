import { BaseRequest } from '../utils/request';

export interface GetTopicsResponse {
    success: boolean;
    data: GetTopicsData[];
}

export interface GetTopicsData {
    id: string;
    author_id: string;
    tab?: string;
    content: string;
    title: string;
    last_reply_at: string;
    good: boolean;
    top: boolean;
    reply_count: number;
    visit_count: number;
    create_at: string;
    author: GetTopicsDataAuthor;
}

export interface GetTopicsDataAuthor {
    loginname: string;
    avatar_url: string;
}

export class Api extends BaseRequest {
    public getTopics () {
        return this.get<GetTopicsResponse>('/api/v1/topics');
    }
}

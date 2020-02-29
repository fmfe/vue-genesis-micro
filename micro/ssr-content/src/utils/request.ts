import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Config } from './config';

export class Request {
    public request: AxiosInstance;
    public constructor (config: Config) {
        const request = this.request = axios.create({
            withCredentials: false,
            validateStatus: () => true,
            baseURL: config.baseApi,
            timeout: 5000
        });
        const showLog = (axiosConfig: AxiosRequestConfig, isOk: boolean) => {
            if (process.env.VUE_ENV === 'server' && axiosConfig._startTime) {
                console.log(
                    `axios: ${(axiosConfig.baseURL || '') + axiosConfig.url} ${Date.now() - axiosConfig._startTime}ms ${
                        isOk ? 'Success' : 'Error'
                    }`);
            }
        };
        request.interceptors.request.use(axiosConfig => {
            axiosConfig._startTime = Date.now();
            return axiosConfig;
        });
        request.interceptors.response.use(
            axiosConfig => {
                showLog(axiosConfig.config, true);
                return axiosConfig;
            },
            err => {
                err.data = null;
                showLog(err.config, false);
                return Promise.resolve(err);
            }
        );
    }

    public get <T> (url: string, config: AxiosRequestConfig): Promise<{ status: number; data: T }> {
        return this.request.get(url, config).then(res => {
            return {
                status: res.status,
                data: res.data
            };
        });
    }
}

export class BaseRequest {
    private request: Request;
    public constructor (config: Config) {
        this.request = config.request;
    }

    public get <T> (url: string, config: AxiosRequestConfig = {}) {
        return this.request.get<T>(url, config);
    }
}

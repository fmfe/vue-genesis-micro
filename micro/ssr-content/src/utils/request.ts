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
                if (typeof axiosConfig.data !== 'object') {
                    axiosConfig.data = {
                        code: -10000,
                        data: axiosConfig.data,
                        message: 'Request error'
                    };
                    return axiosConfig;
                }
                return axiosConfig;
            },
            err => {
                err.data = {
                    code: -10001,
                    data: '',
                    message: 'Request failure'
                };
                showLog(err.config, false);
                return Promise.resolve(err);
            }
        );
    }

    public get (url: string, config: AxiosRequestConfig) {
        return this.request.get(url, config).then(res => res.data);
    }
}

export class BaseRequest {
    private request: Request;
    public constructor (config: Config) {
        this.request = config.request;
    }

    public get (url: string, config: AxiosRequestConfig = {}) {
        return this.request.get(url, config);
    }
}

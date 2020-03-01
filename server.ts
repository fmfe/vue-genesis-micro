import express from 'express';
import httpProxy from 'http-proxy';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ssrList } from './genesis';

const proxy = httpProxy.createProxyServer({});

class Request {
    public request: AxiosInstance;
    public constructor () {
        const request = this.request = axios.create({
            withCredentials: true,
            validateStatus: () => true
        });
        const showLog = (axiosConfig: AxiosRequestConfig, isOk: boolean) => {
            if (process.env.VUE_ENV === 'server' && axiosConfig._startTime) {
                console.log(
                    `axios: ${axiosConfig.url} ${Date.now() - axiosConfig._startTime}ms ${
                        isOk ? '成功' : '失败'
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
                        message: '请求错误'
                    };
                    return axiosConfig;
                }
                return axiosConfig;
            },
            err => {
                err.data = {
                    code: -10001,
                    data: '',
                    message: '请求失败'
                };
                showLog(err.config, false);
                return Promise.resolve(err);
            }
        );
    }

    public get (url: string) {
        return this.request.get(url).then(res => res.data);
    }
}

const request = new Request();
declare module 'axios' {
    export interface AxiosRequestConfig {
        _startTime?: number;
    }
}

export class PageServer {
    public app = express();
    public constructor () {
        ssrList.forEach(ssr => {
            this.app.use(ssr.publicPath, (req, res, next) => {
                proxy.web(req, res, {
                    target: `http://localhost:${ssr.port}${ssr.publicPath}`
                });
            });
        });
        this.app.get('*', async (req, res, next) => {
            const scriptArr: string[] = [];
            const onSuccess = (data) => {
                const htmlArr: string[] = [];
                htmlArr.push(data.style);
                htmlArr.push(data.html);
                scriptArr.push(data.scriptState);
                scriptArr.push(data.script);
                res.write(htmlArr.join(''));
            };
            res.setHeader('content-type', 'text/html; charset=UTF-8');
            await Promise.all([
                request.get(`http://localhost:3003${req.url}`).then(onSuccess),
                request.get(`http://localhost:3001${req.url}`).then(onSuccess)
            ]);
            res.write(scriptArr.join(''));
            res.end();
        });
    }

    public start () {
        this.app.listen(3004, () => console.log(`http://localhost:${3004}`));
    }
}

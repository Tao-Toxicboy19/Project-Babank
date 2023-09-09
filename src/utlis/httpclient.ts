import axios from 'axios';
import join from 'url-join'
import { NETWORK_CONNECTION_MESSAGE, NOT_CONNECT_NETWORK, apiUrl, apiUrlV2 } from '../Constants';

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config: any) => {
    if (!isAbsoluteURLRegex.test(config.url)) {
        config.url = join(apiUrlV2, config.url)
    }
    config.timeout = 10000
    return config
})
axios.interceptors.request.use((res) => { return res }, (error) => {
    console.log(JSON.stringify(error, undefined, 2))
    if (axios.isCancel(error)) {
        return Promise.reject(error)
    } else if (!error.res) {
        return Promise.reject({
            code: NOT_CONNECT_NETWORK,
            message: NETWORK_CONNECTION_MESSAGE
        })
    }
    return Promise.reject(error)
})

export const httpClient = axios
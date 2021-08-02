import axios from 'axios';
import router from '../router'
import { ElMessage } from 'element-plus'
import storage from './../utils/storage'
const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8088/server/api',
    timeout: 8000
})


// 请求拦截
instance.interceptors.request.use((req) => {
    const headers = req.headers;
    const { token = "" } = storage.getItem('userInfo') || {};
    if (!headers.Authorization) headers.Authorization = 'Bearer ' + token;
    return req;
})

// 响应拦截
instance.interceptors.response.use((res) => {
    const { code, data, msg } = res.data;
    if (code === 200) {
        return data;
    } else if (code === 50001) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        return Promise.reject(TOKEN_INVALID)
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})


/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    return instance(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})


export default request;
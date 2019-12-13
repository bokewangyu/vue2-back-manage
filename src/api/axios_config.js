import axios from "axios";
import {
    baseUrl
} from '@/config/env'
import qs from 'qs';
import {
    Toast
} from 'vant';

import store from "@/store/index";
import * as types from '@/store/mutations_type';
import router from '@/router';
axios.defaults.timeout = 10000; // 超时时间
axios.defaults.baseURL = baseUrl; // 默认地址
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8'


//http request 拦截器
axios.interceptors.request.use(
    config => {
        // console.log("==================axios request interceptors config params==================" );
        // console.log(config);
        store.dispatch("loading/start_loading");
        // config.headers.common['token'] = "token==================";
        if (store.state.login.userInfo) {
            config.headers.Authorization = `token ${store.state.login.userInfo.status}`;
        }
        return config;
    },
    error => {
        store.dispatch("loading/end_loading");
        return Promise.reject(error);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        // console.log("==================axios response interceptors response params==================")
        // console.log(response)
        store.dispatch("loading/end_loading");
        return checkStatus(response)
    },
    error => {
        const {
            response
        } = error;
        store.dispatch("loading/end_loading");
        if (response) {
            errorHandle(response.status, response.data.message);
        }
        return Promise.reject(error)
    }
)

// 请求成功的回调
const checkStatus = (response) => {
    if (response.data && response.data.status == "405") {
        response.data.message = "输入参数过长"
    }
    if (response.data && response.data.status == "406") {
        response.data.message = "用户身份失效，请重新登陆"
        setTimeout(function () {
            window.location.href = "/login"
        }, 300)
    }
    return response;
}


const statusDic = {
    400: '操作失败',
    401: '登录超时，请重新登录',
    403: '拒绝访问',
    404: '网络资源无法访问',
    405: '请求方法不支持',
    408: '请求超时，请稍后重试',
    500: '服务器内部错误',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持'
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 
 */
const errorHandle = (status, other) => {
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            tip('401: 未登录状态，跳转登录页');
            store.dispatch(types.COM.REMOVE_USER);
            router.replace({
                path: '/',
                query: {redirect: router.currentRoute.fullPath}
            })
            break;
        case 403:
            tip('403: 登录过期，请重新登录');
            store.dispatch(types.COM.REMOVE_USER);
            router.replace({
                path: 'login',
                query: {redirect: router.currentRoute.fullPath}
            })
            break;
        case 404:
            tip('404: 请求的资源不存在');
            break;
        default:
            console.log(other);
    }
}

// 封装axios
export function fetch(url, params, method) {
    method = method ? method.toLocaleUpperCase() : 'GET';
    let httpDefault = {
        method: method,
        url: url,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        data: method === 'POST' || method === 'PUT' ? qs.parse(params) : null,
        timeout: 10000
    }
    return new Promise((resolve, reject) => {
        axios(httpDefault).then((res) => {
            // console.log("=========fetch then=========");
            // console.log(res);
            resolve(res.data);
        }).catch(error => {
            console.log("=========fetch catch=========");
            reject(error);
        })
    })

    // axios(httpDefault).then((res) => {
    //     console.log("=========fetch=========");
    //     console.log(res);
    //     return Promise.resolve(res);
    // }).catch((err) => {
    //     console.log(err)
    //     return Promise.reject(err);
    // })
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params) {
    params = params || {};
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data) {
    data = data || {};
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data))
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data) {
    data = data || {};
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data) {
    data = data || {};
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

export function axiosAll(url) {
    axios.all([...url])
        .then(axios.spread(function (res1, res2) {
            console.log(res1, res2)
        }));
}

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    });
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

// export default axios;

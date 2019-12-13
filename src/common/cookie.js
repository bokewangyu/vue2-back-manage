import Cookies from 'js-cookie'
//获取cookie
export function getCookie(name) {
    return Cookies.get(name);
}

//设置cookie
export function setCookie(c_name, value, expires, path) {
    return Cookies.set(c_name, value, {
        expires: expires || 7,
        path: path || '/'
    });
};

//删除cookie
export function delCookie(name) {
    return Cookies.remove(name);
};

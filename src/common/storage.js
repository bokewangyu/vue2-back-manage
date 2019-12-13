export function setStorage(key, value, expires) {
    if (!key) return;
    // 设置过期时间 (expires 天)
    const obj = {
        data: value,
        // time: Date.now(),
        expire: (expires * 24 * 60 * 60 * 1000) || null
    };
    localStorage.setItem(key, JSON.stringify(obj));
}
//取出数据
export function getStorage(key) {
    if (!key) return;
    const val = localStorage.getItem(key);
    let storageInfo;
    if (val != null) {
        storageInfo = JSON.parse(val);
        if (storageInfo.expire != null && storageInfo.expire < new Date().getTime()) {
            localStorage.removeItem(key);
            return null;
        }
        return storageInfo.data;
    }
    return null;
}
// 删除单个数据
export function removeStorage(key) {
    if (!key) return;
    localStorage.removeItem(key);
}
// 删除所有数据
export function clearStorage() {
    localStorage.clear();
}


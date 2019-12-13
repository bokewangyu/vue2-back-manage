import {
    getAdminInfo,
    login,signout
} from '@/api/getData';
import * as types from '../mutations_type';
import {setStorage,getStorage,removeStorage} from '@/common/storage';
import {
    Message
} from 'element-ui'
const state = {
    adminInfo: {
        avatar: 'default.jpg',
    },
    userInfo: getStorage("userInfo") || null
}

const actions = {
    async getAdminData({
        commit
    }) {
        try {
            const res = await getAdminInfo()
            if (res.status == 1) {
                commit('saveAdminInfo', res);
            } else {
                throw new Error(res.type)
            }
        } catch (err) {
            console.log(err.message)
        }
    },
    async set_user_info({
        commit
    }, data) {
        try {
            const res = await login(data);
            if (res.status == 1) {
                Message({
                    type: "success",
                    message: "登录成功"
                });
                commit('COM.SET_USER_INFO', res);
            } else {
                Message({
                    type: "error",
                    message: res
                });
                throw new Error(res.type)
            }
        } catch (err) {
            console.log("err")
            commit('COM.CONTENT_FAILURE');
            console.log(err)
        }
    },

    async remove_user({
        commit
    }) {
        try {
            const res = await signout();
            if (res.status == 1) {
                console.log("1")
                Message({
                    type: 'success',
                    message: '退出成功'
                });
                commit(types.COM.REMOVE_USER, res.data);
            }else{
                Message({
                    type: 'error',
                    message: res
                });
            }
        } catch (err) {
            console.log("err")
            commit('COM.CONTENT_FAILURE');
            console.log(err.message)
        }
    }
}

const mutations = {
    saveAdminInfo(state, adminInfo) {
        state.adminInfo = adminInfo;
    },
    [types.COM.SET_USER_INFO](state, data) {
        state.userInfo = data;
        setStorage('userInfo', data)
    },
    [types.COM.REMOVE_USER](state) {
        state.userInfo = null
        removeStorage('userInfo')
    },
    [types.COM.CONTENT_FAILURE] (state) {

	},
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}

import * as types from '../mutations_type';

const state = {
    loadingStatus: false,
    loadingCount: 0,
}

const actions = {
    start_loading({
        commit
    }) {
        commit(types.COM.START_LOADING);
    },
    end_loading({
        commit
    }) {
        commit(types.COM.END_LOADING);
    }
}

const getters = {
    loadingStatus: state => state.loadingStatus,
    loadingCount: state => state.loadingCount,
}

const mutations = {
    [types.COM.START_LOADING](state) {
        state.loadingStatus = true;
        state.loadingCount++;
    },
    [types.COM.END_LOADING](state) {
        state.loadingCount--;
        if (state.loadingCount <= 0) {
            state.loadingStatus = false;
            state.loadingCount == 0;
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}

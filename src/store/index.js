import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading';
import login from './modules/login';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loading: loading,
        login: login
    }
})

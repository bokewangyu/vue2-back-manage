import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

//发布后是否显示提示
Vue.config.productionTip = false

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})


Vue.prototype.bus = new Vue;
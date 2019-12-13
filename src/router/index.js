import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store/index";
Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');


const routes = [{
        path: '/',
        component: login,
        name: 'login',
    },
    {
        path: '/manage',
        component: manage,
        name: 'manage',
        meta: {
            requireAuth: true
        },
        children: [{
            path: '/',
            component: home,
            name: 'home',
            meta: {
                requireAuth: true
            },
        }, {
            path: '/addShop',
            component: addShop,
            meta: {
                requireAuth: true,
				title: ['添加数据', '添加商铺']
            },
        }, {
            path: '/addGoods',
            component: addGoods,
            meta: {
                requireAuth: true,
                title: ['添加数据', '添加商品']
            },
        }, {
            path: '/userList',
            component: userList,
            meta: {
                requireAuth: true,
                title: ['数据管理', '用户列表']
            },
        }, {
            path: '/shopList',
            component: shopList,
            meta: {
                requireAuth: true,
                title: ['数据管理', '商家列表']
            },
        }, {
            path: '/foodList',
            component: foodList,
            meta: {
                requireAuth: true,
                title: ['数据管理', '食品列表']
            },
        }, {
            path: '/orderList',
            component: orderList,
            meta: {
                requireAuth: true,
                title: ['数据管理', '订单列表']
            },
        }, {
            path: '/adminList',
            component: adminList,
            meta: {
                requireAuth: true,
                title: ['数据管理', '管理员列表']
            },
        }, {
            path: '/visitor',
            component: visitor,
            meta: {
                requireAuth: true,
                title: ['图表', '用户分布']
            },
        }, {
            path: '/newMember',
            component: newMember,
            meta: {
                requireAuth: true,
                title: ['图表', '用户数据']
            },
        }, {
            path: '/uploadImg',
            component: uploadImg,
            meta: {
                requireAuth: true,
                title: ['文本编辑', 'MarkDown']
            },
        }, {
            path: '/vueEdit',
            component: vueEdit,
            meta: {
                requireAuth: true,
                title: ['编辑', '文本编辑']
            },
        }, {
            path: '/adminSet',
            component: adminSet,
            meta: {
                requireAuth: true,
                title: ['设置', '管理员设置']
            },
        }, {
            path: '/sendMessage',
            component: sendMessage,
            meta: {
                requireAuth: true,
                title: ['设置', '发送通知']
            },
        }, {
            path: '/explain',
            component: explain,
            meta: {
                requireAuth: true,
                title: ['说明', '说明']
            },
        }]
    }
]

const router = new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production'
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {
    // if (to.meta.requireAuth) { 
        if (store.state.login.userInfo) {
            next() // 已登录
        } else {
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})


export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/layout/Layout.vue';
import devopsConfigCenterRoutes from './configCenter/index';
import devopsDeployCenterRoutes from './deployCenter/index';

Vue.use(VueRouter);

/**
 * 路由配置
 * @param hidden {Boolean} true不显示在导航栏
 * @param meta
 * {
 *   permission {String} 权限值
 *   icon {String} 图标的类名
 *   title {String} 标题(用于显示在侧边栏和面包屑)
 * }
 */

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/login.vue'),
        },
        {
            path: '/',
            component: Layout,
            redirect: '/home',
            meta: {
                title: '首页',
                requireLogin: true,
            },
            hidden: true,
            children: [
                {
                    path: 'home',
                    meta: {
                        requireLogin: true,
                        title: '首页'
                    },
                    component: () => import('../views/home.vue'),
                }
            ]
        },
        devopsConfigCenterRoutes,
        devopsDeployCenterRoutes,
        {
            path: '*',
            component: () => import( '../views/error/NotFind.vue'),
            hidden: true
        }
    ]
});

// 路由拦截
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireLogin)) {
        // 判断是否需要登录权限
        if (window.sessionStorage.getItem("username")) {
            next();
        } else {
            // 没登录则跳转到登录界面
            next({
                path: "/login"
            });
        }
    } else {
        next();
    }
});

export default router;

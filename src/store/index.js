/**
 * Created by wangliang on 2017/8/4.
 */
'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import { getUserInfo } from '@/api/common.js';
import router from '@/routes';
import projectModule from './configCenter/project';
import clusterModule from './configCenter/cluster';
import groupModule from './configCenter/group';
import hostModule from './configCenter/host';
import apolloModule from './configCenter/apollo';
import modModule from './configCenter/mod';
import saltNodeModule from './configCenter/saltNode';
import buildModule from './deployCenter/build';
import deployModule from './deployCenter/deploy';
import operationModule from './deployCenter/operation';
import versionModule from './deployCenter/version';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        modalType: [],
        loading: [],
        navCollapse: document.body.clientWidth < 1450 || false,
        username: '',
        uid: '',
        power_list: {},
        manageLoginUrl: ''
    },
    getters: {
        // 过滤不显示的路由
        routes: () => {
            return filterRouter(router);
        }
    },
    mutations: {
        // 显示弹窗
        showModal(state, name) {
            show(state.modalType, name);
        },

        // 关闭弹窗
        hideModal(state, name) {
            close(state.modalType, name);
        },

        // 显示loading
        showLoading(state, name) {
            show(state.loading, name);
        },

        // 关闭loading
        closeLoading(state, name) {
            close(state.loading, name);
        },

        // 菜单隐藏显示
        setCollapse(state, payload) {
            if (payload) {
                state.navCollapse = payload;
            } else {
                state.navCollapse = !state.navCollapse;
            }
        },

        // 设置管理用户信息
        setAdminUserInfo(state, data) {
            const {
                manageLoginUrl,
                permission: {
                    cn_name, user_name, uid, permission_list
                }
            } = data;

            state.username = `${cn_name}(${user_name})`;
            state.uid = uid;
            state.power_list = permission_list;
            state.manageLoginUrl = manageLoginUrl;
        },
    },
    actions: {
        // 获取管理员用户信息
        async getAdminUserInfo({ commit, rootState }) {
            const { data } = await getUserInfo();
            if (data.code === 200) {
                commit('setAdminUserInfo', data.data);
            }
        }
    },
    modules: {
        projectModule,
        clusterModule,
        groupModule,
        hostModule,
        operationModule,
        versionModule,
        modModule,
        buildModule,
        deployModule,
        saltNodeModule,
        apolloModule
    }
});

/**
 * 过滤路由，供导航栏使用，没有权限不显示
 * @param routers {Object} 路由对象
 */
const filterRouter = (routers) => {
    const newRouter = routers.options.routes.filter((route) => {

        // 是否隐藏
        if (!route.hidden) {
            return true;
        }
        return false;
    });
    return newRouter;
};

/**
 * 添加相关别名到相关array
 * @param stateArr {Array} 指定要添加的数组
 * @param name {String} 别名
 */
const show = (stateArr, name) => {
    stateArr.push(name);
};

/**
 * 删除相关loading名称到相关array
 * @param stateArr {Array} 指定要添加的数组
 * @param name {String} 别名
 */
const close = (stateArr, name) => {
    const index = stateArr.indexOf(name);
    if (index > -1) {
        stateArr.splice(index, 1);
    }
};

export default store;
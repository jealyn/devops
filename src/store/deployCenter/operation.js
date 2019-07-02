'use strict';

import { buildVersion, deployVersion, reBuildVersion, updateVersion, getDownSql } from '@/api/deployCenter/operation';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const operationModule = {
    namespaced: true,
    state: {
        list: [],
        currentPage: 1,
        pageSize: 15,
        totalCount: 0,
        detail: {},
        select: [],
        status: false,
    },
    mutations: {
        setPage(state, { currentPage = 1, totalRecord = 0 }) {
            state.totalCount = totalRecord;
            state.currentPage = currentPage;
        },
        setList(state, list = []) {
            state.list = list;
        },
        setSelect(state, select = []) {
            state.select = select;
        },
        setDetail(state, detail) {
            state.detail = detail;
        },
        setStatus(state) {
            state.status = true;
        }
    },

    actions: {
        // 提交编译
        async addbuildVersion({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'versionForm', { root: true });
            const { data } = await buildVersion(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: '提交编译成功'
                });
                commit('setStatus', { root: true });                
                commit('hideModal', 'buildVersionDistributor', { root: true });
              // dispatch('getProjectList', rootState.route.query);
            }
            commit('closeLoading', 'versionForm', { root: true });
        },
        //重新编译
        async reBuildVersion({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'rebuildVersionList', { root: true });
            const { data } = await reBuildVersion(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: '提交编译成功'
                });
            }
            commit('closeLoading', 'rebuildVersionList', { root: true });
        },
        async deployVersion({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'deployVersion', { root: true });
            const { data } = await deployVersion(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: '提交部署成功'
                });
              commit('hideModal', 'deployVersion', { root: true });
              // dispatch('getProjectList', rootState.route.query);
            }
            commit('closeLoading', 'deployVersion', { root: true });
        },
        //更新信息
        async updateVersion({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'updateVersion', { root: true });
            const { data } = await updateVersion(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: '更新信息成功'
                });
              commit('hideModal', 'updateVersion', { root: true });
            }
            commit('closeLoading', 'updateVersion', { root: true });
        },
        //下载sql
        async getDownSql({ commit, state, dispatch, rootState }, payload) {
            const { data } = await getDownSql(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: '下载成功'
                });
            }
        }
    },
    getters: {
      
    },
};

export default operationModule;
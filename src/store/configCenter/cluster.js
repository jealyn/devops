'use strict';

import { getClusterList, createCluster, updateCluster } from '@/api/configCenter/cluster';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const clusterModule = {
    namespaced: true,
    state: {
        list: [],
        select: [],
        detail: {},
        currentPage: 1,
        pageSize: 15,
        totalCount: 0,
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
        }
    },
    actions: {
        // 获取集群列表
        async getClusterList({ commit, state, rootState }, payload) {
            commit('showLoading', 'clusterList', { root: true });
            const { currentPage = 1 } = payload;
            const params = {
                pageSize: state.pageSize,
                currentPage: currentPage,
                orderSegment: 'created_time.desc',
                ...payload
            };
            const { data } = await getClusterList(params);
            if (data.code === 200) {
                commit('setList', data.data.data);
                commit('setPage', data.data.paginator || {});
            }
            commit('closeLoading', 'clusterList', { root: true });
        },
        // 获取详情
        async getClusterDetail({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'clusterDetail', { root: true });
            const params = {
                clusterId: payload.clusterId,
            };
            const { data } = await getClusterList(params);
            if (data.code === 200) {
                commit('setDetail', data.data.data[0]);
            }
            commit('closeLoading', 'clusterDetail', { root: true });
        },
        // 添加修改集群信息
        async addOrUpdateCluster({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'clusterAdd', { root: true });
            const isUpdate = payload.clusterId !== undefined;
            const { data } = isUpdate ? await updateCluster(payload) : await createCluster(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `${isUpdate ? '更新' : '添加'}集群成功！`
                });
                isUpdate ? commit('hideModal', 'updateCluster', { root: true }) : commit('hideModal', 'addCluster', { root: true });
                dispatch('getClusterList', rootState.route.query);
            }
            commit('closeLoading', 'clusterAddorUpdate', { root: true });
        },
        async addCluster({ commit, state, dispatch, rootState }, payload) {
            const { data } = await createCluster(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `添加集群成功！`
                });
                commit('hideModal', 'addClusterFromProject', { root: true });
            }
        }
    },
    getters: {
        filterClusterList: state => {
            return state.list.map((data) => {
                return {
                    ...data,
                    visible: false
                };
            });
        },
        filterClusterDetail: state => {
            return state.detail;
        },
        pagination: state => {
            const { currentPage, pageSize, totalCount } = state;
            return {
                currentPage,
                pageSize,
                totalCount
            };
        },
    }
};

export default clusterModule;
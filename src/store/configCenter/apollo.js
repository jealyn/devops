'use strict';

import { getApolloList, getApolloDetail, updateApollo, addApollo, addNameSpace } from '@/api/configCenter/apollo';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const apolloModule = {
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
        // 获取Apollo列表
        async getApolloList({ commit, state, rootState }, payload) {
            commit('showLoading', 'apolloList', { root: true });
            const { currentPage = 1 } = payload;
            const params = {
                pageSize: state.pageSize,
                currentPage: currentPage,
                orderSegment: 'created_time.desc',
                ...payload
            };
            const { data } = await getApolloList(params);
            if (data.code === 200) {
                commit('setList', data.data.data);
                commit('setPage', data.data.paginator || {});
            }
            commit('closeLoading', 'apolloList', { root: true });
        },
        // 获取详情
        async getApolloDetail({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'apolloDetail', { root: true });
            const params = {
                configId: payload.configId,
                idc: payload.idc
            };
            const { data } = await getApolloDetail(params);
            if (data.code === 200) {
                commit('setDetail', data.data.configNamespace);
            }
            commit('closeLoading', 'apolloDetail', { root: true });
        },
        // 添加修改Apollo
        async addOrUpdateApollo({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'apolloAdd', { root: true });
            const { data } = await updateApollo(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `更新成功！`
                });
                dispatch('getApolloDetail', rootState.route.query);
            }
            commit('closeLoading', 'apolloAdd', { root: true });
        },
        async addApollo({ commit, dispatch, rootState }, payload) {
            commit('showLoading', 'addApollo', { root: true });
            const { data } = await addApollo(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `添加成功！`
                });
                commit('hideModal', 'addApollo', { root: true });
                dispatch('getApolloList', rootState.route.query);
            }
            commit('closeLoading', 'addApollo', { root: true });
        },
        async addNameSpace({ commit, dispatch, rootState }, payload) {
            const { data } = await addNameSpace(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `添加成功！`
                });
                commit('hideModal', 'addNameSpace', { root: true });
                dispatch('getApolloDetail', rootState.route.query);
            }
        }
        
    },
    getters: {
        filterApolloList: state => {
            return state.list.map((data) => {
                return {
                    ...data,
                    visible: false
                };
            });
        },
        filterApolloDetail: state => {
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

export default apolloModule;
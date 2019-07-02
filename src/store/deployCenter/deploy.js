'use strict';

import { getDeployList, updateJobStatus } from '@/api/deployCenter/deploy';
import { getUserList } from '@/api/common.js';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const deployModule = {
    namespaced: true,
    state: {
        list: [],
        currentPage: 1,
        pageSize: 15,
        totalCount: 0,
        detail: {},
        select: [],
        jidDetail: {},
        approveList: []
    },
    mutations: {
        setPage(state, { currentPage = 1, totalRecord = 0 }) {
            state.totalCount = totalRecord;
            state.currentPage = currentPage;
        },
        setList(state, list = []) {
            state.list = list;
        },
        setApproveList(state, approveList = []) {
            state.approveList = approveList;
        },
        setSelect(state, select = []) {
            state.select = select;
        },
        setDetail(state, detail) {
            state.detail = detail;
        },
        setJidDetail(state, payload) {
            state.jidDetail = payload;
        }
    },

    actions: {
        // 获取列表
        async getDeployList({ commit, state, rootState }, payload) {
            commit('showLoading', 'deployList', { root: true });
            const { currentPage = 1 } = payload;
            const params = {
                pageSize: state.pageSize,
                currentPage: currentPage,
                orderSegment: 'created_time.desc',
                ...payload
            };
            const { data } = await getDeployList(params);
            if (data.code === 200) {
                commit('setList', data.data.data);
                commit('setPage', data.data.paginator || {});
            }
            commit('closeLoading', 'deployList', { root: true });
        },
        // 获取所有具有审核权限的用户
        async getApproveList({ commit, state, rootState }, payload) {
            const params = {
                page: 1,
                rid: payload.rid,
            };
            const { data } = await getUserList(params);
            if (data.code === 200) {
                commit('setApproveList', data.data.data);
            }
        },
        async updateJobStatus({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'deployList', { root: true });
            const params = {
                jobId: payload.jobId
            };
            const { data } = await updateJobStatus(params);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: 'Job状态更新成功'
                });
                if(payload.origin === 'version') {
                    dispatch('getDeployList', params);
                } else {
                    dispatch('getDeployList', rootState.route.query);
                }
            }
            commit('closeLoading', 'deployList', { root: true });
        },

        async getJidDetail({ commit }, payload) {
            commit('setJidDetail', payload);
        }
    },

    getters: {
        filterDeployList: state => {
            return state.list.map((data) => {
                return {
                    ...data,
                    visible: false
                };
            });
        },
        filterApproveList: state => state.approveList,
        filterDeployDetail: state => state.detail,
        filterJidDetail: state => state.jidDetail,
        pagination: state => {
            const { currentPage, pageSize, totalCount } = state;
            return {
                currentPage, pageSize, totalCount
            };
        }
    },
};

export default deployModule;
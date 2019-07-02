'use strict';

import { getBuildList, getBuildStatus } from '@/api/deployCenter/build';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const buildModule = {
    namespaced: true,
    state: {
        list: [],
        currentPage: 1,
        pageSize: 15,
        totalCount: 0,
        detail: {},
        select: [],
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
    },

    actions: {
        // 获取列表
        async getBuildList({ commit, state, rootState }, payload) {
            commit('showLoading', 'buildList', { root: true });
            const { currentPage = 1 } = payload;
            const params = {
                pageSize: state.pageSize,
                currentPage: currentPage,
                orderSegment: 'created_time.desc',
                ...payload
            };
            const { data } = await getBuildList(params);
            if (data.code === 200) {
                commit('setList', data.data.data);
                commit('setPage', data.data.paginator || {});
            }
            commit('closeLoading', 'buildList', { root: true });
        },
        // 更新编译状态
        async freshBuildStatus({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'buildList', { root: true });
            const params = {
                id: payload.id,
                projectId: payload.projectId, 
                versionId: payload.versionId,
                buildStatus: payload.buildStatus,
                buildId: payload.buildId
            };
            const { data } = await getBuildStatus(params);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `更新成功`,
                });
                if(payload.origin === 'version') {
                    let params = {
                        versionId: payload.versionId
                    };
                    dispatch('getBuildList', params); 
                } else {
                    dispatch('getBuildList', rootState.route.query);
                }    
            }
            commit('closeLoading', 'buildList', { root: true });
        },
    },

    getters: {
        filterBuildList: state => {
            return state.list.map((data) => {
                return {
                    ...data,
                    visible: false
                };
            });
        },
        filterBuildDetail: state => {
            return state.detail;
        },
        pagination: state => {
            const {
                currentPage,
                pageSize,
                totalCount
            } = state;
            return {
                currentPage,
                pageSize,
                totalCount
            };
        }
    },
};

export default buildModule;
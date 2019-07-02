'use strict';

import { getModList, getSaltModInfo } from '@/api/configCenter/mod';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const modModule = {
    namespaced: true,
    state: {
        list: [],
        currentPage: 1,
        pageSize: 15,
        totalCount: 0,
        detail: {},
        select: []
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
        async getModList({ commit, state, rootState }, payload) {
            commit('showLoading', 'modList', { root: true });
            const { currentPage = 1 } = payload;
            const params = {
                pageSize: state.pageSize,
                currentPage: currentPage,
                orderSegment: 'created_time.desc',
                ...payload
            };
            const { data } = await getModList(params);
            if (data.code === 200) {
                commit('setList', data.data.data);
                commit('setPage', data.data.paginator || {});
            }
            commit('closeLoading', 'modList', { root: true });
        },
        // 获取下拉数据
        async getModSelect({ commit }) {
            const params = {
                currentPage: 1, 
                pageSize: 1000 
            };
            const { data } = await getModList(params);
            if(data.code === 200) {
                commit('setSelect', data.data.data);
            }
        },
        // 获取某个模板详情
        async getSaltModDetail({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'saltModDetail', { root: true });
            const params = {
                id: payload.id
            };
            const { data } = await getSaltModInfo(params);
            if (data.code === 200) {
                commit('setDetail', data.data);
            }
            commit('closeLoading', 'saltModDetail', { root: true });
        }

    },
    getters: {
        filterModList: state => {
            return state.list.map((data) => {
                return {
                    ...data,
                    visible: false
                };
            });
        },
        filterSaltModSelect: state => state.select,
        filterSaltModDetail: state => state.detail,
        pagination: state => {
            const { currentPage, pageSize, totalCount } = state;
            return { currentPage, pageSize, totalCount };
        }
    },
};

export default modModule;
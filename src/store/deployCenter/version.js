'use strict';

import { getVersionList, getVersionInfo, createVersion } from '@/api/deployCenter/version';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const versionModule = {
    namespaced: true,
    state: {
        list: [],
        currentPage: 1,
        pageSize: 15,
        totalCount: 0,
        detail: {},
        select: [],
        form: {}
    },
    mutations: {
        setPage(state, { currentPage = 1, totalRecord = 0 }) {
            state.totalCount = totalRecord;
            state.currentPage = currentPage;
        },
        setList(state, list = []) {
            state.list = list;
        },
        setSearchForm(state, form) {
          state.form = form;
        },
        setSelect(state, select = []) {
            state.select = select;
        },
        setDetail(state, detail) {
            state.detail = detail;
        }
    },

    actions: {
        // 获取列表
        async getVersionList({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'versionList', { root: true });
            const { currentPage = 1 } = payload;
            const { searchFromDeploy, ...otherParams } = payload;
            const params = {
                pageSize: state.pageSize,
                currentPage: currentPage,
                orderSegment: 'created_time.desc',
                ...otherParams
            };
            const { data } = await getVersionList(params);
            if (data.code === 200) {
                commit('setList', data.data.data);
                commit('setPage', data.data.paginator || {});                
                // if(payload.searchFromDeploy) {
                //   commit('setSearchForm', { versionCode: params.versionCode, projectId: params.projectId });
                // }
                let statusList = [];
                data.data.data.map( (item) => {
                    statusList.push(item.buildStatus, item.deployStatus);
                });  
                if(statusList.includes('RUNNING')) {
                    setTimeout(() => {
                        dispatch('getVersionList', rootState.route.query);
                    }, 4000);
                } 
            }
            commit('closeLoading', 'versionList', { root: true });
        },
        // 获取详情
        async getVersionDetail({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'versionDetail', { root: true });
            const params = {
                versionId: payload.versionId
            };
            const { data } = await getVersionInfo(params);
            if (data.code === 200) {
                commit('setDetail', data.data);
            }
            commit('closeLoading', 'versionDetail', { root: true });
        },
    },

    getters: {
        filterVersionList: state => {
            return state.list.map((data) => {
                return {
                    ...data,
                    visible: false
                };
            });
        },
        filterVersionDetail: state => {
            return state.detail;
        },
        pagination: state => {
            const { currentPage, pageSize, totalCount } = state;
            return {
                currentPage, pageSize, totalCount
            };
        },
        form: state => {
          return state.form;
        }
    },
};

export default versionModule;
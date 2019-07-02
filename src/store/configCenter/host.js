'use strict';

import { getHostList, getHostInfo, createHost, updateHost, getEcsInfo, getCheckIn } from '@/api/configCenter/host';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const hostModule = {
    namespaced: true,
    state: {
        list: [],
        currentPage: 1,
        pageSize: 15,
        totalCount: 0,
        detail: {},
        ecsDetail: {},
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
        },
        setEcsDetail(state, detail) {
            state.ecsDetail = detail;
        }
    },

    actions: {
        // 获取列表
        async getHostList({ commit, state, rootState }, payload) {
            commit('showLoading', 'hostList', { root: true });
            const { currentPage = 1 } = payload;
            const params = {
                pageSize: state.pageSize,
                currentPage: currentPage,
                orderSegment: 'created_time.desc',
                ...payload
            };
            const { data } = await getHostList(params);
            if (data.code === 200) {
                commit('setList', data.data.data);
                commit('setPage', data.data.paginator || {});
            }
            commit('closeLoading', 'hostList', { root: true });
        },
        // 获取详情
        async getHostDetail({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'hostDetail', { root: true });
            const params = {
                hostId: payload.hostId
            };
            const { data } = await getHostInfo(params);
            if (data.code === 200) {
                commit('setDetail', data.data);
            }
            commit('closeLoading', 'hostDetail', { root: true });
        },

        // 更新或添加
        async addOrUpdateHost({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'hostAddOrUpdate', { root: true });
            const isUpdate = payload.id !== undefined;
            const { data } = isUpdate ? await updateHost(payload) : await createHost(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `${isUpdate ? '更新' : '添加'}服务器成功！`
                });
                isUpdate ? commit('hideModal', 'updateHost', { root: true }) : commit('hideModal', 'addHost', { root: true });
                dispatch('getHostList', rootState.route.query);
            }
            commit('closeLoading', 'hostAddOrUpdate', { root: true });
        },

        // aliyun 
        async getEcsInfo({ commit, state, rootState }, payload) {
            commit('showLoading', 'ecsInfo', { root: true });
            const params = {
                ecsId: payload.ecsId,
            };
            const { data } = await getEcsInfo(params);
            if (data.code === 200) {
                commit('setEcsDetail', data.data);
            }
            commit('closeLoading', 'ecsInfo', { root: true });
        },
        //在线检测
        async getCheckIn({ commit, state, rootState }, payload) {
          const params = {
            hostId: payload,
          };
          const { data } = await getCheckIn(params);
          if(data.code === 200) {
            Notification.success({
              title: getLangMessage('success'),
              message: '检测成功'
            });
          }
        },

    },

    getters: {
        filterHostList: state => {
            return state.list.map((data) => {
                return {
                    ...data,
                    visible: false
                };
            });
        },
        filterHostDetail: state => state.detail,
        filterEcsDetail: state => state.ecsDetail,
        pagination: state => {
            const { currentPage, pageSize, totalCount } = state;
            return {
                currentPage, pageSize, totalCount
            };
        }
    },
};

export default hostModule;
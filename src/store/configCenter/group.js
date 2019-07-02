'use strict';

import { getGroupList, createGroup, updateGroup, getGroupDetail } from '@/api/configCenter/group';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const groupModule = {
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
        }
    },
    actions: {
      // 获取分组列表
        async getGroupList({ commit, state, rootState }, payload) {
            commit('showLoading', 'groupList', { root: true });
            const { currentPage = 1 } = payload;
            const params = {
                pageSize: state.pageSize,
                currentPage: currentPage,
                orderSegment: 'created_time.desc',
                ...payload
            };
            const { data } = await getGroupList(params);
            if (data.code === 200) { 
                commit('setList', data.data.data);
                commit('setPage', data.data.paginator || {});
            }
            commit('closeLoading', 'groupList', { root: true });
        },
        // 获取详情
        async getgroupDetail({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'groupDetail', { root: true });
            const params = {
                groupId: payload.groupId,
            };
            const { data } = await getGroupDetail(params);
            if (data.code === 200) {
                commit('setDetail', data.data);
            }
            commit('closeLoading', 'groupDetail', { root: true });
        },
        // 添加或更新
        async addOrUpdateGroup({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'groupAddOrUpdate', { root: true });
            const isUpdate = payload.id !== undefined;
            const { data } = isUpdate ? await updateGroup(payload) : await createGroup(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `${isUpdate ? '更新' : '添加'}分组成功！`
                });
                isUpdate ? commit('hideModal', 'updateGroup', { root: true }) : commit('hideModal', 'addGroup', { root: true });
                dispatch('getGroupList', rootState.route.query);
            }
            commit('closeLoading', 'groupAddOrUpdate', { root: true });
        },
        // 其他模块添加分组
        async addGroup({ commit, state, dispatch, rootState }, payload) {
            let params = {
                name: payload.name,
                description: payload.description,
                envId: payload.envId,
                groupId: payload.groupId
            };
            const { data } = await createGroup(params);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `添加分组成功！`
                });
                if(payload.origin === 'host') {
                    commit('hideModal', 'addGroupFromHost', { root: true });
                } else if(payload.origin === 'project') {
                    commit('hideModal', 'addGroupFromProject', { root: true });
                }
                dispatch('getGroupList', rootState.route.query);
            }
        },
        // 删除分组
        async deleteGroup({ commit, state, rootState, dispatch }, payload) {
            commit('showLoading', 'groupDelete', { root: true });
            const params = {
                id: payload.id,
                groupId: payload.groupId,
                delete: true,
            };
            const { data } = await updateGroup(params);
            if (data.code === 200) {
                payload.visible = false;
                Notification.success({
                    title: getLangMessage('success'),
                    message: `删除项目成功！`
                });
                dispatch('getGroupList', rootState.route.query);
            }
            commit('closeLoading', 'groupDelete', { root: true });
        }
    },
    getters: {
        filterGroupList: state => {
            return state.list.map((data) => {
                return {
                    ...data,
                    visible: false
                };
            });
        },
        filterGroupDetail: state => state.detail,
        pagination: state => {
            const { currentPage, pageSize, totalCount } = state;
            return { currentPage, pageSize, totalCount };
        }
    }
};

export default groupModule;
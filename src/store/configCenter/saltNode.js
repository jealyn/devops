'use strict';
 
import { getSaltNodeList, createSaltNode, updateSaltNode, getSaltNodeDetail } from '@/api/configCenter/saltNode';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const saltNodeModule = {
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
      // 获取列表
        async getSaltNodeList({ commit, state, rootState }, payload) {
            commit('showLoading', 'saltNodeList', { root: true });
            const { currentPage = 1 } = payload;
            const params = {
                pageSize: state.pageSize,
                currentPage: currentPage,
                orderSegment: 'created_time.desc',
                ...payload
            };
            const { data } = await getSaltNodeList(params);
            if (data.code === 200) {
                commit('setList', data.data.data);
                commit('setPage', data.data.paginator || {});
            }
            commit('closeLoading', 'saltNodeList', { root: true });
        },

        // 获取详情
        async getSaltNodeDetail({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'saltNodeDetail', { root: true });
            const params = {
                saltNodeId: payload.saltNodeId
            };
            const { data } = await getSaltNodeDetail(params);
            if (data.code === 200) {
                commit('setDetail', data.data); 
            }
            commit('closeLoading', 'saltNodeDetail', { root: true });
        },
        // 添加或更新
        async addOrUpdateSaltNode({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'saltNodeAddOrUpdate', { root: true });
            const isUpdate = payload.saltNodeId !== undefined;
            const { data } = isUpdate ? await updateSaltNode(payload) : await createSaltNode(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `${isUpdate ? '更新' : '添加'}节点成功！`
                });
                isUpdate ? commit('hideModal', 'updateSaltNode', { root: true }) : commit('hideModal', 'addSaltNode', { root: true });
                dispatch('getSaltNodeList', rootState.route.query);
            }
            commit('closeLoading', 'saltNodeAddOrUpdate', { root: true });
        },
    },
 
    getters: {
        filterSaltNodeList: state => {
            return state.list.map((data) => {
                return {
                    ...data,
                    visible: false
                };
            });
        },
        filterSaltNodeDetail: state => {
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
    }
};


export default saltNodeModule;
'use strict';

import { getProjectList, getProjectInfo, createProject, updateProject, getJenkinsList, getResouces, createJenkins, getJenkinsDetail, getCheckUrl } from '@/api/configCenter/project';
import { Notification } from 'element-ui';
import { getLangMessage } from '@/utils';

const projectModule = {
    namespaced: true,
    state: {
        list: [],
        currentPage: 1,
        pageSize: 15,
        totalCount: 0,
        detail: {},
        select: [],
        searchParams: {},
        jenkinsList: [],
        apollo: '',
        resouces: {
            jenkinsTemplates: [],
            apolloUrl: ''
        },
        jenkinsDetail: {},
        status: false,
        jenkinsParams: {},
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
        setSearchParams(state, params) {
            state.searchParams = params;
        },
        setJenkinsList(state, params) {
            state.jenkinsList = params;
        },
        setResouces(state, params) {
            state.resouces = params;
        },
        setJenkinsDetail(state, jenkinsDetail) {
            state.jenkinsDetail = jenkinsDetail;
        },
        setStatus(state, params) {
            state.status = params;
        },
        setJenkinsParams(state, payload) {
            state.jenkinsParams = payload;
        },
    },
    actions: {
      // 获取项目列表
        async getProjectList({ commit, state, rootState }, payload) {
          commit('showLoading', 'projectList', { root: true });
          const { currentPage = 1 } = payload;
          const params = {
              pageSize: state.pageSize,
              currentPage: currentPage,
              orderSegment: 'created_time.desc',
              ...payload
          };
          const { data } = await getProjectList(params);
          if (data.code === 200) {
              commit('setList', data.data.data);
              commit('setPage', data.data.paginator || {});
              commit('setSearchParams', params);
          }
          commit('closeLoading', 'projectList', { root: true });
        },
        // 获取某个项目详情
        async getProjectDetail({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'projectDetail', { root: true });
            const params = {
                projectId: payload.projectId
            };
            const { data } = await getProjectInfo(params);
            if (data.code === 200) {
                commit('setDetail', data.data);
            }
            commit('closeLoading', 'projectDetail', { root: true });
        },

        // 添加或更新项目
        async addOrUpdateProject({ commit, state, dispatch, rootState }, payload) {
            commit('showLoading', 'projectAddOrUpdate', { root: true });
            const isUpdate = payload.id !== undefined;
            const { data } = isUpdate ? await updateProject(payload) : await createProject(payload);
            if (data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `${isUpdate ? '更新' : '添加'}项目成功！`
                });
                isUpdate ? commit('hideModal', 'updateProject', { root: true }) : commit('hideModal', 'addProject', { root: true });
                dispatch('getProjectList', rootState.route.query);
            }
            commit('closeLoading', 'projectAddOrUpdate', { root: true });
        },
        //创建jenkins地址
        async addjenkins({ commit }, payload) {
            commit('showLoading', 'addJenkins', { root: true });
            const { data } = await createJenkins(payload);
            if(data.code === 200) {
                Notification.success({
                    title: getLangMessage('success'),
                    message: `创建成功！`
                });
                commit('hideModal','addJenkins', { root: true }); 
            } else {
                Notification.error({
                    title: getLangMessage('error'),
                    message: `项目名称重复，请修改项目名称！`
                });
            }
            commit('closeLoading', 'addJenkins', { root: true });
        },
        // 删除项目
        async deleteProject({ commit, state, rootState, dispatch }, payload) {
            commit('showLoading', 'projectDelete', { root: true });
            const params = {
                id: payload.id,
                projectId: payload.projectId,
                delete: true,
            };
            const { data } = await updateProject(params);
            if (data.code === 200) {
                payload.visible = false;
                Notification.success({
                    title: getLangMessage('success'),
                    message: `删除项目成功！`
                });
                dispatch('getProjectList', rootState.route.query);
            }
            commit('closeLoading', 'projectDelete', { root: true });
        },
        //获取Jenkins列表  
        async getJenkinsList({ commit }) {
            const { data } = await getJenkinsList();
            if(data.code === 200) {
                commit('setJenkinsList', data.data);
            }
        },
        async getCheckUrl({ commit }, payload) {
            const { data } = await getCheckUrl(payload);
            if(data.code === 600) {
                commit('setStatus', false);
            } else if(data.data === false) {
                Notification.error({
                    title: getLangMessage('error'),
                    message: `项目不存在`
                });
                commit('setStatus', false);
            } else {
                commit('setStatus', true);
            }
        },
        //获取jenkins模板详情
        async getJenkinsDetail({ commit, state, dispatch, rootState }, payload) {
            const { data } = await getJenkinsDetail(payload);
            if (data.code === 200) {
                commit('setJenkinsDetail', data.data);
            }
        },
        //获取资源
        async getResouces({ commit }) {
            const { data } = await getResouces();
            commit('setResouces', data.data);
        },
        async getJenkinsParams({ commit }, payload) {
            commit('setJenkinsParams', payload);
        }
    },
    getters: {
        filterProjectList: state => {
            return state.list.map((data) => {
                return {
                    ...data,
                    visible: false
                };
            });
        },
        filterProjectDetail: state => {
            return state.detail;
        },
        filterJenkinsDetail: state => {
            return state.jenkinsDetail;
        },
        filterJenkinsList: state => {
            return state.jenkinsList;
        },
        resouces: state => {
            return state.resouces;
        },
        pagination: state => {
            const { currentPage, pageSize, totalCount } = state;
            return {
                currentPage, pageSize, totalCount
            };
        }
    }
};

export default projectModule;
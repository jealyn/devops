/**
 * Created by gang.pu on 2017/10/28.
 */
'use strict';

import request from '@/utils/request';

export const getProjectList = async (params) => {
    return request({
        method: 'get',
        url: '/project',
        params: params,
        isRedirect: true
    });
};

export const getProjectInfo = async (params) => {
    return request({
        method: 'get',
        url: '/project/info',
        params: params,
        isRedirect: true
    });
};

export const createProject = async (params) => {
    return request({
        method: 'post',
        url: '/project',
        data: params,
        isRedirect: true
    });
};

export const updateProject = async (params) => {
    return request({
        method: 'put',
        url: '/project',
        data: params,
        isRedirect: true
    });
};

export const getGitlabInfo = async (params) => {
    return request({
        method: 'get',
        url: '/project',
        data: params,
        isRedirect: true
    });
};

export const getJenkinsList = async (params) => {
    return request({
        method: 'get',
        url: 'project/jenkins/jobs',
        data: params
    });
};

export const getResouces = async (params) => {
    return request({
        method: 'get',
        url: 'resouce',
        data: params
    });
};

export const createJenkins = async (params) => {
    return request({
        method: 'post',
        url: '/project/jenkins/job',
        data: params,
    });
};

export const getJenkinsDetail = async (params) => {
    return request({
        method: 'get',
        url: '/project/jenkins/job',
        params: params,
    });
};

export const getCheckUrl = async (params) => {
    return request({
        method: 'get',
        url: '/project/gitlab/check',
        params: params,
    });
};
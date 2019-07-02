'use strict';

import request from '@/utils/request';

export const getHostList = async (params) => {
    return request({
        method: 'get',
        url: '/server',
        params: params,
        isRedirect: true
    });
};

export const getHostInfo = async (params) => {
    return request({
        method: 'get',
        url: 'server/detail',
        params: params,
        isRedirect: true
    });
};

export const createHost = async (params) => {
    return request({
        method: 'post',
        url: 'server',
        data: params,
        isRedirect: true
    });
};

export const updateHost = async (params) => {
    return request({
        method: 'put',
        url: 'server',
        data: params,
        isRedirect: true
    });
};

// aliyun ecs info 
export const getEcsInfo = async (params) => {
    return request({
        method: 'get',
        url: 'server/aliyun',
        params: params,
        isRedirect: true
    });
};

//在线检测
export const getCheckIn = async (params) => {
    return request({
        method: 'post',
        url: 'server/check',
        data: params
    });
};
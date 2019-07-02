'use strict';

import request from '@/utils/request';

export const getGroupList = async (params) => {
    return request({
        method: 'get',
        url: '/group',
        params: params,
        isRedirect: true
    });
};

export const getGroupDetail = async (params) => {
    return request({
        method: 'get',
        url: '/group/detail',
        params: params,
        isRedirect: true
    });
};

export const createGroup = async (params) => {
    return request({
        method: 'post',
        url: '/group',
        data: params,
        isRedirect: true
    });
};

export const updateGroup = async (params) => {
    return request({
        method: 'put',
        url: '/group',
        data: params,
        isRedirect: true
    });
};

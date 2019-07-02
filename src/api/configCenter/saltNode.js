'use strict';

import request from '@/utils/request'; 

export const getSaltNodeList = async (params) => {
    return request({
        method: 'get',
        url: '/node', 
        params: params,
        isRedirect: true
    });
};

export const getSaltNodeDetail = async (params) => {
    return request({
        method: 'get',
        url: '/node/info',
        params: params,
        isRedirect: true
    });
};

export const createSaltNode = async (params) => {
    return request({
        method: 'post',
        url: '/node',
        data: params,
        isRedirect: true
    });
};

export const updateSaltNode = async (params) => {
    return request({
        method: 'put',
        url: '/node',
        data: params,
        isRedirect: true
    });
};

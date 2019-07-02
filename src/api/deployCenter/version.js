'use strict';

import request from '@/utils/request';

export const getVersionList = async (params) => {
    return request({
        method: 'get',
        url: '/version',
        params: params,
        isRedirect: true
    });
};

export const getVersionInfo = async (params) => {
    return request({
        method: 'get',
        url: '/version/info',
        params: params,
        isRedirect: true
    });
};

export const createVersion = async (params) => {
    return request({
        method: 'POST',
        url: '/version',
        params: params,
        isRedirect: true
    });
};
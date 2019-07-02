'use strict';

import request from '@/utils/request';

export const getBuildList = async (params) => {
    return request({
        method: 'get',
        url: '/build',
        params: params,
        isRedirect: true
    });
};

export const getBuildStatus = async (params) => {
    return request({
        method: 'get',
        url: '/build/status',
        params: params,
        isRedirect: true
    });
};
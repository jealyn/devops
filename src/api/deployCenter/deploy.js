'use strict';

import request from '@/utils/request';

export const getDeployList = async (params) => {
    return request({
        method: 'get',
        url: '/deploy',
        params: params,
        isRedirect: true
    });
};

export const updateJobStatus = async (params) => {
    return request({
        method: 'get',
        url: '/deploy/job',
        params: params,
        isRedirect: true
    });
};


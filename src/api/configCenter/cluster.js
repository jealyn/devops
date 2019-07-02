/**
 * Created by gang.pu on 2017/10/28.
 */
'use strict';

import request from '@/utils/request';

export const getClusterList = async (params) => {
    return request({
        method: 'get',
        url: '/cluster',
        params: params,
        isRedirect: true
    });
};

export const createCluster = async (params) => {
    return request({
        method: 'post',
        url: '/cluster',
        data: params,
        isRedirect: true
    });
};

export const updateCluster = async (params) => {
    return request({
        method: 'put',
        url: '/cluster',
        data: params,
        isRedirect: true
    });
};
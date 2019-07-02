/**
 * Created by jealyn.wang on 2019/01/17.
 */
'use strict';

import request from '@/utils/request';

export const getApolloList = async (params) => {
    return request({
        method: 'get',
        url: '/config',
        params: params,
    });
};

export const getApolloDetail = async (params) => {
    return request({
        method: 'get',
        url: '/config/info',
        params: params,
    });
};

export const updateApollo = async (params) => {
    return request({
       method: 'put',
       url: '/config/namespace',
       data: params,
    });
};

export const addApollo = async (params) => {
    return request({
        method: 'post',
        url: '/config',
        data: params
    });
};

export const addNameSpace = async (params) => {
    return request({
        method: 'post',
        url: '/config/namespace',
        data: params
    });
};
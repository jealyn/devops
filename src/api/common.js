/**
 * Created by wangliang on 2017/11/16.
 */
'use strict';

import request from '@/utils/request';

export const getUserInfo = async () => {
    return request({
        method: 'get',
        url: '/userInfo'
    });
};

export const loginOut = async () => {
    return request({
        method: 'get',
        url: '/logout'
    });
};

export const getUserList = async (params) => {
    return request({
        method: 'get',
        url: '/userList',
        params: params,
        isRedirect: true
    });
};
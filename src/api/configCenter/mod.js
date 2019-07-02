'use strict';

import request from '@/utils/request';

export const getModList = async (params) => {
    return request({
        method: 'get',
        url: '/saltMod',
        params: params,
        isRedirect: true
    });
};

export const getSaltModInfo = async (params) => {
    return request({
        method: 'get',
        url: '/saltMod/info',
        params: params,
    });
};

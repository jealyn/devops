'use strict';

import request from '@/utils/request';

export const buildVersion = async (params) => {
    return request({
        method: 'post',
        url: '/version/operation/build',
        data: params,
        isRedirect: true
    });
};

export const deployVersion = async (params) => {
    return request({
        method: 'post',
        url: '/version/operation/deploy',
        data: params,
        isRedirect: true
    });
};

export const reBuildVersion = async (params) => {
  return request({
      method: 'post',
      url: '/version/operation/rebuild',
      data: params,
      isRedirect: true
  });
};

export const updateVersion = async (params) => {
    return request({
        method: 'put',
        url: '/version',
        data: params,
        isRedirect: true
    });
};
export const getDownSql = async (params) => {
    return request({
        method: 'get',
        url: '/version/operation/download',
        params: params,
    });
};

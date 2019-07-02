'use strict';

import router from '@/routes/index.js'; 
import store from '@/store';
import { formatObject, getLangMessage } from './index';
import { isObject } from 'gimi-utils';


/**
 * 回到上一页
 * @param route {String} 如果没有上一页回到指定页面，默认首页
 */
export const $goBack = (route = '/') => window.history.length > 1 ? router.go(-1) : router.push(route);

/**
 * 格式化查询条件（出去空格和删除为空字段）
 * @param data {Object} 待处理数据
 * @returns {Object}
 */
export const $formatSearchData = (data) => {
    const oldData = {
        ...data
    };

    for (let i in oldData) {
        const val = oldData[i];

        if (typeof val === 'string') {
            oldData[i] = oldData[i].trim();
        }
        if (val === '' || val === null || val === undefined) {
            delete oldData[i];
        }
    }

    return {
        ...oldData,
        t: new Date().getTime()
    };
};

/**
 * 当数据字段包含字符串时，剔除空格提交
 * @param data {Object} 待处理数据
 * @returns {{}}
 */
export const $trim = (data) => {
    const oldData = {
        ...data
    };

    for (let i in oldData) {
        if (typeof oldData[i] === 'string') {
            oldData[i] = oldData[i].trim();
        }
        if (isObject(oldData[i])) {
            oldData[i] = $trim(oldData[i]);
        }
    }

    return oldData;
};

/**
 * 动态注册store module
 * @param name {String} module名
 * @param module {Object} module组件
 */
export const $registerModule = (name, module) => {
    if (!store._modulesNamespaceMap[`${name}/`]) {
        store.registerModule(name, module);
    }
};

/**
 * 是否显示模态框
 * @param modalType {String} 模态框名
 * @returns {boolean}
 */
export const $isShowModal = (modalType) => store.state.modalType.includes(modalType);

/**
 * 打开Modal
 * @param modalType {String} 模态框名称
 */
export const $showModal = (modalType) => store.commit('showModal', modalType);

/**
 * 关闭Modal
 * @param modalType {String} 模态框名称
 */
export const $hideModal = (modalType) => store.commit('hideModal', modalType);

/**
 * 通过别名查找loading是否存在
 * @param name {String} loading别名
 * @returns {*|boolean}
 */
export const $isShowLoading = (name) => store.state.loading.includes(name);

/**
 * 处理错误字段，当有字段不存在时返回对应值
 * @param data {Object} 最外层对象
 * @param key {String} 字段名
 * @param value {String} 不存在时返回的对应值
 */
export const $formatObject = (data, key, value) => formatObject(data, key, value = '');

/**
 * 获取提示信息
 * @param key {string} 字段名
 * @returns {*}
 */
export const $getLangMessage = (key) => getLangMessage(key);
import i18n from '@/lang';

/**
 * 处理错误字段，当有字段不存在时返回对应值
 * @param data {Object} 最外层对象
 * @param key {String} 字段名
 * @param value {String} 不存在时返回的对应值
 */
export const formatObject = (data, key, value = '') => {
    if (key.includes('.')) {
        let keyArr = key.split('.');
        let current = data;
        keyArr.map((item) => {
            if (current[item]) {
                current = current[item];
            } else {
                return current = value;
            }
        });
        return current;
    } else {
        return data[key] || value;
    }
};

/**
 * 获取语言对应信息
 * @param data {string} 对应的语言字段名
 */
export const getLangMessage = (data) => {
    if (data.includes('.')) {
        let keyArray = data.split('.');
        let current = i18n.messages[i18n.locale];
        keyArray.map((item) => {
            current[item] ? current = current[item] : current = '';
        });
        return current;
    } else {
        return i18n.messages[i18n.locale][data];
    }
};
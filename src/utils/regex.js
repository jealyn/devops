/**
 * Created by wangliang on 2018/6/4.
 */
'use strict';

const regex = {
    phone: /^1[0-9]{10}$/,
    companyPhone: /[0-9-()（）]{7,18}/,
    integer: /^-?[0-9]\d*$/,
    price: /(^-?[1-9]\d*(\.\d{1,2})?$)|(^-?0(\.\d{1,2})?$)/, /*价格可为正负浮点数*/
    letterAndNumber: /^[0-9a-zA-Z]+$/, /*只能为字母和数字*/
    orderIds: /^[0-9a-zA-Z, -\/]+$/, /*只能为字母和数字和 ，/ */
    goodsNum: /^-?(0|[1-9]\d*)$/ /*只能为正或负整数,可以为0，但不能以0开头*/
};

export const isPhone = (val) => regex.phone.test(val);

export default regex;
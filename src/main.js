import Vue from 'vue';
import ElementUI from 'element-ui';
import { sync } from 'vuex-router-sync';
import router from './routes/index';
import i18n from './lang';
import App from './app.vue';
import store from './store';
import * as vueUtils from './utils/vueUtils';
import components from './components/index';
import 'element-ui/lib/theme-chalk/index.css';
import '@/index.less';
import TreeView from 'vue-json-tree-view';
import VueCodemirror from 'vue-codemirror';

import 'codemirror/lib/codemirror.css';

Vue.use(TreeView);
Vue.use(VueCodemirror);

// 注册element-ui
Vue.use(ElementUI, {
    size: document.body.clientWidth < 1450 ? 'small' : 'medium',
    i18n: (key, value) => i18n.t(key, value)
});

// 注册vue工具方法
Object.keys(vueUtils).forEach(key => {
    Vue.prototype[key] = vueUtils[key];
});

// 注册公共组件
components.map(component => {
    Vue.component(component.name, component);
});

// 注册vuex-router-sync
const unsync = sync(store, router);

const myApp = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});

// 开发环境热更新配置
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}

export default myApp;
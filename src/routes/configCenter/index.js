'use strict';
import Layout from '@/views/layout/Layout.vue';
import RouteView from '@/views/layout/RouteView.vue';

export default {
  path: '/configCenter',
  component: Layout,
  meta: {
    requireLogin: true,
    icon: 'el-icon-menu',
    title: '配置中心',
  },
  children: [{
    path: 'project',
    component: RouteView, 
    redirect: '/project/index',
    meta: {
      requireLogin: true,
      icon: 'iconfont icon-xiangmu1',
      title: '业务集群',
    },
    children: [{
      path: 'Index',
      meta: {
        requireLogin: true,
        title: '项目管理',
      },
      component: () => import('../../views/configCenter/project/Index.vue'),
    },
    {
        path: 'Cluster',
        meta: {
          requireLogin: true,
          title: '集群分组',
        },
        component: () => import('../../views/configCenter/cluster/Index.vue'),
    },
    {
        path: 'Apollo/List',
        meta: {
          requireLogin: true,
          title: '配置文件',
        },
        component: () => import('../../views/configCenter/apollo/apolloList/Index.vue'),
    },
    {
      path: 'Apollo/Detail',
      meta: {
        requireLogin: true,
        title: '配置详情',
      },
      hidden: true,
      component: () => import('../../views/configCenter/apollo/apolloDetail/Index.vue'),
  }]
  },
  {
    path: 'server',
    component: RouteView,
    redirect: '/host/index',
    meta: {
      requireLogin: true,
      icon: 'iconfont icon-host',
      title: '服务器管理',
    },
    children: [{
      path: 'index',
      meta: {
        requireLogin: true,
        title: '主机管理',
      },
      component: () => import('../../views/configCenter/host/Index.vue'),
    },
    {
      path: 'group',
      meta: {
        requireLogin: true,
        title: '分组管理',
      },
      component: () => import('../../views/configCenter/group/Index.vue'),
    }]
  },
  {
    path: 'node',
    component: RouteView,
    redirect: '/node/index',
    meta: {
      requireLogin: true,
      icon: 'iconfont icon-cluster',
      title: 'salt管理',
    },
    children: [{
      path: 'node',
      meta: {
        requireLogin: true,
        title: '节点管理',
      },
      component: () => import('../../views/configCenter/node/Index.vue'),
    },
    {
        path: 'mod',
        meta: {
          requireLogin: true,
          title: '模板管理',
        },
        component: () => import('../../views/configCenter/saltMod/Index.vue'),
    }]
  }]
};
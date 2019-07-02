'use strict';
import Layout from '@/views/layout/Layout.vue';
import RouteView from '@/views/layout/RouteView.vue';

export default {
  path: '/deployCenter',
  component: Layout,
  meta: {
    requireLogin: true,
    icon: 'el-icon-menu',
    title: '部署中心',
  },
  children: [{
    path: 'deploy',
    component: RouteView,
    redirect: '/build/index',
    meta: {
      requireLogin: true,
      icon: 'iconfont icon-xiangmu1',
      title: '构建',
    },
    children: [{
      path: 'index',
      meta: {
        requireLogin: true,
      },
      component: () => import('../../views/deployCenter/deploy/Index.vue'),
    }]
  },
  {
    path: 'version',
    component: RouteView,
    redirect: '/version/index',
    meta: {
      requireLogin: true,
      icon: 'iconfont icon-deploymentunit',
      title: '部署',
    },
    children: [{
      path: 'index',
      meta: {
        requireLogin: true,
      },
      component: () => import('../../views/deployCenter/version/Index.vue'),
    }]
  },
  {
    path: 'task',
    component: RouteView,
    redirect: '/task/index',
    meta: {
      requireLogin: true,
      icon: 'iconfont icon-task',
      title: '任务查询',
    },
    children: [{
      path: 'build',
      meta: {
        requireLogin: true,
        title: '编译任务',
      },
      component: () => import('../../views/deployCenter/buildTask/Index.vue'),
    },
    {
      path: 'deploy',
      meta: {
        requireLogin: true,
        title: '部署任务',
      },
      component: () => import('../../views/deployCenter/deployTask/Index.vue'),
    }]
  }]
};
import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '/userManage/userManage',
    component: Layout,
    name: 'tempCheck',
    meta: { title: '合同管理', icon: 'tree', roles: ['MANAGER'] },
    children: [
      {
        path: '/userManage/Audit',
        name: 'Audited',
        component: () => import('@/views/userManage/Audit/Audited'),
        meta: { title: '已审核', icon: 'tree', roles: ['MANAGER'] }
      },
      {
        path: '/userManage/Audit',
        name: 'Toaudited',
        component: () => import('@/views/userManage/Audit/Toaudited'),
        meta: { title: '未审核', icon: 'tree', roles: ['MANAGER'] }
      }
    ]
  }
  //,

]

export const dynamicRouter = [
  {
    path: '/userManage/userManage',
    component: Layout,
    name: 'tempCheck',
    meta: { title: '合同管理', icon: 'tree', roles: ['MANAGER'] },
    children: [
      {
        path: '/userManage/Audit',
        name: 'Audited',
        component: () => import('@/views/userManage/Audit/Audited'),
        meta: { title: '已审核', icon: 'tree', roles: ['MANAGER'] }
      },
      {
        path: '/userManage/Audit',
        name: 'Toaudited',
        component: () => import('@/views/userManage/Audit/Toaudited'),
        meta: { title: '未审核', icon: 'tree', roles: ['MANAGER'] }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true, meta: { title: '404', icon: 'tree', roles: ['ALL'] }}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

import router, { dynamicRouter } from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie
import { initialMenu } from '@/utils/menu'

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          const CurMenu = initialMenu(dynamicRouter)
          router.options.routes = CurMenu
          router.addRoutes(CurMenu)
          next()
          if (store.getters.roles.length !== 0) {
            if (store.getters.roles[store.getters.roles.length - 1] === 'SMSAPPROVER') {
              next({ path: '/smsTemplate/tempCheck' })
              // this.$router.push( '/smsTemplate/tempCheck')
              // this.$router.replace('/smsTemplate/tempCheck')
            } else if (store.getters.roles[store.getters.roles.length - 1] === 'AGENT') {
              next({ path: '/busiAccount/businessCount' })
            } else {
              next({ path: '/userManage/userManage' })
              // this.$router.replace('/campManage/campOverview')
              // this.$router.push( '/campManage/campOverview')
            }
          }
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

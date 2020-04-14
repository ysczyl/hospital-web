import store from '../store'

export const initialMenu = (dynamicRouter) => {
  const dR = []
  let routerItem = {}
  for (let i = 0; i < dynamicRouter.length; i++) {
    if (dynamicRouter[i].meta && dynamicRouter[i].meta.roles) {
      for (let j = 0; j < dynamicRouter[i].meta.roles.length; j++) {
        if (dynamicRouter[i].hidden !== true &&
          contains(store.getters.roles, dynamicRouter[i].meta.roles[j])) {
          routerItem = dynamicRouter[i]
          if (routerItem.children) {
            routerItem.children = initialMenu(routerItem.children)
          }
          dR.push(routerItem)
        }
      }
    }
  }
  return dR
}

export const contains = (arr, obj) => {
  let i = arr.length
  while (i--) {
    if (arr[i] === obj) {
      return true
    }
  }
  return false
}

export const initMenu = (menus) => {
  if (menus.length === 0) {
    return
  }

  const result_menus = []
  menus.forEach(oMenu => {
    const tmenu = formatRoutes(oMenu)
    result_menus.push(tmenu)
  })

  // 最后添加
  const unfound = { path: '*', redirect: '/404', hidden: true }
  result_menus.push(unfound)
  return result_menus
}

export const formatRoutes = (aMenu) => {
  const oRouter = {
    name: aMenu.name,
    path: aMenu.path,
    component: (resolve) => require([`@/views${aMenu.component}.vue`], resolve),
    meta: { title: aMenu.title, icon: aMenu.icon },
    hidden: aMenu.hidden
  }
  return oRouter
}

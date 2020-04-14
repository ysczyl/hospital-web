import request from '@/utils/request'

//  获取所用用户列表
// export function getUserList() {
//   return request({
//     url: '/manage/user/findAll',
//     method: 'post'
//   })
// }

export function findModels(params) {
  return request({
    url: '/manage/user/findAllUsers',
    method: 'post',
    params
  })
}
// 新建用户
export function newUser(params) {
  return request({
    url: '/manage/user/addUser',
    method: 'post',
    params
  })
}
// 用户查询
export function userSearch(params) {
  return request({
    url: '/manage/user/getByUsername',
    method: 'post',
    params
  })
}
// 删除账户
export function userDelete(params) {
  return request({
    url: '/manage/user/deleteUser',
    method: 'post',
    params
  })
}
// 修改账户密码
export function changePass(params) {
  return request({
    url: '/manage/user/updatePassword',
    method: 'post',
    params
  })
}
// 修改账户备注
export function changeRemarks(params) {
  return request({
    url: '/manage/user/changeRemarks',
    method: 'post',
    params
  })
}

// 修改用户状态（是否停用）
export function disabledChange(params) {
  return request({
    url: '/manage/user/disabled',
    method: 'post',
    params
  })
}

// // 修改过期时间
// export function actTimeChange(params) {
//   return request({
//     url: '/manage/user/actTimeChange',
//     method: 'post',
//     params
//   })
// }

// 获取所有的角色
export function getAllRoleList() {
  return request({
    url: '/manage/user/getAllRoleList',
    method: 'post'
  })
}

// 角色授予
export function changeRole(params) {
  return request({
    url: '/manage/user/changeRole',
    method: 'post',
    params
  })
}

// 获取所有的渠道
export function getAllChannel() {
  return request({
    url: '/manage/user/getAllChannel',
    method: 'post'
  })
}

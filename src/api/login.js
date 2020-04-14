import request from '@/utils/request'
// import Qs from 'qs'
// export function login(man, ans) {
//   let client_id = man
//   let client_secret = ans
//   return request({
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     },
//     transformRequest: [function(data) {      //在请求之前对data传参进行格式转换
//       data = Qs.stringify(data)
//       return data
//     }],
//     url: '/auth/oauth/client/token',
//     method: 'post',
//     data:{
//       client_id,
//       client_secret
//     }
//   })
// }

export function login(appKey, appSecret) {
  return request({
    url: '/auth',
    method: 'post',
    data: {
      appKey,
      appSecret
    }
  })
}


export function checks(params) {
  return request({
    url: '/captcha/check',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'post'
  })
}

export function captcha() {
  return request({
    url: '/captcha/code.jpg',
    method: 'get'
  })
}

export function changePass(params) {
  return request({
    url: '/user/changePass',
    method: 'post',
    params
  })
}

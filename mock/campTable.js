import Mock from 'mockjs'
import { param2Obj } from './utils'

export default {
  list: (res) => {
    const items = Mock.mock({
      'items|10': [{
        campId: '@Id',
        campName: '@sentence(1, 1)',
        cgpId: '@sentence(1, 1)',
        secne: '1',
        createDate: '@datetime',
        campLimit: '100',
        campState: '1',
        content: '外呼话术',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
      }]
    })
    return {
      code: 20000,
      data: items,
      params: res,
      total: 999
    }
  },
  countOfCount: (res) => {
    return {
      code: 20000,
      data: { total: 999, running: 444, finished: 555 },
      params: param2Obj(res.url)
    }
  },
  getPersonList: (res) => {
    const items = Mock.mock({
      'items|10': [{
        IDCard: '@Id',
        seq: '@sentence(1, 1)',
        authorization: '@sentence(1, 1)',
        phoneNo: '123',
        'status|1': ['未知', '未接通', '响铃一声挂断']
      }]
    })
    return {
      code: 20000,
      data: items,
      params: param2Obj(res.url)
    }
  },
  getActDetails: (res) => {
    const items =
      {
        callInterval: '90',
        pushInterval: '90',
        callState: '已修复'
      }

    return {
      code: 20000,
      data: items,
      params: param2Obj(res.url)
    }
  },

  activityCreate: (res) => {
    return {
      code: 20000,
      params: param2Obj(res.url)
    }
  },

  test: () => {
    return {
      code: 20000,
      data: 'hello'
    }
  }
}

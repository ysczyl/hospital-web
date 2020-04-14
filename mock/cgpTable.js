import Mock from 'mockjs'
import { param2Obj } from './utils'

export default {
  list: () => {
    const items = Mock.mock({
      'items|10': [{
        cgpId: '@id',
        cgpName: '@sentence(1, 1)',
        cgpType: '1',
        createTime: '@datetime',
        cgpState: '1',
        scene: '1',
        rowNumber: '100'
      }]
    })
    return {
      code: 20000,
      data: items,
      total: 99
    }
  },
  cgpCreate: (res) => {
    return {
      code: 20000,
      params: param2Obj(res.url)
    }
  },
  csvUpload: (res) => {
    return {
      code: 20000,
      params: param2Obj(res.url),
      data: { data: 51111 }
    }
  },
  findFinishedCgps: () => {
    const items = Mock.mock({
      'items|10': [{
        cgpId: '@id',
        cgpName: '@sentence(1, 1)',
        cgpType: '1',
        createTime: '@datetime',
        cgpState: '1',
        scene: '1',
        rowNumber: '100',
        cgpLimit: '1000'
      }]
    })
    return {
      code: 20000,
      data: items,
      total: 99
    }
  }
}

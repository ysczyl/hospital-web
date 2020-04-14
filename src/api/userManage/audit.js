import request from '@/utils/request'



//信息查询
export function queryformin(parms) {
  return request({
    url: 'approval/srearchApproval',
    method: 'post',
    data :{
      ...parms
    }
  })
}


//审核
export function auditagree(parms) {
  return request({
    url: 'approval/createApproval',
    method: 'post',
    data :{
      ...parms
    }
  })
}


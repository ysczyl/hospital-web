import Mock from 'mockjs'
// import userAPI from './user'
// import tableAPI from './table'
// import campTableAPI from './campTable'
// import cgpTableAPI from './cgpTable'

// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })

// // User
// Mock.mock(/\/user\/login/, 'post', userAPI.login)
// Mock.mock(/\/user\/info/, 'get', userAPI.getInfo)
// Mock.mock(/\/user\/logout/, 'post', userAPI.logout)

// // Table
// Mock.mock(/\/table\/list/, 'get', tableAPI.list)
// // Mock.mock(/\/activity\/getAllAct/, 'post', campTableAPI.list)
// Mock.mock(/\/activity\/getStateTypeCount/, 'post', campTableAPI.countOfCount)
// Mock.mock(/\/activity\/getPersonList/, 'post', campTableAPI.getPersonList)
// Mock.mock(/\/activity\/getCampRule/, 'post', campTableAPI.getActDetails)
// Mock.mock(/\/activity\/activityCreate/, 'post', campTableAPI.activityCreate)
// Mock.mock(/\/activity\/test/, 'post', campTableAPI.test)
// // Cgp
// Mock.mock(/\/cgp\/findUserCgps/, 'post', cgpTableAPI.list)
// Mock.mock(/\/cgp\/create/, 'post', cgpTableAPI.cgpCreate)
// Mock.mock(/\/cgp\/prase/, 'post', cgpTableAPI.csvUpload)
// Mock.mock(/\/cgp\/findFinishedCgps/, 'post', cgpTableAPI.findFinishedCgps)
// // Create
// Mock.mock(/\/campTable\/create/, 'post', tableAPI.create)

export default Mock

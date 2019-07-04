const host = 'https://test.api.aplusx.com/apijx' // 测试环境
// const host = 'http://192.168.1.221:8185' // 开发环境
// const host =  'https://api.aplusx.com/jiaxiao' // 正式环境
function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, // 仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json', // 默认值
        'login-token': wx.getStorageSync("token"),
        'service-pre':wx.getStorageSync("schoolId")
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading()
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}
 
function get (obj) {
  return request(obj.url, 'GET', obj.data)
}
 
function post (obj) {
  return request(obj.url, 'POST', obj.data)
}
 
export default {
  request,
  get,
  post,
  host
}
/**
 * 发送get请求
 * @param {*} url
 */
export function get (url, data) {
  const result = request(url, 'GET', data)
  return result
}
/**
 * 发送post请求
 * @param {*} url
 * @param {*} data 请求体数据
 */
export function post (url, data) {
  return request(url, 'POST', data)
}

export function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      data,
      url,
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

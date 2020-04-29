// 请求封装 
//var host = 'https://wx.boxdiy.cn';  
//var host ="https://wxtest.boxdiy.cn";
//var host = "http://192.168.1.110:9991"

//const host = "http://api.gd-cosmetic.com/api/v1/"
// 
const host = "https://api.gd-doctor.com/api/v1/"
// const host = "http://192.168.0.124:8080/api/v1/"
// const host = "http://api-test.ghysjt.com/api/v1/"
const hospitalGuid = "2c7f9ca0dca0446e8654d338284f0bc1"



// 登录
function login(success, fail) {

  return new Promise(function(resolve, reject) {
    wx.showLoading({
      title: "loadding",
      icon: "success",
      mask: "true"
    })
    wx.login({
      success: function(res) {
        wx.request({
          url: host + '/api/login/wx',
          data: {
            code: res.code,
            appId: appId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'post',
          success: function(res) {
            // console.log(res)
            wx.hideLoading()
            if (res.data.success == 20) {
              wx.setStorageSync('token', res.data.data.token)
              resolve(res)
            } else {
              if (res.data.message) {
                
                wx.showToast({
                  title: res.data.message,
                  image: '../../images/networkError.png',
                  duration: 3000
                })
              } else {
                wx.showToast({
                  title: "网络错误",
                  image: '../../images/networkError.png',
                  duration: 3000
                })
              }
              resolve(res)
            }
          },
          fail: function(res) {
            // console.log(res)
            wx.showToast({
              title: "网络错误",
              image: '../../images/networkError.png',
              duration: 3000
            })
            resolve(undefined)
          }
        })
      },
      fail: function(res) {
        wx.showToast({
          title: "网络错误",
          image: '../../images/networkError.png',
          duration: 3000
        })
        resolve(undefined)
      }

    })
  })
}


//发送请求
function wxAjax(url, options, params, message, success, fail) {
  //var that=this
  //请求是否必须token
  //url     接口地址
  //options 请求方法
  //params  请求参数
  //message 请求加载动画
  //success 成功回调
  //fail    失败回调
  wx.showNavigationBarLoading() //顶部loading动画
  if (message == "") {
    wx.showLoading({})
    // debugger
  } else if (message != "" && message != " ") {
    wx.showLoading({
      title: message,
    })
  }
  // params.token = wx.getStorageSync('token')

  var loadTime //网络响应超时时间
  var hiddenError //错误提示
  hiddenError = params.hiddenError
  if (params.loadTime) {
    loadTime = 99999999
  } else {
    loadTime = 2000
  }
  delete params["loadTime"]
  delete params["hiddenError"]
  var url = host + url
  // console.log(params);
  params.hospitalGuid = hospitalGuid
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/json',
      "Authorization": "Bearer " + wx.getStorageSync('userinfo').token
    },
    method: options,
    success: function(res) {
      // console.log(res)
      wx.hideNavigationBarLoading()
      if (res.statusCode == "401") {
        wx.removeStorageSync("userinfo")
        wx.redirectTo({
          url: "../login/login"
        })
        return false
      }


      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200 && res.data.code == 0 || res.data.code == 7000) { //请求返回值成功
        success(res)
      } else { //请求返回值失败
        if (res.data.code == 1001) {
          wx.showToast({
            title: '验证码已过期或已失效',
            icon: 'none',
            duration: loadTime
          })
        } else {
          if (!hiddenError || hiddenError == undefined) { //不关闭错误提示
            if (res.data.message) {
              // debugger
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: loadTime
              })
            } else {
              wx.showToast({ //请求返回值失败
                title: "网络错误",
                image: '../../images/networkError.png',
                duration: loadTime
              })
            }
          } else {
            success(res)
          }
        }

      }
    },
    fail: function(res) { //未得到服务器响应
      // console.log(res)
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      if (!hiddenError) { //不关闭错误提示
        wx.showToast({
          title: "网络错误",
          image: '../../images/networkError.png',
          duration: loadTime
        })
      }
      fail(res)
    },
  })
}






//判断是否有token
function requestLoading(url, params, message, success, fail) {
  if (wx.getStorageSync('token')) {
    wxAjax(url, params, message, success, fail)
  } else {
    login().then(function(data) {
      wxAjax(url, params, message, success, fail)
    })
  }
}

//分享 
function onShareAppMessage(res) {
  return {
    title: '印名片',
    path: '/pages/index/index',
    imageUrl: "http://wx-design.oss-cn-shenzhen.aliyuncs.com/AppletBGImg/share.png",
    success: function(res) {
      wx.showToast({
        title: '转发成功',
        icon: 'success',
        duration: 2000
      })
    }
  }

}





module.exports = {
  host: host,
  requestLoading: requestLoading,
  login: login,
  onShareAppMessage: onShareAppMessage,
  wxAjax: wxAjax
}
module.exports = {
  inputgetName(e) { //输入框数据绑定
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
  },
  getPageInstance() {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
  },
  loginCheck(pageObj){
    //console.log(wx.getStorageSync('userinfo') && wx.getStorageSync('userinfo').token)
              if (!wx.getStorageSync('userinfo') && !wx.getStorageSync('userinfo').token){
                wx.redirectTo({
                  url: "../login/login"
                })
              }
    //   if (pageObj.onLoad) {
       
    //     let _onLoad = pageObj.onLoad;
    //     // 使用onLoad的话需要传递options
    //     pageObj.onLoad = function (options) {
    //       debugger
    //         if(wx.getStorageSync('USERID')) {
    //             // 获取当前页面
    //             let currentInstance = getPageInstance();
    //             _onLoad.call(currentInstance, options);

    //         } else {
    //             //跳转到登录页
    //             wx.redirectTo({
    //                 url: "/pages/login/login"
    //             });
    //         }
    //     }
    // }
    return pageObj;
  },

}

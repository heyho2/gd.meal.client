// pages/orderConfirmation/orderConfirmation.js
let httpRequest = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
     transferData:{},
      optionsId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    //获取转让订单详情
//options.orderGuid

    let that = this
    httpRequest.wxAjax("meal/MealClient/GetMealOrderDetailForTransferAsync", "GET", { orderGuid: options.orderGuid }, " ", function (res) {
      if(res.data.code != 0){
        //缓存信息
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../index/index'
              })
            }
          }
        })
      }

      //缓存信息
      that.setData({
        transferData:res.data.data,
        optionsId: options.orderGuid
      })
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

 
  payBalance(e) {
    // console.log(e)
    var that = this;
    console.log(that.data.optionsId);
    httpRequest.wxAjax("meal/MealClient/AcceptTransferedMealOrderAsync", "POST", { orderGuid: that.data.optionsId }, " ", function (res) {
      //缓存信息
      wx.showModal({
        title: '转让结果',
        content: '已接受成功',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../index/index'
            })
          }
        }
      })
    })

  }
})
// pages/balance/balance.js
let httpRequest = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      requestJudge: true,

      balanceData:{},
      walletData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {




    
    let that=this
    //获取钱包余额
    httpRequest.wxAjax("meal/MealClient/GetMealWalletBalanceAsync", "GET", {}, " ", function (res) {
      //缓存信息
      // console.log(res)

      that.setData({
        walletData: res.data.data
      })
    })
   


    //余额明细
    this.loadMoreOrderList()
   
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
    // wx.reLaunch({
    //   url: '../index/index'
    // })
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
  loadMoreOrderList(){
    let that=this;
    let _requestData = {
      pageIndex: that.data.pageIndex,
      pageSize: that.data.pageSize
    }
    httpRequest.wxAjax("meal/MealClient/GetMealWalletRecordAsync", "POST", _requestData, " ", function (res) {
      let balanceData = that.data.pageIndex == 1 ? res.data.data.currentPage : that.data.balanceData.concat(res.data.data.currentPage)
      that.setData({
        balanceData: balanceData,
        total: res.data.data.total,
        requestJudge: true
      })
    })
  },
  //分页加载
  searchScrollLower(e) {
    let that = this

    if (Math.ceil(this.data.total / this.data.pageSize) > this.data.pageIndex && this.data.requestJudge) {
      that.setData({
        pageIndex: that.data.pageIndex + 1,
        requestJudge: false
      })
      that.loadMoreOrderList()
    }
  }
})
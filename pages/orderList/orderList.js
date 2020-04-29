// pages/orderList/orderList.js
let httpRequest = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageIndex:1,
      pageSize:10,
      total:0,
      orderList:[],
      requestJudge:true
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    this.loadMoreOrderList()
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
    wx.reLaunch({
      url: '../index/index'
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载

    setTimeout(function () {
      that.onLoad();
      wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1500);
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
  //请求加载
  loadMoreOrderList(){
    let that = this;
    httpRequest.wxAjax("meal/MealClient/GetUserMealOrderPageListAsync", "POST", { pageIndex: this.data.pageIndex, pageSize: this.data.pageSize }, "loading", function (res) {
     
      // console.log(res)
      let orderList = that.data.pageIndex == 1 ? res.data.data.currentPage : that.data.orderList.concat(res.data.data.currentPage)
      that.setData({
        orderList: orderList,
        total: res.data.data.total,
        requestJudge:true
      })
    })
  },
  //分页加载
  searchScrollLower(e){
      // console.log(e)
    // console.log(this.data.requestJudge)
    let that=this

    if (Math.ceil(this.data.total / this.data.pageSize) > this.data.pageIndex && this.data.requestJudge){
      that.setData({
        pageIndex: that.data.pageIndex+1,
        requestJudge:false
      })
      that.loadMoreOrderList()          
    }
  },
  //取消订单
  cancelOrder(e){
     
   let that = this;
    if (e.currentTarget.dataset.orderstatus !="Paided"){
        return false
    }

    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      success(res) {
        if (res.confirm) {
          httpRequest.wxAjax("meal/MealClient/CancelMealOrderAsync", "GET", { orderGuid: e.currentTarget.dataset.orderguid }, "loading", function (res) {
            wx.showToast({  //请求返回值失败
              title: "取消成功",
              icon: 'none',
              duration: 2000
            })
            that.loadMoreOrderList();
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  consumeTransfer(e){
    // console.log(e)
    // return false;
    let orderstatus = e.currentTarget.dataset.orderstatus
    let orderguid = e.currentTarget.dataset.orderguid
    let mealstarttime = e.currentTarget.dataset.mealstarttime
    let mealendtime = e.currentTarget.dataset.mealendtime
    let categoryname = e.currentTarget.dataset.categoryname
    
    // return false;
    if (orderstatus =="Paided"){
      wx.navigateTo({
        url: `../scanCode/scanCode?orderGuid=${orderguid}&&mealStartTime=${mealstarttime}&&categoryname=${categoryname}&&mealEndTime=${mealendtime}`
      })
    }else{
      
    }

  }

})
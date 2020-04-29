// pages/orderConfirmation/orderConfirmation.js
let httpRequest = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plain:false,
    storageAllMenuList:[],
    balanceTotal:0,
    isPaysuccess: true 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let that=this
    // console.log(wx.getStorageSync('storageAllMenuList'))
    let _storageAllMenuList = wx.getStorageSync('storageAllMenuList')
    _storageAllMenuList.map(item=>{
    
      if (item.dataList && item.dataList.length>0){
        item.dataList.map(leftItem => {
          leftItem.all = leftItem.menuDishes.some(rightItem => {
            return rightItem.shopNumber > 0
          })
        })
       }
    })
    let dishesGuids = []
    _storageAllMenuList.forEach((item, index) => {
      if (item.dataList) {
        item.dataList.forEach((leftItem, leftIndex) => {
          leftItem.menuDishes.forEach((rightItem, rightIndex) => {
            if (rightItem.shopNumber > 0) {
              // dishesDetails.push({
              //   mealDate: leftItem.repastTime,
              //   categoryGuid: leftItem.categoryGuid,
              //   dishesGuid: rightItem.dishesGuid,
              //   quantity: rightItem.shopNumber
              // })
              dishesGuids.push(rightItem.dishesGuid);
            }
          })
        })
      }
    })
    // console.log(dishesGuids);
    var requestDto={
      DishesIds: dishesGuids
    };
    httpRequest.wxAjax("meal/MealClient/CheckDishesSaleStatus", "POST", requestDto, " ", function (res) {
      //缓存信息
      // console.log(res);
    }) 
    // options.balanceTotal = options.balanceTotal.toFixed(2)                                                                        
    that.setData({
      storageAllMenuList: _storageAllMenuList,
      balanceTotal: options.balanceTotal ? options.balanceTotal:0.00
    })
    // console.log(that.data.storageAllMenuList)
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
  payBalance(e){
    if (!this.data.isPaysuccess){
      return false;
    }
      // console.log(e)
    // console.log(this.data.storageAllMenuList)
    let that=this;
    wx.showModal({
      title: '是否确认支付',
      content: '将扣除钱包余额，如余额不足，请联系管理员充值',
      success(res) {
        if (res.confirm) {
            let dishesDetails = []
            that.data.storageAllMenuList.forEach((item, index) => {
              if (item.dataList) {
                item.dataList.forEach((leftItem, leftIndex) => {
                  leftItem.menuDishes.forEach((rightItem, rightIndex) => {
                    if (rightItem.shopNumber > 0) {
                      dishesDetails.push({
                        mealDate: leftItem.repastTime,
                        categoryGuid: leftItem.categoryGuid,
                        dishesGuid: rightItem.dishesGuid,
                        quantity: rightItem.shopNumber
                      })
                    }
                  })
                })
              }
            })
            httpRequest.wxAjax("meal/MealClient/SubmitMealOrderAsync", "POST", { dishesDetails: dishesDetails }, " ", function (res) {
              //缓存信息
              wx.showToast({  //请求返回值失败
                title: "支付成功",
                icon: 'none',
                duration: 2000,
                mask: true
              })
              that.setData({
                isPaysuccess: false
              })
              that.data.storageAllMenuList.forEach((item, index) => {
                if (item.dataList) {
                  item.dataList.forEach((leftItem, leftIndex) => {
                    leftItem.menuDishes.forEach((rightItem, rightIndex) => {
                      if (rightItem.shopNumber > 0) {
                        rightItem.shopNumber = 0;
                      }
                    })
                  })
                }
              })
              wx.setStorage({
                key: "storageAllMenuList",
                data: that.data.storageAllMenuList,
                success: function () {
                  console.log('写入value1成功')
                },
                fail: function () {
                  console.log('写入value1发生错误')
                }
              })

              setTimeout(() => {
                wx.navigateTo({
                  url: `../orderList/orderList`
                })
              }, 500)



            })

        } else if (res.cancel) {
          console.log('用户点击取消')

        }
      }
    })
  }
})
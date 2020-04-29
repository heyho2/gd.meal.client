//index.js
//获取应用实例
const app = getApp()
let httpRequest = require("../../utils/request.js")
let utils = require("../../utils/util.js")
let commonMixin = require('../../utils/mixins/commonMixin')
Page(Object.assign({
  data: {
    userinfo: {}, //个人信息
    editUserName: "",
    dataList: [

    ], //时间列表
    MenuList: [],
    allMenuList: [], //所有菜品
    storageAllMenuList: [], //缓存所有商品
    activeData: 0,
    activeTime: 0,
    imgs: "",
    activeIndex: 0, //左侧
    activeNameIndex: 0, //右侧
    showShoppingList: false,
    scrollTop: 0,
    shoppingData: [],
    totalPrice: 0,
    showType: 0, //1：购物车  2：详情
    timestamp: 0 //时间戳
  },
  onShow: function() {
    // this.onLoad();
    // Common / SystemTime
    let _this = this;
    httpRequest.wxAjax("Common/SystemTime", "GET", {}, " ", function (res) {
      //缓存信息
      _this.setData({
        timestamp: res.data.data,
        allMenuList: wx.getStorageSync('storageAllMenuList')
      })
    })

    // console.log(this.data.activeTime);
    // this.GetMenuDetailOneDayAsync(this.data.activeTime)
    // console.log(this.data.allMenuList);
  },
  onLoad: function(options) {
    commonMixin.loginCheck(options)
    let _that = this;
    //获取用户信息
    httpRequest.wxAjax("meal/MealClient/GetMealUserBasicInfoAsync", "GET", {}, " ", function(res) {
      //缓存信息
      // console.log(res)
      _that.setData({
        userinfo: res.data.data
      })
    })
    //获取所有日期
    httpRequest.wxAjax("meal/MealClient/GetMealMenuDateListAsync", "GET", {}, " ", function(res) {
      //缓存信息
      //组装所有菜单数据
      console.log(res.data.data);
      let _allMenuList = res.data.data.map((item, index) => {
        // console.log(item);
        // debugger
        return {
          "bookingDeadline": item
        }
      })
      _that.setData({
        dataList: res.data.data,
        allMenuList: _allMenuList,
        activeTime: res.data.data[0]
      })
      // console.log(_allMenuList);
      _that.GetMenuDetailOneDayAsync(res.data.data[0])
    })    

  
  },
  loginOut(){
    wx.redirectTo({
      url: '../login/login'
    })
  },
  getUserInfo: function(e) {

  },
  inputgetName: function(e) {
    // console.log(e);
    // var value = e.currentTarget.dataset;
  },
  onPullDownRefresh: function() {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    
    setTimeout(function() {
      that.onLoad();
      that.setData({
        activeData: 0
      })
      wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1500);
  },
  //选择左菜单
  selectClass(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      scrollTop: 0
    })
    // console.log(this.data.activeIndex)
  },
  changeShoppingList() {
    this.setData({
      showShoppingList: !this.data.showShoppingList,
      showType: 1
    })
  },
  //选择日期
  selectTime(e) {
    let _that = this;
    this.setData({
      activeData: e.currentTarget.dataset.index,
      activeIndex: 0,
      activeTime: e.currentTarget.dataset.time
    })
    if (_that.data.allMenuList[_that.data.activeData].dataList && _that.data.allMenuList[_that.data.activeData].dataList
      .length > 0) {
      return false
    } else {
      // console.log(e.currentTarget.dataset.time);
      this.GetMenuDetailOneDayAsync(e.currentTarget.dataset.time)
    }
  },
  //获取指定日期的菜单
  GetMenuDetailOneDayAsync(data) {
    let _that = this;
    // console.log(data)
    httpRequest.wxAjax("meal/MealClient/GetMenuDetailOneDayAsync", "POST", {
      menuDate: data
    }, " ", function(res) {
      //缓存信息
      //初始化值
      res.data.data.map((item, index) => {
        item.repastTime = data
        item.menuDishes.map((sunItme, sunIndex) => {
          sunItme.shopNumber = 0,
          sunItme.repastTime = data
        })
      })
      _that.data.allMenuList[_that.data.activeData].dataList = res.data.data
      _that.setData({
        allMenuList: _that.data.allMenuList,
        storageAllMenuList: _that.data.allMenuList
      })
      wx.setStorage({
        key: "storageAllMenuList",
        data: _that.data.storageAllMenuList,
        success: function () {
          console.log('写入value1成功')
        },
        fail: function () {
          console.log('写入value1发生错误')
        }
      })

    })
  },
  //加购物车
  addShop(e) {
    let _that = this
    let dataIndex = e.currentTarget.dataset.activedata //日期index
    let leftIndex = e.currentTarget.dataset.activeindex //左边早餐晚餐index
    let rightIndex = e.currentTarget.dataset.index //右边菜品index
    let shopnumber = e.currentTarget.dataset.shopnumber //获取的数量
    let allMenuList = this.data.allMenuList;
    var rightShopNumber = 'allMenuList[' + dataIndex + '].dataList[' + leftIndex + '].menuDishes[' + rightIndex +
      '].shopNumber';
    this.setData({
      [rightShopNumber]: e.currentTarget.dataset.shopnumber + 1
    })

    //筛入购物车,写入缓存

    _that.setData({
      storageAllMenuList: _that.data.allMenuList
    })
    // console.log(_that.data.allMenuList)
    wx.setStorage({
      key: "storageAllMenuList",
      data: _that.data.storageAllMenuList,
      success: function() {
        console.log('写入value1成功')
      },
      fail: function() {
        console.log('写入value1发生错误')
      }
    })
  },
  //减购物车
  minusShop(e) {
    // console.log(e)
    // console.log("减")
    let _that = this
    let dataIndex = e.currentTarget.dataset.activedata //日期index
    let leftIndex = e.currentTarget.dataset.activeindex //左边早餐晚餐index
    let rightIndex = e.currentTarget.dataset.index //右边菜品index
    let shopnumber = e.currentTarget.dataset.shopnumber //获取的数量

    // console.log(shopnumber)

    let allMenuList = this.data.allMenuList;
    var rightShopNumber = 'allMenuList[' + dataIndex + '].dataList[' + leftIndex + '].menuDishes[' + rightIndex +
      '].shopNumber';

    if (e.currentTarget.dataset.shopnumber <= 0) {
      return false
    }
    this.setData({
      [rightShopNumber]: e.currentTarget.dataset.shopnumber - 1
    })
    //筛选购物车
    _that.setData({
      storageAllMenuList: _that.data.allMenuList
    })
    wx.setStorage({
      key: "storageAllMenuList",
      data: _that.data.storageAllMenuList,
      success: function() {
        console.log('写入value1成功')
      },
      fail: function() {
        console.log('写入value1发生错误')
      }
    });

  },
  goSettle() {
    let that = this
    // if (that.data.userinfo.balanceTotal<=0){
    //   wx.showToast({
    //     title: "请至少选择一个商品",
    //     icon: 'none',
    //     duration: 2000
    //   })
    //     return false
    // }
    let totalPrices = 0;
    that.data.storageAllMenuList.forEach(function(item, index) {
      if (item.dataList) {
        item.dataList.forEach(function(leftItem, leftIndex) {
          leftItem.menuDishes.forEach(function(rightItem, rightIndex) {
            totalPrices += rightItem.dishesPrice * rightItem.shopNumber
          })
        })
      }
    })
    if (totalPrices <= 0) {
      wx.showToast({
        title: "请至少选择一个商品",
        icon: 'none',
        duration: 2000
      })
      return false
    }




    wx.navigateTo({
      url: `../orderConfirmation/orderConfirmation?balanceTotal=${that.data.userinfo.balanceTotal.toFixed(2)}`
    })
  },
  showMenuDetails(e) {
    // console.log(e)
    if (e.currentTarget.dataset.index >= 0) {
      this.setData({
        activeNameIndex: e.currentTarget.dataset.index
      })
    }
    this.setData({
      showShoppingList: !this.data.showShoppingList,
      showType: 2
    })
  },
  popPpMinusShop(e) {
    // 弹窗减少
    let _that = this
    var rightShopNumber = 'allMenuList[' + this.data.activeData + '].dataList[' + this.data.activeIndex +
      '].menuDishes[' + this.data.activeNameIndex + '].shopNumber';
    if (e.currentTarget.dataset.shopnumber <= 0) {
      return false
    }
    this.setData({
      [rightShopNumber]: e.currentTarget.dataset.shopnumber - 1
    })
    //筛选购物车
    _that.setData({
      storageAllMenuList: _that.data.allMenuList
    })
    wx.setStorage({
      key: "storageAllMenuList",
      data: _that.data.storageAllMenuList,
      success: function() {
        console.log('写入value1成功')
      },
      fail: function() {
        console.log('写入value1发生错误')
      }
    });


  },
  popUpAddShop(e) {
    // 弹窗增加
    let _that = this
    var rightShopNumber = 'allMenuList[' + this.data.activeData + '].dataList[' + this.data.activeIndex +
      '].menuDishes[' + this.data.activeNameIndex + '].shopNumber';
    this.setData({
      [rightShopNumber]: e.currentTarget.dataset.shopnumber + 1
    })
    //筛入购物车,写入缓存

    _that.setData({
      storageAllMenuList: _that.data.allMenuList
    })
    // console.log(_that.data.allMenuList)
    wx.setStorage({
      key: "storageAllMenuList",
      data: _that.data.storageAllMenuList,
      success: function() {
        console.log('写入value1成功')
      },
      fail: function() {
        console.log('写入value1发生错误')
      }
    })
  },
  showEditName(e) {
    // console.log(e)
    this.setData({
      showShoppingList: !this.data.showShoppingList,
      editUserName: this.data.userinfo.userName,
      showType: 3
    })
  },
  editName() {
    const urlregex = /^([\u4e00-\u9fa5]|[0-9A-Za-z]){1,5}$/
    let that = this
    if (!that.data.editUserName.trim()) {
      wx.showToast({
        title: "姓名不能为空！",
        icon: 'none',
        duration: 2000
      })
      return false
    } else {
      console.log();
      if (!urlregex.test(that.data.editUserName.trim())) {
        wx.showToast({
          title: "姓名长度超过限制！",
          icon: 'none',
          duration: 2000
        })
        return false
      }
      httpRequest.wxAjax("utility/User/ChangeUserName", "GET", {
        userName: that.data.editUserName
      }, " ", function(res) {

        that.setData({
          [`userinfo.userName`]: that.data.editUserName,
          showShoppingList: false
        })
        wx.showToast({
          title: "修改成功",
          icon: 'none',
          duration: 2000
        })
      })
    }
  }
}, commonMixin))
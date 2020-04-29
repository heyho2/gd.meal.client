// pages/main/index.js
var QR = require("../../utils/qrcode.js");
let httpRequest = require("../../utils/request.js")
Page({
  data: {
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    showType:1,
    transferData:{},
    optionsData:{}
  },
  onLoad: function (options) {

    console.log(options)
    this.setData({
      optionsData: options
    })

    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.optionsData.orderGuid; 
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
    

  },
  onReady: function () {

  },
  onShow: function () {

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭

  },
  transfer(){
      let that=this;
     
      if (that.data.showType == 1 && !that.data.transferData.transferedCodeImg){
        that.getTransferCode()
      }
			// console.log(that.data.showType)
			if(that.data.showType == 1){
				wx.setNavigationBarTitle({  title: '转让码'})
			}else{
				wx.setNavigationBarTitle({  title: '就餐码'})
			}
      this.setData({
        showType: that.data.showType==1?2:1
      })
  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1000
    });
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 1000);
  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //获取转码信息
  getTransferCode(){
    let that=this;
    wx.showLoading({
      title: '生成中...',
    })
    
    // 
    httpRequest.wxAjax("meal/MealClient/GetTransferedWXAcodeAsync", "GET", { orderGuid: that.data.optionsData.orderGuid}, " ", function (res) {
      wx.hideLoading()
      // console.log(res);
      // alert(res.data.code);
      if (res.data.code != 0) {
        //缓存信息
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../orderList/orderList'
              })
              // return false;
            }
          }
        })
      }
      // debugger
      that.setData({
        transferData:res.data.data
      })
    })
  }
})
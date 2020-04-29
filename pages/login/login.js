// pages/login/login.js
import Validator from '../../utils/validator'
let commonMixin = require('../../utils/mixins/commonMixin')
let httpRequest = require("../../utils/request.js")
import md5  from '../../utils/md5';
Page(Object.assign({

  /**
   * 页面的初始数据
   */
  data: {
      loginData:{
        phone:null,
        passWord:null
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(commonMixin)
    console.log(Validator)
    console.log(md5.hexMD5("cui10086").toUpperCase())
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
  login(){
    console.log(11)
    let that=this
    console.log(that.data.loginData)
    let RuleValidator = [
      {
        required: true,
        hint: "手机号码",
        value: that.data.loginData.phone,
        test: Validator.isPhoneNumber
      },
      {
        required: true,
        hint: "密码",
        value: that.data.loginData.passWord
      },
    ]
    for (let i = 0; i < RuleValidator.length;i++){
      //为空验证
      if (RuleValidator[i].required){
        if (!Validator.required(RuleValidator[i].value)){
          let hintText = RuleValidator[i].allHint ? RuleValidator[i].hint : RuleValidator[i].hint + "不能为空"
          console.log(hintText)
          wx.showToast({
            title: hintText,
            icon: 'none',
            duration: 2000
          })
          return false
        }
      }
      //规则验证
      if (RuleValidator[i].test) {//正则验证
        if (!RuleValidator[i].test(RuleValidator[i].value)) {
          let errorHintText = RuleValidator[i].allHint ? RuleValidator[i].hint : RuleValidator[i].hint + "不合法"
          wx.showToast({
            title: errorHintText,
            icon: 'none',
            duration: 2000
          })
          return false
        }
      }
    }

    //登录请求
    let _requestData={
      phone: that.data.loginData.phone,
      passWord: md5.hexMD5(that.data.loginData.passWord).toUpperCase(),
      userType:"Consumer"
    }
    
    httpRequest.wxAjax("Account/Login","POST", _requestData," ",function(res){
          //缓存信息
          console.log(res)
          wx.setStorage({
            key: "userinfo",
            data: res.data.data
          })
          wx.redirectTo({
            url: '../index/index'　　
          })
    })
  }
},commonMixin))
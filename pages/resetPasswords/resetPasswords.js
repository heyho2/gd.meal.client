// pages/login/login.js
import Validator from '../../utils/validator'
var commonMixin = require('../../utils/mixins/commonMixin')
let httpRequest = require("../../utils/request.js")
import md5 from '../../utils/md5';
Page(Object.assign({
  data: {
    verifyText: "获取验证码",
    resetData: {
      phone: null,
      code:null,
      passWord: null,
      affirmPassWord:null
    },
    errorText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(commonMixin)
    console.log(Validator)
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
 
  submitData() {
    console.log(11)
    let that = this
    console.log(that.data.loginData)
    let RuleValidator = [
      {
        required: true,
        hint: "手机号码",
        value: that.data.resetData.phone,
        test: Validator.isPhoneNumber
      },
      {
        required: true,
        hint: "验证码",
        value: that.data.resetData.code,
        test: Validator.isSix
      },
      {
        required: true,
        hint: "密码",
        value: that.data.resetData.passWord
      },
      {
        required: true,
        hint: "确认密码",
        value: that.data.resetData.affirmPassWord
      }
    ]
    for (let i = 0; i < RuleValidator.length; i++) {
      console.log(RuleValidator[i].allHint)
      //为空验证
      if (RuleValidator[i].required) {
        if (!Validator.required(RuleValidator[i].value)) {
          let hintText = RuleValidator[i].allHint ? RuleValidator[i].hint : RuleValidator[i].hint + "不能为空"
          console.log(hintText)
          // wx.showToast({
          //   title: hintText,
          //   icon: 'none',
          //   duration: 2000
          // })
          that.setData({
            errorText: hintText
          })
          timer = setTimeout(() => {
            that.setData({
              errorText: ''
            })
          }, 1000);
          return false
        }
      }
      //规则验证
      if (RuleValidator[i].test) {//正则验证
        if (!RuleValidator[i].test(RuleValidator[i].value)) {
          let errorHintText = RuleValidator[i].allHint ? RuleValidator[i].hint : RuleValidator[i].hint + "字数不符合或不合法"
          // wx.showToast({
          //   title: errorHintText,
          //   icon: 'none',
          //   duration: 2000
          // })
          that.setData({
            errorText: errorHintText
          })
          timer = setTimeout(() => {
            that.setData({
              errorText: ''
            })
          }, 1000);
          return false
        }
      }
    }
    if (that.data.resetData.passWord != that.data.resetData.affirmPassWord) {
      // wx.showToast({
      //   title: "两次输入密码不一致",
      //   icon: 'none',
      //   duration: 2000
      // })
      that.setData({
        errorText: '两次输入密码不一致'
      })
      timer = setTimeout(() => {
        that.setData({
          errorText: ''
        })
      }, 1000);
      return false
    }
    //重置密码
    let _requestData={
      code: that.data.resetData.code,
      password: md5.hexMD5(that.data.resetData.passWord).toUpperCase(),
      phone: that.data.resetData.phone,
    }
    httpRequest.wxAjax("Account/ResetPassword", "POST", _requestData, " ", function (res) {
      //注册成功
      console.log(res)
      wx.showToast({
        title: "重置成功",
        icon: 'none',
        duration: 2000
      })

      setTimeout(res => {
        wx.navigateTo({
          url: '../login/login'
        })
      }, 1000)
    })




  },
  //获取验证码
  getCode(e) {
    let that = this;
    if (that.data.verifyText > 0) {
      console.log(111)
      return false
    }

    let hitText = null;
    if (!Validator.isPhoneNumber(that.data.resetData.phone)) {
      hitText = "手机号码不合法"
    }
    if (hitText) {
      wx.showToast({
        title: hitText,
        icon: 'none',
        duration: 2000
      })
      return false
    } else {
      //获取手机验证码
      let _requestData = {
        phone: that.data.resetData.phone
      }
      httpRequest.wxAjax(`Account/CreateVerificationCode?phone=${that.data.resetData.phone}`, "POST", _requestData, " ", function (res) {
        console.log(res)
        //倒计时
        wx.showToast({
          title: "手机号码已发送请注意查收",
          icon: 'none',
          duration: 3000
        })

        that.setData({
          verifyText: 60
        })
        let interTime = setInterval(() => {
          console.log(that.data.verifyText)
          if (that.data.verifyText <= 1) {
            that.setData({
              verifyText: "获取验证码"
            })
            clearInterval(interTime)
            return false
          }
          that.setData({
            verifyText: that.data.verifyText - 1
          })
        }, 1000)

      })
    }
   


  }
 
}, commonMixin))
//index.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    if (this.data.logged) return
    util.showBusy('正在登录')
    const session = qcloud.Session.get()

    //mock login

    app.globalData.access_token = 'eyJhbGciOiJSUzI1NiJ9.eyJ1dWlkIjoiYTdmOGNmY2MtMjdiNi00NmQ2LWI4NDYtMmZmNjI5ZjcwMjUwIiwiZW1haWwiOiJtYXRpYW5qdW5AaGFpZXIuY29tIn0.pKy4cOj3DOGd8CTM_gxvdI7s4rVHekDj1-mcXy0057tHHb5t3fRqphk4Wi1wS61s26tLdgiCSxAItAShQlDRxYFtcyB95gImQSm1yGsG_ZLEzl3hNDcuh21pl56hYr79RC4CTDnzPKQPb7oy2bpcXd0RyOtD0FfeKV8JY2XhM_jW_tU3Y_fX6EguHJVwpGVUQ5oUpP1cuIzyuwRrwleS89hfGfNErc_Q9gTNifQ1o_oQijIhqOLITk4IHB_EENIq6IDxDcKu8yAX31cGr9vXM85Kr5WlrArAy2dEk8lbCXs3vea747H3UOSCbF9BxAIY5VKyLzU_Zbz7MhsaZa1yqw'
    app.globalData.userInfo = e.detail.userInfo
    this.setData({ logged: true })
    util.showSuccess('登录成功')
    wx.switchTab({
      url: '../demand/demandlist',
    })
    return false;

    //mock end



    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          app.globalData.access_token = res
          app.globalData.userInfo = e.detail.userInfo
          this.setData({logged: true })
          util.showSuccess('登录成功')
          wx.switchTab({
            url: '../demand/demandlist',
          })
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          app.globalData.access_token = res
          app.globalData.userInfo = e.detail.userInfo
          this.setData({logged: true })
          util.showSuccess('登录成功')
          wx.switchTab({
            url: '../demand/demandlist',
          })
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
  }
})

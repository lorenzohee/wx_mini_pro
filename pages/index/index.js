//index.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    const session = qcloud.Session.get()
    let backUrl = '/pages/demand/demandlist'
    if (session) {
      if (app.globalData.userInfo){
        util.showSuccess('登录成功')
        if (app.globalData.backUrl!=''){
          backUrl = app.globalData.backUrl
          app.globalData.backUrl = ''
        }
        wx.switchTab({
          url: backUrl,
        })
      }else {
        this.getCurrentUser(function (res) {
          app.globalData.userInfo = res
          util.showSuccess('登录成功')
          if (app.globalData.backUrl!='') {
            backUrl = app.globalData.backUrl
            app.globalData.backUrl = ''
          }
          wx.switchTab({
            url: backUrl,
          })
        })
      }
    }
  },
  getUserInfo: function(e) {
    util.showBusy('正在登录')
    let backUrl = '/pages/demand/demandlist'
    const session = qcloud.Session.get()
    // 首次登录
    qcloud.login({
      method: 'POST',
      success: resp => {
        this.getCurrentUser(function(res){
          app.globalData.userInfo = res
          util.showSuccess('登录成功')
          if (app.globalData.backUrl!='') {
            backUrl = app.globalData.backUrl
            app.globalData.backUrl = ''
          }
          wx.switchTab({
            url: backUrl,
          })
        })
      },
      fail: err => {
        console.error(err)
        util.showModel('登录错误', err.message)
      }
    })
  },

  getCurrentUser: function(callback){
    var token = qcloud.Session.get()
    wx.request({
      url: config.service.service_add + '/api/v1/users/current_user',
      header: {
        'Authorization': token
      },
      success: res=>{
        callback(res.data)
      }
    })
  },
})

// pages/myinfo/personinfo.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countries: ["male", "female"],
    countryIndex: 0,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = qcloud.Session.get()
    if (!token) {
      app.globalData.backUrl = getCurrentPages()[0].route
      wx.switchTab({
        url: '/pages/index/index',
      })
      return false;
    }
    this.data.userInfo = app.globalData.userInfo;
    this.setData(this.data)
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

  bindCountryChange: function(e){
    this.setData({
      countryIndex: e.detail.value
    })
    wx.showToast({
      title: 'change success',
    })
  }
})
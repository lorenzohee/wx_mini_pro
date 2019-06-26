// pages/activity/activitylist.js
var ActivityService = require('../../service/activityservice')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    activities: []
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
    this.getActivityList();
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

  getActivityList: function () {
    var that = this;
    var activityService = new ActivityService();
    activityService.getActivityList(this.data.pageNum || 1, function (activityList) {
      activityList.forEach(function (v, i) {
        var date = new Date(v.start_at);
        v.start_at = (date.getMonth() + 1) + '-' + date.getDate();
      });
      if (1 != that.data.pageNum) {
        activityList = that.data.activities.concat(activityList)
      }
      that.setData({
        activities: activityList
      });
      if ('function' == typeof (callback)) {
        callback()
      }
    });
  }
})
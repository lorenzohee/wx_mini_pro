// client/pages/demand/demandlist.js
var DemandService = require('../../service/demandservice')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    pageNum: 1,
    searchStr: ''
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
    };
    this.demandService = new DemandService();
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
    this.getDemandList();
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
    this.setData({
      pageNum: 1
    });
    this.getDemandList(function(){
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    return false;
    this.setData({
      pageNum: this.data.pageNum+1
    });
    this.getDemandList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  searchDemand: function(e){
    var that = this;
    var searchStr = e.currentTarget.dataset.searchtype
    that.setData({
      searchStr: searchStr
    })
    if (searchStr === 'favorite'){
      that.getDemandFavorite()
    } else if (searchStr === 'filter') {

    }else{
      that.getDemandList()
    }
  },

  getDemandFavorite: function(){
    var that = this;
    that.demandService.getDemandFavorite(1, function(demandList){
      that.setData({
        demands: demandList
      })
    })
  },

  getDemandList: function(callback){
    var that = this;
    that.demandService.getDemandList(this.data.pageNum || 1, function (demandList){
      demandList.forEach(function (v, i) {
        v.isTouchMove = false;
      });
      if (1 != that.data.pageNum) {
        demandList = that.data.demands.concat(demandList)
      }
      that.setData({
        demands: demandList
      });
      if ('function' == typeof (callback)) {
        callback()
      }
    });
  },

  //star Demand
  starDemand: function (e) {
    var that = this,
      id = e.currentTarget.dataset.demandid;
    that.demandService.starDemand(id, function (result) {
      that.data.demands.forEach(function (v, i) {
        if (v.id == id) {
          v.favorite_id = result.id;
          return false
        }
      })
      wx.showToast({
        title: '收藏成功'
      })
      that.setData({
        demands: that.data.demands
      })
    })
  },
  //star Demand
  unstarDemand: function (e) {
    var that = this,
      id = e.currentTarget.dataset.favoriteid;
    that.demandService.unStarDemand(id, function (result) {
      that.data.demands.forEach(function (v, i) {
        if (v.id == result.favoritable_id) {
          v.favorite_id = null
          return false
        }
      })
      wx.showToast({
        title: '取消成功'
      })
      that.setData({
        demands: that.data.demands
      })
    })
  },
})
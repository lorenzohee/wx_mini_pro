// client/pages/demand/demanddetail.js
var DemandService = require('../../service/demandservice.js')
var WxParse = require('../../vendor/wxParse/wxParse.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {  },

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
    this.setData({
      demand: {
        id: options.id
      }
    });
    this.getDemandDetail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.comment = this.selectComponent("#comment");
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

  getDemandDetail: function(){
    var that = this;
    var service = new DemandService();
    service.findDemandById(that.data.demand.id, function(result){
      that.setData({
        demand: result
      })
      var content = that.data.demand.content;
      /**
      * WxParse.wxParse(bindName , type, data, target,imagePadding)
      * 1.bindName绑定的数据名(必填)
      * 2.type可以为html或者md(必填)
      * 3.data为传入的具体数据(必填)
      * 4.target为Page对象,一般为this(必填)
      * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
      */
      WxParse.wxParse('content', 'html', content, that, 5);
    })
  },

  //star Demand
  starDemand: function (e) {
    var that = this,
      id = e.currentTarget.dataset.demandid;
    var demandService = new DemandService();
    demandService.starDemand(id, function (result) {
      that.data.demand.favorite_id = result.id;
      wx.showToast({
        title: '关注成功'
      })
      that.setData({
        demand: that.data.demand
      })
    })
  },
  //star Demand
  unstarDemand: function (e) {
    var that = this,
      id = e.currentTarget.dataset.favoriteid;
    var demandService = new DemandService();
    demandService.unStarDemand(id, function (result) {
      that.data.demand.favorite_id = null;
      wx.showToast({
        title: '取消关注成功'
      })
      that.setData({
        demand: that.data.demand
      })
    })
  },
})
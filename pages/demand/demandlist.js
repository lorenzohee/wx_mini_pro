// client/pages/demand/demandlist.js
var DemandService = require('../../service/demandservice')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    pageNum: 1,
    searchStr: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  },

  getDemandList: function(callback){
    var that = this;
    var demandService = new DemandService();
    demandService.getDemandList(this.data.pageNum || 1, function (demandList){
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
    var demandService = new DemandService();
    demandService.starDemand(id, function (result) {
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
    var demandService = new DemandService();
    demandService.unStarDemand(id, function (result) {
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

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.demands.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      demands: this.data.demands
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.demands.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      demands: that.data.demands
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    this.data.demands.splice(e.currentTarget.dataset.index, 1)
    wx.showToast({
      title: '删除成功'
    })
    this.setData({
      demands: this.data.demands
    })
  }
})
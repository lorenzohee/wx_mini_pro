// client/pages/myinfo/info_tag.js
var UserService = require('../../service/userservice.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTagGroup()
    this.getUserTags()
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

  getTagGroup(){
    var that = this;
    var userService = new UserService()
    userService.getTagGroup(res=>{
      this.setData({tagGroups: res})
    })
    if(this.data.tags!=undefined && this.data.tags.length>0){
      this.initialTags()
    }
  },

  getUserTags(){
    var userService = new UserService()
    userService.getUserTags('id', res=>{
      this.setData({tags: res})
    })
    if (this.data.tagGroups != undefined && this.data.tagGroups.length > 0) {
      this.initialTags()
    }
  },

  initialTags(){
    this.data.tagGroups.forEach((v, i)=>{
      v.tags.forEach((ele, index)=>{
        ele.selected=this.data.tags.includes(ele.title)
      })
    })
    this.setData({ tagGroups: this.data.tagGroups})
  },

  triggerTag(e){
    var tag = e.currentTarget.dataset.text;
    var userService = new UserService();
    if(this.data.tags.includes(tag)){
      userService.deleteUserTag(tag, (res)=>{
        this.data.tags.splice(this.data.tags.indexOf(res), 1);
        this.setData({tags: this.data.tags})
        this.initialTags()
        wx.showToast({
          title: 'delete success',
        })
      })
    } else {
      userService.addUserTag(tag, (res) => {
        this.data.tags.push(res);
        this.setData({ tags: this.data.tags })
        this.initialTags()
        wx.showToast({
          title: 'add success',
        })
      })
    }
  }
})
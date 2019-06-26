// pages/activity/activityenlist.js
var ActivityService = require('../../service/activityservice')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
import WxFormValid from '../../utils/WxFormValid.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      name: '',
      email: '',
      organization: '',
      position: '',
      mobile: ''
    }
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
    let userInfo = app.globalData.userInfo
    if (userInfo.sso_user.email.indexOf('@uuid.inno-with.com') >= 0) {
      userInfo.sso_user.email = ''
    }
    this.setData({
      activity_id: options.activity_id,
      user: userInfo
    });
    this.service = new ActivityService();
    this.initValidate()
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

  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },

  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true
      },
      email: {
        email: true,
        required: true
      },
      organization: {
        required: true
      },
      position: {
        required: true
      },
      mobile: {
        tel: true,
        required: true
      }
    }
    const messages = {
      name: {
        required: '请填写姓名',
      },
      email: {
        required: '请填写邮箱',
        email: '请输入正确的邮箱',
      },
      organization: {
        required: '请填写组织'
      },
      position: {
        required: '请填写职位'
      },
      mobile: {
        required: '请填写手机号',
        tel: '请输入正确的手机号',
      }
    }
    this.WxValidate = new WxFormValid(rules, messages)
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    //校验表单
    if (!this.WxValidate.checkForm(formData)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.service.postenlist(formData, this.data.activity_id, function(){
      wx.navigateBack({ url: './activitydetail?id='+that.activity_id})
    })
  }
})
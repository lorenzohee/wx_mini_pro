// ActivityService service
import { showSuccess, showModel } from '../utils/util.js'
import { service } from '../config.js'
var qcloud = require('../vendor/wafer2-client-sdk/index')
class ActivityService {
  constructor() {
    this.app = getApp()
    this.host = service.service_add
    this.token = qcloud.Session.get()
  }

  getActivityList(pageNum, callback) {
    wx.request({
      header: {
        'Authorization': this.token
      },
      url: this.host + '/api/v1/activities',
      success: (result) => {
        if (result.statusCode == 200 || result.statusCode == 201) {
          if ('function' === typeof (callback)) {
            callback(result.data)
          }
        } else {
          showModel('get failure', 'internet error')
        }
      },
      fail: (e) => {
        showModel('get failure', 'system error')
      }
    })
  }

  findActivityById(id, callback) {
    wx.request({
      header: {
        'Authorization': this.token
      },
      url: this.host + '/api/v1/activities/' + id,
      success: (result) => {
        if (result.statusCode == 200 || result.statusCode == 201) {
          if ('function' === typeof (callback)) {
            callback(result.data)
          }
        } else {
          showModel('get failure', 'internet error')
        }
      },
      fail: (e) => {
        showModel('get failure', 'system error')
      }
    })
  }

  postenlist(userInfo, activity_id, callback){
    wx.request({
      header: {
        'Authorization': this.token
      },
      url: this.host + '/api/v1/activity_participants/',
      method: 'POST',
      data: {activity_id: parseInt(activity_id), user: userInfo},
      success: (result) => {
        if (result.statusCode == 200 || result.statusCode == 201) {
          if ('function' === typeof (callback)) {
            callback(result.data)
          }
        } else {
          showModel('get failure', 'internet error')
        }
      },
      fail: (e) => {
        showModel('get failure', 'system error')
      }
    })
  }
}

module.exports = ActivityService
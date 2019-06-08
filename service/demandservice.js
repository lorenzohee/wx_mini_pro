// demand service
import { showSuccess, showModel} from '../utils/util.js'
import { service } from '../config.js'
var qcloud = require('../vendor/wafer2-client-sdk/index')
class Demand{
  constructor(){
    this.app = getApp()
    this.host = service.service_add
    this.token = qcloud.Session.get()
  }

  getDemandList(pageNum, callback){
    wx.request({
      header: {
        'Authorization': this.token
      },
      url: this.host + '/api/v1/demands',
      success: (result)=>{
        if(result.statusCode==200 || result.statusCode==201){
          if ('function' === typeof (callback)) {
            callback(result.data)
          }
        }else{
          showModel('get failure', 'internet error')
        }
      },
      fail: (e)=>{
        showModel('get failure', 'system error')
      }
    })
  }

  getDemandFavorite(pageNum, callback){
    var result = [];
    if (pageNum == 1) {
      result = [
        { id: 3, title: '2018 海尔HOPE 创新方案大赛', isFavorite: true },
        { id: 4, title: '【活动】传感器产业联盟中国制造业助力论坛（徐州站）', isFavorite: true },
        { id: 6, title: '● 寻找研究化妆品存储的专家 ', isFavorite: true },
        { id: 7, title: '寻找能够测定木材防霉涂层寿命的专家', isFavorite: true }
      ];
    } else {
      result = [
        { id: 14, title: '【活动】传感器产业联盟中国制造业助力论坛（徐州站）', isFavorite: true },
        { id: 16, title: '● 寻找研究化妆品存储的专家 ', isFavorite: true },
      ];
    }
    if ('function' === typeof (callback)) {
      callback(result)
    }
  }

  starDemand(demandid, callback) {
    var postData = {
      favoritable_type: 'Demand',
      favoritable_id: demandid
    }
    wx.request({
      header: {
        'Authorization': this.token
      },
      method: 'POST',
      url: this.host + '/api/v1/favorites',
      data: postData,
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

  unStarDemand(favoriteid, callback) {
    wx.request({
      header: {
        'Authorization': this.token
      },
      method: 'DELETE',
      url: this.host + '/api/v1/favorites/' + favoriteid,
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

  findDemandById(id, callback){
    wx.request({
      header: {
        'Authorization': this.token
      },
      url: this.host + '/api/v1/demands/' + id,
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

  getFavoriteList(){
    return [
      { id: 3, title: '2018 海尔HOPE 创新方案大赛', isFavorite: true },
      { id: 4, title: '【活动】传感器产业联盟中国制造业助力论坛（徐州站）', isFavorite: true },
      { id: 6, title: '● 寻找研究化妆品存储的专家 ', isFavorite: true },
      { id: 7, title: '寻找能够测定木材防霉涂层寿命的专家', isFavorite: true }
    ]
  }
}

module.exports = Demand
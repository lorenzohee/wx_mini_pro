// demand service
import { showSuccess, showModel} from '../utils/util.js'
import { service} from '../config.js'
class Demand{
  constructor(){
    this.app = getApp()
    this.host = service.host
  }

  getDemandList(pageNum, callback){
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: this.host + '/api/v1/demand_blogs',
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

  starDemand(demandid, userid, callback){
    var result = { id: demandid, isFavorite: true }
    if('function'===typeof(callback)){
      callback(result)
    }
  }

  findDemandById(id, callback){
    var res = { "id": 4, "title": "aaaaaaaa2342", "blog_state_id": 1, "brief": "asfa", "content": "<p>afasfas</p>\r\n", "user_id": 1, "mark_list": ["aaasdf", "Heating", "Food & Nutrition", "Fluid Machinery(Compressors/Pumps/Blowers/Turbines)"], "note": null, "access_type_id": 1, "parent_id": null, "approved_by": null, "copy_from": null, "language_type_id": 1, "task_package_id": null, "created_at": "2018-11-08 06:28:59", "comments": [{ "id": 980191522, "commentable_id": 4, "commentable_type": "Blog", "subject": "<span class=\"fa fa-tags\"></span>", "body": "<p>aasdfsdf</p>", "to": "", "user_id": 1, "created_at": "2018-10-23 02:19:31", "updated_at": "2018-10-23T02:19:31.000Z", "parent_comment_id": null, "private_type": false, "access_type_id": null, "user_name": "Administrator", "avatar_url": "http://10.135.106.152:9000/system/users/avatars/000/000/001/original/veWbChvNZebHdxTavbcJ7RUi.jpg?1539914705", "child": [] }, { "id": 980191523, "commentable_id": 4, "commentable_type": "Blog", "subject": "<span class=\"fa fa-tags\"></span>", "body": "<p>asasfdsa</p>", "to": "", "user_id": 1, "created_at": "2018-10-23 02:33:23", "updated_at": "2018-10-23T02:33:23.000Z", "parent_comment_id": null, "private_type": false, "access_type_id": null, "user_name": "Administrator", "avatar_url": "http://10.135.106.152:9000/system/users/avatars/000/000/001/original/veWbChvNZebHdxTavbcJ7RUi.jpg?1539914705", "child": [] }], "history_count": 1, "user_name": "Administrator", "state_code": "PUBLISHED", "submissions": [] };
    callback(res);
    return false;
    wx.request({
      header: {
        'Authorization': this.app.globalData.access_token
      },
      url: this.host + '/api/v1/demand_blogs/' + id,
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
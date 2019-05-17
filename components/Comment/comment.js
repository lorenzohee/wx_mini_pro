// components/Comment/comment.js
var CommentService = require('../../service/commentservice.js')
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleId: {
      type: Number
    },
    comments: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFormShow: false
  },

  relations: {
    './comment_item': {
      type: 'child', // 关联的目标节点应为子节点
      linked: function (target) {
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
        console.log('comment: '+target.data)
      },
      linkChanged: function (target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
      },
      unlinked: function (target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showCommentForm(e){
      var replyId = e.currentTarget.dataset.replyuserid;
      var replyCommentId = e.currentTarget.dataset.replycomment;
      this.setData({
        replyId: replyId,
        replyCommentId: replyCommentId,
        isFormShow: !this.data.isFormShow
      })
    },

    //隐藏弹框
    hideDialog() {
      this.setData({
        replyId: '',
        replyCommentId: '',
        isFormShow: !this.data.isFormShow
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isFormShow: !this.data.isFormShow
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _cancelEvent() {
      this.hideDialog()
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    },

    formSubmit: function (e) {
      var that = this;
      var formData = e.detail.value;
      formData.articleId = this.data.articleId;
      formData.replyId = this.data.replyId;
      formData.replyCommentId = this.data.replyCommentId;
      var commentService = new CommentService();
      commentService.createComment(formData, function(result){
        if (undefined === result.replyCommentId || '' === result.replyCommentId){
          that.data.comments = [result].concat(that.data.comments || [])
        }else{
          that.data.comments.forEach(function(v, i){
            if (v.id == result.replyCommentId){
              v.children = [result].concat(v.children || []);
              return false;
            }
          })
        }
        that.setData({
          comments: that.data.comments
        })
        that.hideDialog()
      })
    },
    formReset: function () {
      this.hideDialog()
    },

    _getAllLi: function () {
      var that = this;
      // 使用getRelationNodes可以获得nodes数组，包含所有已关联的custom-li，且是有序的
      var nodes = this.getRelationNodes('./comment_item')
      nodes.forEach((v,i)=>{
        v.setData({comment: that.comments[i]})
      })
    }
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached: function(){},
    ready: function(){ 
      this._getAllLi()
    }
  }
})

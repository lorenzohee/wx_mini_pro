// components/Comment/comment_item.js
var WxParse = require('../../vendor/wxParse/wxParse.js')
var app = getApp()
Component({
  /**
   * Component properties
   */
  properties: {
    comment: {
      type: Object
    }
  },
  options: {
    styleIsolation: 'shared'
  },

  /**
   * Component initial data
   */
  data: {

  },

  relations: {
    './comment': {
      type: 'parent', // 关联的目标节点应为父节点
      linked: function (target) {
        // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
        console.log("item: "+target.data)
      },
      linkChanged: function (target) {
        // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
      },
      unlinked: function (target) {
        // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
      }
    }
  },
  /**
   * Component methods
   */
  methods: {
    showCommentForm: function(e){
      var that = this;
      var replyCommentId = e.currentTarget.dataset.replycomment;
      this.triggerEvent("childCommentReply")
      return false;
      var nodes = this.getRelationNodes('./comment')
      nodes[0].setData({
        replyCommentId: replyCommentId,
        isFormShow: true
      })
    }

  },

  ready: function () {
    var that = this;
    var content = that.data.comment.body;
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    WxParse.wxParse('content', 'html', content, that, 5);
   }
})

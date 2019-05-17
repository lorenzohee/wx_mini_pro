class Comment{
  constructor(){

  }

  createComment(obj, callback){
    var result = {
      id: 1,
      content: obj.content || 'test',
      articleId: obj.articleId,
      userId: 123,
      userName: 'admin',
      replyId: obj.replyId,
      replyName: '官宣',
      articleId: obj.articleId,
      replyCommentId: obj.replyCommentId
    }
    if('function'===typeof(callback)){
      callback(result)
    }
  }

  getCommentsByArticleId(articleId, callback){
    var result = [
      {
        id: 4,
        userAvatar: 'link',
        userName: 'name',
        userId: 5,
        content: '评论内容'
      },
      {
        id: 1,
        userAvatar: 'link',
        userName: 'name',
        userId: 5,
        content: 'We need to find a method to predict the internal temperature of food based on its inherent properties'
      },
      {
        id: 2,
        userAvatar: 'link',
        userName: 'name',
        userId: 5,
        content: '评论内容We need to find a method to predict the internal temperature of food based on its inherent properties'
      },
      {
        id: 3,
        userAvatar: 'link',
        userName: 'name',
        userId: 5,
        content: '评论We need to find a method to predict the internal temperature of food based on its inherent properties内容'
      }]
    if('function'===typeof(callback)){
      callback(result)
    }
  }
}

module.exports = Comment
class UserService {
  constructor(){

  }

  getTagGroup(callback){
    var res=[{
      title: 'Tech Area',
      tags: [
        { title: "nihao1" },
        { title: "good" },
        { title: "bad" },
        { title: "very" },
        { title: "Technology" }
      ]
    },{
      title: 'Favorite Area',
      tags: [
        { title: "apple" },
        { title: "bananers" },
        { title: "pink" },
        { title: "black" },
        { title: "basketball" }
      ]
    }]
    if('function'==typeof(callback)){
      callback(res)
    }
  }

  getUserTags(id, callback){
    var res = ["pink", "good", "bad", "black"];
    if ("function"==typeof(callback)){
      callback(res)
    }
  }

  deleteUserTag(text, callback){
    var res=text
    if("function"==typeof(callback)){
      callback(res)
    }
  }

  addUserTag(text, callback){
    var res=text
    if('function'==typeof(callback)){
      callback(res)
    }
  }
}

module.exports = UserService
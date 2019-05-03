
var db = require("./db.js");
var formidable = require("formidable");
var crypto = require("./crypto.js");
var session = require('express-session');
var fs = require("fs");
var path = require("path");
var request = require('request');
const querystring = require('querystring');
const config = require('./config.js');
// exports.userLogin = function(req, res, next) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//         var username = fields.username;
//         var password = crypto(fields.password);
//         //查询数据库
//         db.find("users", { "username": username }, function (err, result) {
//             if (err) {
//                 res.send("-3")
//                 return;
//             }
//             if (result.length == 0) {
//                 res.send("-2");//用户名不存在
//             } else {
//                if(password === result[0].password) {
//                    req.session.login = "1";
//                    req.session.username = username;
//                    res.send("1");//登录成功
//                } else {
//                    res.send("-1");//密码错误
//                }
//             }
//         })
//     });   
// }

// read
exports.getReadList = function(req, res, next) {
  db.find('reads',{}, function(err, result) {
      if(err) {
          return res.send('-1');
      }
    return res.send(result)
  })
}
exports.getReadContent = function(req, res, next) {
    const readID = req.query.id
    const flag = req.query.flag
    db.find('reads', {'id': readID, 'flag': flag}, function(err, result) {
        if(err) {
            return res.send('-1');
        } else {
        return res.send(result)
        }
    })
  }
  exports.DoSearch = function(req, res, next) {
    const query={}
    if(req.query.keywords) {
      query['title']=new RegExp(req.query.keywords);
    }
    db.find('reads', query, function(err, result) {
        if(err) {
            return res.send('-1');
        } else {
        return res.send(result)
        }
    })
  }

// comment
exports.submitComment = function(req, res, next) {
     const pictures = [];
      for(let i = 0;i<req.files.length;i++) {
          pictures.push(req.files[i].filename)
      }
     var param = {}
     Object.assign(param, req.body, {'picture': pictures})
     db.insertArray('comments', [param], function(err, result) {
        if(err) {
            return res.send('-1');
        } else {
        return res.send('1')
        }
    })
  }

  //user
  exports.getUser = function(req, res, next) {
    const username = req.session.username
    console.log(username)
    db.find('users',{'username': username}, function(err, result) {
        if(err) {
            return res.send('-1');
        }
      return res.send(result)
    })
  }
  exports.updateName = function(req, res, next) {
    const newName = req.query.username
    const oldName = req.session.username
    db.update('users',{'username': oldName}, {$set:{"username": newName}}, function(err, result) {
        if(err) {
            return res.send('-1');
        }
      req.session.username = newName
      return res.send({status: true})
    })
  }
  exports.updateAvatar = function(req, res, next) {
    const avatar = req.file.filename
    const username = req.session.username
    db.update('users',{'username': username},{$set:{"avatar": avatar}}, function(err, result) {
        if(err) {
            return res.send('-1');
        }
      return res.send({status: true})
    })
  }

  // 发送短信验证码
  exports.sendMobileCode = function(req, res, next) {
    // 测试数据
    req.session.mobile = 111111
    res.send({status: true})
//     let mobile= parseInt(req.query.mobile)
//     db.find('users',{'mobile': mobile}, function(err, result) {
//       if(err) {
//           return res.send('-1');
//       } else if (result.length > 0) {
//         return res.send('1');  //用户已经注册过
//       } else {
//     // 6位随机验证码
//     let random=Math.ceil(Math.random()*1000000)
//     // req.session.mobile = random
//     // 短信内容
//     let text=`【王小芳test】您的验证码是${random}。如非本人操作，请忽略本短信`
//     // 报文请求头
//     let options = {
//         method:'post',
//         url: config.SMS.URL,
//         headers: {
//             'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
//         },
//         form:{
//             apikey:config.SMS.APIKEY,
//             mobile:mobile,
//             text:text,
//         }
//     }
//     request(options, function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//            res.send({
//                status:true,
//                message:body,
//                checkCode:random
//            })
//         }else if (!error && response.statusCode != 200) {
//             res.send({
//                 status:false,
//                 message:body
//             })
//         }else{
//             res.send({
//                 status:false,
//                 message:error
//             })
//         }
//     })
//   }
// })
}
// 注册验证
exports.doRegist = function(req, res, next) {
  console.log(req.session.mobile)
  if (parseInt(req.body.sms) === req.session.mobile) {
    const params = {
      'username': req.body.username,
      'password': crypto(req.body.password),
      'mobile': parseInt(req.body.mobile),
      'avatar': 'user.png',
      'comment': []
    }
    const username = req.body.username
    db.insertArray('users', [params], function(err, result) {
      if(err) {
          return res.send('-1');
      } else {
        req.session.login = true;
        req.session.username = username;
       return res.send({status: true})
      }
    })
  } else {
    return res.send({
      status: false,
      message: '验证码已经失效请重新发送'
    })
  }
}

// 检验用户名是否存在
exports.checkUsername = function (req, res, next) {
  const username = req.query.username
  db.find('users',{'username': username}, function(err, result) {
    if(err) {
        return res.send('-1');
    } else if (result.length > 0) {
      return res.send({
        status: false,
        message: '用户名已存在'
      })
    } else if (result.length === 0) {
      return res.send({
        status: true
      })
    }
  })
}

// 登录
exports.doLogin = function(req, res, next) {
  const username = req.body.username
  const password = crypto(req.body.password)
  db.find('users',{'username': username}, function(err, result) {
    if(err) {
        return res.send('-1');
    } else if (result.length === 0) {
      return res.send({
        status: false,
        message: '用户名不存在'
      }) 
    }else if (password === result[0].password) {
        req.session.login = true
        req.session.username = username;
        return res.send({status: true});
    } else {
      return res.send({
        status: false,
        message: '用户名和密码不匹配!'
      })
    }
})
}
// 忘记密码
exports.checkForget = function(req, res, next) {
  console.log(req.session.mobile)
  if (parseInt(req.body.sms) === req.session.mobile) {
   res.send({status: true})
  } else {
    return res.send({
      status: false,
      message: '验证码已经失效请重新发送'
    })
  }
}
exports.doReset = function(req, res, next) {
  const password = crypto(req.body.password)
  const mobile = req.body.mobile
   db.update('users',{'mobile': mobile},{$set:{"password": password}}, function(err, result) {
        if(err) {
            return res.send('-1');
        }
      return res.send({status: true})
  })
}
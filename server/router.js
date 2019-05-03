var express = require('express');
var router = express.Router();
var api = require('./api');
var multer  = require('multer')
// var upload = multer({ dest: 'public/uploads/' })
// var avatar = multer({ dest: 'public/avatars/' })
// 定义上传文件路径及name
var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, (new Date()).getTime() + '.' + file.mimetype.replace('image/',''))
  }
})
var upload = multer({ storage: storage1 })

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatars/')
  },
  filename: function (req, file, cb) {
    cb(null, (new Date()).getTime() + '.' + file.mimetype.replace('image/',''))
  }
})
var avatar = multer({ storage: storage2 })



// router.get('/', (req, res, next) => {
//   res.send('home')
// })
// read页面
router.get('/read/getList', (req, res, next) => {
 api.getReadList(req, res, next);
})
router.get('/read/getContent', (req, res, next) => {
  api.getReadContent(req, res, next)
})
router.get('/read/search', (req, res, next) => {
  api.DoSearch(req, res, next)
})

// comment页面
router.post('/comment/submit', upload.array('file[]', 3), (req, res, next) => {
  api.submitComment(req, res, next)
})

// user页面
router.get('/user', (req, res, next) => {
  api.getUser(req, res, next)
})
router.get('/updateName', (req, res, next) => {
  api.updateName(req, res, next)
})
router.post('/updateAvatar', avatar.single('file'), (req, res, next) => {
  api.updateAvatar(req, res, next)
})
// 发送短信验证码
router.get('/login/sendMobileCode',(req, res, next) => {
  api.sendMobileCode(req, res, next)
})
// 注册
router.post('/regist', (req, res, next) => {
  api.doRegist(req, res, next)
})
router.get('/checkName', (req, res, next) => {
  api.checkUsername(req, res, next)
})

// 登录
router.post('/login', (req, res, next) => {
  api.doLogin(req, res, next)
})

// 忘记密码
router.post('/checkForget', (req, res, next) => {
  api.checkForget(req, res, next)
})
// 重置密码
router.post('/doReset', (req, res, next) => {
  api.doReset(req, res, next)
})


// 获取session
router.get('/getSession', (req, res, next) => {
  req.session.login ? res.send(req.sessionID) : res.send('false');
})

// 退出
router.post('/user/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
  });
  res.end();
})

module.exports = router;
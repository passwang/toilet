const routerApi = require('./router');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: '8023',
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},   //2天
  resave: false,
  saveUninitialized: true
}));

app.all('*', function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
  else next();
});

app.use('/static', express.static(path.join(__dirname, './public')))
// 部署上线时读取静态文件
app.use(express.static(path.join(__dirname, '../dist')));

// 后端api路由
app.use('/api', routerApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');

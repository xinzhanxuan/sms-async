

// 1. 加载 express 模块
var express = require('express');
var config = require('./config.js');
var bodyParser = require('body-parser');
// 加载路由模块
var router = require('./router.js');

// 2. 创建 app 对象
var app = express();


// 3. 挂载各种中间件、路由
app.use(bodyParser.urlencoded({extended: false}));

// 挂载路由模块
app.use(router);


// 4. 启动服务
app.listen(config.port, function () {
  console.log('http://localhost:' + config.port);
});
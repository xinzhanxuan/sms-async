// 路由模块

var express = require('express');
// 加载业务模块
var handler = require('./handler.js');
var path = require('path');


// 创建路由对象
var router = express.Router();



// 通过 router 来设置路由
// ...

// 返回所有学员数据
router.get('/list', handler.list);

// 处理 /info 请求，返回指定的某位学员的详细信息
router.get('/info', handler.info);

// 返回所有城市信息
router.get('/cities', handler.cities);

// 返回所有专业信息
router.get('/majors', handler.majors);

// 处理 post 添加数据
router.post('/add', handler.addPost);


// 处理 /delete 删除操作
router.get('/delete', handler.delete);


// 处理更新保存数据的路由
router.post('/update', handler.update);

// 将服务器端的 public 目录作为静态资源托管起来
// 注意：这句代码（设置静态资源托管的代码），要放在其他路由的后面
// 原因是这个虚拟路径 是 '/'
router.use(express.static(path.join(__dirname, 'public'))); 




// 返回路由对象
module.exports = router;
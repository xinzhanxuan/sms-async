// 业务模块



// 加载 db 模块
var db = require('./db.js');


// 处理查询所有学员信息的方法
module.exports.list = function (req, res) {
  // 1. 从数据库中查询所有学员信息
  db.findAll('students', function (err, docs) {
    if (err) {
      throw err;
    }

    // 2. 将查询到的学员信息以 json 方式返回
    res.json({status: 0, list: docs});
  });

};


// 实现显示学员详情
module.exports.info = function (req, res) {
  var objId = db.ObjectID(req.query._id);
  // 2. 根据 _id 去数据库中查询到该数据
  db.findOne('students', {_id: objId}, function (err, doc) {
    if (err) {
      throw err;
    }
    // 3. 渲染
    res.json({status: 0, stu: doc});
  });
};



// 处理返回所有城市
module.exports.cities = function (req, res) {
  db.findAll('cities', function (err, docs_city) {
    if (err) {
      throw err;
    }
    res.json({status: 0, cities: docs_city});
  });
};



// 处理返回所有专业
module.exports.majors = function (req, res) {
  db.findAll('majors', function (err, docs) {
    if (err) {
      throw err;
    }
    res.json({status: 0, majors: docs});
  });
};



// 处理 post 添加数据
module.exports.addPost = function (req, res) {
  var model = {
    sno: req.body.sno,
    sname: req.body.sname,
    sgender: (req.body.sgender === 'F') ? '女' : '男',
    sbirthday: req.body.sbirthday,
    sphone: req.body.sphone,
    saddr: req.body.saddr,
    smajor: req.body.smajor
  };


  // 2. 把 数据插入到数据库中
  db.insertOne('students', model, function (err, result) {
    if (err) {
      throw err;
    }
    // 3. 将结果通过 json 格式数据发到浏览器端
    res.json({status: 0, result: result});
  });
};




// 处理 /delete 请求
module.exports.delete = function (req, res) {
  // 获取要删除的学员的 _id
  var objId = db.ObjectID(req.query._id);

  // 根据 _id 从数据库中删除学员信息
  db.deleteOne('students', {_id: objId}, function (err, result) {
    // body..
    if (err) {
      throw err;
    }
    // 向用户发一个 json 数据
    res.json({status: 0, result: result});
  });
};


// 处理 /update 请求
module.exports.update = function (req, res) {
  // 1. 获取用户提交的数据
  // 获取用户要跟新的 _id
  var objId = db.ObjectID(req.body._id);
  // 获取其他要更新的数据
  var model = {
    sno: req.body.sno,
    sname: req.body.sname,
    sgender: (req.body.sgender === 'F') ? '女' : '男',
    sbirthday: req.body.sbirthday,
    sphone: req.body.sphone,
    saddr: req.body.saddr,
    smajor: req.body.smajor
  };

  // 2. 根据用户提交的数据更新数据库中的学员信息
  db.updateOne('students', {_id: objId}, model, function (err, result) {
    if (err) {
      throw err;
    }
    // 3. 将结果响应给用户
    res.json({status: 0, result: result});
  });
};
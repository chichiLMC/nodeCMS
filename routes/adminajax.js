var express = require('express');
var router = express.Router();

var multer  = require('multer');
var utility = require('utility');
var jwt = require('jsonwebtoken');
var secretkey = 'secretkey';

/* 链接数据库 */
var mysql = require("mysql");
var baseDate = require("./db");  //数据库连接的信息
var $sql = mysql.createConnection(baseDate.mysql);
$sql.connect(); 

//登录
router.post('/login',function(req,res,next){
  let thisTime = new Date();
  const user ={
    user_name:req.body.name,
    password:utility.md5(req.body.password),
    login_time:thisTime.getTime()
  }
  const sql = "select * from app_user";
  const sql2 = "update app_user set login_time = '"+user.login_time+"', cid = '1' where user_name = '" + user.user_name+"'";
  $sql.query(sql,function(err,row){
    var isTrue = false,
        isDis = false,
        nohas = false;
    for(var i=0;i<row.length;i++){
      if(row[i].user_name == user.user_name ){
        nohas = false;
        if(row[i].status !=0){
          isDis = true;
        };
        if(row[i].user_name == user.user_name && row[i].password == user.password) {
          isTrue = true;
          user.type = row[i].type;
        }
        break;
      }else{
        nohas = true;
      }
    }
    if(nohas){
      res.json({code:"0",msg: '账户不存在！'});
      return false
    }
    if(isDis){
      res.json({code:"0",msg: '账户已被禁用！'});
      return false
    }
    if (!isTrue) {
      res.json({code:"0",msg: '登录失败,账户与密码不一致'});
    } else {
      $sql.query(sql2,function(err,row){
        if(err){
          res.json({code:"0",msg: '登录失败,账户与密码不一致'});
        }else{
          const token = jwt.sign({username:user.user_name},secretkey,{expiresIn: 60*8});
          res.cookie("user",user.user_name+','+user.type+','+token);//设置cookies
          res.json({code:"1",msg: "登录成功",url:'/admin'});
        }
      })
    }
  })
});
router.post('/loginOut',function(req,res,next){
  res.clearCookie('user', { path: '/' });//清除cookie
  res.json({code:"1",msg: "登出成功!正在跳转...",url:'/admin/login'});
})

//菜单管理
router.get('/getMenu',function(req,res,next){
    var data = [];
    const sql = "select * from app_nav";
    $sql.query(sql,function(err,row){
      if(err){
        res.json({code:"0",msg: "查询失败"});
      }else{
        row.forEach(function(val,i){
          if(val.parent ==0 ||val.parent==null){
            val.child = [];
            data.push(val);
          }
          if(val.parent!=0){
            data.forEach(function(item,j){
              if(item.id==val.parent){
                item.child.push(val)
              }
            })
          }
        })
        res.json({code:"1",msg: "查询成功",data:data});
      }
    });
})
router.post('/addMenu',function(req,res,next){
    let thisTime = new Date();
    const data ={
        name:req.body.name,
        ename:req.body.ename,
        parent:req.body.parent,
        order:req.body.order,
        status:req.body.status,
        img:req.body.img,
        add_time:thisTime.getTime(),
        update_time:"",
        desc:req.body.desc
    };
    const sql = "INSERT INTO `app_nav` SET ?";
    $sql.query(sql,data,function(err,row){
      if(err){
        res.json({code:"0",msg: '添加失败,请稍后重试'});
      }else{
          res.json({code:"1",msg: "添加成功"});
      }
    });
})
router.post('/delMenu', function (req, res) {
    var id = req.body.id;
    $sql.query("delete from app_nav where id=" + id, function (err, rows) {
        if (err) {
            res.json({code:"0",msg: '操作失败,请稍后重试'});
        } else {
            res.json({code:"1",msg: "删除成功"});
        }
    });
});
router.post('/editMenu', function (req, res) {
    let thisTime = new Date();
    const data ={
        id:req.body.id,
        name:req.body.name,
        ename:req.body.ename,
        order:req.body.order,
        type:req.body.type,
        parent:req.body.parent,
        status:req.body.status,
        img:req.body.img,
        update_time:thisTime.getTime(),
        desc:req.body.desc
    };
    const sql ="UPDATE `app_nav` SET ? WHERE id = ?";
    const sql2 = "update app_nav set child = '"+ req.body.child +"' where id = " + data.parent;
    $sql.query(sql,[data,data.id],function (err, rows) {
        if (err) {
            res.json({code:"0",msg: '操作失败,请稍后重试'});
        } else {
          if(data.parent !=0){
            $sql.query(sql2,function(err,row){
              res.json({code:"1",msg: "更新成功"});
            })
          }else{
            res.json({code:"1",msg: "更新成功"});
          }
        }
    });
});
router.post('/editMenuStatus', function (req, res) {
  let thisTime = new Date();
  const data ={
      id:req.body.id,
      status:req.body.status == 1 ? 0 : 1,
      update_time:thisTime.getTime(),
  };
  const sql = "update app_nav set status = '"+ data.status +"',update_time='"+data.update_time+"' where id = " + data.id;
  $sql.query(sql,function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "更新状态成功",status:data.status});
      }
  });
});
router.post('/typeMenu',function(req,res){
  var data = [];
  var type = req.body.type; //0为单页，1为产品，2为文章
  $sql.query("select * from app_nav", function (err, row) {
    if (err) {
        res.json({code:"0",msg: '操作失败,请稍后重试',data:err});
    } else {
        row.forEach(function(val,i){
          if(type == 1){
            if(val.type == type && val.parent !=0 ){
              data.push(val);
            }
          }else if(type == 0){
            if(val.type == type ){
              data.push(val);
            }
          }
        })
        res.json({code:"1",msg: "查询成功",data:data});
    }
});
})

//用户信息
router.post('/userInfo',function(req,res,next){
  const sql = "select * from app_user where user_name = '" + req.body.user+"'";
  $sql.query(sql,function(err,row){
    if(err){
      res.json({code:"0",msg: "查询失败"});
    }else{
      delete row[0].password;//不返回密码
      res.json({code:"1",msg: "查询成功",data:row});
    }
  });
});
router.post('/edituserInfo', function (req, res) {
  let thisTime = new Date();
  const data ={
      id : req.body.id,
      phone:req.body.phone,
      email:req.body.email,
      desc:req.body.desc,
      update_time:thisTime.getTime()
  };
  const sql ="UPDATE `app_user` SET ? WHERE id = ?";
  $sql.query(sql,[data,data.id],function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "更新成功！"});
      }
  });
});
router.post('/updateuserPwd', function (req, res) {
  let thisTime = new Date();
  let old_pwd = utility.md5(req.body.old_password);
  const data ={
      password:utility.md5(req.body.password2),
      update_time:thisTime.getTime()
  };
  const sql = "select password from app_user where id = '" + req.body.id+"'";
  const sql2 ="UPDATE `app_user` SET ? WHERE id = ?";
  $sql.query(sql,function (err, rows) {
    if(rows[0].password == old_pwd){
      $sql.query(sql2,[data,req.body.id],function (err, rows) {
          if (err) {
              res.json({code:"0",msg: '操作失败,请稍后重试'});
          } else {
              res.json({code:"1",msg: "修改密码成功"});
          }
      });
    }else{
      res.json({code:"2",msg: '旧密码错误,请重试'});
    }
  })
});

//文章列表
router.post('/addList',function(req,res,next){
  let thisTime = new Date();
    const data ={
        title:req.body.title,
        keyword:req.body.key,
        desc:req.body.desc,
        type:req.body.type,
        order:req.body.order,
        cover:req.body.cover,
        source:req.body.source,
        athor:req.body.athor,
        hot:req.body.hot,
        add_time:thisTime.getTime(),
        update_time:"",
        read:req.body.count
    };
  const sql = "INSERT INTO `app_list` SET ?";
  $sql.query(sql,data,function(err,row){
    if(err){
      res.json({code:"0",msg: "提交失败",data:data});
    }else{
      res.json({code:"1",msg: "提交成功",data:row});
    }
  });
});
router.get('/getList',function(req,res,next){
  const sql = "select * from app_list";
  $sql.query(sql,function(err,row){
    if(err){
      res.json({code:"0",msg: "查询失败"});
    }else{
      res.json({code:"1",msg: "查询成功",data:row});
    }
  })
})
router.post('/editList', function (req, res) {
  let thisTime = new Date();
    const data ={
        id:req.body.id,
        title:req.body.title,
        type:req.body.type,
        athor:req.body.athor,
        order:req.body.order,
        hot:req.body.hot,
        cover:req.body.cover,
        update_time:thisTime.getTime(),
        desc:req.body.desc,
        keyword:req.body.keyword,
        content:req.body.content,
        read:req.body.count,
        source:req.body.source
    };
  const sql="UPDATE `app_list` SET ? WHERE id = ?";
  $sql.query(sql,[data,data.id], function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "更新成功"});
      }
  });
});
router.post('/delList', function (req, res) {
  var id = req.body.id;
  $sql.query("delete from app_list where id=" + id, function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "删除成功"});
      }
  });
});
router.post('/editListHot', function (req, res) {
  let thisTime = new Date();
  const data ={
      id:req.body.id,
      hot:req.body.hot == "on" ? "off" : "on",
      update_time:thisTime.getTime(),
  };
  const sql = "update app_list set hot = '"+ data.hot +"',update_time='"+data.update_time+"' where id = " + data.id;
  $sql.query(sql,function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "更新状态成功",status:data.hot});
      }
  });
});

//产品列表
router.post('/addProduct',function(req,res,next){
  let thisTime = new Date();
    const data ={
        title:req.body.title,
        desc:req.body.desc,
        type:req.body.type,
        order:req.body.order,
        thumb:req.body.thumb,
        img:req.body.img,
        hot:req.body.hot,
        add_time:thisTime.getTime(),
        update_time:"",
        read:req.body.read,
        content:req.body.content
    };
  const sql = "INSERT INTO `app_product` SET ?";
  $sql.query(sql,data,function(err,row){
    if(err){
      res.json({code:"0",msg: "提交失败",data:data});
    }else{
      res.json({code:"1",msg: "提交成功",data:row});
    }
  });
});
router.get('/getProduct',function(req,res,next){
  const sql = "select * from app_product";
  $sql.query(sql,function(err,row){
    if(err){
      res.json({code:"0",msg: "查询失败"});
    }else{
      res.json({code:"1",msg: "查询成功",data:row});
    }
  })
})
router.post('/editProduct', function (req, res) {
  let thisTime = new Date();
    const data ={
        id:req.body.id,
        title:req.body.title,
        type:req.body.type,
        order:req.body.order,
        thumb:req.body.thumb,
        img:req.body.img,
        hot:req.body.hot,
        update_time:thisTime.getTime(),
        desc:req.body.desc,
        content:req.body.content
    };
  const sql="UPDATE `app_product` SET ? WHERE id = ?";
  $sql.query(sql,[data,data.id], function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试',data:err});
      } else {
          res.json({code:"1",msg: "更新成功"});
      }
  });
});
router.post('/delProduct', function (req, res) {
  var id, sql;
  var isArray = req.body['id[]'] instanceof Array;
  console.log(isArray, req.body['id[]'])
  if(isArray){
    id = req.body['id[]'].join(",");
    sql = "delete from app_product where id in("+ id+")";
  }else{
    id = req.body['id[]'] || req.body.id;
    sql = "delete from app_product where id="+ id;
  }
  $sql.query(sql, function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "删除成功"});
      }
  });
});
router.post('/editProductHot', function (req, res) {
  let thisTime = new Date();
  const data ={
      id:req.body.id,
      hot:req.body.hot == "on" ? "off" : "on",
      update_time:thisTime.getTime(),
  };
  const sql = "update app_product set hot = '"+ data.hot +"',update_time='"+data.update_time+"' where id = " + data.id;
  $sql.query(sql,function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "更新状态成功",status:data.status});
      }
  });
});

//单页
router.post('/addSingle',function(req,res,next){
  let thisTime = new Date();
    const data ={
        title:req.body.title,
        type:req.body.type,
        typename:req.body.typename,
        desc:req.body.desc,
        order:req.body.order,
        cover:req.body.cover,
        add_time:thisTime.getTime(),
        update_time:"",
        content:req.body.content
    };
  const sql = "INSERT INTO `app_single` SET ?";
  $sql.query(sql,data,function(err,row){
    if(err){
      res.json({code:"0",msg: "提交失败",data:data});
    }else{
      res.json({code:"1",msg: "提交成功",data:row});
    }
  });
});
router.get('/getSingle',function(req,res,next){
  const sql = "select * from app_single";
  $sql.query(sql,function(err,row){
    if(err){
      res.json({code:"0",msg: "查询失败"});
    }else{
      res.json({code:"1",msg: "查询成功",data:row});
    }
  })
})
router.post('/editSingle', function (req, res) {
  let thisTime = new Date();
    const data ={
        id:req.body.id,
        title:req.body.title,
        type:req.body.type,
        order:req.body.order,
        cover:req.body.cover,
        update_time:thisTime.getTime(),
        desc:req.body.desc,
        content:req.body.content
    };
  const sql="UPDATE `app_single` SET ? WHERE id = ?";
  $sql.query(sql,[data,data.id], function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "更新成功"});
      }
  });
});
router.post('/delSingle', function (req, res) {
  var id = req.body.id;
  $sql.query("delete from app_single where id=" + id, function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "删除成功"});
      }
  });
});

//留言
router.post('/getMessage',function(req,res,next){
  var sql;
  if(req.body.count == '0'){
    sql = 'select * from app_message' //全部
  }else{
    sql = 'select * from app_message order by id desc limit '+req.body.count+''; //条数
  }
  $sql.query(sql,function(err,row){
    if(err){
      res.json({code:"0",msg: "查询失败"});
    }else{
      res.json({code:"1",msg: "查询成功",data:row});
    }
  })
})
router.post('/Message',function(req,res,next){
  let thisTime = new Date();
    const data ={
        username:req.body.username,
        mobile:req.body.mobile,
        email:req.body.email,
        add_time:thisTime.getTime(),
        content:req.body.content
    };
  const sql = "INSERT INTO `app_message` SET ?";
  $sql.query(sql,data,function(err,row){
    if(err){
      res.json({code:"0",msg: "提交失败",data:data});
    }else{
      res.json({code:"1",msg: "提交成功",data:row});
    }
  });
});
router.post('/replyMessage', function (req, res) {
  let thisTime = new Date();
    const data ={
        id:req.body.id,
        update_time:thisTime.getTime(),
        reply:req.body.reply
    };
  const sql="UPDATE `app_message` SET ? WHERE id = ?";
  $sql.query(sql,[data,data.id], function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "回复成功"});
      }
  });
});
router.post('/delMessage', function (req, res) {
  var id = req.body.id;
  $sql.query("delete from app_message where id=" + id, function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "删除成功"});
      }
  });
});

//广告管理
router.get('/getAdvtype',function(req,res,next){
  const sql = "select * from app_advtype";
  $sql.query(sql,function(err,row){
    if(err){
      res.json({code:"0",msg: "查询失败"});
    }else{
      res.json({code:"1",msg: "查询成功",data:row});
    }
  })
})
router.post('/addAdvtype',function(req,res,next){
  let thisTime = new Date();
    const data ={
        order:req.body.order,
        cover:req.body.cover,
        name:req.body.name,
        ename:req.body.ename,
        add_time:thisTime.getTime()
    };
  const sql = "INSERT INTO `app_advtype` SET ?";
  $sql.query(sql,data,function(err,row){
    if(err){
      res.json({code:"0",msg: "提交失败",data:data});
    }else{
      res.json({code:"1",msg: "提交成功",data:row});
    }
  });
});
router.post('/editAdvtype', function (req, res) {
  let thisTime = new Date();
    const data ={
        id:req.body.id,
        order:req.body.order,
        cover:req.body.cover,
        update_time:thisTime.getTime(),
        name:req.body.name,
        ename:req.body.ename
    };
  const sql="UPDATE `app_advtype` SET ? WHERE id = ?";
  $sql.query(sql,[data,data.id], function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "修改成功"});
      }
  });
});
router.post('/delAdvtype', function (req, res) {
  var id = req.body.id;
  $sql.query("delete from app_advtype where id=" + id, function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "删除成功"});
      }
  });
});
//获取分类
router.get('/typeAdv',function(req,res){
  $sql.query("select * from app_advtype", function (err, row) {
    if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试',data:err});
      } else {
          res.json({code:"1",msg: "查询成功",data:row});
      }
  });
})
//
router.get('/getAdv',function(req,res,next){
  const sql = "select * from app_advlist";
  $sql.query(sql,function(err,row){
    if(err){
      res.json({code:"0",msg: "查询失败"});
    }else{
      res.json({code:"1",msg: "查询成功",data:row});
    }
  })
})
router.post('/addAdv',function(req,res,next){
  let thisTime = new Date();
    const data ={
        title:req.body.title,
        type:req.body.type,
        typename:req.body.typename,
        order:req.body.order,
        cover:req.body.cover,
        desc:req.body.desc,
        content:req.body.content,
        add_time:thisTime.getTime()
    };
  const sql = "INSERT INTO `app_advlist` SET ?";
  $sql.query(sql,data,function(err,row){
    if(err){
      res.json({code:"0",msg: "提交失败",data:data});
    }else{
      res.json({code:"1",msg: "提交成功",data:row});
    }
  });
});
router.post('/editAdv', function (req, res) {
  let thisTime = new Date();
    const data ={
        id:req.body.id,
        title:req.body.title,
        type:req.body.type,
        typename:req.body.typename,
        order:req.body.order,
        cover:req.body.cover,
        desc:req.body.desc,
        content:req.body.content,
        update_time:thisTime.getTime(),
    };
  const sql="UPDATE `app_advlist` SET ? WHERE id = ?";
  $sql.query(sql,[data,data.id], function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "修改成功"});
      }
  });
});
router.post('/delAdv', function (req, res) {
  var id = req.body.id;
  $sql.query("delete from app_advlist where id=" + id, function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "删除成功"});
      }
  });
});
//网站信息
router.post('/webSystem',function(req,res,next){
  let thisTime = new Date();
    const data ={
        webname:req.body.webname,
        weblogo:req.body.weblogo,
        domain:req.body.domain,
        phone:req.body.phone,
        mobile:req.body.mobile,
        email:req.body.email,
        icp:req.body.icp,
        copyright:req.body.copyright,
        other:req.body.mobile,
        statistics:req.body.statistics,
        add_time:thisTime.getTime()
    };
  $sql.query("select count(*) from `app_websystem`",function(err,row){
    let count = row[0]['count(*)'];
    var sql;
    if(count !=0){
      sql = "UPDATE `app_websystem` SET ?";
    }else{
      sql = "INSERT INTO `app_websystem` SET ?";
    }
    $sql.query(sql,data,function(err,row){
      if(err){
        res.json({code:"0",msg: "提交失败"});
      }else{
        res.json({code:"1",msg: "提交成功"});
      }
    });
  })
});
router.post('/webSystemseo',function(req,res,next){
    const data ={
        seo_title:req.body.seotitle,
        seo_key:req.body.keyword,
        seo_desc:req.body.seodesc
    };
  $sql.query("select count(*) from `app_websystem`",function(err,row){
    let count = row[0]['count(*)'];
    var sql;
    if(count !=0){
      sql = "UPDATE `app_websystem` SET ?";
    }else{
      sql = "INSERT INTO `app_websystem` SET ?";
    }
    $sql.query(sql,data,function(err,row){
      if(err){
        res.json({code:"0",msg: "提交失败"});
      }else{
        res.json({code:"1",msg: "提交成功"});
      }
    });
  })
});
router.get('/getwebSystem',function(req,res,next){
  const sql = "select * from app_websystem";
  $sql.query(sql,function(err,row){
    if(err){
      res.json({code:"0",msg: "查询失败"});
    }else{
      res.json({code:"1",msg: "查询成功",data:row});
    }
  })
})
router.get('/getwebData',function(req,res,next){
  const sql = "select count(id) from ";
  $sql.query(sql+' app_product',function(err,row){
    if(err){
      res.json({code:"0",msg: "查询失败"});
    }else{
      res.json({code:"1",msg: "查询成功",data:row[0]['count(id)']});
    }
  });
})

//数据库
router.post('/backupSql',function(req,res,next){
  $sql.query("backup database appcms to disk='e://back.bak'",function(err,row){
    if(err){
      res.json({code:"0",msg: "备份失败",data:err});
    }else{
      res.json({code:"1",msg: "备份成功"});
    }
  });
});

//用户管理
router.get('/getUser',function(req,res,next){
  const sql = "select * from app_user";
  $sql.query(sql,function(err,row){
    var data =[];
    row.forEach(function(val,i){
      if(val.type!=0){
        data.push(val)
      }
    })
    if(err){
      res.json({code:"0",msg: "查询失败"});
    }else{
      res.json({code:"1",msg: "查询成功",data:data});
    }
  })
})
router.post('/addUser',function(req,res,next){
  let thisTime = new Date();
    const data ={
        cid:1,
        user_name:req.body.username,
        avatar:req.body.avatar,
        password:utility.md5(req.body.password),
        type:req.body.type,
        status:0,
        phone:req.body.phone,
        email:req.body.email,
        desc:req.body.desc,
        add_time:thisTime.getTime()
    };
  const sql = "INSERT INTO `app_user` SET ?";
  $sql.query(sql,data,function(err,row){
    if(err){
      res.json({code:"0",msg: "提交失败",data:data});
    }else{
      res.json({code:"1",msg: "提交成功",data:row});
    }
  });
});
router.post('/editUser', function (req, res) {
  let thisTime = new Date();
    const data ={
        id:req.body.id,
        status:req.body.status ==0 ? 1:0 ,
        update_time:thisTime.getTime(),
    };
  const sql="UPDATE `app_user` SET ? WHERE id = ?";
  $sql.query(sql,[data,data.id], function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "修改成功"});
      }
  });
});
router.post('/delUser', function (req, res) {
  var id = req.body.id;
  $sql.query("delete from app_user where id=" + id, function (err, rows) {
      if (err) {
          res.json({code:"0",msg: '操作失败,请稍后重试'});
      } else {
          res.json({code:"1",msg: "删除成功"});
      }
  });
});

//文件上传
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/');
  },
  filename: function (req, file, cb) {
    let name = file.originalname.replace(/(.*\/)*([^.]+).*/ig,"$2")
    var type = file.originalname.lastIndexOf(".");
    let suffix = file.originalname.substr(type+1);
    cb(null, name + new Date().getTime()+'.'+ suffix);
  }
})
var upload = multer({ storage: storage });
router.post('/uploader', upload.single('file'), function(req, res, next) {
    let url = '/upload/'+req.file.filename;
    const data = {add_time:new Date().getTime(),path:url};
    const sql = "INSERT INTO `app_upload` SET ?";
    $sql.query(sql,data,function(err,succ){
      if(err){
        res.json({code:"100",msg: "上传失败！",data:req});
      }else{
        res.json({code:"200",msg: "上传成功！",data:url});
      }
    });
});
//layui富文本上传
router.post('/layUploader', upload.single('file'), function(req, res, next) {
  let url = '/upload/'+req.file.filename;
  const data = {add_time:new Date().getTime(),path:url};
  const sql = "INSERT INTO `app_upload` SET ?";
  var respon = {
    src:url
  };
  $sql.query(sql,data,function(err,succ){
    if(err){
      res.json({code:"1",msg: "上传失败！"});
    }else{
      res.json({code:"0",msg: "上传成功！",data:respon});
    }
  });
});

module.exports = router;

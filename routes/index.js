var express = require('express');
var router = express.Router();

/* 链接数据库 */
var mysql = require("mysql");
var baseDate = require("./db");  //数据库连接的信息
var $sql = mysql.createConnection(baseDate.mysql);
$sql.connect(); 


/* GET home page. */
router.get('/', function(req, res, next) {
  var data=[];
  const sql = "select * from app_nav";
  $sql.query(sql,function(err,row){
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
    res.render('web/index',{'title':'欢迎访问页面','data':data})
  })
});

module.exports = router;

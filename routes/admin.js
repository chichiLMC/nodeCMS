var express = require('express');
var fs = require('fs');
var router = express.Router();

var syncPage = fs.readFileSync;
var encode = { encoding: 'utf8' };

/* GET admin page. */
router.get('/login', function(req, res, next) {
  res.render('admin/layout/login')
});

router.get('/', function(req, res, next) {
  if(req.cookies.user!=undefined){
    let data = req.cookies.user.split(",");
    res.render('admin/layout/index',{userinfo:data,websrc:req.headers.host})
  }else{
    res.render('admin/layout/login')
  }
});
router.get('/welcome', function(req, res, next) {
  var info = {
    host:req.headers.host,
    data:'',
    time: new Date().toLocaleString()
  }
  res.render('admin/layout/welcome',{info:info});
});
router.get('/admininfo', function(req, res, next) {
  if(req.cookies.user!=undefined){
    let data = req.cookies.user;
    res.render('admin/layout/admin-info',{userinfo:data})
  }else{
    res.render('admin/layout/admin-info')
  }
});

//菜单
router.get('/menu', function(req, res, next) {
  const html = syncPage('./views/admin/meau/menu.html',encode); 
  res.send(html);
});
router.get('/menuAdd', function(req, res, next) {
  const html = syncPage('./views/admin/meau/menu-add.html',encode); 
  res.send(html);
});

//文章
router.get('/article', function(req, res, next) {
  const html = syncPage('./views/admin/content/article-list.html',encode); 
  res.send(html);
});
router.get('/articleAdd', function(req, res, next) {
  const html = syncPage('./views/admin/content/article-add.html',encode); 
  res.send(html);
});
//单页
router.get('/single', function(req, res, next) {
  const html = syncPage('./views/admin/content/single-list.html',encode); 
  res.send(html);
});
router.get('/singleAdd', function(req, res, next) {
  const html = syncPage('./views/admin/content/single-add.html',encode); 
  res.send(html);
});
//产品
router.get('/product', function(req, res, next) {
  const html = syncPage('./views/admin/content/product-list.html',encode); 
  res.send(html);
});
router.get('/productAdd', function(req, res, next) {
  const html = syncPage('./views/admin/content/product-add.html',encode); 
  res.send(html);
});
//广告管理
router.get('/adv', function(req, res, next) {
  const html = syncPage('./views/admin/adv/adv-list.html',encode); 
  res.send(html);
});
router.get('/advAdd', function(req, res, next) {
  const html = syncPage('./views/admin/adv/adv-add.html',encode); 
  res.send(html);
});
router.get('/advtype', function(req, res, next) {
  const html = syncPage('./views/admin/adv/advtype-list.html',encode); 
  res.send(html);
});
router.get('/advtypeAdd', function(req, res, next) {
  const html = syncPage('./views/admin/adv/advtype-add.html',encode); 
  res.send(html);
});
//留言
router.get('/message', function(req, res, next) {
  const html = syncPage('./views/admin/other/message.html',encode); 
  res.send(html);
});
//
router.get('/system', function(req, res, next) {
  const html = syncPage('./views/admin/layout/system.html',encode); 
  res.send(html);
});
//用户管理
router.get('/user', function(req, res, next) {
  const html = syncPage('./views/admin/user/user-list.html',encode); 
  res.send(html);
});
router.get('/userAdd', function(req, res, next) {
  const html = syncPage('./views/admin/user/user-add.html',encode); 
  res.send(html);
});

router.get('/database', function(req, res, next) {
  const html = syncPage('./views/admin/other/database.html',encode); 
  res.send(html);
});


module.exports = router;
var express = require('express');
var router = express.Router();

var path = require('path');
var ueditor = require('ueditor');//加载ueditor
var bodyParser = require('body-parser');//解析客户端请求
var app = express();

//ue富文本编辑器提交请求接口
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

router.get("/ueditor", function (req, res, next) {
    // console.log('config.json')
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
});
router.post("/ueditor", ueditor(path.resolve(__dirname, '../public'), function (req, res, next) {
//客户端上传文件设置
    var imgDir = '/upload/ueditor/image/'
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/upload/ueditor/file'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/upload/ueditor/video'; //视频
        }
        res.ue_up(file_url);
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));

module.exports = router;
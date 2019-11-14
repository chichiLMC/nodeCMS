/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : appcms

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-07-04 08:37:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for app_advlist
-- ----------------------------
DROP TABLE IF EXISTS `app_advlist`;
CREATE TABLE `app_advlist` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `typename` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_advlist
-- ----------------------------
INSERT INTO `app_advlist` VALUES ('1', '0', '121456456', '1', '首页轮播', 'fsdsd89789', '/upload/bg0031561602829441.jpg', 'dasdsdasda', '1561602858872', '1561603109722');

-- ----------------------------
-- Table structure for app_advtype
-- ----------------------------
DROP TABLE IF EXISTS `app_advtype`;
CREATE TABLE `app_advtype` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `ename` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_advtype
-- ----------------------------
INSERT INTO `app_advtype` VALUES ('1', '2', '首页轮播', 'slider', '', '1561599881643', '1561600157341');

-- ----------------------------
-- Table structure for app_list
-- ----------------------------
DROP TABLE IF EXISTS `app_list`;
CREATE TABLE `app_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `athor` varchar(255) DEFAULT NULL,
  `hot` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `read` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`type`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_list
-- ----------------------------
INSERT INTO `app_list` VALUES ('1', '0', '文章1', '新闻', '法法师', '', '2', '111', 'on', '百度', '1', '<p style=\"text-align: center;\"><img src=\"/upload/baozhang1561444427942.png\" alt=\"undefined\"></p><p style=\"text-align: left;\"><img src=\"http://127.0.0.1:3000/admin/layui/images/face/33.gif\" alt=\"[睡]\"><br></p><p style=\"text-align: left;\">456464654564656</p>', '1559210484540', '1561445239165');
INSERT INTO `app_list` VALUES ('2', '1', '文章标题2', null, '打算的', '', '1', '打算的', null, '百度', '2', '56465456456', '1559210721719', '1561509807756');
INSERT INTO `app_list` VALUES ('5', '1', '文章5', null, '456456', '', '2', '123', null, '百度', '5', '4654646545465', '1559627408367', '1561509775003');
INSERT INTO `app_list` VALUES ('6', '0', '问责222', null, '大叔大婶大所大', '', '1', '立行', 'on', '百度文库', '1', 'fhkjfhasjfsla', '1560998741236', '1561510214446');

-- ----------------------------
-- Table structure for app_message
-- ----------------------------
DROP TABLE IF EXISTS `app_message`;
CREATE TABLE `app_message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  `reply` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_message
-- ----------------------------
INSERT INTO `app_message` VALUES ('1', 'admin', '4564654', '123@qq.com', '468789789', '1561543566800', '465456456', '1561546027205');
INSERT INTO `app_message` VALUES ('4', '456456', '4645', '54655', '14', '1561771085506', null, null);
INSERT INTO `app_message` VALUES ('3', '大叔', '4645', '54655', '14', '1561771066571', null, null);
INSERT INTO `app_message` VALUES ('5', '核发开发了卡', '4645', '54655', '14', '1561771101127', null, null);

-- ----------------------------
-- Table structure for app_nav
-- ----------------------------
DROP TABLE IF EXISTS `app_nav`;
CREATE TABLE `app_nav` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `ename` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  `parent` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_nav
-- ----------------------------
INSERT INTO `app_nav` VALUES ('2', '2', '联系我们', 'cantact', '0', '1', '123', '', '1559028045142', '1559028045142', '0', null);
INSERT INTO `app_nav` VALUES ('8', '1', '一级导航', 'one', '1', '1', '撒大声地', '', '1559093814445', '', '0', null);
INSERT INTO `app_nav` VALUES ('10', '1', '产品分类', 'dada', '1', '1', 'dadad', '/admin/images/null.jpg', '1559094938665', '1561429755812', '8', null);
INSERT INTO `app_nav` VALUES ('12', '3', '顶级导航', 'ding', '0', '1', 'dadad2', '/admin/images/null.jpg', '1559095345348', '1561429842696', '0', null);
INSERT INTO `app_nav` VALUES ('15', '2', '产品系列', 'pro', '1', '1', '', '/upload/shop1561369381306.png', '1561369384080', '1561429774429', '8', null);

-- ----------------------------
-- Table structure for app_photo
-- ----------------------------
DROP TABLE IF EXISTS `app_photo`;
CREATE TABLE `app_photo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `etitle` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_photo
-- ----------------------------

-- ----------------------------
-- Table structure for app_product
-- ----------------------------
DROP TABLE IF EXISTS `app_product`;
CREATE TABLE `app_product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `thumb` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `hot` varchar(255) DEFAULT NULL,
  `read` int(255) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  `typename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_product
-- ----------------------------
INSERT INTO `app_product` VALUES ('2', '阿斯顿撒旦', '10', '/upload/index_pro011561011968686.jpg', '大声道', '<p>456456456465</p>', '', 'on', '1', '0', '1561011991145', '1561361858298', '子导航');
INSERT INTO `app_product` VALUES ('5', '13213', '10', '/upload/微信图片_201903181010441561366297408.png', '000', '<p><img src=\"/upload/ueditor/image/1143079252606980096.png\" title=\"\" alt=\"微信图片_20190318141501.png\" width=\"263\" height=\"241\" style=\"width: 263px; height: 241px;\"/></p><p>4645456445</p>', '/upload/shop1561366222202.png,/upload/fc00b303-a573-41d8-8c13-37ef280acb131561366262133.png', 'off', '5', '1', '1561366337203', '1561430924871', null);

-- ----------------------------
-- Table structure for app_single
-- ----------------------------
DROP TABLE IF EXISTS `app_single`;
CREATE TABLE `app_single` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `typename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_single
-- ----------------------------
INSERT INTO `app_single` VALUES ('2', '1', '的撒打算', '大声道', '', '大叔大叔多', '1561541360531', '', '2', '联系我们');

-- ----------------------------
-- Table structure for app_upload
-- ----------------------------
DROP TABLE IF EXISTS `app_upload`;
CREATE TABLE `app_upload` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_upload
-- ----------------------------
INSERT INTO `app_upload` VALUES ('24', '/upload/baozhang1559275366000.png', '1559275366013');
INSERT INTO `app_upload` VALUES ('25', '/upload/baozhang1559633225548.png', '1559633225552');
INSERT INTO `app_upload` VALUES ('26', '/upload/index_pro031561011236807.jpg', '1561011236811');
INSERT INTO `app_upload` VALUES ('27', '/upload/index_pro031561011322039.jpg', '1561011322040');
INSERT INTO `app_upload` VALUES ('28', '/upload/index_pro031561011689200.jpg', '1561011689202');
INSERT INTO `app_upload` VALUES ('29', '/upload/index_pro011561011968686.jpg', '1561011968690');
INSERT INTO `app_upload` VALUES ('43', '/upload/701424-20180722141848107-6998530831561103913660.png', '1561103913666');
INSERT INTO `app_upload` VALUES ('44', '/upload/nxs_1556404498131 (1)1561104631855.png', '1561104631857');
INSERT INTO `app_upload` VALUES ('45', '/upload/701424-20180722141848107-6998530831561365945812.png', '1561365945818');
INSERT INTO `app_upload` VALUES ('46', '/upload/701424-20180722141848107-6998530831561365956989.png', '1561365956992');
INSERT INTO `app_upload` VALUES ('47', '/upload/fc00b303-a573-41d8-8c13-37ef280acb131561366018097.png', '1561366018100');
INSERT INTO `app_upload` VALUES ('48', '/upload/baozhang1561366025595.png', '1561366025596');
INSERT INTO `app_upload` VALUES ('49', '/upload/shop1561366222202.png', '1561366222204');
INSERT INTO `app_upload` VALUES ('50', '/upload/fc00b303-a573-41d8-8c13-37ef280acb131561366262133.png', '1561366262138');
INSERT INTO `app_upload` VALUES ('51', '/upload/微信图片_201903181010441561366297408.png', '1561366297412');
INSERT INTO `app_upload` VALUES ('52', '/upload/shop1561369381306.png', '1561369381311');
INSERT INTO `app_upload` VALUES ('53', '/upload/baozhang1561444427942.png', '1561444427963');
INSERT INTO `app_upload` VALUES ('54', '/upload/bg0031561602829441.jpg', '1561602829456');
INSERT INTO `app_upload` VALUES ('55', '/upload/baozhang1561606852821.png', '1561606852830');
INSERT INTO `app_upload` VALUES ('56', '/upload/baozhang1561615417703.png', '1561615417715');
INSERT INTO `app_upload` VALUES ('57', '/upload/baozhang1561620864204.png', '1561620864220');
INSERT INTO `app_upload` VALUES ('58', '/upload/baozhang1561621032240.png', '1561621032244');

-- ----------------------------
-- Table structure for app_user
-- ----------------------------
DROP TABLE IF EXISTS `app_user`;
CREATE TABLE `app_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL,
  `login_time` varchar(255) DEFAULT NULL,
  `update_time` varchar(255) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_name`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_user
-- ----------------------------
INSERT INTO `app_user` VALUES ('1', 'superadmin', '17c4520f6cfd1ab53d8745e84681eb49', '12456', '123@qq.com', '123', null, '1559208589376', null, '1', '0', '0', null);
INSERT INTO `app_user` VALUES ('2', 'admin', '21232f297a57a5a743894a0e4a801fc3', '4649874545', '456789@qq.com', '打到我多无', null, '1562114453454', '1559208548171', '1', '1', '0', null);
INSERT INTO `app_user` VALUES ('5', 'admin2', 'c84258e9c39059a89ab77d846ddab909', '', '', '', '1561625210616', '1561694519418', null, '1', '2', '0', '');

-- ----------------------------
-- Table structure for app_websystem
-- ----------------------------
DROP TABLE IF EXISTS `app_websystem`;
CREATE TABLE `app_websystem` (
  `webname` varchar(255) DEFAULT NULL,
  `weblogo` varchar(255) DEFAULT NULL,
  `domain` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `icp` varchar(255) DEFAULT NULL,
  `copyright` varchar(255) DEFAULT NULL,
  `other` varchar(255) DEFAULT NULL,
  `statistics` varchar(255) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_key` varchar(255) DEFAULT NULL,
  `seo_desc` varchar(255) DEFAULT NULL,
  `add_time` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_websystem
-- ----------------------------
INSERT INTO `app_websystem` VALUES ('CMS官方网站', '/upload/baozhang1561615417703.png', 'www.baidu.com', '0760-454654', '159716546546', '123@qq.com', '粤ICP备1234564', '@2019 all copyright', '159716546546', '<p><b>adsdsadsadsad</b></p><p><b><img src=\"http://127.0.0.1:3000/admin/layui/images/face/18.gif\" alt=\"[右哼哼]\"><br></b></p>', 'adsdsad', '大多数,000', 'sddasd', '1561615464488');

/*
Navicat MySQL Data Transfer

Source Server         : xy1808
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : xj1808

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-12-13 20:07:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `sid` tinyint(1) unsigned NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `regdate` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '13345678899', 'e10adc3949ba59abbe56e057f20f883e', '2018-12-11 19:47:16');
INSERT INTO `user` VALUES ('2', '13345678898', 'e10adc3949ba59abbe56e057f20f883e', '2018-12-11 20:38:37');
INSERT INTO `user` VALUES ('3', '15200000000', 'e10adc3949ba59abbe56e057f20f883e', '2018-12-11 20:54:32');
INSERT INTO `user` VALUES ('4', '15200000001', 'e10adc3949ba59abbe56e057f20f883e', '2018-12-12 08:40:53');
INSERT INTO `user` VALUES ('5', '15200000009', 'e10adc3949ba59abbe56e057f20f883e', '2018-12-12 14:06:32');
INSERT INTO `user` VALUES ('6', '15200000100', 'e10adc3949ba59abbe56e057f20f883e', '2018-12-13 19:31:23');

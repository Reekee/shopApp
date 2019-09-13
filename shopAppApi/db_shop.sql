/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : db_shop

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-09-13 14:00:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `gender`
-- ----------------------------
DROP TABLE IF EXISTS `gender`;
CREATE TABLE `gender` (
  `gender_id` int(11) NOT NULL,
  `gender_name` varchar(255) NOT NULL,
  PRIMARY KEY (`gender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gender
-- ----------------------------
INSERT INTO `gender` VALUES ('1', 'ชาย');
INSERT INTO `gender` VALUES ('2', 'หญิง');

-- ----------------------------
-- Table structure for `member`
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `member_id` int(11) NOT NULL,
  `member_name` varchar(255) NOT NULL,
  `member_lname` varchar(255) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES ('1', 'Jorn', 'Smitch', '1', 'AA', 'AA');
INSERT INTO `member` VALUES ('2', 'สมชาย', 'สมใจ', '2', 'BB', 'BB');
INSERT INTO `member` VALUES ('3', 'CC', 'CC', '1', 'CC', 'CC');
INSERT INTO `member` VALUES ('4', 'EE', 'EE', '2', 'EE', 'EE');
INSERT INTO `member` VALUES ('5', 'www', 'www', '2', 'www', 'www');
INSERT INTO `member` VALUES ('6', 'qqq', 'qqq', '2', 'qqq', 'qqq');

-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_detail` text NOT NULL,
  `product_price` double NOT NULL,
  `product_image` varchar(255) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', 'ยาสีฟัน', 'คุณสมบัติของยาสีฟัน ขจัดคราบ ฟันเหลือง ทำให้ฟันขาวได้ภายใน 7 วัน', '80', 'https://secure.ap-tescoassets.com/assets/TH/569/8850006232569/ShotType1_540x540.jpg');
INSERT INTO `product` VALUES ('2', 'แปรงสีฟัน', 'ฤฤฤฤ', '50', 'https://www.ningnongmistine.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/3/8/38010.jpg');
INSERT INTO `product` VALUES ('3', 'สบู่', 'หดหดหดหดำ', '45', 'https://static.bigc.co.th/media/catalog/product/cache/2/image/497x497/9df78eab33525d08d6e5fb8d27136e95/8/8/8850006534380.jpg');
INSERT INTO `product` VALUES ('4', 'AAA', 'SSS', '65', 'https://static.bigc.co.th/media/catalog/product/cache/2/image/497x497/9df78eab33525d08d6e5fb8d27136e95/8/8/8850006534380.jpg');

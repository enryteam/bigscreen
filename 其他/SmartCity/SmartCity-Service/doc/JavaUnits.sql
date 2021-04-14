/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50718
Source Host           : localhost:3306
Source Database       : smart_city_yshow

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-07-24 16:56:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id` bigint(11) NOT NULL DEFAULT '0',
  `parent_id` bigint(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `sort_no` bigint(11) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `perm_code` varchar(20) DEFAULT NULL,
  `icon` varchar(20) DEFAULT NULL,
  `desc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
INSERT INTO `sys_permission` VALUES ('10', '0', '数据导入', 'menu', '10', '', null, 'fa fa-database', '');
INSERT INTO `sys_permission` VALUES ('11', '10', 'CSV导入', 'menu', '1', 'etl/setting-svc', null, null, '');
INSERT INTO `sys_permission` VALUES ('12', '10', '数据库配置', 'menu', '2', 'etl/setting-DB', null, null, '');
INSERT INTO `sys_permission` VALUES ('13', '10', 'API接口配置', 'menu', '3', 'etl/setting-API', null, null, '');
INSERT INTO `sys_permission` VALUES ('14', '10', '监控信号配置', 'menu', '4', 'etl/setting-Monitor', null, null, '');
INSERT INTO `sys_permission` VALUES ('15', '10', '数据源管理', 'menu', '5', 'etl/setting-datasource', null, null, '');
INSERT INTO `sys_permission` VALUES ('20', '0', '数据建模', 'menu', '20', '', null, 'fa fa-cube', '数据源编辑');
INSERT INTO `sys_permission` VALUES ('21', '20', '模型分类', 'menu', '1', 'model/addModel', null, null, '');
INSERT INTO `sys_permission` VALUES ('22', '20', '模型管理', 'menu', '2', 'model/modifyModel', null, null, '');
INSERT INTO `sys_permission` VALUES ('30', '0', '视图管理', 'menu', '30', '', null, 'fa fa-area-chart', '');
INSERT INTO `sys_permission` VALUES ('31', '30', '组件管理', 'menu', '1', 'visual/visual-comp', null, null, '基础组件和自定义组件components');
INSERT INTO `sys_permission` VALUES ('32', '30', '布局模板管理', 'menu', '2', 'visual/visual-loyout', null, null, '基于拖曳式组件的大数据可视化页面布局,支持自定义');
INSERT INTO `sys_permission` VALUES ('33', '30', '界面视图管理', 'menu', '3', 'visual/visual-view', null, null, '');
INSERT INTO `sys_permission` VALUES ('40', '0', '项目管理', 'menu', '40', '', null, 'fa fa-th', '');
INSERT INTO `sys_permission` VALUES ('41', '40', '我的项目', 'menu', '1', 'project/myProject', null, null, '');
INSERT INTO `sys_permission` VALUES ('50', '0', 'OLAP分析', 'menu', '50', 'olap/analysis-olap', null, 'fa fa-calculator', 'OLAP联机分析处理');
INSERT INTO `sys_permission` VALUES ('60', '0', '生成移动端', 'menu', '60', '', null, 'fa fa-paper-plane', '');
INSERT INTO `sys_permission` VALUES ('61', '60', '移动端说明', 'menu', '1', 'mobile/mobile-info', null, null, '介绍移动端相关功能，并帮组你正确使用移动端');
INSERT INTO `sys_permission` VALUES ('70', '0', '系统管理', 'menu', '70', '', null, 'fa fa-gears ', '');
INSERT INTO `sys_permission` VALUES ('71', '70', '用户管理', 'menu', '1', 'manage/manage-user', null, null, '');
INSERT INTO `sys_permission` VALUES ('72', '70', '角色管理', 'menu', '2', 'manage/manage-role', null, null, '');
INSERT INTO `sys_permission` VALUES ('73', '70', '菜单管理', 'menu', '3', 'manage/manage-menu', null, null, '');
INSERT INTO `sys_permission` VALUES ('74', '70', '数据字典', 'menu', '4', 'manage/manage-DBdict', null, null, '');
INSERT INTO `sys_permission` VALUES ('80', '0', '系统监控', 'menu', '80', '', null, 'fa fa-bell', 'web服务器,数据库,系统运维监控');
INSERT INTO `sys_permission` VALUES ('81', '80', '服务器性能监控', 'menu', '1', 'monitor/monitor-server', null, null, '');
INSERT INTO `sys_permission` VALUES ('82', '80', 'Druid监控', 'menu', '2', 'monitor/druid', null, null, '');
INSERT INTO `sys_permission` VALUES ('83', '80', '运行日志', 'menu', '3', 'monitor/monitor-logger', null, null, '');
INSERT INTO `sys_permission` VALUES ('90', '0', '技术支持', 'menu', '90', 'manage/tech-support', null, 'fa fa-weixin', '');
INSERT INTO `sys_permission` VALUES ('100', '0', '系统介绍', 'menu', '0', 'manage/welcome', null, 'fa fa-home', '');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` varchar(36) NOT NULL,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', '系统管理员');
INSERT INTO `sys_role` VALUES ('2', '操作员');

-- ----------------------------
-- Table structure for sys_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_permission`;
CREATE TABLE `sys_role_permission` (
  `permission_id` bigint(11) NOT NULL DEFAULT '0',
  `role_id` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_permission
-- ----------------------------
INSERT INTO `sys_role_permission` VALUES ('10', '1');
INSERT INTO `sys_role_permission` VALUES ('11', '1');
INSERT INTO `sys_role_permission` VALUES ('12', '1');
INSERT INTO `sys_role_permission` VALUES ('13', '1');
INSERT INTO `sys_role_permission` VALUES ('14', '1');
INSERT INTO `sys_role_permission` VALUES ('15', '1');
INSERT INTO `sys_role_permission` VALUES ('20', '1');
INSERT INTO `sys_role_permission` VALUES ('21', '1');
INSERT INTO `sys_role_permission` VALUES ('22', '1');
INSERT INTO `sys_role_permission` VALUES ('30', '1');
INSERT INTO `sys_role_permission` VALUES ('31', '1');
INSERT INTO `sys_role_permission` VALUES ('32', '1');
INSERT INTO `sys_role_permission` VALUES ('33', '1');
INSERT INTO `sys_role_permission` VALUES ('40', '1');
INSERT INTO `sys_role_permission` VALUES ('41', '1');
INSERT INTO `sys_role_permission` VALUES ('50', '1');
INSERT INTO `sys_role_permission` VALUES ('60', '1');
INSERT INTO `sys_role_permission` VALUES ('61', '1');
INSERT INTO `sys_role_permission` VALUES ('70', '1');
INSERT INTO `sys_role_permission` VALUES ('71', '1');
INSERT INTO `sys_role_permission` VALUES ('72', '1');
INSERT INTO `sys_role_permission` VALUES ('73', '1');
INSERT INTO `sys_role_permission` VALUES ('74', '1');
INSERT INTO `sys_role_permission` VALUES ('80', '1');
INSERT INTO `sys_role_permission` VALUES ('81', '1');
INSERT INTO `sys_role_permission` VALUES ('82', '1');
INSERT INTO `sys_role_permission` VALUES ('83', '1');
INSERT INTO `sys_role_permission` VALUES ('90', '1');
INSERT INTO `sys_role_permission` VALUES ('100', '1');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL COMMENT '主键',
  `usercode` varchar(32) NOT NULL COMMENT '账号',
  `username` varchar(64) NOT NULL COMMENT '姓名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `salt` varchar(64) DEFAULT NULL COMMENT '盐',
  `telphone` varchar(20) DEFAULT NULL COMMENT '电话',
  `mobile` varchar(20) DEFAULT NULL COMMENT '手机',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `locked` char(1) DEFAULT NULL COMMENT '账号是否锁定，1：开启，2：锁定',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'root', '超级管理员', '1d9cbc3a2215dcab1908f3551fd47b31', 'lapland', '0557-88481066', '13738880888', '13738880888@163.com', '1');
INSERT INTO `sys_user` VALUES ('2', 'zhangsan', '张三', '9c29c5ab197e76a9ab24b3591567cdcb', 'uiwueylm', '0557-88481071', '13738880889', '13738880889@163.com', '1');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('2', '2');
INSERT INTO `sys_user_role` VALUES ('1', '1');

-- ----------------------------
-- Table structure for t_log
-- ----------------------------
DROP TABLE IF EXISTS `t_log`;
CREATE TABLE `t_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `_title` varchar(255) DEFAULT NULL COMMENT '日志标题',
  `level` varchar(20) DEFAULT NULL COMMENT '日志级别',
  `user_name` varchar(30) DEFAULT NULL COMMENT '操作用户Name',
  `oper_time` datetime DEFAULT NULL COMMENT '操作时间(yyyy-MM-dd HH:mm:ss)',
  `req_ip` varchar(20) DEFAULT NULL COMMENT '请求IP',
  `req_uri` varchar(100) DEFAULT NULL COMMENT '请求URI',
  `method` varchar(100) DEFAULT NULL COMMENT '提交方式（GET,POST）',
  `oper_event` varchar(300) DEFAULT NULL COMMENT '请求参数',
  `oper_status` tinyint(2) DEFAULT NULL COMMENT '操作状态（1：成功，2：失败）',
  `log_desc` varchar(300) DEFAULT NULL COMMENT 'ERROR描述信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COMMENT='日志表';

-- ----------------------------
-- Records of t_log
-- ----------------------------
INSERT INTO `t_log` VALUES ('41', '清空日志', 'INFO', '超级管理员', '2017-12-11 14:41:02', '127.0.0.1', '/monitor/deleteLogAll', 'deleteLogAll(),GET', '', '1', null);
INSERT INTO `t_log` VALUES ('42', '进入视图管理页面', 'INFO', '超级管理员', '2017-12-11 14:41:18', '127.0.0.1', '/visual/visual-view', 'view(),GET', '', '1', null);
INSERT INTO `t_log` VALUES ('43', '用户登录', 'INFO', '超级管理员', '2018-05-31 15:46:55', '0:0:0:0:0:0:0:1', '/manage/submitLogin', 'submitLogin(),POST', '用户名=root', '1', null);
INSERT INTO `t_log` VALUES ('44', '进入主页', 'INFO', '超级管理员', '2018-05-31 15:46:56', '0:0:0:0:0:0:0:1', '/manage/index;JSESSIONID=4abc1f69-8047-4f6d-bd93-28dd24e629d4', 'index(),GET', '', '1', null);
INSERT INTO `t_log` VALUES ('45', '进入视图管理页面', 'INFO', '超级管理员', '2018-05-31 15:47:06', '0:0:0:0:0:0:0:1', '/visual/visual-view', 'view(),GET', '', '1', null);
INSERT INTO `t_log` VALUES ('46', '用户登录', 'INFO', '超级管理员', '2018-05-31 16:28:17', '0:0:0:0:0:0:0:1', '/manage/submitLogin', 'submitLogin(),POST', '用户名=root', '1', null);
INSERT INTO `t_log` VALUES ('47', '进入主页', 'INFO', '超级管理员', '2018-05-31 16:28:17', '0:0:0:0:0:0:0:1', '/manage/index', 'index(),GET', '', '1', null);
INSERT INTO `t_log` VALUES ('48', '进入视图管理页面', 'INFO', null, '2018-05-31 23:52:13', '0:0:0:0:0:0:0:1', '/visual/visual-view', 'view(),GET', '', '1', null);
INSERT INTO `t_log` VALUES ('49', '用户登录', 'INFO', '超级管理员', '2018-07-24 15:21:00', '0:0:0:0:0:0:0:1', '/manage/submitLogin', 'submitLogin(),POST', '用户名=root', '1', null);
INSERT INTO `t_log` VALUES ('50', '进入主页', 'INFO', '超级管理员', '2018-07-24 15:21:01', '0:0:0:0:0:0:0:1', '/manage/index', 'index(),GET', '', '1', null);
INSERT INTO `t_log` VALUES ('51', '进入视图管理页面', 'INFO', '超级管理员', '2018-07-24 15:21:09', '0:0:0:0:0:0:0:1', '/visual/visual-view', 'view(),GET', '', '1', null);

-- ----------------------------
-- Table structure for visual_component
-- ----------------------------
DROP TABLE IF EXISTS `visual_component`;
CREATE TABLE `visual_component` (
  `id` bigint(20) NOT NULL,
  `widgetName` varchar(20) DEFAULT NULL,
  `type` bigint(20) DEFAULT NULL COMMENT '1.图表 2.表格 3.文本 4.表单',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of visual_component
-- ----------------------------

-- ----------------------------
-- Table structure for visual_view
-- ----------------------------
DROP TABLE IF EXISTS `visual_view`;
CREATE TABLE `visual_view` (
  `pageId` bigint(20) NOT NULL,
  `pagename` varchar(255) DEFAULT NULL,
  `pageinfo` text,
  `is3g` varchar(5) DEFAULT NULL COMMENT '是否在移动端访问的报表',
  `crtdate` datetime DEFAULT NULL,
  `updatedate` datetime DEFAULT NULL,
  `user_Id` int(11) NOT NULL DEFAULT '0',
  `cata_id` int(11) DEFAULT NULL COMMENT '报表所属目录，在3G报表中有效',
  PRIMARY KEY (`pageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of visual_view
-- ----------------------------
INSERT INTO `visual_view` VALUES ('1', '主页', '{\"layout\":6,\"body\":{\"tr1\":[{\"colspan\":\"1\",\"rowspan\":\"1\",\"height\":25,\"width\":25,\"id\":0,\"children\":[{\"id\":\"2086318e75097207e83ffd507162503a\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"pie\",\"maparea\":\"china\",\"typeIndex\":\"1\",\"xcol\":{},\"ycol\":{},\"scol\":{},\"params\":[],\"height\":\"250\",\"width\":\"360\",\"legendLayout\":\"\",\"legendpos\":\"\",\"showLegend\":\"false\"},\"kpiJson\":[null,null,null],\"style\":{}}]},{\"colspan\":\"1\",\"rowspan\":\"1\",\"height\":25,\"width\":25,\"id\":1,\"children\":[{\"id\":\"bba74261c89e40a7ed2dd70ba1cc2484\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"bar\",\"maparea\":\"china\",\"typeIndex\":\"1\",\"xcol\":{},\"ycol\":{},\"scol\":{},\"params\":[],\"height\":\"250\",\"width\":\"600\"},\"kpiJson\":[null,null,null]}]},{\"colspan\":\"2\",\"rowspan\":\"1\",\"height\":25,\"width\":50,\"id\":2,\"children\":[{\"id\":\"9557a105fff188f4bc254260e93f331f\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"line\",\"maparea\":\"china\",\"typeIndex\":\"2\",\"xcol\":{},\"ycol\":{},\"scol\":{},\"params\":[],\"height\":\"250\",\"width\":\"600\"},\"kpiJson\":[null,null,null]}]}],\"tr2\":[{\"colspan\":\"1\",\"rowspan\":\"1\",\"height\":25,\"width\":25,\"id\":3,\"children\":[{\"id\":\"e86a0c2e1f7fc0bf1bddff343be3d6a5\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"line\",\"maparea\":\"china\",\"typeIndex\":\"1\",\"xcol\":{},\"ycol\":{},\"scol\":{},\"params\":[],\"height\":\"250\",\"width\":\"600\"},\"kpiJson\":[null,null,null]}]},{\"colspan\":\"1\",\"rowspan\":\"1\",\"height\":25,\"width\":25,\"id\":4,\"children\":[{\"id\":\"3cbf56ef9d8f379672e3597187265076\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"map\",\"maparea\":\"zhejiang\",\"typeIndex\":\"1\",\"xcol\":{},\"ycol\":{},\"scol\":{},\"params\":[],\"height\":\"400\",\"width\":\"600\"},\"kpiJson\":[null,null,null]}]},{\"colspan\":\"2\",\"rowspan\":\"1\",\"height\":25,\"width\":50,\"id\":5,\"children\":[{\"id\":\"e0e6752e918afc9667acd61937d2ad01\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"column\",\"maparea\":\"china\",\"typeIndex\":\"4\",\"xcol\":{},\"ycol\":{},\"scol\":{},\"params\":[],\"height\":\"250\",\"width\":\"600\"},\"kpiJson\":[null,null,null]}]}],\"tr3\":[{\"colspan\":\"2\",\"rowspan\":\"2\",\"height\":50,\"width\":50,\"id\":6,\"children\":[{\"id\":\"1bb412df1db397d37b27592199371130\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"gauge\",\"maparea\":\"china\",\"typeIndex\":\"1\",\"xcol\":{},\"ycol\":{},\"scol\":{},\"params\":[],\"height\":\"250\",\"width\":\"360\"},\"kpiJson\":[null,null,null]}]},{\"colspan\":\"2\",\"rowspan\":\"1\",\"height\":25,\"width\":50,\"id\":7,\"children\":[{\"id\":\"ac306cdc34ba178dfe9fcff8e3c05589\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"bubble\",\"maparea\":\"china\",\"typeIndex\":\"1\",\"xcol\":{},\"ycol\":{},\"scol\":{},\"params\":[],\"height\":\"250\",\"width\":\"600\"},\"kpiJson\":[null,null,null]}]}],\"tr4\":[{\"colspan\":\"2\",\"rowspan\":\"1\",\"height\":25,\"width\":50,\"id\":8,\"children\":[]}]},\"id\":\"82a4b12bb4cb4db6ac3e956274af0bf3\",\"params\":[{\"id\":\"80417b7242874e61e6ea0d7de2fc16c9\",\"type\":\"yearselect\",\"paramid\":\"year\",\"name\":\"年份\",\"defvalue\":\"\",\"size\":\"\",\"maxval\":\"2020\",\"minval\":\"2000\",\"dtformat\":\"yyyy年\"},{\"id\":\"bbb2fda5186fdaebf725d00b2a12f29c\",\"type\":\"dateselect\",\"paramid\":\"day\",\"name\":\"日期\",\"defvalue\":\"now\",\"size\":\"\",\"maxval\":\"31\",\"minval\":\"1\",\"dtformat\":\"yyyy年MM月dd日\"}]}', null, '2017-08-29 10:06:40', '2017-09-04 09:42:27', '1', null);
INSERT INTO `visual_view` VALUES ('2', '导航页', '{\"layout\":3,\"body\":{\"tr1\":[{\"colspan\":2,\"rowspan\":1,\"width\":100,\"height\":50,\"id\":1,\"children\":[{\"id\":\"52a1167df63ee988d0f032cf94cb9a24\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"pie\",\"typeIndex\":\"1\",\"xcol\":{\"id\":448,\"dimdesc\":\"MENU_ID\",\"xdispName\":\"MENU_ID\",\"type\":\"frd\",\"colname\":\"MENU_ID\",\"iscas\":\"\",\"tableName\":\"\",\"tableColKey\":\"\",\"tableColName\":\"\",\"dimord\":\"\",\"grouptype\":null,\"valType\":\"Int\",\"ordcol\":\"\",\"alias\":\"MENU_ID\",\"tname\":\"sc_menu\",\"calc\":0},\"ycol\":{\"type\":\"kpi\"},\"scol\":{},\"params\":[],\"height\":\"250\",\"width\":\"600\"},\"kpiJson\":[{\"kpi_id\":239,\"kpi_name\":\"avatar\",\"ydispName\":\"avatar\",\"col_name\":\"sum(avatar)\",\"aggre\":\"sum\",\"fmt\":\"\",\"alias\":\"avatar\",\"unit\":\"\",\"rate\":null,\"tname\":\"sc_menu\",\"calc\":0},null,null],\"cubeId\":\"4\",\"dsetId\":\"aa06f7563b908e3abd163aa8f8eb8b66\",\"dsid\":\"6418ee1e14b9a09107603904ffc7d858\"}]}],\"tr2\":[{\"colspan\":1,\"rowspan\":1,\"width\":50,\"height\":50,\"id\":2,\"children\":[{\"id\":\"9cd26e8e34d9ac2ea0624a834d0e08bf\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"gauge\",\"maparea\":\"china\",\"typeIndex\":\"1\",\"xcol\":{\"id\":448,\"dimdesc\":\"MENU_ID\",\"xdispName\":\"MENU_ID\",\"type\":\"frd\",\"colname\":\"MENU_ID\",\"iscas\":\"\",\"tableName\":\"\",\"tableColKey\":\"\",\"tableColName\":\"\",\"dimord\":\"\",\"grouptype\":null,\"valType\":\"Int\",\"ordcol\":\"\",\"alias\":\"MENU_ID\",\"tname\":\"sc_menu\",\"calc\":0},\"ycol\":{\"type\":\"kpi\"},\"scol\":{},\"params\":[],\"height\":\"250\",\"width\":\"360\"},\"kpiJson\":[{\"kpi_id\":239,\"kpi_name\":\"avatar\",\"ydispName\":\"avatar\",\"col_name\":\"sum(avatar)\",\"aggre\":\"sum\",\"fmt\":\"\",\"alias\":\"avatar\",\"unit\":\"\",\"rate\":null,\"tname\":\"sc_menu\",\"calc\":0},null,null],\"cubeId\":\"4\",\"dsetId\":\"aa06f7563b908e3abd163aa8f8eb8b66\",\"dsid\":\"6418ee1e14b9a09107603904ffc7d858\"}]},{\"colspan\":1,\"rowspan\":1,\"width\":50,\"height\":50,\"id\":3,\"children\":[]}]},\"selectDs\":\"4\",\"id\":\"bdcd5ce391944d1f9021665aa7c70cc3\",\"table\":{\"dsetId\":\"72c36a714645f1dca89953fee01b9461\",\"dsid\":\"06b7c1cfc4d819f7c179a419112cf398\",\"dsetName\":\"3G分析\",\"priTable\":\"d3_dm_kpi_w_card_pandect_m2\"},\"params\":[]}', null, '2017-07-20 16:44:39', '2017-09-03 16:30:05', '1', null);
INSERT INTO `visual_view` VALUES ('3', '旅游页', '{\"layout\":4,\"body\":{\"tr1\":[{\"colspan\":2,\"rowspan\":1,\"width\":100,\"height\":33,\"id\":1,\"children\":[{\"id\":\"bdd50d088cd952ec110dab74e36679d3\",\"type\":\"text\",\"name\":\"文本\",\"desc\":\"北京欢迎你!\"}]}],\"tr2\":[{\"colspan\":1,\"rowspan\":1,\"width\":50,\"height\":33,\"id\":2,\"children\":[{\"id\":\"db5c7c02c800024833417066c048b237\",\"name\":\"图表\",\"type\":\"chart\",\"chartJson\":{\"type\":\"radar\",\"maparea\":\"china\",\"typeIndex\":\"1\",\"xcol\":{\"id\":448,\"dimdesc\":\"MENU_ID\",\"xdispName\":\"MENU_ID\",\"type\":\"frd\",\"colname\":\"MENU_ID\",\"iscas\":\"\",\"tableName\":\"\",\"tableColKey\":\"\",\"tableColName\":\"\",\"dimord\":\"\",\"grouptype\":null,\"valType\":\"Int\",\"ordcol\":\"\",\"alias\":\"MENU_ID\",\"tname\":\"sc_menu\",\"calc\":0},\"ycol\":{\"type\":\"kpi\"},\"scol\":{},\"params\":[],\"height\":\"250\",\"width\":\"600\"},\"kpiJson\":[{\"kpi_id\":239,\"kpi_name\":\"avatar\",\"ydispName\":\"avatar\",\"col_name\":\"sum(avatar)\",\"aggre\":\"sum\",\"fmt\":\"\",\"alias\":\"avatar\",\"unit\":\"\",\"rate\":null,\"tname\":\"sc_menu\",\"calc\":0},null,null],\"cubeId\":\"4\",\"dsetId\":\"aa06f7563b908e3abd163aa8f8eb8b66\",\"dsid\":\"6418ee1e14b9a09107603904ffc7d858\"}]},{\"colspan\":1,\"rowspan\":1,\"width\":50,\"height\":33,\"id\":3,\"children\":[{\"id\":\"595dc9e1983ae7a994629f1ed5336684\",\"name\":\"avatar\",\"type\":\"box\",\"dsetId\":\"aa06f7563b908e3abd163aa8f8eb8b66\",\"dsid\":\"6418ee1e14b9a09107603904ffc7d858\",\"kpiJson\":{\"kpi_id\":239,\"kpi_name\":\"avatar\",\"col_name\":\"sum(avatar)\",\"aggre\":\"sum\",\"fmt\":\"\",\"alias\":\"avatar\",\"tname\":\"sc_menu\",\"unit\":\"\",\"rate\":null}}]}],\"tr3\":[{\"colspan\":2,\"rowspan\":1,\"width\":100,\"height\":33,\"id\":4,\"children\":[]}]},\"id\":\"f0044401a72d43a19082ac317daf4e0b\",\"selectDs\":\"4\"}', null, '2017-08-30 22:30:22', '2017-09-05 16:15:48', '1', null);
'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  mysqlConfig = require(path.resolve('./config/config.js')),
  mysql = require('mysql'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config'));

exports.findActivity = function (req, res) {
  var sql = 'select DISTINCT base.HDXXID as id,base.HDMC as title,base.HDSM as intro,sp.ZKL as discount,aImg.imgUrl as imgUrl ' +
    'from sp_cxhdxx base ' +
    'left join web_activity_img aImg on aImg.activityId=base.hdxxid ' +
    'left join sp_cxhdspxx sp on sp.HDXXID=base.HDXXID and sp.ZKL=(select min(sp2.ZKL) from sp_cxhdspxx sp2 where sp2.HDXXID=base.HDXXID) ' +
    'order by base.cjsj desc';
  console.log('[SQL]', sql);

  var connection = mysql.createConnection(mysqlConfig.mysql);
  connection.connect();
  connection.query({
    sql: sql
  }, function (err, data) {
    if (err) {
      console.error(err);
      res.json([]);
    } else {
      res.json(data);
    }
  });
  connection.end();
};

exports.createActivity = function (req, res) {

};

exports.deleteActivity = function (req, res) {

};

exports.updateActivity = function (req, res) {

};

'use strict';

var path = require('path');
var mysqlConfig = require(path.resolve('./config/config.js'));
var mysql = require('mysql');


exports.queryProduct = function (req, res) {

  var startFrom = req.query.startFrom || 0;
  var limitTo = req.query.limitTo || 100;
  var type = req.query.type;

  if (type) {
    var sql = 'select tjspxx.*,spjbxx.*,spct.* from sp_tjspxx tjspxx,sp_spjbxx spjbxx, sp_spct spct where tjspxx.TCLB=? and tjspxx.SPID=spjbxx.SPID and tjspxx.SPID=spct.SPID';
    sql += ' limit ' + startFrom + ',' + limitTo;
    var inserts = [type];
    sql = mysql.format(sql, inserts);

    console.log('[SQL]', sql);

    var connection = mysql.createConnection(mysqlConfig.mysql);
    connection.connect();
    connection.query({
      sql: sql,
      nestTables: true
    }, function (err, data) {
      if (err) {
        console.error(err);
        res.json([]);
      } else {
        res.json(data);
      }
    });
    connection.end();
  } else {
    res.sendStatus(400);
  }
};


exports.queryActivity = function (req, res) {
  var startFrom = req.query.startFrom || 0;
  var limitTo = req.query.limitTo || 100;
  var sql = 'select cxhdxx.*,cxhdspxx.*,cxhdgzxx.*,cxhdfxfw.* from sp_cxhdxx cxhdxx,sp_cxhdspxx cxhdspxx,sp_cxhdgzxx cxhdgzxx,sp_cxhdfxfw cxhdfxfw where cxhdxx.HDXXID=cxhdspxx.HDXXID and cxhdxx.HDXXID=cxhdgzxx.HDXXID and cxhdgzxx.HDGZID=cxhdfxfw.HDGZID';
  sql += ' limit ' + startFrom + ',' + limitTo;
  console.log('[SQL]', sql);

  var connection = mysql.createConnection(mysqlConfig.mysql);
  connection.connect();
  connection.query({
    sql: sql,
    nestTables: true
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

exports.userRegister = function (req, res) {
  var sql = 'insert into hy_hydaxx set ?';

  var connection = mysql.createConnection(mysqlConfig.mysql);
  connection.connect();
  connection.query(sql, req.body, function (err, data) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
  connection.end();
};


exports.userLogin = function (req, res) {
  var username = req.query.username;
  var password = req.query.password;

  var sql = 'select * from hy_hydaxx where DLZH=? and DLMM=?';
  var inserts = [username, password];
  sql = mysql.format(sql, inserts);
  console.log('[SQL]', sql);

  var connection = mysql.createConnection(mysqlConfig.mysql);
  connection.connect();
  connection.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      res.json({});
    } else {
      if (data.length) {
        req.session.user = data[0];
        res.json(data[0]);
      } else {
        res.json({});
      }
    }
  });
  connection.end();
};

exports.userLogout = function (req, res) {
  req.session.user = undefined;
  res.sendStatus(200);
};

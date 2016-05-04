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
    res.sendStatus(500);
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

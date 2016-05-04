'use strict';

var path = require('path');
var mysqlConfig = require(path.resolve('./config/config.js'));
var mysql = require('mysql');


exports.queryProduct = function (req, res) {

  var type = req.query.type;

  var sql = 'select tjspxx.*,spjbxx.*,spct.* from sp_tjspxx tjspxx,sp_spjbxx spjbxx, sp_spct spct where tjspxx.TCLB=? and tjspxx.SPID=spjbxx.SPID and tjspxx.SPID=spct.SPID';
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
};

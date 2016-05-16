'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  mysqlConfig = require(path.resolve('./config/config.js')),
  mysql = require('mysql'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config'));

exports.findProduct = function (req, res) {
  var sql = 'select spec.spid as id,base.SPMC as title,base.SPGX as intro,pic.imgUrl as imgUrl,count(pLike.userId) as likeNum ';
  sql += 'from sp_tjspxx spec ';
  sql += 'LEFT JOIN sp_spjbxx base on base.SPID=spec.SPID ';
  sql += 'left join web_product_img pic on pic.productId=spec.SPID ';
  sql += 'LEFT JOIN web_product_like pLike on pLike.productId=spec.SPID ';
  sql += 'where spec.TCLB=1 ';
  sql += 'GROUP BY spec.SPID order by spec.cjsj desc';
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

exports.createProduct = function (req, res) {

};

exports.deleteProduct = function (req, res) {

};

exports.updateProduct = function (req, res) {

};

'use strict';

var path = require('path'),
  mysqlConfig = require(path.resolve('./config/config.js')),
  mysql = require('mysql'),
  mongoose = require('mongoose'),
  qrcode = require('qrcode-js'),
  Banner = mongoose.model('Banner'),
  Other = mongoose.model('Other');

exports.queryHotProduct = function (req, res) {
  var startFrom = req.query.startFrom || 0;
  var limitTo = req.query.limitTo || 10;

  var sql = 'select spec.spid as id,base.SPMC as title,base.SPGX as intro,pic.imgUrl as imgUrl,count(pLike.userId) as likeNum ';
  sql += 'from sp_tjspxx spec ';
  sql += 'LEFT JOIN sp_spjbxx base on base.SPID=spec.SPID ';
  sql += 'left join web_product_img pic on pic.productId=spec.SPID ';
  sql += 'LEFT JOIN web_product_like pLike on pLike.productId=spec.SPID ';
  sql += 'where spec.TCLB=3 ';
  sql += 'GROUP BY spec.SPID order by spec.cjsj desc ';
  sql += 'limit ' + startFrom + ',' + limitTo;
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

exports.queryNewProduct = function (req, res) {
  var startFrom = req.query.startFrom || 0;
  var limitTo = req.query.limitTo || 10;

  var sql = 'select spec.spid as id,base.SPMC as title,base.SPGX as intro,pic.imgUrl as imgUrl,count(pLike.userId) as likeNum ';
  sql += 'from sp_tjspxx spec ';
  sql += 'LEFT JOIN sp_spjbxx base on base.SPID=spec.SPID ';
  sql += 'left join web_product_img pic on pic.productId=spec.SPID ';
  sql += 'LEFT JOIN web_product_like pLike on pLike.productId=spec.SPID ';
  sql += 'where spec.TCLB=1 ';
  sql += 'GROUP BY spec.SPID order by spec.cjsj desc ';
  sql += 'limit ' + startFrom + ',' + limitTo;
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

exports.likeProduct = function (req, res) {
  if (req.session.mfh_user) {
    console.log(req.session.mfh_user);
    var insert = {
      productId: req.body.pid,
      userId: req.session.mfh_user.id
    };
    var sql = 'insert into web_product_like set ?';
    sql = mysql.format(sql, [insert]);
    console.log('[SQL]', sql);

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
  } else {
    res.sendStatus(401);
  }
};

exports.queryActivity = function (req, res) {
  var startFrom = req.query.startFrom || 0;
  var limitTo = req.query.limitTo || 10;
  var sql = 'select DISTINCT base.HDXXID as id,base.HDMC as title,base.HDSM as intro,sp.ZKL as discount,aImg.imgUrl as imgUrl ' +
    'from sp_cxhdxx base ' +
    'left join web_activity_img aImg on aImg.activityId=base.hdxxid ' +
    'left join sp_cxhdspxx sp on sp.HDXXID=base.HDXXID and sp.ZKL=(select min(sp2.ZKL) from sp_cxhdspxx sp2 where sp2.HDXXID=base.HDXXID) ' +
    'order by base.cjsj desc';
  sql += ' limit ' + startFrom + ',' + limitTo;
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

exports.queryBrand = function (req, res) {
  var sql = 'select DISTINCT ppsxx.PPSID as id,ppsxx.PPSMC as name,ppsct.FJDZ as imgUrl from sp_ppsxx ppsxx left join sp_ppsct ppsct on ppsxx.PPSID=ppsct.PPSID and ppsct.SFZT=1 order by ppsxx.SXH';
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

exports.userRegister = function (req, res) {
  var smsCode = req.body.smsCode;
  var insert = {
    DLZH: req.body.username,
    DLMM: req.body.password,
    HYID: new Date().getTime()
  };
  var sql = 'insert into hy_hydaxx set ?';
  sql = mysql.format(sql, [insert]);
  console.log('[SQL]', sql);

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
  var username = req.body.username;
  var password = req.body.password;

  var sql = 'select user.hyid as id, user.NC as nickname,user.DLZH as username,account.ZHYE as coin from hy_hydaxx user left join zwgl_zhxx account on user.HYID=account.ZHLYID where user.DLZH=? and user.DLMM=?';
  var inserts = [username, password];
  sql = mysql.format(sql, inserts);
  console.log('[SQL]', sql);

  var connection = mysql.createConnection(mysqlConfig.mysql);
  connection.connect();
  connection.query(sql, function (err, data) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      if (data.length) {
        req.session.mfh_user = data[0];
        res.json(data[0]);
      } else {
        res.sendStatus(401);
      }
    }
  });
  connection.end();
};

exports.userLogout = function (req, res) {
  req.session.mfh_user = undefined;
  res.sendStatus(200);
};

exports.queryBanner = function (req, res) {
  Banner.find().exec(function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var result = {};
      for (var i = 0; i < docs.length; i++) {
        if (!result[docs[i].scope]) {
          result[docs[i].scope] = [];
        }
        result[docs[i].scope].push({
          imgUrl: docs[i].imgUrl,
          link: docs[i].link
        });
      }
      res.json(result);
    }
  });
};

exports.queryAppDownloadUrl = function (req, res) {
  Other.findOne({}, function (err, doc) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json({
        ios: doc.appDownloadIos,
        android: doc.appDownloadAndroid
      });
    }
  });
};

exports.queryAppQrCode = function (req, res) {
  Other.findOne({}, function (err, doc) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json({
        imgUrl: doc.footerQrCodeImgUrl
      });
    }
  });
};

exports.queryShareLink = function (req, res) {
  Other.findOne({}, function (err, doc) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json({
        wechat: doc.shareLinkWechat,
        weibo: doc.shareLinkWeibo
      });
    }
  });
};

exports.queryAppDownloadQrCode = function (req, res) {
  var url = req.protocol + '://' + req.get('host') + '/api/app-download/qrcode/scan';
  var base64 = qrcode.toBase64(url, 4);
  res.json({
    imgUrl: 'data:image/jpeg;base64,' + base64
  });
};

exports.queryAppDownloadQrCodeScan = function (req, res) {
  var ua = req.headers['user-agent'];
  Other.findOne({}, function (err, doc) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      if (/like Mac OS X/.test(ua)) {
        res.redirect(doc.appDownloadIos);
      } else {
        res.redirect(doc.appDownloadAndroid);
      }
    }
  });

};

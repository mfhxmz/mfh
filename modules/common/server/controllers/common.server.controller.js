'use strict';

var path = require('path'),
  mysqlConfig = require(path.resolve('./config/config.js')),
  mysql = require('mysql'),
  mongoose = require('mongoose'),
  qrcode = require('qrcode-js'),
  Banner = mongoose.model('Banner'),
  Brand = mongoose.model('Brand'),
  Product = mongoose.model('Product'),
  Activity = mongoose.model('Activity'),
  Aim = mongoose.model('Aim'),
  Other = mongoose.model('Other'),
  ref = require('ref'),
  ffi = require('ffi');

exports.queryHotProduct = function (req, res) {
  Product.find({ type: 1 }, function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var result = [];
      for (var i = 0; i < docs.length; i++) {
        result.push({
          id: docs[i]._id,
          imgUrl: docs[i].imgUrl,
          title: docs[i].title,
          intro: docs[i].intro,
          likeNum: docs[i].like && docs[i].like.length ? docs[i].like.length : 0
        });

      }
      res.json(result);
    }
  });
};

exports.queryNewProduct = function (req, res) {
  Product.find({ type: 2 }, function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var result = [];
      for (var i = 0; i < docs.length; i++) {
        result.push({
          id: docs[i]._id,
          imgUrl: docs[i].imgUrl,
          title: docs[i].title,
          intro: docs[i].intro,
          likeNum: docs[i].like && docs[i].like.length ? docs[i].like.length : 0
        });

      }
      res.json(result);
    }
  });
};

exports.likeProduct = function (req, res) {
  if (req.session.mfh_user) {
    Product.update({ _id: req.body.pid }, { $push: { like: req.session.mfh_user.id } }, function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

exports.queryActivity = function (req, res) {
  Activity.aggregate([{
    $project: {
      id: '$_id',
      imgUrl: '$imgUrl',
      title: '$title',
      intro: '$intro',
      discount: '$discount'
    }
  }], function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(docs);
    }
  });
};

exports.queryBrand = function (req, res) {
  Brand.find({}, function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(docs);
    }
  });
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
      if (data && data.length) {
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
  var ua = req.header('user-agent');
  var display = /mobile/i.test(ua) ? 'mobile' : 'desktop';
  Banner.find({
    display: display
  }).exec(function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (docs && docs.length) {
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
    } else {
      res.json([]);
    }
  });
};

exports.queryAim = function (req, res) {
  Aim.find({}, function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(docs);
    }
  });
};

exports.queryAppDownloadUrl = function (req, res) {
  Other.findOne({}, function (err, doc) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (doc) {
      res.json({
        ios: doc.appDownloadIos,
        android: doc.appDownloadAndroid
      });
    } else {
      res.json({});
    }
  });
};

exports.queryAppQrCode = function (req, res) {
  Other.findOne({}, function (err, doc) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (doc) {
      res.json({
        imgUrl: doc.footerQrCodeImgUrl
      });
    } else {
      res.json({});
    }
  });
};

exports.queryShareLink = function (req, res) {
  Other.findOne({}, function (err, doc) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (doc) {
      res.json({
        wechat: doc.shareLinkWechat,
        weibo: doc.shareLinkWeibo
      });
    } else {
      res.json({});
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
    } else if (doc) {
      if (/like Mac OS X/.test(ua)) {
        res.redirect(doc.appDownloadIos);
      } else {
        res.redirect(doc.appDownloadAndroid);
      }
    } else {
      res.redirect('/');
    }
  });

};

exports.sendSms = function (req, res) {
  try {
    /*var EUCPComm = new ffi.Library(__dirname + '\\EUCPComm.dll', {
     SendSMS: [ref.types.int32, [
     ref.types.CString,
     ref.types.CString,
     ref.types.CString,
     ref.types.CString
     ]]
     });

     result = EUCPComm.SendSMS('3SDK-EMY-0130-RFWUR', '13360231633', '123456', '5');*/

    var user32 = new ffi.Library('user32', {
      'MessageBoxW': [
        'int32', ['int32', 'string', 'string', 'int32']
      ]
    });

    user32.MessageBoxW(
      0, cString('【恭喜发财】 888 abcxyz!'), cString('Hello, World!'), 1
    );
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(200);
  }

};

function cString(str) {
  return str;
}

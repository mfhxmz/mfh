"use strict";

var path = require('path');
var multer = require('multer');
var crypto = require('crypto');


exports.buildMulterStorageByUploadPath = function (uploadPath) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) {
          return cb(err);
        } else {
          cb(null, raw.toString('hex') + path.extname(file.originalname));
        }
      });
    }
  });
};

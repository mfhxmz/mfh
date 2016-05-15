'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Other = mongoose.model('Other');

exports.findOther = function (req, res) {
  Other.findOne().exec(function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(docs);
    }
  });
};

exports.updateOther = function (req, res) {
  if (req.body && req.body._id) {
    Other.findOneAndUpdate({}, req.body, { upsert: true }, function (err) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    var upload = multer(config.uploads.otherUpload).single('file');
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        req.body.footerQrCodeImgUrl = req.file.destination + req.file.filename;
        return Other.findOneAndUpdate({}, req.body, { upsert: true }, function (err) {
          if (err) {
            console.error(err);
            return res.sendStatus(500);
          } else {
            return res.sendStatus(200);
          }
        });
      }
    });
  }
};

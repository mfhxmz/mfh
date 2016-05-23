'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  UploadUtil = require(path.resolve('./modules/common/server/util/upload.common.server.util.js')),
  Aim = mongoose.model('Aim');

exports.findAim = function (req, res) {
  Aim.find({}, function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(docs);
    }
  });
};

exports.createAim = function (req, res) {
  var upload = multer({
    storage: UploadUtil.buildMulterStorageByUploadPath(config.uploads.aimUpload.dest)
  }).single('file');
  upload(req, res, function (uploadError) {
    if (uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {
      req.body.imgUrl = req.file.destination + req.file.filename;
      var aim = new Aim(req.body);
      return aim.save(function (err) {
        if (err) {
          console.error(err);
          return res.sendStatus(500);
        } else {
          return res.sendStatus(200);
        }
      });
    }
  });
};

exports.deleteAim = function (req, res) {
  Aim.remove({
    _id: req.params.id
  }).exec(function (err) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

exports.updateAim = function (req, res) {
  if (req.body && req.body._id) {
    Aim.findOneAndUpdate({
      '_id': req.body._id
    }, req.body, function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    var upload = multer({
      storage: UploadUtil.buildMulterStorageByUploadPath(config.uploads.aimUpload.dest)
    }).single('file');
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        req.body.imgUrl = req.file.destination + req.file.filename;
        return Aim.findOneAndUpdate({
          '_id': req.body._id
        }, req.body, function (err) {
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

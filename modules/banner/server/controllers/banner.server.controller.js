'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Banner = mongoose.model('Banner');

exports.findBannerByScope = function (req, res) {
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
        result[docs[i].scope].push(docs[i]);
      }
      res.json(result);
    }
  });
};

exports.createBanner = function (req, res) {
  var upload = multer(config.uploads.bannerUpload).single('file');
  upload(req, res, function (uploadError) {
    if (uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {
      return Banner.create({
        scope: req.body.scope,
        imgUrl: req.file.filename,
        link: req.body.link
      }, function (err) {
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

exports.deleteBanner = function (req, res) {
  Banner.remove({
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

exports.updateBanner = function (req, res) {
  if (req.body && req.body._id) {
    Banner.findOneAndUpdate({
      '_id': req.body._id
    }, {
      link: req.body.link
    }, function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    var upload = multer(config.uploads.bannerUpload).single('file');
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        return Banner.findOneAndUpdate({
          '_id': req.body._id
        }, {
          imgUrl: req.file.filename,
          link: req.body.link
        }, function (err) {
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

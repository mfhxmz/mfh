'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Activity = mongoose.model('Activity');

exports.findActivity = function (req, res) {
  Activity.find({}, function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(docs);
    }
  });
};

exports.createActivity = function (req, res) {
  var upload = multer(config.uploads.activityUpload).single('file');
  upload(req, res, function (uploadError) {
    if (uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {
      req.body.imgUrl = req.file.destination + req.file.filename;
      var activity = new Activity(req.body);
      return activity.save(function (err) {
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

exports.deleteActivity = function (req, res) {
  Activity.remove({
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

exports.updateActivity = function (req, res) {
  if (req.body && req.body._id) {
    Activity.findOneAndUpdate({
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
    var upload = multer(config.uploads.activityUpload).single('file');
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        req.body.imgUrl = req.file.destination + req.file.filename;
        return Activity.findOneAndUpdate({
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

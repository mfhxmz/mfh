'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Product = mongoose.model('Product');

exports.findProduct = function (req, res) {
  Product.find({}, function (err, docs) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(docs);
    }
  });
};

exports.createProduct = function (req, res) {
  var upload = multer(config.uploads.productUpload).single('file');
  upload(req, res, function (uploadError) {
    if (uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {
      req.body.imgUrl = req.file.destination + req.file.filename;
      var product = new Product(req.body);
      return product.save(function (err) {
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

exports.deleteProduct = function (req, res) {
  Product.remove({
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

exports.updateProduct = function (req, res) {
  if (req.body && req.body._id) {
    Product.findOneAndUpdate({
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
    var upload = multer(config.uploads.productUpload).single('file');
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        req.body.imgUrl = req.file.destination + req.file.filename;
        return Product.findOneAndUpdate({
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

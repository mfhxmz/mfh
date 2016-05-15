'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BannerSchema = new Schema({
  imgUrl: String,
  link: String,
  scope: String
});

mongoose.model('Banner', BannerSchema);

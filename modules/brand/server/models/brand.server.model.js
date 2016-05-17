'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BrandSchema = new Schema({
  imgUrl: String,
  title: String,
  link: String
});

mongoose.model('Brand', BrandSchema);

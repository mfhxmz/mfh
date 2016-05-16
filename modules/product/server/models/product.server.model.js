'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProductSchema = new Schema({
  type: Number, // 1-hot 2-new
  imgUrl: String,
  title: String,
  intro: String,
  like: [] // userId
});

mongoose.model('Product', ProductSchema);

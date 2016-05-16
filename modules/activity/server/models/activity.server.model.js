'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  imgUrl: String,
  title: String,
  intro: String,
  discount: Number
});

mongoose.model('Activity', ActivitySchema);

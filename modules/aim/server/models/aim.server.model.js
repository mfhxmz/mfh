'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AimSchema = new Schema({
  imgUrl: String,
  title: String,
  intro: String
});

mongoose.model('Aim', AimSchema);

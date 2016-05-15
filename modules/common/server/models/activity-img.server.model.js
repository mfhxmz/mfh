'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ActivityImageSchema = new Schema({
  activityId: {
    type: Number
  },
  imageUrl: {
    type: String
  }
});

mongoose.model('ActivityImage', ActivityImageSchema);

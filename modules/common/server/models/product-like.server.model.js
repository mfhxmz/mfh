'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProductLikeSchema = new Schema({
  productId: {
    type: Number
  },
  userId: {
    type: Number
  }
});

mongoose.model('ProductLike', ProductLikeSchema);

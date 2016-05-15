'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OtherSchema = new Schema({
  appDownloadIos: String,
  appDownloadAndroid: String,

  shareLinkWechat: String,
  shareLinkWeibo: String,

  footerQrCodeImgUrl: String
});

mongoose.model('Other', OtherSchema);

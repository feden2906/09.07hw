const { Schema, model } = require('mongoose');

const { databaseEnum } = require('../constants');

const OAuthShema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: databaseEnum.USER
  }
}, {
  timestamps: true,
  toObject: { virtual: true },
  toJson: { virtual: true }
});

OAuthShema.pre('findOne', function() {
  this.populate('user');
});

module.exports = model(databaseEnum.O_AUTH, OAuthShema);

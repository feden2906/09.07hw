const { Schema, model } = require('mongoose');

const { databaseEnum } = require('../constants');

const oAuthShema = new Schema({
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
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

oAuthShema.pre('findOne', function() {
  this.populate('user');
});

module.exports = model(databaseEnum.O_AUTH, oAuthShema);

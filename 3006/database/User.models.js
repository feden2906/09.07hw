const { Schema, model } = require('mongoose');

const { databaseEnum } = require('../constants');

const userShema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    select: false,
    required: true
  }
});

module.exports = model(databaseEnum.USER, userShema);

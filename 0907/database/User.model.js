const { Schema, model } = require('mongoose');

const { databaseEnum } = require('../constants');

const userShema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  age: {
    type: Number,
    default: 18
  }
});

module.exports = model(databaseEnum.USER, userShema);

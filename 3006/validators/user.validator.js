const Joi = require('joi');

const { regexp } = require('../constants');

module.exports = {
  createUser: Joi.object().keys({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().regex(regexp.EMAIL_REGEXP).required(),
    password: Joi.string().min(6).max(50).required(),
    age: Joi.number().max(99).required()
  })
};

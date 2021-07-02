const Joi = require('joi');

module.exports = {
  loginUser: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

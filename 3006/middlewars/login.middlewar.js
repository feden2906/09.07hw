const { responseCodesEnum } = require('../constants');
const { ErrorHandler, errorMessages } = require('../errors');
const { loginValidator } = require('../validators');

const { UserModel } = require('../database');
const { passwordHasher } = require('../helpers');

module.exports = {
  checkIsLoginValidity: (req, res, next) => {
    try {
      const { error } = loginValidator.loginUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(responseCodesEnum.AUTHENTICATION_ERROR,
          errorMessages.FIELD_NOT_FILLED.message(error.details[0].message),
          errorMessages.FIELD_NOT_FILLED.code);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsUserPresent: async (req, res, next) => {
    try {
      const { password, email } = req.body;

      const userByEmail = await UserModel.findOne({ email }).select('+password');

      if (!userByEmail) {
        throw new ErrorHandler(responseCodesEnum.AUTHENTICATION_ERROR,
          errorMessages.WRONG_EMAIL_OR_PASS.message,
          errorMessages.WRONG_EMAIL_OR_PASS.code);
      }

      await passwordHasher.compare(userByEmail.password, password);

      req.user = userByEmail;

      next();
    } catch (e) {
      next(e);
    }
  }
};

const { ErrorHandler, errorMessages } = require('../errors');
const { responseCodesEnum } = require('../constants');
const { UserModel } = require('../database');
const { userValidator } = require('../validators');

module.exports = {
  checkEmailBusy: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userByEmail = await UserModel.findOne({ email });

      if (userByEmail) {
        throw new ErrorHandler(responseCodesEnum.AUTHENTICATION_ERROR, errorMessages.EMAIL_BUSY);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserValidity: (req, res, next) => {
    try {
      const { error } = userValidator.createUser.validate(req.body);

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
      const { userId } = req.params;

      const userById = await UserModel.findOne({ _id: userId });

      if (!userById) {
        throw new ErrorHandler(responseCodesEnum.NOT_FOUND,
          errorMessages.RECORD_NOT_FOUND.message,
          errorMessages.RECORD_NOT_FOUND.code);
      }

      req.user = userById;

      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParam: (paramName, serchIn = 'body', dbKey = paramName) => async (req, res, next) => {
    try {
      const valueOfParam = req[serchIn][paramName];

      const user = await UserModel.findOne({ [dbKey]: valueOfParam }).select('+password');

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
};

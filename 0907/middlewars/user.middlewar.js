const { ErrorHandler, errorMessages } = require('../errors');
const { responseCodesEnum } = require('../constants');
const { UserModel } = require('../database');
const { userHelper } = require('../helpers');
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

  checkDataValidity: (validator) => (req, res, next) => {
    try {
      const { error } = userValidator[validator].validate(req.body);

      if (error) {
        throw new ErrorHandler(
          responseCodesEnum.AUTHENTICATION_ERROR,
          errorMessages.FIELD_NOT_FILLED.message(error.details[0].message),
          errorMessages.FIELD_NOT_FILLED.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParamWithoutPassword: (paramName, serchIn = 'body', dbKey = paramName) => async (req, res, next) => {
    try {
      const valueOfParam = req[serchIn][paramName];

      const user = await UserModel.findOne({ [dbKey]: valueOfParam }).select('+password').lean();

      const userNormalized = await userHelper.userNormalizator(user);

      req.user = userNormalized;

      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParamWithPassword: (paramName, serchIn = 'body', dbKey = paramName) => async (req, res, next) => {
    try {
      const valueOfParam = req[serchIn][paramName];

      const user = await UserModel.findOne({ [dbKey]: valueOfParam }).select('+password').lean();

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  },
};

const { ErrorHandler, errorMessages } = require('../errors');
const { responseCodesEnum } = require('../constants');
const { UserModel } = require('../database');

module.exports = {
  checkEmailBusy: async (req, res, next) => {
    try {
      const userEmail = await UserModel.findOne(req.body);

      if (userEmail) {
        throw new Error(errorMessages.EMAIL_BUSY);
      }
    } catch (e) {
      next(e);
    }
  },
  checkIsUserPresent: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const userById = await UserModel.findById(userId);

      if (!userById) {
        throw new ErrorHandler(responseCodesEnum.NOT_FOUND,
          errorMessages.RECORD_NOT_FOUND.message,
          errorMessages.RECORD_NOT_FOUND.code);
      }
    } catch (e) {
      next(e);
    }
  }
};

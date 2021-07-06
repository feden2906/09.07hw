const { nameConstants, responseCodesEnum } = require('../constants');
const { OAuthModel } = require('../database');
const { ErrorHandler, errorMessages } = require('../errors');
const { authService, passwordHasher } = require('../services');

module.exports = {
  login: async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ErrorHandler(responseCodesEnum.AUTHENTICATION_ERROR,
          errorMessages.WRONG_EMAIL_OR_PASS.message,
          errorMessages.WRONG_EMAIL_OR_PASS.code);
      }

      const { password: hashPassword, _id } = req.user;
      const { password } = req.body;

      await passwordHasher.compare(hashPassword, password);

      const tokenPair = authService.generateTokenPair();

      await OAuthModel.create({
        ...tokenPair,
        user: _id
      });

      res.json({
        ...tokenPair,
        user: req.user
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(nameConstants.AUTHORIZATION);

      await OAuthModel.remove({ accessToken: token });

      res.status(responseCodesEnum.NO_CONTENT).json('logout success');
    } catch (e) {
      next(e);
    }
  },

  refresh: (req, res, next) => {
    try {
      res.json('refresh');
    } catch (e) {
      next(e);
    }
  }
};

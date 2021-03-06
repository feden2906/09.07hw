const { nameConstants: { AUTHORIZATION }, responseCodesEnum } = require('../constants');
const { OAuthModel } = require('../database');
const { ErrorHandler, errorMessages } = require('../errors');
const { userHelper } = require('../helpers');
const { authService, passwordHasher } = require('../services');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user } = req;

      if (!user) {
        throw new ErrorHandler(
          responseCodesEnum.AUTHENTICATION_ERROR,
          errorMessages.WRONG_EMAIL_OR_PASS.message,
          errorMessages.WRONG_EMAIL_OR_PASS.code
        );
      }

      const { password: hashedPassword, _id } = req.user;
      const { password } = req.body;

      await passwordHasher.compare(hashedPassword, password);

      const tokenPair = authService.generateTokenPair();

      await OAuthModel.create({
        ...tokenPair,
        user: _id
      });

      const userNormalized = await userHelper.userNormalizator(user);

      res.status(responseCodesEnum.CREATED).json({
        ...tokenPair,
        user: userNormalized
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);
      await OAuthModel.remove({ accessTokne: token });

      res.status(responseCodesEnum.NO_CONTENT).json('Logout success');
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { refreshToken, _id } = req.user;

      await OAuthModel.remove({ refreshToken });

      const tokenPair = authService.generateTokenPair();

      await OAuthModel.create({
        ...tokenPair,
        user: _id
      });

      res.status(responseCodesEnum.CREATED).json({
        ...tokenPair,
        user: req.user
      });
    } catch (e) {
      next(e);
    }
  }
};

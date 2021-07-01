const { responseCodesEnum } = require('../constants');
const { UserModel } = require('../database');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { user } = req;

      await UserModel.create(user);

      res.status(responseCodesEnum.CREATED).json(user);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserModel.find({});

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const { user } = req;

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const user = req.body;
      await UserModel.updateOne(user);

      res.status(responseCodesEnum.CREATED).json(user);
    } catch (e) {
      next(e);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await UserModel.deleteOne({ userId });

      res.status(responseCodesEnum.NO_CONTENT).json(userId);
    } catch (e) {
      next(e);
    }
  }
};

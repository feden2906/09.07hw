const { responseCodesEnum } = require('../constants');
const { UserModel } = require('../database');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const createdUser = await UserModel.create(req.body);

      res.status(responseCodesEnum.CREATED).json(createdUser);
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
  getUserById: async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.params);

      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  updateUserById: async (req, res, next) => {
    try {
      await UserModel.updateOne(req.body);

      res.json(req.body);
    } catch (e) {
      next(e);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      await UserModel.deleteOne(req.params);

      res.status(responseCodesEnum.NO_CONTENT).json(req.params);
    } catch (e) {
      next(e);
    }
  }
};

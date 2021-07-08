const { passwordHasher } = require('../services');
const { responseCodesEnum } = require('../constants');
const { UserModel } = require('../database');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await UserModel.create({ ...req.body, password: hashedPassword });

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
      const { _id } = req.user;

      await UserModel.deleteOne({ _id });

      res.status(responseCodesEnum.NO_CONTENT).json('Success');
    } catch (e) {
      next(e);
    }
  }
};

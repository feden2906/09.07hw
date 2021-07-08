const { passwordHasher } = require('../services');
const {
  mailActionsEnum: { REGISTER, UPDATE, DELETE },
  responseCodesEnum
} = require('../constants');
const { UserModel } = require('../database');
const { mailService: { sendMail } } = require('../services');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const { email, name, password } = req.body;

      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await UserModel.create({ ...req.body, password: hashedPassword });

      await sendMail(email, REGISTER, { name });

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
      const updateData = req.body;
      const { user } = req;

      await UserModel.updateOne(updateData);
      await sendMail(user.email, UPDATE, {
        name: user.name,
        param: {
          name: updateData.name || user.name,
          email: updateData.email || user.email,
          age: updateData.age || user.age,
        }
      });

      res.status(responseCodesEnum.CREATED).json(updateData);
    } catch (e) {
      next(e);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { _id, email, name } = req.user;

      await UserModel.deleteOne({ _id });
      await sendMail(email, DELETE, { name });

      res.status(responseCodesEnum.NO_CONTENT).json('Success');
    } catch (e) {
      next(e);
    }
  }
};

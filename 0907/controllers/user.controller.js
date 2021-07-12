const { passwordHasher } = require('../services');
const {
  mailActionsEnum: { REGISTER, UPDATE, DELETE },
  responseCodesEnum
} = require('../constants');
const { UserModel } = require('../database');
const { fileHelper, userHelper } = require('../helpers');
const { mailService: { sendMail } } = require('../services');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const {
        body: { email, name, password },
        documents,
        images
      } = req;

      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await UserModel.create({ ...req.body, password: hashedPassword });

      const { _id } = createdUser;

      if (documents.length) {
        await documents.forEach((document) => {
          const { finalFilePath, filePath } = fileHelper.fileDirBuilder('users', _id, document.name, 'documents');
          document.mv(finalFilePath);
          UserModel.updateOne({ _id }, {
            documents: [
              ...documents,
              filePath
            ]
          });
        });
      }

      if (images.length) {
        await images.forEach((image) => {
          const { finalFilePath, filePath } = fileHelper.fileDirBuilder('users', _id, image.name);
          image.mv(finalFilePath);
          UserModel.updateOne({ _id }, {
            images: [...images,
              filePath
            ]
          });
        });
      }

      await sendMail(email, REGISTER, { name });
      const userNormalized = await userHelper.userNormalizator(createdUser.toJSON());

      res.status(responseCodesEnum.CREATED).json(userNormalized);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserModel.find({}).lean();
      const usersNormalized = [];

      await users.forEach((user) => {
        usersNormalized.push(userHelper.userNormalizator(user));
      });

      res.json(usersNormalized);
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

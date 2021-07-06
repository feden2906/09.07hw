const bcrypt = require('bcrypt');

const { responseCodesEnum } = require('../constants');
const { ErrorHandler, errorMessages } = require('../errors');

module.exports = {
  compare: async (hashedPassword, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
      throw new ErrorHandler(
        responseCodesEnum.WRONG_EMAIL_OR_PASS,
        errorMessages.WRONG_EMAIL_OR_PASS.message,
        errorMessages.WRONG_EMAIL_OR_PASS.code
      );
    }
  },

  hash: (password) => bcrypt.hash(password, 10)
};

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const {
  envConstants: { ACCESS_TOKEN, REFRESH_TOKEN },
  nameConstants: { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME }
} = require('../constants');

const verifyPromise = promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN, { expiresIn: ACCESS_TOKEN_TIME });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN, { expiresIn: REFRESH_TOKEN_TIME });

    return { accessToken, refreshToken };
  },

  verifyToken: async (token, tokenType = 'access') => {
    const secretWord = tokenType === 'access' ? ACCESS_TOKEN : REFRESH_TOKEN;

    await verifyPromise(token, secretWord);
  }
};

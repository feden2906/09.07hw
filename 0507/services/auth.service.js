const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { envConstants: { ACCESS_TOKEN, REFRESH_TOKEN } } = require('../constants');

const verifyPromise = promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN, { expiresIn: '30m' });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  },

  verifyToken: async (token, tokenType = 'access') => {
    const secredWord = tokenType === 'access' ? ACCESS_TOKEN : REFRESH_TOKEN;

    await verifyPromise(token, secredWord);
  }
};

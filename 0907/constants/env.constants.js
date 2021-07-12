module.exports = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'example@gmail.com',
  ADMIN_EMAIL_PASSWORD: process.env.ADMIN_EMAIL_PASSWORD || 1234,
  MONGOOSE_CONNECT: process.env.MONGOOSE_URL,
  PORT: process.env.PORT || 3001,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN
};

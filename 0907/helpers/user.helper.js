module.exports = {
  userNormalizator: (user) => {
    const fieldsToNormalize = ['password'];

    fieldsToNormalize.forEach((field) => {
      delete user[field];
    });

    return user;
  }
};

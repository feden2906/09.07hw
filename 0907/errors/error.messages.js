module.exports = {
  RECORD_NOT_FOUND: {
    message: 'Record not found.',
    code: '404.1'
  },
  EMAIL_BUSY: {
    message: 'Email is already registered.',
    code: '401.1'
  },
  ROUT_NOT_FOUND: {
    message: 'Rout not found.',
    code: '404.2'
  },
  WRONG_EMAIL_OR_PASS: {
    message: 'Wrong email or password',
    code: '401.2'
  },
  FIELD_NOT_FILLED: {
    message: (error) => error,
    code: '401.3'
  },
  NO_TOKEN: {
    message: 'No token.',
    code: '401.4'
  },
  WRONG_TOKEN: {
    message: 'Wrong token.',
    code: '401.5'
  },
  WRONG_TEMPLATE: {
    message: 'Wrong template',
    code: '404.2'
  },
  MAX_SIZE_FOR_MEDIA: {
    message: (fileName, maxSize) => `${fileName} size is larger than ${maxSize}`,
    code: '415.1'
  },
  WRONG_MIMETYPE: {
    message: (fileName) => `Mimetype ${fileName} is not supported`,
    code: '415.2'
  }
};

module.exports = {
  RECORD_NOT_FOUND: {
    message: 'Record not found.',
    code: '404.1'
  },
  EMAIL_BUSY: {
    message: 'Email is already registered.'
  },
  ROUT_NOT_FOUND: {
    message: 'Rout not found.',
    code: '404.2'
  },
  WRONG_EMAIL_OR_PASS: {
    message: 'Wrong email ro password',
    code: '401.1'
  },
  FIELD_NOT_FILLED: {
    message: (error) => error,
    code: '401.2'
  }
};

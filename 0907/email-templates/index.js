const { mailActionsEnum: { REGISTER, UPDATE, DELETE } } = require('../constants');

module.exports = {
  [REGISTER]: {
    templateName: 'register',
    subject: 'Welcome on our website'
  },
  [UPDATE]: {
    templateName: 'update',
    subject: 'Updated data'
  },
  [DELETE]: {
    templateName: 'delete',
    subject: 'Deleted account'
  }
};

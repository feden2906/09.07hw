const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { constants, responseCodesEnum } = require('./constants');
const { errorMessages } = require('./errors');
const { loginRouter, userRouter } = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(constants.PORT, () => {
  console.log(`App listen ${constants.PORT}`);
});

function _notFoundHandler(req, res, next) {
  next({
    status: responseCodesEnum.NOT_FOUND,
    message: errorMessages.ROUT_NOT_FOUND.message,
    code: errorMessages.ROUT_NOT_FOUND.code
  });
}

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || 'Unknow error',
      code: err.code || 0
    });
}

function _mongooseConnector() {
  mongoose.connect(constants.MONGOOSE_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

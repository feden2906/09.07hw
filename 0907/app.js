require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');

const { envConstants, responseCodesEnum } = require('./constants');
const { errorMessages } = require('./errors');
const { authRouter, userRouter } = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'static')));

app.use(fileUpload());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(envConstants.PORT, () => {
  console.log(`App listen ${envConstants.PORT}`);
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
  mongoose.connect(envConstants.MONGOOSE_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

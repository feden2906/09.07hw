const express = require('express');
const mongoose = require('mongoose');

const { constants } = require('./constants');
const { userRouter } = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(constants.PORT, () => {
  console.log(`App listen ${constants.PORT}`);
});

function _notFoundHandler(req, res, next) {
  next({
    status: 404,
    message: 'Rout not fond'
  });
}

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
  res
      .status(err.status)
      .json({
          message: err.message || 'Unknow error',
          customCode: err.code || 0
      });
}

function _mongooseConnector() {
  mongoose.connect(constants.MONGOOSE_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
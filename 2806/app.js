const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);

app.listen(3000, () => {
  console.log('App listen 3000');
});

function _mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/dec-2020', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

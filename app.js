/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/Users', userRouter);
app.use('/api/tours', tourRouter);

module.exports = app;

/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const GlobalError = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/Users', userRouter);
app.use('/api/tours', tourRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(
  //   `we did find your url ${req.originalUrl} on this server`
  // );
  // err.statusCode = 404;
  // err.status = 'failed to find';

  const errorObj = new AppError(
    `we did find your url ${req.originalUrl} on this server`,
    404
  );

  next(errorObj);
});

app.use(GlobalError);

module.exports = app;

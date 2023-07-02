require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const userRoutes = require('./routers/users');
const cardRoutes = require('./routers/cards');
const wrongRoutes = require('./routers/wrong');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { validationCreateUser, validationLogin } = require('./middlewares/getValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);
app.use(wrongRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log('error app 40 общая ф-ция ошибок');
  console.log(err);
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  console.log('оштбка в апп 46 общая ф-ция ошибкок');
  next();
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

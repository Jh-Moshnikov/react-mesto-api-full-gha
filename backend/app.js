const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { cors } = require('cors');
const userRoutes = require('./routers/users');
const cardRoutes = require('./routers/cards');
const wrongRoutes = require('./routers/wrong');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { validationCreateUser, validationLogin } = require('./middlewares/getValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);
app.use(wrongRoutes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

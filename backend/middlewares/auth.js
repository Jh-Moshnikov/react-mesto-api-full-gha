const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/authError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
// console.log(authorization);
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    console.log('auth 10');
    return next(new AuthError('Необходима авторизация'));
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  let payload;
  try {
    console.log('auth 14');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    console.log('auth 15');
    return next(new AuthError('Необходима авторизации'));
  }
  req.user = payload;
  console.log('auth 17');
  next();
};

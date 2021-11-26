require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || '123456';

const validateJWT = async (req, _res, next) => {
  const { authorization } = req.headers;
  // if (authorization) {
  //   next('validationJWT');
  // }
  jwt.verify(authorization, SECRET, (err, decoded) => {
    if (err) {
      next('expiredToken');
    }
    if (decoded) {
      const { email, name, id, role } = decoded;
      req.user = { email, name, id, role };
    }
  });
  next();
};
module.exports = { validateJWT };
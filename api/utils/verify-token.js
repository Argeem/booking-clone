import jwt from 'jsonwebtoken';
import { createError } from './error.js';

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, 'You are not authenticated'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(401, 'Token is not valid'));

    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    const userId = req.params.id;
    const reqId = req.user.id;
    const reqIsAdmin = req.user.isAdmin;

    if (reqId === userId || reqIsAdmin) next();
    else return next(createError(403, 'You are not authorized'));
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const reqIsAdmin = req.user.isAdmin;

    if (reqIsAdmin) next();
    else return next(createError(403, 'You are not authorized'));
  });
};

export { verifyToken, verifyUser, verifyAdmin };

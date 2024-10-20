import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();
    res.status(201).json('User has been created');
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) return next(createError(404, 'User not found'));

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return next(createError(400, 'Password incorrect'));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
    );

    const returnUser = user.toObject();
    delete returnUser.password;
    delete returnUser.isAdmin;
    delete returnUser.__v;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(returnUser);
  } catch (err) {
    next(err);
  }
};

export { register, login };

import User from '../models/User.js';

const createUser = async (req, res, next) => {
  const newUser = new User(req.body);

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true },
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json('User has been deleted');
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export { createUser, updateUser, deleteUser, getUser, getAllUsers };

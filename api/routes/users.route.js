import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controller/users.controller.js';
import { verifyUser, verifyAdmin } from '../utils/verify-token.js';

const router = express.Router();

router.post('/', createUser);
router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/:id', verifyUser, getUser);
router.get('/', verifyAdmin, getAllUsers);

export default router;

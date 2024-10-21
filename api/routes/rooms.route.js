import express from 'express';
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from '../controller/rooms.controller.js';
import { verifyAdmin } from '../utils/verify-token.js';

const router = express.Router();

router.post('/:hotelId', verifyAdmin, createRoom);
router.put('/:id', verifyAdmin, updateRoom);
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);
router.get('/:id', getRoom);
router.get('/', getAllRooms);

export default router;

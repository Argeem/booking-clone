import express from 'express';
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from '../controller/hotels.controller.js';
import { verifyAdmin } from '../utils/verify-token.js';

const router = express.Router();

router.post('/', verifyAdmin, createHotel);
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/:id', verifyAdmin, deleteHotel);
router.get('/:id', getHotel);
router.get('/', getAllHotels);

export default router;

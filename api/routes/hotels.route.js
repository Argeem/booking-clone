import express from 'express';
import {
  createHotel,
  deleteHotel,
  getHotels,
  getHotel,
  updateHotel,
  countByCity,
  countByType,
} from '../controller/hotels.controller.js';
import { verifyAdmin } from '../utils/verify-token.js';

const router = express.Router();

router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/:id', getHotel);
router.get('/', getHotels);

router.post('/', verifyAdmin, createHotel);
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/:id', verifyAdmin, deleteHotel);

export default router;

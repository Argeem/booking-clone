import express from 'express';
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from '../controller/hotels.controller.js';

const router = express.Router();

router.post('/', createHotel);
router.put('/:id', updateHotel);
router.delete('/:id', deleteHotel);
router.get('/:id', getHotel);
router.get('/', getAllHotels);

export default router;

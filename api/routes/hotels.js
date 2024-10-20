import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// create
router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const saveHotel = await newHotel.save();
    res.status(201).json(saveHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true },
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json('Hotel has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// get
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all
router.get('/', async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

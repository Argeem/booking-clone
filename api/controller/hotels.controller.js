import Hotel from '../models/Hotel.js';

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const saveHotel = await newHotel.save();
    res.status(201).json(saveHotel);
  } catch (err) {
    next(err);
  }
};

const updateHotel = async (req, res, next) => {
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
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json('Hotel has been deleted');
  } catch (err) {
    next(err);
  }
};

const getHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels };

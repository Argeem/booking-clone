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

const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');

  try {
    const countHotels = await Promise.all(
      cities.map(async (city) => {
        const count = await Hotel.countDocuments({ city });
        return { city, count };
      }),
    );
    res.status(200).json(countHotels);
  } catch (err) {
    next(err);
  }
};

const countByType = async (req, res, next) => {
  const types = ['hotel', 'apartment', 'resort', 'villa', 'cabin'];

  try {
    const hotelTypes = await Promise.all(
      types.map(async (hotelType) => {
        const count = await Hotel.countDocuments({ type: hotelType });
        return { hotelType, count };
      }),
    );
    res.status(200).json(hotelTypes);
  } catch (err) {
    next(err);
  }
};

export {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
};

import Room from '../models/Rooms.js';
import Hotel from '../models/Hotel.js';

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updateRoom = await Room.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true },
    );
    res.status(200).json(updateRoom);
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  const id = req.params.id;
  const hotelId = req.params.hotelId;

  try {
    await Room.findByIdAndDelete(id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json('Room has been deleted');
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  const id = req.params.id;
  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms };

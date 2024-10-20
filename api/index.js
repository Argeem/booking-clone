import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import hotelRoute from './routes/hotels.js';
import roomRoute from './routes/rooms.js';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

//middleware
app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/hotel', hotelRoute);
app.use('/api/v1/room', roomRoute);

app.listen(8800, () => {
  connect();
  console.log('Server is running on port 8800');
});

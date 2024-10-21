import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoute from './routes/auth.route.js';
import userRoute from './routes/users.route.js';
import hotelRoute from './routes/hotels.route.js';
import roomRoute from './routes/rooms.route.js';
import cookieParser from 'cookie-parser';
import { loggerModule } from './utils/logger.js';

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
app.use(cookieParser());
app.use(express.json());
app.use(loggerModule);

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/hotel', hotelRoute);
app.use('/api/v1/room', roomRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(8800, () => {
  connect();
  console.log('Server is running on port 8800');
});

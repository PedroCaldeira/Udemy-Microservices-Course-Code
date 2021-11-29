import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined.');
  }
  if (!process.env.MONGO_DB_URI) {
    throw new Error('MONGO_DB_URI is not defined.');
  }
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Connected to MongoDb');
  } catch (error) {
    console.error(error);
  }
};
app.listen(3000, () => {
  console.log('Listening on Port 3000!!');
});

start();

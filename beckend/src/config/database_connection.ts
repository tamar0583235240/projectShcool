//@ts-ignore
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI||"mongodb+srv://tamar0583235240:214797673@cluster0.x4hlg.mongodb.net/schoolDB?retryWrites=true&w=majority&appName=Cluster0";
    console.log('uri', uri);
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('***** Error connecting to DB *****\n', err);
  }
};

export default connectDB;
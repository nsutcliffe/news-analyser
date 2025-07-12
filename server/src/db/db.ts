import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI!)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error(err));
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;

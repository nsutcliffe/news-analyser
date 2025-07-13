import mongoose from "mongoose";

async function connectDB(): Promise<void> {
  try {
    console.log("Attempting initial DB Connection");
    await mongoose
      .connect(process.env.MONGODB_URI!)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error(err));
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectDB;

import mongoose from "mongoose";

async function connectWithRetry(): Promise<void> {
  try {
    console.log("Attempting initial DB Connection");
    await mongoose
      .connect(process.env.MONGODB_URI!)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error(err));
    console.log("MongoDB connected");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Mongo DB connection error:", error.message);
    } else {
      console.error("Mongo DB connection error:", error);
    }
    console.log("Retrying in 5 seconds");
    setTimeout(connectWithRetry, 5000);
  }
}

export default connectWithRetry;

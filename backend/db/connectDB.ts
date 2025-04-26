import { connect } from "mongoose";

export async function connectDB() {
  try {
    const conn = await connect(process.env.MONGODB_URI!);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log("Error connecting to MongoDB: " + error.message);
  }
}

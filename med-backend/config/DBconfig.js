import mongoose from "mongoose";
import dns from "node:dns";
import { MONGODB_URL } from "./config.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const DBconfig = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
  }
};

export default DBconfig;
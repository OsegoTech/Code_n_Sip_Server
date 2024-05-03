import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const uri = process.env.MONGO_URI;

const dbConnect = () => {
  mongoose.connect(uri);
  mongoose.connection.on("connected", () => {
    console.log("Connected to database successfully");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from the cluster");
  });
  mongoose.connection.on("error", () => {
    console.log("An error occurred connecting to DB");
  });
};

export default dbConnect

import { log } from "console";
import express from "express";
import attendeesRoute from "./routes/AttendeeRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./utils/dbConnect.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors());

dbConnect()

app.get("/", (req, res) => {
  res.send("Sever is up and running");
});

app.use("/api", attendeesRoute);

app.listen(PORT, () => {
  log(`Server running on port ${PORT}`);
});

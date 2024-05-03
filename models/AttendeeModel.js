import mongoose from "mongoose";

const AttendeeSchema = new mongoose.Schema({
  name: String,
  gender: String,
  specialization: String,
})

const Attendee = mongoose.model("Attendee", AttendeeSchema);
export default Attendee
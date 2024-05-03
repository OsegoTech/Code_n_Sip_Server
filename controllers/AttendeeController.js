import expressAsyncHandler from "express-async-handler";
import Attendee from "../models/AttendeeModel.js";

export const createAttendee = expressAsyncHandler(async (req, res) => {
  const { name, gender, specialization } = req.body;
  const newAttendee = await Attendee.create({
    name,
    gender,
    specialization,
  });

  res.status(200).json(newAttendee);
});

export const allAttendees = expressAsyncHandler(async (req, res) => {
  const attendees = await Attendee.find();
  res.status(200).json(attendees);
});

export const randomAttendees = expressAsyncHandler(async (req, res) => {
  const attendees = await Attendee.find();
  const males = attendees.filter((user) => user.gender === "male");
  const females = attendees.filter((user) => user.gender === "female");

  const randomMales = getRandomEntries(males, 10);
  const randomFemales = getRandomEntries(females, 10);

  const randomUsers = [...randomMales, ...randomFemales];

  res.status(200).json(randomUsers)
});

function getRandomEntries(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

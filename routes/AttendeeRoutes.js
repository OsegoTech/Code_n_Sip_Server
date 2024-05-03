import express from "express";
import {
  allAttendees,
  createAttendee,
  randomAttendees,
} from "../controllers/AttendeeController.js";
const router = express.Router();
router.route("/attendees").post(createAttendee).get(allAttendees)
router.get("/random-attendees", randomAttendees)

export default router;

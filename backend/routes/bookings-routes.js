const express = require("express");

const bookingController = require("../controllers/booking-controller");

const router = express.Router();

router.get("/", bookingController.getAllBookings);

router.get("/:uid", bookingController.getBookingsByUserEmail);

router.get("/booking/:bid", bookingController.bookingSpecific);

router.get("/reservation/:pskey", bookingController.getBookingsByParkingSpace);

router.post("/", bookingController.createBooking);

router.delete("/:bid", bookingController.deleteBooking);

module.exports = router;

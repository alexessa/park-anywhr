const HttpError = require("../models/http-error");
const Bookings = require("../models/bookings");

const getAllBookings = async (req, res, next) => {
  const allBookings = await Bookings.findAll();

  if (allBookings.length <= 0) {
    return next(new HttpError("Could not find any parking areas", 404));
  }

  res.status(200).json({bookings: allBookings});
};

const getBookingsByUserEmail = async (req, res, next) => {
  const userId = req.params.uid;

  const bookings = await Bookings.findAll({
    where: { user_email: userId },
  }).catch((err) => {
    return next(
      new HttpError("Could not find bookings under the provided user", 422)
    );
  });

  if (!bookings || bookings.length === 0) {
    return next(
      new HttpError("Could not find bookings under the provided user", 422)
    );
  }

  res.json({ bookings: bookings });
};

const getBookingsByParkingSpace = async (req, res, next) => {
  const parkingSpace = req.params.pskey;

  const bookings = await Bookings.findAll({
    where: { parking_space_key: parkingSpace },
  }).catch((err) => {
    return next(
      new HttpError("Could not find bookings under the provided parking space", 422)
    );
  });

  if (!bookings || bookings.length === 0) {
    return next(
      new HttpError("Could not find bookings under the provided parking space", 422)
    );
  }

  res.json({ reservations: bookings });
};

const bookingSpecific = async (req, res, next) => {
  const bookingId = req.params.bid;

  const booking = await Bookings.findOne({
    where: { id: bookingId },
  }).catch((err) => {
    return next(
      new HttpError("Could not find bookings under the provided user", 422)
    );
  });

  if (!booking) {
    return next(
      new HttpError("Could not find bookings under the provided user", 422)
    );
  }

  res.json({ booking });
};

const createBooking = async (req, res, next) => {
  const {
    user_email,
    user_car_number_plate,
    hours,
    location,
    parking_name,
    parking_area_id,
    parking_space_key,
    parking_date_time,
  } = req.body;

  const createdBooking = await Bookings.create({
    user_email: user_email,
    user_car_number_plate: user_car_number_plate,
    hours: hours,
    location: location,
    parking_name: parking_name,
    parking_area_id: parking_area_id,
    parking_space_key: parking_space_key,
    parking_date_time: parking_date_time,
  }).catch((err) => {
    return next(new HttpError(err.message, 422));
  });

  res.status(201).json({ booking: createdBooking });
};

const deleteBooking = async (req, res, next) => {
  const bookingId = req.params.bid;

  const deletedBooking = await Bookings.findOne({
    where: { id: bookingId },
  }).catch((err) => {
    return next(
      new HttpError("Could not find bookings under the given id", 404)
    );
  });

  if (!deletedBooking) {
    return next(
      new HttpError("Could not find bookings under the given id", 404)
    );
  }

  deletedBooking.destroy();

  res.status(200).json({ message: "Successfully removed booking" });
};

exports.getAllBookings = getAllBookings;
exports.getBookingsByUserEmail = getBookingsByUserEmail;
exports.bookingSpecific = bookingSpecific;
exports.getBookingsByParkingSpace = getBookingsByParkingSpace;
exports.createBooking = createBooking;
exports.deleteBooking = deleteBooking;

const express = require("express");
const bodyParser = require("body-parser");

const parkingRoutes = require("./routes/parking-routes");
const bookingRoutes = require("./routes/bookings-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const sequelize = require("./util/database");
const ParkingArea = require("./models/parking-area");
const ParkingSpace = require("./models/parking-space");
const Cars = require("./models/cars");
const User = require("./models/user");
const Bookings = require("./models/bookings");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/parking", parkingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

ParkingSpace.belongsTo(ParkingArea);
ParkingArea.hasMany(ParkingSpace);
Cars.hasOne(User);
User.hasMany(Cars);
User.hasMany(Bookings);

sequelize
  //.sync({force: true})
  .sync()
  .then((result) => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });

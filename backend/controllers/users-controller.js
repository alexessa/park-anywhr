const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Cars = require("../models/cars");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const identifiedUser = await User.findOne({ where: { email: email } }).catch(
    (errors) => {
      return next(new HttpError(errors.message, 500));
    }
  );

  if (identifiedUser) {
    return next(
      new HttpError("User already exists, please log in instead", 422)
    );
  }

  const createUser = await User.create({
    name,
    email,
    password,
    isAdmin: false,
  }).catch((err) => {
    return next(new HttpError(err.message, 422));
  });

  res.status(201).json({ user: createUser });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { email, password } = req.body;

  const identifiedUser = await User.findOne({ where: { email: email } }).catch(
    (errors) => {
      return next(
        new HttpError(
          "There is an issue with the log in, please try again",
          500
        )
      );
    }
  );

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError("There is an issue with the log in, please try again", 401)
    );
  }

  res.json({ message: "Logged in successfully", user: identifiedUser });
};

const getUserProfile = async (req, res, next) => {
  const userId = req.params.uid;

  const identfiedUser = await User.findOne({ where: { email: userId } }).catch(
    (err) => {
      return next(
        new HttpError("There was an issue fetching the user profile", 422)
      );
    }
  );

  if (!identfiedUser) {
    return next(
      new HttpError("There was an issue fetching the user profile", 422)
    );
  }

  res.status(200).json({ user: identfiedUser });
};

const updateUserProfile = async (req, res, next) => {
  const userId = req.params.userEmail;
  const { name } = req.body;

  await User.update({ name: name }, { where: { email: userId } }).catch(
    (err) => {
      return new HttpError(err.message, 422);
    }
  );

  res.json(200).json({ message: "User has been updated successfully" });
};

const getUsersCars = async (req, res, next) => {
  const userId = req.params.uid;

  const allCars = await Cars.findAll({ where: { user_id: userId } }).catch(
    (errors) => {
      return next(
        new HttpError("There are no cars found, please add them", 500)
      );
    }
  );

  if (allCars.length <= 0) {
    return next(new HttpError("There are no cars found, please add them", 500));
  }

  res.status(200).json({ cars: allCars });
};

const createCar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const userId = req.params.uid;
  const { number_plate, colour, brand, model } = req.body;

  const createdCar = await Cars.create({
    number_plate,
    colour,
    brand,
    model,
    user_id: userId,
  }).catch((err) => {
    return next(new HttpError(err.message, 422));
  });

  res.status(200).json({ createdCar });
};

const updateCar = async (req, res, next) => {
  const carId = req.params.ucid;
  const { model, colour, brand } = req.body;

  await Cars.update(
    { model, brand, colour },
    { where: { number_plate: carId } }
  ).catch((error) => {
    next(
      new HttpError(
        error.message || "There was an issue updating the entry.",
        422
      )
    );
  });

  res.status(200).json({ message: "Updated car details successfully!" });
};

const deleteCar = async (req, res, next) => {
  const carId = req.params.ucid;
  const deletedCar = await Cars.findByPk(carId).catch((err) => {
    return next(new HttpError("Could not find car with the given id", 422));
  });

  if (!deletedCar) {
    return next(new HttpError("Could not find car with the given id", 422));
  }

  deletedCar.destroy();
  res.status(200).json({ message: "Removed Parking" });
};

exports.signup = signup;
exports.login = login;
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.createCar = createCar;
exports.getUsersCars = getUsersCars;
exports.updateCar = updateCar;
exports.deleteCar = deleteCar;

const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

//User Profile related Routes
router.get('/:uid', usersController.getUserProfile);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.patch(":uid", usersController.updateUserProfile);

//User Car related routes
router.get('/cars/:uid', usersController.getUsersCars);

router.post(
  "/cars/:uid",
  [check("number_plate").not().isEmpty()],
  usersController.createCar
);

router.patch("/cars/:ucid", usersController.updateCar);

router.delete("/cars/:ucid", usersController.deleteCar);

module.exports = router;

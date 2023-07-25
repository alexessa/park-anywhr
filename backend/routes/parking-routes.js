const express = require("express");
const { check } = require("express-validator");

const parkingController = require("../controllers/parking-controller");

const router = express.Router();

router.get("/", parkingController.getParkingAreas);

router.get("/:pid", parkingController.getParkingById);

router.get("/space/booking/:pskey", parkingController.getParkingSpaceById);

router.get("/space/:pid", parkingController.getParkingSpaces);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  parkingController.createParking
);

router.post(
  "/space/:pid",
  [check("totalParkingSpaces").not().isEmpty()],
  parkingController.createParkingSpaces
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  parkingController.updateParkingById
);

router.delete("/:pid", parkingController.deleteParking);

module.exports = router;

const uuid = require("uuid");
const { validationResult } = require("express-validator");

const uuid4 = uuid.v4();

const HttpError = require("../models/http-error");
const getCoordinatesForAddress = require("../util/location");
const ParkingArea = require("../models/parking-area");
const ParkingSpace = require("../models/parking-space");

const getParkingAreas = async (req, res, next) => {
  const allParking = await ParkingArea.findAll();

  if (allParking.length <= 0) {
    return next(new HttpError("Could not find any parking areas", 404));
  }

  res.status(200).json({parkingAreas: allParking});
};

const getParkingById = async (req, res, next) => {
  const parkingId = req.params.pid;
  const foundParking = await ParkingArea.findByPk(parkingId).catch((err) => {
    return next(new HttpError("Parking area is not found", 422));
  });

  if (!foundParking) {
    return next(new HttpError("Parking area is not found", 422));
  }

  res.status(200).json({ parking: foundParking });
};

const createParking = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { title, description, address, imageUrl } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const id = uuid4;
  const location = JSON.stringify(coordinates);

  const createdParking = await ParkingArea.create({
    id: id,
    title: title,
    description: description,
    address: address,
    location: location,
    imageUrl: imageUrl,
  }).catch((err) => {
    next(new HttpError(err.message, 422));
  });

  res.status(201).json({ createdParkingArea: createdParking.dataValues });
};

const updateParkingById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const parkingId = req.params.pid;
  const { title, description } = req.body;

  await ParkingArea.update(
    { title: title, description: description },
    { where: { id: parkingId } }
  ).catch((error) => {
    next(
      new HttpError(
        error.message || "There was an issue updating the entry.",
        422
      )
    );
  });

  res.status(200).json({ message: "Updated parking area successfully!" });
};

// Delete Parking Area
const deleteParking = async (req, res, next) => {
  const parkingId = req.params.pid;
  const deletedParking = await ParkingArea.findByPk(parkingId).catch((err) => {
    return next(
      new HttpError("Could not find parking area with the given id", 422)
    );
  });

  if (!deletedParking) {
    return next(
      new HttpError("Could not find parking area with the given id", 422)
    );
  }

  deletedParking.destroy();
  res.status(200).json({ message: "Removed Parking" });
};

const getParkingSpaces = async (req, res, next) => {
  const parkingId = req.params.pid;

  const allParkingSpaces = await ParkingSpace.findAll({
    where: { parking_area_id: parkingId },
  }).catch((err) => {
    next(new HttpError(err.message, 422));
  });

  if (allParkingSpaces.length <= 0) {
    return next(new HttpError("Could not find any parking spaces", 404));
  }

  res.status(200).json({allSpaces:allParkingSpaces});
};

const getParkingSpaceById = async (req, res, next) => {
  const parkingSpaceKey = req.params.pskey;

  const identifiedParking = await ParkingSpace.findOne({where: {space_key: parkingSpaceKey}}).catch(
    (err) => {
      return next(new HttpError(err.message, 422));
    }
  );

  if (!identifiedParking) {
    return next(new HttpError(err.message, 422));
  }

  res.status(200).json({ parking: identifiedParking });
};

const createParkingSpaces = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const parkingId = req.params.pid;
  const { title, location, totalParkingSpaces } = req.body;
  let parkingSpace = [];
  let id = 1;
  for (let index = 0; index < totalParkingSpaces; index++) {
    const space_key = parkingId + "_" + id;
    ParkingSpace.create({
      id: id,
      title: title,
      location: location,
      parking_area_id: parkingId,
      space_key: space_key,
    })
      .then((result) => parkingSpace.push(result))
      .catch((error) => {
        next(new HttpError(error.message, 422));
      });
    id++;
  }

  res.status(200).json({ message: "Successfully added Parking Spaces" });
};

exports.getParkingAreas = getParkingAreas;
exports.getParkingById = getParkingById;
exports.createParking = createParking;
exports.updateParkingById = updateParkingById;
exports.deleteParking = deleteParking;
exports.getParkingSpaces = getParkingSpaces;
exports.getParkingSpaceById = getParkingSpaceById;
exports.createParkingSpaces = createParkingSpaces;

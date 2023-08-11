import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState, useContext, FormEvent } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { teal } from "@mui/material/colors";

import { AuthContext } from "../../common/context/authentication-context";
import { ParkingSpace } from "../../models/parking-space";
import { Car } from "../../models/car";
import { useHttpClient } from "../../common/hooks/http-hook";

const SpaceBookingPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const spaceKey: string | undefined = useParams().spaceKey;
  const { isLoading, error, sendRequest } = useHttpClient();
  const [parkingSpace, setParkingSpace] = useState<ParkingSpace>();
  const [userCars, setUserCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<any>();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBILOHlkN5S7YbnI2_TU5-K9wnUQxU_Oc8",
  });

  useEffect(() => {
    const fetchParkingSpace = async () => {
      if (spaceKey) {
        try {
          const response = await sendRequest(
            `http://localhost:5000/api/parking/space/booking/${spaceKey}`
          );
          setParkingSpace(response.parking);
        } catch (err) {}
      }
    };

    const fetchUserCars = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/user/cars/${auth.user.email}`
        );
        setUserCars(response.cars);
      } catch (err) {}
    };

    fetchUserCars();
    fetchParkingSpace();
  }, [sendRequest, spaceKey]);

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/bookings",
        "POST",
        JSON.stringify({
          user_email: auth.user.email,
          user_car_number_plate: selectedCar,
          hours: 2,
          location: parkingSpace!.location,
          parking_name: parkingSpace!.title,
          parking_area_id: parkingSpace!.parking_area_id,
          parking_space_key: parkingSpace!.space_key,
          parking_date_time: selectedDate
        }),
        { "Content-Type": "application/json" }
      );

      navigate("/bookings");
    } catch (err) {}
  };

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
          <CircularProgress />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 2,
        }}
      >
        <Card>
          <Box
            textAlign={"center"}
            py={1}
            sx={{
              bgcolor: teal[300],
              color: "white",
            }}
          >
            <Typography variant="h5">Parking Space Booking</Typography>
          </Box>
          <Box>
            {isLoaded && parkingSpace && (
              <GoogleMap
                mapContainerStyle={{ width: "600px", height: "300px" }}
                zoom={16}
                center={JSON.parse(parkingSpace.location)}
              >
                <Marker position={JSON.parse(parkingSpace.location)} />
              </GoogleMap>
            )}
          </Box>
          <Box textAlign={"center"} my={1}>
            <Typography variant="h6">{parkingSpace?.title}</Typography>
            <Typography variant="subtitle1">
              Parking Space Number: {parkingSpace?.id}
            </Typography>
            <Typography variant="subtitle2">
              Please note that every booking is 2 hours of parking
            </Typography>
            <form onSubmit={formSubmitHandler}>
              <FormControl>
                {userCars && (
                  <>
                    <TextField
                      select
                      label="Please select your car that you want to use"
                      value={selectedCar}
                      onChange={(selectedChoice) =>
                        setSelectedCar(selectedChoice.target.value)
                      }
                      defaultValue=""
                      sx={{ width: "400px", paddingTop: 1 }}
                    >
                      {userCars.map((car: Car) => {
                        return (
                          <MenuItem
                            key={car.number_plate}
                            value={car.number_plate}
                          >
                            {car.number_plate}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </>
                )}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Select date and time of parking"
                      value={selectedDate}
                      onChange={(newValue) => {
                        setSelectedDate(newValue);
                      }}
                      defaultValue={new Date()}
                      sx={{ width: "400px", paddingTop: 1 }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ mt: 1, color: teal[300] }}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default SpaceBookingPage;

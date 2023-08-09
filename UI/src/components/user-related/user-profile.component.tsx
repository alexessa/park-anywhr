import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import CarsList from "./components/cars-list";
import { Car } from "../../models/car";
import { AuthContext } from "../../common/context/authentication-context";
import { useHttpClient } from "../../common/hooks/http-hook";
import { Add } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [carList, setCarList] = useState();
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/user/cars/${user.email}`
        );
        setCarList(response.cars);
      } catch (error) {}
    };
    fetchCars();
  }, []);

  const carDeletedHandler = (deletedCar: any) => {
    setCarList((prevCarList) =>
      (prevCarList as any).filter((c: Car) => c.number_plate !== deletedCar)
    );
  };

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <Box m={4}>
            <Typography variant="h6" component="h2">
              Hi, {user.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
          <Box m={4}>
            {carList ? (
              <CarsList data={carList} onDeleteCar={carDeletedHandler} />
            ) : (
              <Box>
                <Typography variant="h6">No cars were found</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", m:2 }}>
            <NavLink to="/profile/car">
              <Button sx={{ color: "black" }}>
                <Add /> Car
              </Button>
            </NavLink>
          </Box>
        </Card>
      </Box>
      ;
    </>
  );
};

export default UserProfile;

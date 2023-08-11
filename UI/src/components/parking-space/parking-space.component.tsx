import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Add, ArrowBack } from "@mui/icons-material";

import { ParkingSpace } from "../../models/parking-space";
import { ParkingArea } from "../../models/parking-area";
import { AuthContext } from "../../common/context/authentication-context";
import { useHttpClient } from "../../common/hooks/http-hook";
import ParkingSpaceList from "./components/space-list";
import { groupArrayIntoChunks } from "../../util/reusable-functions";

const ParkingSpaceComponent = () => {
  const parkingId = useParams().parkingId;
  const auth = useContext(AuthContext);
  const [loadedParking, setLoadedParking] = useState<ParkingArea>();
  const [loadedSpaces, setLoadedSpaces] = useState<ParkingSpace[]>([]);
  const { isLoading, error, sendRequest } = useHttpClient();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBILOHlkN5S7YbnI2_TU5-K9wnUQxU_Oc8",
  });

  useEffect(() => {
    const fetchParkingArea = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/parking/${parkingId}`
        );

        setLoadedParking(responseData.parking);
      } catch (e) {}
    };

    const fetchParkingSpace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/parking/space/${parkingId}`
        );

        setLoadedSpaces(responseData.allSpaces);
      } catch (e) {}
    };

    fetchParkingArea();
    fetchParkingSpace();
  }, []);

  const sortedArray: ParkingSpace[] = loadedSpaces.sort(
    (n1: ParkingSpace, n2: ParkingSpace) => n1.id - n2.id
  );

  const splitParkingSpaces = groupArrayIntoChunks(sortedArray, 10);

  const renderParkingSpaces = () => {
    if (splitParkingSpaces.length > 1) {
      return (
        <>
          <Grid container columns={splitParkingSpaces.length}>
            {splitParkingSpaces.map((space: ParkingSpace[], i: number) => (
              <Grid item>
                <ParkingSpaceList key={i} data={space} />
              </Grid>
            ))}
          </Grid>
        </>
      );
    } else {
      return <ParkingSpaceList data={sortedArray} />;
    }
  };

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && loadedParking && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Card>
            <Box bgcolor={"#4db6ac"} p={1}>
              <Typography variant="h5" color={"white"} px={1}>
                {loadedParking.title}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: "600px", height: "300px" }}
                  zoom={16}
                  center={JSON.parse(loadedParking.location)}
                >
                  <Marker position={JSON.parse(loadedParking.location)} />
                </GoogleMap>
              )}
            </Box>
            <Box p={1}>
              {loadedSpaces ? (
                renderParkingSpaces()
              ) : (
                <Box>
                  <Typography variant="h6">
                    No parking spaces were found
                  </Typography>
                </Box>
              )}
            </Box>
            <CardActions
              sx={{ display: "flex", justifyContent: "right" }}
              className="all-unset"
            >
              {auth.user.isAdmin === true && (
                <Link to={`/parking/space/add/${parkingId}`}>
                  <Button
                    variant="outlined"
                    sx={{ color: "#4db6ac" }}
                    disabled={loadedSpaces.length > 0}
                  >
                    <Add />
                    Parking Spaces
                  </Button>
                </Link>
              )}
              <Link to="/">
                <Button variant="contained" sx={{ bgcolor: "#4db6ac" }}>
                  <ArrowBack />
                  Back
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      )}
    </>
  );
};

export default ParkingSpaceComponent;

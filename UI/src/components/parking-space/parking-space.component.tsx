import { Alert, Box, Card, CircularProgress, Typography } from "@mui/material";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ParkingArea } from "../../models/parking-area";
import { useHttpClient } from "../../common/hooks/http-hook";
const ParkingSpace = () => {
  const parkingId = useParams().parkingId;
  const [loadedParking, setLoadedParking] = useState<ParkingArea>();
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
    fetchParkingArea();
  }, []);

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
            <Typography variant="h5" bgcolor={"#4db6ac"} color={"white"} px={1}>{loadedParking.title}</Typography>
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

            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};

export default ParkingSpace;

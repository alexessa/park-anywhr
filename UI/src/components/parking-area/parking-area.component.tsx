import { Alert, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import { useHttpClient } from "../../common/hooks/http-hook";
import ParkingAreaList from "./components/parking-area-list.component";
import { ParkingArea } from "../../models/parking-area";

const ParkingAreaComponent = () => {
  const [loadingParkingAreas, setLoadingParkingAreas] = useState<ParkingArea>();
  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchParkingAreas = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/parking"
        );

        setLoadingParkingAreas(responseData.parkingAreas);
      } catch (e) {}
    };
    fetchParkingAreas();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{(error as any).message}</Alert>;
  }

  const placeDeletedHandler = (deletedPlaceId: any) => {
    setLoadingParkingAreas((prevParking) => (prevParking as any).filter((p: ParkingArea) => p.id !== deletedPlaceId));
  }

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      {!isLoading && loadingParkingAreas && (
        <ParkingAreaList data={loadingParkingAreas} onDeletePlace={placeDeletedHandler} />
      )}
    </Box>
  );
};

export default ParkingAreaComponent;

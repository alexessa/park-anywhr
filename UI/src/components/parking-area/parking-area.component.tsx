import { Alert, Box, CircularProgress } from "@mui/material";

import useHttpClient from "../../common/hooks/http-hook";
import ParkingAreaList from "./components/parking-area-list.component";
import { useEffect } from "react";
import { ParkingArea } from "../../models/parking-area";

const ParkingAreaComponent = () => {
  const { apiResponse, get } = useHttpClient<ParkingArea[]>();
  useEffect(() => {
    const customHeaders = {
      "Content-Type": "application/json",
    };

    get("http://localhost:5000/api/parking", customHeaders);
  }, []);

  if (apiResponse.loading) {
    return <CircularProgress />;
  }

  if (apiResponse.error) {
    return <Alert severity="error">{apiResponse.error.message}</Alert>;
  }

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center"}}>
      {!apiResponse.loading && apiResponse.data && (
        <ParkingAreaList data={(apiResponse.data as any).parkingAreas} />
      )}
    </Box>
  );
};

export default ParkingAreaComponent;

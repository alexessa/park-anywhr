import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { useHttpClient } from "../../common/hooks/http-hook";
import YearlyEarningsReport from "./components/yearly-earnings-report";

const ReportsPage = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const reportData = await sendRequest(
          "http://localhost:5000/api/bookings"
        );

        setAllBookings(reportData.bookings);
      } catch (e) {}
    };
    fetchBookings();
  }, [sendRequest]);

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h5" component="h2">
          Reports
        </Typography>
        {!isLoading && allBookings && (
          <Box>
            <YearlyEarningsReport data={allBookings} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default ReportsPage;

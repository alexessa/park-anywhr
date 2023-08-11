import { Alert, Box, CircularProgress } from "@mui/material";
import { useEffect, useState, useContext } from "react";

import BookingList from "./components/booking-list";
import { Booking } from "../../models/booking";
import { AuthContext } from "../../common/context/authentication-context";
import { useHttpClient } from "../../common/hooks/http-hook";

const BookingsPage = () => {
    const auth = useContext(AuthContext);
    const [loadedBookings, setLoadedBookings] = useState<Booking>();
    const { isLoading, error, sendRequest } = useHttpClient();
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/bookings/${auth.user.email}`
          );
  
          setLoadedBookings(responseData.bookings);
        } catch (e) {}
      };
      fetchBookings();
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
        setLoadedBookings((prevBookings) => (prevBookings as any).filter((b: Booking) => b.id !== deletedPlaceId));
    }
  
    return (
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        {!isLoading && loadedBookings && (
          <BookingList data={loadedBookings} onDeletePlace={placeDeletedHandler} />
        )}
      </Box>
    );
};

export default BookingsPage;
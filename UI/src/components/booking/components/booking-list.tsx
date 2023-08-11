import { Box, List, Typography } from "@mui/material";
import { Booking } from "../../../models/booking";
import BookingItem from "./booking-item";

const BookingList = (props: any) => {
  if (props.data === undefined || props.data.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ m: 1 }}>
          No bookings found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List>
        {props.data.map((prop: Booking) => (
          <BookingItem key={prop.id} data={prop} onDelete={props.onDeletePlace}/>
        ))}
      </List>
    </>
  );
};

export default BookingList;

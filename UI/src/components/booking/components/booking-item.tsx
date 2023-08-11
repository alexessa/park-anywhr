import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useState } from "react";
import { teal } from "@mui/material/colors";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { format } from "date-fns";

import { Booking } from "../../../models/booking";
import { useHttpClient } from "../../../common/hooks/http-hook";

const BookingItem = (prop: any) => {
  const { error, sendRequest } = useHttpClient();
  const booking: Booking = prop.data;
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBILOHlkN5S7YbnI2_TU5-K9wnUQxU_Oc8",
  });

  const openDeleteHandler = () => setDeleteConfirmation(true);
  const closeDeleteHandler = () => setDeleteConfirmation(false);

  const deleteParkingAreaHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/bookings/${booking.id}`,
        "DELETE"
      );
      prop.onDelete((prop.data as Booking).id);
    } catch (error) {}
  };

  const splitSpaceKey = booking.parking_space_key.split("_");

  const dateFormatted = new Date(booking.parking_date_time);

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      <Dialog
        open={deleteConfirmation}
        onClose={closeDeleteHandler}
        aria-labelledby="delete-dialog"
        aria-describedby="delete-text"
      >
        <DialogTitle
          id="delete-dialog"
          sx={{ background: "red", color: "white" }}
        >
          Delete Booking
        </DialogTitle>
        <DialogContent sx={{ m: 2 }}>
          <DialogContentText id="delete-text">
            Are you sure you want to delete this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteHandler} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={deleteParkingAreaHandler}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem>
        <Card>
          <Box>
            {isLoaded && booking && (
              <GoogleMap
                mapContainerStyle={{ width: "600px", height: "300px" }}
                zoom={16}
                center={JSON.parse(booking.location)}
              >
                <Marker position={JSON.parse(booking.location)} />
              </GoogleMap>
            )}
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {booking.parking_name}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              Parking Space Number: {splitSpaceKey[1]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date & Time: {format(dateFormatted, "dd MMMM yyyy HH:mm")}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="small"
              onClick={openDeleteHandler}
              sx={{ color: teal[300] }}
            >
              <DeleteOutline /> &nbsp; Remove Area
            </Button>
          </CardActions>
        </Card>
      </ListItem>
    </>
  );
};

export default BookingItem;

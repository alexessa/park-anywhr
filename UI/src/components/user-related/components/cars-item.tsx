import {
  Alert,
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
import {
  DeleteOutline,
} from "@mui/icons-material";
import { useState } from "react";

import { Car } from "../../../models/car";
import { useHttpClient } from "../../../common/hooks/http-hook";

const CarsItem = (prop: any) => {
  const { error, sendRequest } = useHttpClient();
  const car: Car = prop.data;
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const openDeleteHandler = () => setDeleteConfirmation(true);
  const closeDeleteHandler = () => setDeleteConfirmation(false);

  const deleteCarHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/user/cars/${encodeURIComponent(car.number_plate)}`,
        "DELETE"
      );
      prop.onDelete((prop.data as Car).number_plate);
    } catch (error) {}
  };

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
          Delete Car
        </DialogTitle>
        <DialogContent sx={{ m: 2 }}>
          <DialogContentText id="delete-text">
            Are you sure you want to delete this car?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteHandler} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={deleteCarHandler}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem>
        <Card sx={{width: 250}}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {car.number_plate}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              {car.brand}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {car.model}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {car.colour}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>          
              <Button size="small" onClick={openDeleteHandler} sx={{color: "red"}} >
                <DeleteOutline /> &nbsp; Car
              </Button>
          </CardActions>
        </Card>
      </ListItem>
    </>
  );
};

export default CarsItem;

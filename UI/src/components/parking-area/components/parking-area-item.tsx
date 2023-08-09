import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { ParkingArea } from "../../../models/parking-area";
import { AuthContext } from "../../../common/context/authentication-context";
import { useHttpClient } from "../../../common/hooks/http-hook";

const ParkingAreaItem = (prop: any) => {
  const auth = useContext(AuthContext);
  const { error, sendRequest } = useHttpClient();
  const parkingArea: ParkingArea = prop.data;
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const openDeleteHandler = () => setDeleteConfirmation(true);
  const closeDeleteHandler = () => setDeleteConfirmation(false);

  const deleteParkingAreaHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/parking/${parkingArea.id}`,
        "DELETE"
      );
      prop.onDelete((prop.data as ParkingArea).id);
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
          Delete Parking Area
        </DialogTitle>
        <DialogContent sx={{ m: 2 }}>
          <DialogContentText id="delete-text">
            Are you sure you want to delete this parking area?
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
          <CardMedia
            image={parkingArea.imageUrl}
            title={parkingArea.title}
            sx={{ height: 200 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {parkingArea.title}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              {parkingArea.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {parkingArea.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Link to={`/parking/space/${parkingArea.id}`}>
              <Button size="small" >
                <RemoveRedEyeOutlined /> &nbsp; View Spaces
              </Button>
            </Link>
            {auth.isLoggedIn && auth.user.isAdmin === true && (
              <Link to={`/parking/${parkingArea.id}`} className="all-unset">
                <Button size="small">
                  <EditOutlined /> &nbsp; Edit Area
                </Button>
              </Link>
            )}
            {auth.isLoggedIn && auth.user.isAdmin === true && (
              <Button size="small" onClick={openDeleteHandler}>
                <DeleteOutline /> &nbsp; Remove Area
              </Button>
            )}
          </CardActions>
        </Card>
      </ListItem>
    </>
  );
};

export default ParkingAreaItem;

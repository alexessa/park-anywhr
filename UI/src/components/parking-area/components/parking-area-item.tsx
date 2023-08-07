import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ListItem,
  Typography,
} from "@mui/material";
import {
  DeleteOutline,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";

import { ParkingArea } from "../../../models/parking-area";
import { Link } from "react-router-dom";

const ParkingAreaItem = (prop: any) => {
  const parkingArea: ParkingArea = prop.data;

  return (
    <>
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
            <Button size="small">
              <RemoveRedEyeOutlined /> &nbsp; View Spaces
            </Button>
            <Link to={`/parking/${parkingArea.id}`} className="all-unset">
              <Button size="small">
                <EditOutlined /> &nbsp; Edit Area
              </Button>
            </Link>
            <Button size="small">
              <DeleteOutline /> &nbsp; Remove Area
            </Button>
          </CardActions>
        </Card>
      </ListItem>
    </>
  );
};

export default ParkingAreaItem;

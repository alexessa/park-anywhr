import { Box, List, Typography } from "@mui/material";
import { ParkingArea } from "../../../models/parking-area";
import ParkingAreaItem from "./parking-area-item";

const ParkingAreaList = (props: any) => {
  if (props.data === undefined || props.data.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ m: 1 }}>
          No Parking Areas Found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List>
        {props.data.map((prop: ParkingArea) => (
          <ParkingAreaItem key={prop.id} data={prop} onDelete={props.onDeletePlace}/>
        ))}
      </List>
    </>
  );
};

export default ParkingAreaList;

import { Box, List, Typography } from "@mui/material";
import { ParkingSpace } from "../../../models/parking-space";
import ParkingSpaceItem from "./space-item";

const ParkingSpaceList = (props: any) => {
  if (props.data === undefined || props.data.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" sx={{ m: 1 }}>
          No Parking Space Found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List>
        {props.data.map((prop: ParkingSpace) => (
          <ParkingSpaceItem
            key={prop.id}
            data={prop}
          />
        ))}
      </List>
    </>
  );
};

export default ParkingSpaceList;

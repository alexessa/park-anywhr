import { Box, List, Typography } from "@mui/material";
import { Car } from "../../../models/car";
import CarsItem from "./cars-item";

const CarsList = (props: any) => {
    if (props.data === undefined || props.data.length === 0) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ m: 1 }}>
            No Cars Found 
          </Typography>
        </Box>
      );
    }
  
    return (
      <>
        <List>
          {props.data.map((prop: Car) => (
            <CarsItem key={prop.id} data={prop} onDelete={props.onDeleteCar}/>
          ))}
        </List>
      </>
    );
  };

  export default CarsList;
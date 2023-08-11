import { Button, Card, CardContent, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

import { ParkingSpace } from "../../../models/parking-space";

const ParkingSpaceItem = (prop: any) => {
  const parkingSpace: ParkingSpace = prop.data;
  return (
    <>
      <ListItem>
        <Card>
          <CardContent>
            <Link
              to={`/parking/space/booking/${parkingSpace.space_key}`}
              className="all-unset"
            >
              <Button>{parkingSpace.id}</Button>
            </Link>
          </CardContent>
        </Card>
      </ListItem>
    </>
  );
};

export default ParkingSpaceItem;

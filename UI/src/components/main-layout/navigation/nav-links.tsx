import { Button, List, ListItem, useMediaQuery, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavLinks = (props: any) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <List>
      <ListItem>
        <NavLink to="/" className="all-unset">
          <Button fullWidth={isSmall} onClick={props.close} color="inherit" size="large">
            Parking Area
          </Button>
        </NavLink>
        <NavLink to="/add-parking-area" className="all-unset">
          <Button fullWidth={isSmall} onClick={props.close} color="inherit" size="large">
            Create Parking Area
          </Button>
        </NavLink>
      </ListItem>
    </List>
  );
};

export default NavLinks;

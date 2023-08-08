import { Add, Login, Logout } from "@mui/icons-material";
import { Button, List, ListItem, useMediaQuery, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../../common/context/authentication-context";

const NavLinks = (props: any) => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (prop: any) => {
    auth.logout;
    return prop.close;
  };

  return (
    <List>
      <ListItem>
        <NavLink to="/" className="all-unset">
          <Button
            fullWidth={isSmall}
            onClick={props.close}
            color="inherit"
            size="small"
          >
            Parking Area
          </Button>
        </NavLink>
        {auth.isLoggedIn && (
          <NavLink to="/add-parking-area" className="all-unset">
            <Button
              fullWidth={isSmall}
              onClick={props.close}
              color="inherit"
              size="small"
            >
              <Add fontSize="small" /> Parking Area
            </Button>
          </NavLink>
        )}
        {!auth.isLoggedIn && (
          <NavLink to="/authenticate" className="all-unset">
            <Button
              fullWidth={isSmall}
              onClick={props.close}
              color="inherit"
              size="small"
            >
              <Login />
            </Button>
          </NavLink>
        )}
        {auth.isLoggedIn && (
          <Button
            fullWidth={isSmall}
            onClick={handleClick(props)}
            color="inherit"
            size="small"
          >
            <Logout />
          </Button>
        )}
      </ListItem>
    </List>
  );
};

export default NavLinks;

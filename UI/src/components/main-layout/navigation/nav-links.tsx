import { Add, Login, Logout } from "@mui/icons-material";
import { Button, List, ListItem, useMediaQuery, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../../common/context/authentication-context";

const NavLinks = (props: any) => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

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
          <NavLink to="/profile" className="all-unset">
            <Button
              fullWidth={isSmall}
              onClick={props.close}
              color="inherit"
              size="small"
            >
              Profile
            </Button>
          </NavLink>
        )}
        {auth.isLoggedIn && auth.user.isAdmin === true && (
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
            onClick={auth.logout}
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

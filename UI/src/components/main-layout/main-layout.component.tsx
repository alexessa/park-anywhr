import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { Navigation } from "./navigation/navigation.component";

export const MainLayout = () => {
  return (
    <Box>
      <AppBar position="fixed" sx={{ background: "#4db6ac" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Link to="/" className="all-unset">
                <Typography variant="h5" sx={{ width: "fit-content", cursor: "pointer" }}>
                  Park Anywhr
                </Typography>
              </Link>
            </Box>
          </Box>
          <Navigation />
        </Toolbar>
      </AppBar>
      <Box>
        <Toolbar />
      </Box>
    </Box>
  );
};

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { NavLink } from "react-router-dom";
import { AssignmentInd, ListAltOutlined } from "@mui/icons-material";
import PropTypes from 'prop-types';
import "./sideBar.css";

const drawerWidth = 240;
function sideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ mt: 10, pl:1 }}>
      <NavLink to="userList" className={({ isActive}) => isActive ? "nav_link active" : "nav_link"}>
        {" "}
        <AssignmentInd sx={{ mx: 2 }} /> UserList
      </NavLink>
      <NavLink to="subUser" className={({ isActive}) => isActive ? "nav_link active" : "nav_link"}>
        {" "}
        <ListAltOutlined sx={{ mx: 2 }} /> SubUser
      </NavLink>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            color: "white",
            backgroundColor: "#1976d2",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            color: "white",
            backgroundColor: "#1976d2",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

sideBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

export default sideBar;

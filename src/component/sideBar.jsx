import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import * as Icons from "react-icons/fa";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./sideBar.css";

const drawerWidth = 240;
const MenuList = [
  {
    id: "1",
    path: "userList",
    menuName: "UserList",
    menuIcon: "FaUserAlt",
  },
  {
    id: "2",
    path: "subUser",
    menuName: "SubUserList",
    menuIcon: "FaUserFriends",
  },
];

const DynamicFaIcon = ({ MenuIcon }) => {
  const IconComponent = Icons[MenuIcon];

  if (!IconComponent) { 
    return <Icons.FaUserAlt />;
  }

  return <IconComponent />;
};
function sideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id")

  console.log("id", id)

  console.log("role@@", role);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ mt: 10, pl: 1 }}>
      {MenuList.map((data) => (
        <Box key={data.id}>
        <NavLink
          to={`${data.path}`}
          className={({ isActive }) =>
            isActive ? "nav_link active" : "nav_link"
          }
        >
          {" "}
          <Box sx={{ mx: 2, fontSize:"18px" }}>
          <DynamicFaIcon MenuIcon={`${data.menuIcon}`} />
          </Box>
          <Box>{data.menuName}</Box>
        </NavLink>
        </Box>
      ))}
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

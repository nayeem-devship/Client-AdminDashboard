import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import * as Icons from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import SideBarData from "./sideBarData";
import "./sideBar.css";
import Api from "../Api";

const drawerWidth = 240;

const DynamicFaIcon = ({ MenuIcon }) => {
  const IconComponent = Icons[MenuIcon];

  if (!IconComponent) {
    return <Icons.FaUserAlt />;
  }

  return <IconComponent />;
};
function sideBar(props, { mobileOpen }) {
  const [userList, setUserList] = useState(false);
  const [SubUserList, setSubUserList] = useState(false);
  const [teams, setTeams] = useState(false);
  const { window } = props;
  const { onChange } = props;
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await Api.get(`/subUser/getSubUserById/${userId}`).then((res) => {
      console.log(res.data.data);
      setUserList(res.data.data.UserList);
      setSubUserList(res.data.data.SubUserList);
      setTeams(res.data.data.teams);
    });
  };

  console.log("subUserdata@@@@@", userList);
  console.log("subUserdat", SubUserList);

  console.log("id", userId);

  console.log("role@@", role);

  const drawer = (
    <Box sx={{ mt: 10, pl: 1 }}>
      <NavLink
        to="devShip"
        className={({ isActive }) =>
          isActive ? "nav_link active" : "nav_link"
        }
      >
        <Box sx={{ mx: 2, fontSize: "20px", display: "flex" }}>
          <MdDashboard />
        </Box>
        <Box>DashBoard</Box>
      </NavLink>
      {role === "user" ? (
        SideBarData.map((data) => (
          <Box key={data.id}>
            <NavLink
              to={`${data.path}`}
              className={({ isActive }) =>
                isActive ? "nav_link active" : "nav_link"
              }
            >
              {" "}
              <Box sx={{ mx: 2, fontSize: "18px", display: "flex" }}>
                <DynamicFaIcon MenuIcon={`${data.menuIcon}`} />
              </Box>
              <Box sx={{ fontSize: "18px", display: "flex" }}>
                {data.menuName}
              </Box>
            </NavLink>
          </Box>
        ))
      ) : (
        <>
          {userList ? (
            <NavLink
              to={"userList"}
              className={({ isActive }) =>
                isActive ? "nav_link active" : "nav_link"
              }
            >
              {" "}
              <Box sx={{ mx: 2, fontSize: "18px", display: "flex" }}>
                <Icons.FaUserAlt />
              </Box>
              <Box sx={{ fontSize: "18px", display: "flex" }}>UserList</Box>
            </NavLink>
          ) : (
            <></>
          )}
          <>
            {SubUserList ? (
              <NavLink
                to={"subUser"}
                className={({ isActive }) =>
                  isActive ? "nav_link active" : "nav_link"
                }
              >
                {" "}
                <Box sx={{ mx: 2, fontSize: "18px", display: "flex" }}>
                  <Icons.FaUserFriends />
                </Box>
                <Box sx={{ fontSize: "18px", display: "flex" }}>
                  SubUserList
                </Box>
              </NavLink>
            ) : (
              <></>
            )}
          </>
          <>
            {teams ? (
              <NavLink
                to={"teams"}
                className={({ isActive }) =>
                  isActive ? "nav_link active" : "nav_link"
                }
              >
                {" "}
                <Box sx={{ mx: 2, fontSize: "18px", display: "flex" }}>
                  <Icons.FaTeamspeak />
                </Box>
                <Box sx={{ fontSize: "18px", display: "flex" }}>
                  Teams
                </Box>
              </NavLink>
            ) : (
              <></>
            )}
          </>
        </>
      )}
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
        onClose={onChange}
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

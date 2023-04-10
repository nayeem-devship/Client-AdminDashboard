import React from "react";
import NavBar from "../../component/navBar";
import SideBar from "../../component/sideBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import "../../component/sideBar.css";

function DefaultLayout() {

  return (
    <div>
      <NavBar />
      <Box sx={{backgroundColor: "whitesmoke"}}>
        <div>
          <SideBar />
        </div>
        <div
          className= "main_content open"
        >
          <Outlet />
        </div>
      </Box>
    </div>
  );
}

export default DefaultLayout;
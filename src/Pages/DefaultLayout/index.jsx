import React, { useState } from "react";
import NavBar from "../../component/navBar";
import SideBar from "../../component/sideBar";
import { Outlet } from "react-router-dom";
import { Box, Container, Toolbar } from "@mui/material";
import "../../component/sideBar.css";

function DefaultLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const handleChange = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div onChange={handleChange}>
      <NavBar />
      <Box>
        <div>
          <SideBar />
        </div>
        <div
          className={collapsed === true ? "main_content open" : "main-content"}
        >
        <Container fixed>
          <Outlet />
        </Container>
        </div>
      </Box>
    </div>
  );
}

export default DefaultLayout;

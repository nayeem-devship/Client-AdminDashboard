import React, {useState} from "react";
import NavBar from "../../component/navBar";
import SideBar from "../../component/sideBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import "../../component/sideBar.css";

function DefaultLayout() {

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <NavBar onChange={handleDrawerToggle}/>
      <Box sx={{backgroundColor: "whitesmoke"}}>
        <div>
          <SideBar mobileOpen={mobileOpen} onChange={handleDrawerToggle}/>
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
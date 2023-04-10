import { Card, Typography } from "@mui/material";
import React from "react";

function subUsers() {
  return (
    <div>
    <Card sx={{ p: 3, minHeight: "450px" }}>
      <Typography variant="h5" sx={{ fontFamily: "poppins" }} component="div">
        SubUser
      </Typography>
    </Card>
    </div>
  );
}

export default subUsers;

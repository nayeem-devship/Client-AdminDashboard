import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import Api from "../../Api";

const columns = [
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "userName", headerName: "UserName", width: 200 },
  {
    field: "Action",
    fieldAlign: "center",
    headerName: "Action",
    headerAlign: "center",
    courser: "pointer",
    renderCell: (params) => {
      return (
        <div>
          <Tooltip title="Edit">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    },
  },
];

function userList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await Api.get(`/user/getUser`)
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box>
      <Typography variant="h5" sx={{ fontFamily: "poppins" }} component="div">
        UserList
      </Typography>
      <Box sx={{ width: "100%", mt: 2 }}>
        <DataGrid
          rows={userList}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
        />
      </Box>
    </Box>
  );
}

export default userList;

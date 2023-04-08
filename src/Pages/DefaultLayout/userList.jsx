import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import Api from "../../Api";
import { confirmAlert } from "react-confirm-alert";

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

  const deleteUserData = async (id) => {
    await Api.delete(`/user/deleteUser/${id}`)
      .then((res) => {
        console.log("res", res.data);
        getUser();
      })
      .catch((err) => console.log(err));
  };

  const submit = (_id) => {
    confirmAlert({
      title: "Are You Sure",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteUserData(_id);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

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
              <IconButton
                onClick={(_id) => {
                  submit(params.row._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

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

import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Api from "../../Api";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserList.css";

function userList() {
  const [subUserList, setSubUserList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [state, setState] = useState({
    UserList: "",
    SubUserList: "",
    teams: "",
  });

  const { UserList, SubUserList, teams } = state;

  console.log("UserList", UserList);
  console.log("SubUserList", SubUserList);
  console.log("teams", teams);

  const [id, setId] = useState("");

  const { control, getValues, setValue, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      password: "",
      cnfPassword: "",
      userName: "",
      status: "",
    },
  });

  const handleDialogeOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogeClose = () => {
    setDialogOpen(false);
    reset();
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await Api.get(`/subUser/getSubUser`)
      .then((res) => {
        setSubUserList(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteUserData = async (id) => {
    await Api.delete(`/subUser/deleteSubUser/${id}`)
      .then((response) => {
        console.log("response", response.data);
        if (response.status === 200) {
          toast.success("User Deleted Successfully");
        }
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
            getUser();
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    const userId = id;
    console.log("userId@@", userId);
    if (userId === "") {
      createUser();
    } else {
      updateUserData();
    }
    return reset();
  };

  console.log("id", id);

  const createUser = async () => {
    const userDetails = {
      firstName: getValues().firstName,
      lastName: getValues().lastName,
      email: getValues().email,
      password: getValues().password,
      cnfPassword: getValues().cnfPassword,
      userName: getValues().userName,
      status: getValues().status,
      UserList: UserList,
      SubUserList: SubUserList,
      teams: teams,
    };
    await Api.post(`subUser/addSubUser`, userDetails)
      .then((response) => {
        if (response.status === 200) {
          toast.success("User Added Successfully");
        }
        handleDialogeClose();
        reset();
        getUser();
        setState(false);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("User Already Exist");
        }
      });
  };

  const updateUserData = async (data) => {
    const userDetails = {
      id: getValues()._id,
      firstName: getValues().firstName,
      lastName: getValues().lastName,
      email: getValues().email,
      password: getValues().password,
      cnfPassword: getValues().cnfPassword,
      userName: getValues().userName,
      status: getValues().status,
      UserList: getValues().UserList,
      SubUserList: getValues().SubUserList,
      teams: getValues().teams,
    };
    await Api.put(`subUser/updateSubUser/${id}`, userDetails).then(
      (response) => {
        if (response.status === 200) {
          toast.success("Updated Successfully");
        }
        getUser();
        reset();
        setId("");
        handleDialogeClose();
      }
    );
  };

  const columns = [
    { field: "firstName", headerName: "First name", width: 120 },
    { field: "lastName", headerName: "Last name", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "userName", headerName: "UserName", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      courser: "pointer",
      renderCell: (params) => {
        const data = params.row.status;
        return (
          <div className={data === "ACTIVE" ? "activeStyle" : "blockStyle"}>
            {data}
          </div>
        );
      },
    },
    {
      field: "Action",
      fieldAlign: "center",
      headerName: "Action",
      headerAlign: "center",
      courser: "pointer",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex" }}>
            <Tooltip title="Edit">
              <IconButton
                type="submit"
                onClick={() => {
                  setId(params.row._id);
                  setValue("id", params.row._id);
                  setValue("firstName", params.row.firstName);
                  setValue("lastName", params.row.lastName);
                  setValue("email", params.row.email);
                  setValue("password", params.row.password);
                  setValue("cnfPassword", params.row.cnfPassword);
                  setValue("userName", params.row.userName);
                  setValue("status", params.row.status);
                  handleDialogeOpen();
                }}
              >
                <EditIcon sx={{ color: "#1b5e20" }} />
              </IconButton>
            </Tooltip>
            <div>
              <Tooltip title="Delete">
                <IconButton
                  onClick={(_id) => {
                    submit(params.row._id);
                  }}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <Card sx={{ p: 3, minHeight: "450px" }}>
        <ToastContainer />
        <Typography variant="h5" sx={{ fontFamily: "poppins" }} component="div">
          SubUserList
        </Typography>
        <div>
          <Button
            sx={{ mb: 2, px: 2, mt: 1 }}
            variant="contained"
            size="small"
            onClick={() => handleDialogeOpen()}
          >
            {"+"} Add
          </Button>
          <Dialog open={dialogOpen} onClose={() => handleDialogeClose()}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle
                sx={{ backgroundColor: "#01579b", color: "whitesmoke" }}
              >
                Add SubUser
              </DialogTitle>
              <Divider />
              <DialogContent
                sx={{
                  mt: -3,
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 400,
                }}
              >
                <Controller
                  name="firstName"
                  defaultValue=""
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      type="text"
                      label="First Name"
                      size="small"
                      autoFocus
                      margin="dense"
                      variant="standard"
                      required
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  defaultValue=""
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      type="text"
                      label="Last Name"
                      size="small"
                      autoFocus
                      margin="dense"
                      variant="standard"
                      required
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      type="email"
                      label="Email"
                      size="small"
                      autoFocus
                      margin="dense"
                      variant="standard"
                      required
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="password"
                  defaultValue=""
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      type="password"
                      label="Password"
                      size="small"
                      autoFocus
                      margin="dense"
                      variant="standard"
                      required
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="cnfPassword"
                  defaultValue=""
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      type="password"
                      label="Confirm Password"
                      size="small"
                      autoFocus
                      margin="dense"
                      variant="standard"
                      required
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="userName"
                  defaultValue=""
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      type="text"
                      label="UserName"
                      size="small"
                      autoFocus
                      margin="dense"
                      variant="standard"
                      required
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="status"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <FormControl variant="standard" margin="dense" fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Age"
                        onChange={onChange}
                        error={!!error}
                      >
                        <MenuItem value={"ACTIVE"}>ACTIVE</MenuItem>
                        <MenuItem value={"BLOCK"}>BLOCK</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={UserList}
                        onChange={handleChange}
                        name="UserList"
                      />
                    }
                    label="UserList"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={SubUserList}
                        onChange={handleChange}
                        name="SubUserList"
                      />
                    }
                    label="SubUserList"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={teams}
                        onChange={handleChange}
                        name="teams"
                      />
                    }
                    label="Teams"
                  />
                </Box>
              </DialogContent>
              <Box
                sx={{
                  pb: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-around",
                }}
              >
                <Button size="small" variant="contained" type="submit">
                  Submit
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    handleDialogeClose();
                    setId("");
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Dialog>
        </div>

        <DataGrid
          rows={subUserList}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={{ borderRadius: "2px" }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
        />
      </Card>
    </div>
  );
}

export default userList;

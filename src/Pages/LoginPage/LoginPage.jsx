import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import {
  Avatar,
  Box,
  Button,
  Card,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  ManageAccountsOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Api from "../../Api";
import { ToastContainer, toast } from "react-toastify";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  // const [fieldsType, setFieldsType] = useState("");
  // const [fieldName, setFieldName] = useState("");

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { control, getValues, handleSubmit } = useForm();

  console.log("getValues", getValues());

  const onSubmit = (data) => {
    console.log(data);
    handleFormSubmit();
    // handleChangeFields();
  };

  // const handleChangeFields = (e) =>{
  //   if(fieldsType === "/^[A-Za-z]+$/i"){
  //     setFieldsType("email");
  //   }
  //   else{
  //     setFieldsType("text");
  //   }
  // }

  const handleFormSubmit = async () => {
    const userDetails = {
      userName:getValues().userName,
      password: getValues().password,
    };
    await Api.post(`auth/login`, userDetails)
      .then((response) => {
        if (response.status === 200) {
          toast.success("User Login Successfully");
        }
        if (response.data.token) {
          const role = response.data.data.role;
          const token = response.data.token;
          const userName = response.data.data.userName;
          const id = response.data.data._id;
          const userId = response.data.data.userId;

          localStorage.setItem("USER_AUTH_STATE", true);
          localStorage.setItem("token", token);
          localStorage.setItem("userName", userName);
          localStorage.setItem("role", role)
          localStorage.setItem("id", id);
          localStorage.setItem("userId", userId);
          navigate(`${role}/devShip`);
          sessionStorage.setItem("USER_AUTH_STATE", true);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("incorrect Password");
        } else {
          toast.error("User not found");
        }
      });
  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="login_Page">
        <Card sx={{ p: "2rem", mx: "1rem" }}>
          <ToastContainer />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                mx: 1,
                bgcolor: "whitesmoke",
                border: "2px solid gray",
                height: "36px",
                width: "36px",
              }}
            >
              <ManageAccountsOutlined sx={{ color: "black" }} />
            </Avatar>
            <Typography sx={{ color: "inherit" }} variant="h5">
              Login Page
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Controller
              name="userName"
              defaultValue=""
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  sx={{ mb: 4 }}
                  type="text"
                  label="UserName & Email"
                  size="small"
                  variant="filled"
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
                <FormControl
                  variant="filled"
                  error={!!error}
                  fullWidth
                  size="small"
                  sx={{ mb: 3 }}
                  required
                >
                  <InputLabel>Password</InputLabel>
                  <FilledInput
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}
            />
            <Button type="submit" fullWidth variant="contained">
              Login
            </Button>
          </Box>
        </Card>
      </Box>
    </form>
  );
}

export default LoginPage;

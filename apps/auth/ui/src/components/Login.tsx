import axios from "axios";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { v4 as uuid } from "uuid";

import { colorScheme } from "../constants/colors";
import { ViewContext } from "../App";

import { PageTitle } from "./PageTitle";

const apiVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_API_URL`;
const schedulerVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_SCHEDULER_URL`;
const uiVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_UI_URL`;
const apiUrl = import.meta.env[apiVarName];
const schedulerUrl = import.meta.env[schedulerVarName];
const uiUrl = import.meta.env[uiVarName];

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { view, setView } = useContext(ViewContext);

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/login`, {
        email: user.email,
        password: user.password,
      });

      const returnedUser = res.data?.data;
      const token = res.data?.token;

      if (
        returnedUser &&
        returnedUser.role &&
        returnedUser.role.toUpperCase() === "ADMIN"
      ) {
        // TODO when timesheets auth moved here, differentiate redirect
        window.location.href = `${schedulerUrl}?tkn=${token}`;
      } else {
        window.location.href = `${schedulerUrl}?tkn=${token}`;
      }
    } catch (e) {
      console.log("error from login", e.message, e);
      setTimeout(() => {
        alert(`Login not successful. ${e.response?.data ?? e.message}`);
      }, 200);
    }
  };
  // handle forgotPassword
  async function handleForgot() {
    // validate email entered
    if (!user.email) {
      alert("Please enter your account email.");
      return;
    }
    // validate user exists in db
    try {
      const res = await axios.post(`${apiUrl}/api/v1/user-exists`, {
        email: user.email,
      });

      if (!res?.data?.userExists) {
        throw new Error("User not found.");
      }
    } catch (e) {
      return alert(
        `Unable to verify user exists. Please try a different email or contact your administrator.`,
      );
    }

    try {
      // send forgot password email
      await axios.post(
        `${import.meta.env.VITE_APP_MAIL_URL}/send-mail?client=ultrenostimesheets`,
        {
          from: "tech@take2tech.ca",
          useremail: "tmurv@shaw.ca",
          url: `${uiUrl}/?reset=${btoa(user.email)}`,
        },
      );
      // in-app message
      setTimeout(() => {
        alert(
          "Please check your inbox for an email with instructions to reset your password..",
        );
      }, 200);
    } catch (e) {
      // log error
      console.log("error from reset password:", e.message);
      // in-app message
      setTimeout(() => {
        alert(
          "Something went wrong with password reset. Please check your network connection.",
        );
      }, 200);
    }
  }

  return (
    <>
      <Box width="100%">
        <Box mt={4}>
          <PageTitle mainTitle="Login" subTitle="" />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <Button
            type="button"
            style={{
              width: "fit-content",
              fontStyle: "italic",
              fontSize: "16px",
              color: colorScheme.veryDarkBlue,
              marginTop: "20px",
            }}
            onClick={() => setView(view === "login" ? "signup" : "login")}
          >
            Click Here to Signup
          </Button>
        </Box>
        <Box style={{ marginTop: "0" }}>
          <FormControl
            sx={{
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "25px",
                }}
              >
                <Box m={1}>
                  <TextField
                    label={"Email"}
                    type="email"
                    id={uuid()}
                    value={user.email}
                    onChange={handleChange}
                    name="email"
                    required
                    autoFocus
                  />
                </Box>
                <Box m={1}>
                  <TextField
                    label={"Password"}
                    type="password"
                    id={uuid()}
                    value={user.password}
                    onChange={handleChange}
                    name="password"
                    required
                  />
                </Box>
              </Box>
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  sx={{ backgroundColor: colorScheme.veryDarkBlue }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
              <Box>
                <Button
                  type="button"
                  style={{
                    cursor: "pointer",
                    fontStyle: "italic",
                    fontSize: "16px",
                    marginTop: "15px",
                    color: colorScheme.veryDarkBlue,
                  }}
                  onClick={handleForgot}
                >
                  Change/Forgot Password
                </Button>
              </Box>
            </>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

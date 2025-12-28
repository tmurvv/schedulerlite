import * as React from "react";
import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useState } from "react";

import { UserRoles } from "../enums/UserRoles";
import { ViewContexts } from "../enums/ViewContexts";
import { ViewContext } from "../App";

import { PageTitle } from "./PageTitle";

const apiVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_API_URL`;
const uiVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_UI_URL`;
const apiUrl = import.meta.env[apiVarName];
const uiUrl = import.meta.env[uiVarName];
const { USER } = UserRoles;

export const SignUp = ({ setPage }) => {
  const { setView } = React.useContext(ViewContext);
  const [user, setUser] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name !== "passwordChangedAt") {
      // TODO: separate types from user to save from user on form
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async () => {
    if (!user?.firstName || user?.firstName.length < 1) {
      return alert("First name is required.");
    }
    if (!user?.lastName || user?.lastName.length < 1) {
      return alert("Last name is required.");
    }
    if (!user?.password || user?.password.length < 8) {
      return alert("Passwords must be at least 8 characters.");
    }
    if (user?.email !== user?.confirmEmail) {
      return alert("Emails do not match.");
    }
    if (user?.password !== user?.confirmPassword) {
      return alert("Passwords do not match.");
    }

    const id = uuid();

    const newUser = {
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      password: user.password,
      id,
      passwordChangedAt: new Date(),
      role: USER,
      projectManagerColor: "beige",
      projectManagerContrast: "black",
      userRoles: [UserRoles.PROJECT_MANAGER],
    };

    try {
      const res = await axios.put(`${apiUrl}/api/v1/signup/${id}`, newUser);

      console.log("res", res.data);
      if (res.status === 201 || res.status === 200) {
        alert(
          `Signup Successful. Welcome ${newUser.firstname}. Please login to continue.`,
        );
        window.location.href = `${uiUrl}`;
      }
    } catch (e: unknown) {
      alert(
        `Something went wrong on signup. Are you connected to the internet?`,
      );
    }
  };

  return (
    <>
      <Box mt={4}>
        <PageTitle mainTitle="Signup" subTitle="" />
      </Box>
      <Box py={4}>
        <Box
          style={{ cursor: "pointer", margin: "auto", width: "fit-content" }}
          onClick={() => {
            setView(ViewContexts.LOGIN);
          }}
        >
          <Button type="button">Click Here to Login</Button>
        </Box>
        <Box
          mt={2}
          width={"100%"}
          id="signup"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={() => handleSubmit()}>
            <Box
              width={"320px"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box m={1}>
                <TextField
                  label="First Name"
                  id={uuid()}
                  value={user?.firstName}
                  onChange={handleChange}
                  name="firstName"
                  required
                />
              </Box>
              <Box m={1}>
                <TextField
                  label="Last Name"
                  id={uuid()}
                  value={user?.lastName}
                  onChange={handleChange}
                  name="lastName"
                  required
                />
              </Box>
              <Box m={1}>
                <TextField
                  label="Email"
                  type="email"
                  id={uuid()}
                  value={user?.email}
                  onChange={handleChange}
                  name="email"
                  required
                />
              </Box>
              <Box m={1}>
                <TextField
                  label="Confirm Email"
                  type="email"
                  id={uuid()}
                  value={user?.confirmEmail}
                  onChange={handleChange}
                  name="confirmEmail"
                  required
                />
              </Box>
              <Box m={1}>
                <TextField
                  type="password"
                  label="Password"
                  id={uuid()}
                  value={user?.password}
                  onChange={handleChange}
                  name="password"
                  required
                />
              </Box>
              <Box m={1}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  id={uuid()}
                  value={user?.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  required
                />
              </Box>
            </Box>
            <Box my={3}>
              <ButtonGroup
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  type="button"
                  sx={{ alignItems: "center" }}
                  onClick={handleSubmit}
                  variant="contained"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() => setPage("Homepage")}
                  variant="contained"
                  sx={{ color: "white", backgroundColor: "black" }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

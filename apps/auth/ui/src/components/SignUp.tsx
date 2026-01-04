import * as React from "react";
import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { User } from "@schedulerlite/shared/src/types/users";

import { UserRoles } from "../enums/UserRoles";
import { ViewContexts } from "../enums/ViewContexts";
import { ViewContext } from "../App";

import { PageTitle } from "./PageTitle";

const { USER: USERROLE } = UserRoles;

type UserSignUpForm = Pick<User, "firstName" | "lastName" | "email"> & {
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

const apiVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_API_URL`;
const uiVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_UI_URL`;
const apiUrl = import.meta.env[apiVarName];
const uiUrl = import.meta.env[uiVarName];

console.log("apiVarName:", apiVarName);
console.log("uiVarName:", uiVarName);
console.log("apiUrl:", apiUrl);
console.log("uiUrl:", uiUrl);
export const SignUp = () => {
  const [user, setUser] = useState<UserSignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const { setView } = React.useContext(ViewContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!user.firstName) {
      alert("First name is required.");
      return;
    }
    if (!user.lastName) {
      alert("Last name is required.");
      return;
    }
    if (user.password.length < 8) {
      alert("Passwords must be at least 8 characters.");
      return;
    }
    if (user.email !== user.confirmEmail) {
      alert("Emails do not match.");
      return;
    }
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const id = crypto.randomUUID();

    const newUser = {
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      password: user.password,
      id,
      passwordChangedAt: new Date(),
      role: USERROLE,
      projectManagerColor: "beige",
      projectManagerContrast: "black",
      userRoles: [UserRoles.PROJECT_MANAGER],
    };

    console.log('newUser', newUser)
    try {
      const res = await axios.put(`${apiUrl}/api/v1/signup/${id}`, newUser);

      if (res.status === 200 || res.status === 201) {
        alert(
            `Signup Successful. Welcome ${newUser.firstname}. Please login to continue.`,
        );
        window.location.href = `${uiUrl}`;
      }
    } catch (e) {
      alert("Something went wrong on signup. Please try again.");
      console.log('e', e)
    }
  };

  return (
      <>
        <Box mt={4}>
          <PageTitle mainTitle="Signup" subTitle="" />
        </Box>

        <Box py={4}>
          <Box
              sx={{ cursor: "pointer", margin: "auto", width: "fit-content" }}
              onClick={() => setView(ViewContexts.LOGIN)}
          >
            <Button type="button">Click Here to Login</Button>
          </Box>

          <Box
              mt={2}
              width="100%"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <Box
                  width="320px"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
              >
                <Box m={1}>
                  <TextField
                      label="First Name"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      required
                  />
                </Box>
                <Box m={1}>
                  <TextField
                      label="Last Name"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      required
                  />
                </Box>
                <Box m={1}>
                  <TextField
                      label="Email"
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                  />
                </Box>
                <Box m={1}>
                  <TextField
                      label="Confirm Email"
                      type="email"
                      name="confirmEmail"
                      value={user.confirmEmail}
                      onChange={handleChange}
                      required
                  />
                </Box>
                <Box m={1}>
                  <TextField
                      label="Password"
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      required
                  />
                </Box>
                <Box m={1}>
                  <TextField
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleChange}
                      required
                  />
                </Box>
              </Box>

              <Box my={3}>
                <ButtonGroup
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                >
                  <Button variant="contained" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "black" }}
                      onClick={() => setView(ViewContexts.LOGIN)}
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

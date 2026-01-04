import axios from "axios";
import { Box, Button, FormControl, TextField } from "@mui/material";
import {
  // useContext,
  ChangeEvent,
  useState,
} from "react";

// import { ViewContext } from "../App";
import { colorScheme } from "../constants/colors";
// import LoginSignupCSS from "../styles/LoginSignup.css";
// import IndexCss from "../styles/index.css";

import { PageTitle } from "./PageTitle";

const apiVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_API_URL`;
const schedulerVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_SCHEDULER_URL`;
const apiUrl = import.meta.env[apiVarName];
const schedulerUrl = import.meta.env[schedulerVarName];

type ResetPasswordProps = {
  email?: string;
};

export const ResetPassword = ({ email }: ResetPasswordProps) => {
  // const { setView } = useContext(ViewContext);
  // const [open, setOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmpassword: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    // check password length
    if (passwords.password?.length < 8) {
      alert(`Passwords must be at least 8 characters long.`);
      return;
    }
    // check password match
    if (passwords.password !== passwords.confirmpassword) {
      alert(`Passwords do not match.`);
      return;
    }

    console.log("passwords", passwords);
    try {
      // reset password
      await axios.put(`${apiUrl}/api/v1/reset-password`, {
        email,
        password: passwords.password,
      });

      // in-app message
      setTimeout(() => {
        alert("Your password has been changed.");
        window.location.href = `${schedulerUrl}`;
      }, 500);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log(String(e));
      }
      // in-app message
      setTimeout(() => {
        alert("Something went wrong resetting password.");
      }, 200);
    }
  };

  return (
    <>
      <Box width="100%">
        <Box
          sx={{ padding: "70px" }}
          className="loginReset-signupReset-container"
        >
          <PageTitle
            mainTitle="Reset Password"
            subTitle="Passwords must be at least 8 characters"
          />
          <Box sx={{ marginTop: "0" }}>
            <FormControl
              sx={{
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "25px",
                  }}
                >
                  <Box m={1}>
                    <TextField disabled label={"Email"} value={email} />
                  </Box>
                  <Box m={1}>
                    <TextField
                      label={"New Password"}
                      type="password"
                      value={passwords.password}
                      // value={"demoPassword"}
                      onChange={handleChange}
                      name="password"
                      required
                      autoFocus
                    />
                  </Box>
                  <Box m={1}>
                    <TextField
                      label={"Confirm New Password"}
                      type="password"
                      value={passwords.confirmpassword}
                      onChange={handleChange}
                      name="confirmpassword"
                      required
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
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
              </>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;

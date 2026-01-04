import axios from "axios";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useContext, useState } from "react";

import { colorScheme } from "../constants/colors";
import { ViewContext } from "../App";

import { PageTitle } from "./PageTitle";

type LoginForm = {
    email: string;
    password: string;
};

const apiVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_API_URL`;
const schedulerVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_SCHEDULER_URL`;
const uiVarName = `VITE_APP_${import.meta.env.VITE_APP_ENV?.toUpperCase()}_UI_URL`;

const apiUrl = import.meta.env[apiVarName];
const schedulerUrl = import.meta.env[schedulerVarName];
const uiUrl = import.meta.env[uiVarName];

export const Login = () => {
    const [user, setUser] = useState<LoginForm>({ email: "", password: "" });
    const { view, setView } = useContext(ViewContext);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${apiUrl}/api/v1/login`, {
                email: user.email,
                password: user.password,
            });
            console.log('res', res)
debugger;
            const token = res.data?.token;
            console.log('schedulerUrl', schedulerUrl)
            window.location.href = `${schedulerUrl}?tkn=${token}`;
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log("error from login", e.message);
                alert(`Login not successful. ${e.message}`);
                return;
            }

            alert("Login not successful.");
        }
    };

    async function handleForgot() {
        if (!user.email) {
            alert("Please enter your account email.");
            return;
        }

        try {
            const res = await axios.post(`${apiUrl}/api/v1/user-exists`, {
                email: user.email,
            });

            if (!res?.data?.userExists) {
                throw new Error("User not found.");
            }
        } catch {
            alert(
                "Unable to verify user exists. Please try a different email or contact your administrator.",
            );
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_APP_MAIL_URL}/send-mail?client=ultrenostimesheets`,
                {
                    from: "tech@take2tech.ca",
                    useremail: user.email,
                    url: `${uiUrl}/?reset=${btoa(user.email)}`,
                },
            );

            alert(
                "Please check your inbox for an email with instructions to reset your password.",
            );
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log("error from reset password:", e.message);
            }

            alert(
                "Something went wrong with password reset. Please check your network connection.",
            );
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

                <FormControl
                    sx={{
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "25px",
                        }}
                    >
                        <Box m={1}>
                            <TextField
                                label="Email"
                                type="email"
                                value={user.email}
                                onChange={handleChange}
                                name="email"
                                required
                                autoFocus
                            />
                        </Box>
                        <Box m={1}>
                            <TextField
                                label="Password"
                                type="password"
                                value={user.password}
                                onChange={handleChange}
                                name="password"
                                required
                            />
                        </Box>
                    </Box>

                    <Box
                        mt={2}
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
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
                </FormControl>
            </Box>
        </>
    );
};

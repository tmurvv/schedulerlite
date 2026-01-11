import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();

    const [navMenuAnchorElement, setNavMenuAnchorElement] =
        useState<HTMLElement | undefined>();

    const [profileMenuAnchorElement, setProfileMenuAnchorElement] =
        useState<HTMLElement | undefined >();

    const isNavMenuOpen = Boolean(navMenuAnchorElement);
    const isProfileMenuOpen = Boolean(profileMenuAnchorElement);

    const openNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setNavMenuAnchorElement(event.currentTarget);
    };

    const closeNavMenu = () => {
        setNavMenuAnchorElement(null);
    };

    const openProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setProfileMenuAnchorElement(event.currentTarget);
    };

    const closeProfileMenu = () => {
        setProfileMenuAnchorElement(null);
    };

    const goTo = (path: string) => {
        closeNavMenu();
        closeProfileMenu();
        navigate(path);
    };

    const logout = () => {
        closeNavMenu();
        closeProfileMenu();
        const logoutUrl = import.meta.env.VITE_LOGOUT_URL;

        if (!logoutUrl) {
            console.warn('LOGOUT_URL is not set (process.env.LOGOUT_URL).');
            return;
        }

        window.location.assign(logoutUrl);
    };

    return (
        <AppBar position="static" color="secondary" elevation={1}>
            <Toolbar>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={openNavMenu}
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        anchorEl={navMenuAnchorElement}
                        open={isNavMenuOpen}
                        onClose={closeNavMenu}
                    >
                        <MenuItem onClick={() => goTo("/")}>Home</MenuItem>
                        <MenuItem onClick={() => goTo("/timesheets/new")}>
                            Add Timesheet
                        </MenuItem>
                        <MenuItem onClick={() => goTo("/timesheets")}>
                            View Timesheets
                        </MenuItem>
                    </Menu>
                </Box>

                <Typography variant="h6" sx={{ flexGrow: 1, ml: { xs: 1, md: 0 } }}>
                    Timesheets
                </Typography>

                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                    <MenuItem onClick={() => goTo("/")}>Home</MenuItem>
                    <MenuItem onClick={() => goTo("/timesheets/new")}>
                        Add Timesheet
                    </MenuItem>
                    <MenuItem onClick={() => goTo("/timesheets")}>
                        View Timesheets
                    </MenuItem>
                </Box>

                <IconButton
                    color="inherit"
                    onClick={openProfileMenu}
                    aria-label="profile"
                    sx={{ ml: 1 }}
                >
                    <AccountCircleIcon />
                </IconButton>

                <Menu
                    anchorEl={profileMenuAnchorElement}
                    open={isProfileMenuOpen}
                    onClose={closeProfileMenu}
                >
                    <MenuItem onClick={() => goTo("/profile")}>Profile</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

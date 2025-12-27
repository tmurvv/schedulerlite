// src/theme/theme.ts
import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {main: "#008080"},   // Teal
        secondary: {main: "#d4af37"}, // Old Gold
        background: {
            // default: "#eae0c8",      // manilla folder color
            default: "#f6f4ef",         // White matching theme
            paper: "#ffffff",           // stark white
        },
        text: {
            primary: "#000000",         // Black
            secondary: "#708090",       // Slate Gray
        },
    },
});

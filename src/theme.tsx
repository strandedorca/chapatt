import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'dark'
        ? {
            background: {
                default: "#313338",
                dark: "#313338",
                darker: "#232428",
                light: "#404249",
                button: "#5865f2",
            },
            text: {
                primary: "#ffffff",
                secondary: "#b5bac1",
            }
        }
        : {
            background: {
                default: "#ffffff",
                dark: "#f2f3f5",
                darker: "#e3e5e8",
                light: "#d7d9dc",
                button: "#5865f2",
            },
            text: {
                primary: "#000000",
                secondary: "#383839",
            }
        }),
    }
})
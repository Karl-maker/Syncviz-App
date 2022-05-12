import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, createContext, useMemo } from "react";

// https://mui.com/material-ui/customization/dark-mode/

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function StyleProvider({ children }) {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                text: {
                  primary: "#2d3436",
                  secondary: "#636e72",
                },
                background: {
                  paper: "#2980b9",
                },
              }
            : {
                background: {
                  default: "#2c3e50",
                  paper: "#34495e",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
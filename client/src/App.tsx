import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  RouterProvider,
} from "react-router-dom";
import { Root } from "Root";
import { HomePage } from "scenes/homePage/index";
import { LoginPage } from "scenes/loginPage/index";
import { ProfilePage } from "scenes/profilePage/index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colorTokens, themeSettings } from "theme";
import { AppState } from "state";
// import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import * as mui from "@mui/material/styles/createPalette";
declare module "@mui/material/styles" {
  // interface Theme {
  //   mode: "dark";
  // }
  interface Theme{
    palette:{
      backgrounds:{
        alt:string,
        default:string
      }
    }
  }
  interface Palette {
    neutral: Palette["primary"];
    backgrounds: Palette["background"];
  }
  // interface PaletteColor {
  //   alt?: string;
  // }
  // interface paletteColorOptions {
  //   alt?: string;
  // }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    backgrounds: PaletteOptions["background"];
    // alt:paletteColorOptions["alt"]
  }
}


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Route>
    )
  );

  const mode: string = useSelector((state: AppState) => state.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;

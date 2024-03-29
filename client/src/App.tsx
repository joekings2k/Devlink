import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  RouterProvider,
  Navigate,
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



function App() {
  const mode: string = useSelector((state: AppState) => state.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isAuth = Boolean(useSelector((state: AppState) => state.token));


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<LoginPage />} />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Route>
    )
  );


  

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

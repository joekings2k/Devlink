import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  RouterProvider,
} from "react-router-dom";
import { Root } from "Root";
import { HomePage } from "scenes/homePage";
import { LoginPage } from "scenes/loginPage";
import { ProfilePage } from "scenes/profilePage";

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

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
    )
}

export default App;

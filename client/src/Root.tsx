import { Outlet } from "react-router-dom";
import { Navbar } from "scenes/navbar";
import { NavUnsecure } from "scenes/navbar/navUnscecrue";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "state";

export const Root = () => {
   const user = useSelector((state: AppState) => state.user);
  return (
    <>
      <div>{!user ? <NavUnsecure /> : <Navbar />}</div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

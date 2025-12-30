import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center m-auto text-center">
        <Outlet />
      </div>
    </div>
  );
};

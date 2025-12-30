import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

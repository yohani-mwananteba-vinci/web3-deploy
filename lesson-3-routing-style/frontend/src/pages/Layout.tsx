import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Toaster } from "sonner";

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center m-auto text-center">
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
};

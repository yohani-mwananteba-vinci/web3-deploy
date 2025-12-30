import { NavLink, useLocation } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation();
  return (
    <div className="bg-green-900 p-5 text-center text-white">
      <nav className="flex items-center justify-evenly">
        <NavLink className={location.pathname === "/" ? "font-bold" : ""} to={"/"}>Home</NavLink>
        <NavLink className={location.pathname === "/add" ? "font-bold" : ""} to={"/add"}>Add Expense</NavLink>
        <NavLink className={location.pathname === "/list" ? "font-bold" : ""} to={"/list"}>View Expenses</NavLink>
      </nav>
    </div>
  );
};

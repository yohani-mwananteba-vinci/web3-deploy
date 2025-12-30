import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav>
      <button>
        <NavLink to={"/"}>Home</NavLink>
      </button>
      <button>
        <NavLink to={"/list"}>View Expenses</NavLink>
      </button>
      <button>
        <NavLink to={"/add"}>Add Expense</NavLink>
      </button>
    </nav>
  );
};

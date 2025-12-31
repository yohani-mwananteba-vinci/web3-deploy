import { NavLink } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="flex flex-col gap-6"> {/* C: erreur – dans la solution, le conteneur est centré avec "text-center" et non une simple colonne flexible */}
      <div className="text-2xl"> {/* C: erreur – dans la solution, le titre est beaucoup plus mis en avant ("text-5xl") */}
        <h1 className="font-bold">Welcome to the Expense Tracker</h1>
        <div>
          <p>
            This application helps you keep track of shared expenses between
            friends, roommates or colleagues. You can add new expenses, see who
            paid what and get a clear overview of your spending.
          </p>
          <p>
            Use the navigation above to add a new expense or view the full list.
            You can then sort the existing expenses to better understand how
            your budget evolves over time.
          </p>
        </div>
      </div>
      <div className="text-white font-bold gap-2"> {/* C: erreur – dans la solution, ce bloc est une ligne centrée ("flex flex-row gap-4 justify-center") */}
        <NavLink
          to={"/add"}
          className={"bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"}
        >
          Add Expense
        </NavLink>
        <NavLink
          to={"/list"}
          className={"bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"}
        >
          View Expenses
        </NavLink>
      </div>
    </div>
  );
}

import { createBrowserRouter, RouterProvider } from "react-router";
import Layout, { loader as layoutLoader } from "./pages/Layout";
import Transactions, {
  loader as transactionsLoader,
} from "./pages/Transactions";
import ExpenseDetail, {
  loader as expenseDetailLoader,
} from "./pages/ExpenseDetails";
import NewTransfer, { loader as NewTransferLoader } from "./pages/NewTransfer";
import NewExpense, { loader as NewExpenseLoader } from "./pages/NewExpense";

import Welcome from "./pages/Welcome";

const router = createBrowserRouter([
  {
    Component: Layout,
    loader: layoutLoader,
    id: "layout",

    children: [
      { index: true, Component: Welcome },
      {
        path: "transactions",
        Component: Transactions,
        loader: transactionsLoader,
      },
      {
        path: "expenses/:id",
        Component: ExpenseDetail,
        loader: expenseDetailLoader,
      },
      {
        path: "expenses/new",
        Component: NewExpense,
        loader: NewExpenseLoader,
      },
      {
        path: "transfers/new",
        Component: NewTransfer,
        loader: NewTransferLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

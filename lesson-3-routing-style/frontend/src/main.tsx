import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import List from "./pages/List.tsx";
import Add from "./pages/Add.tsx";
import Welcome from "./pages/Welcome.tsx";
import { Layout } from "./pages/Layout.tsx";

const router = createBrowserRouter([
  {
    // # No path for the layout route, @see https://reactrouter.com/start/data/routing#layout-routes
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

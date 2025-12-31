import { createRoot } from "react-dom/client";
import "./index.css";
// C: erreur – dans la solution, main.tsx importe App et ne connaît pas directement react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // C: erreur – dans la solution, le routeur est créé dans App.tsx, pas dans main.tsx
import Home from "./pages/Home.tsx"; // C: erreur – ces pages sont importées dans App.tsx (où se trouve le router), pas dans main.tsx
import List from "./pages/List.tsx"; // C: erreur – même remarque, main.tsx ne connaît que App
import Add from "./pages/Add.tsx"; // C: erreur – import inutile ici par rapport à la solution
import Welcome from "./pages/Welcome.tsx"; // C: erreur – devrait être importé dans App.tsx pour la config des routes
import { Layout } from "./pages/Layout.tsx"; // C: erreur – Layout est utilisé par le router dans App.tsx dans la solution

// C: erreur – dans la solution, cette configuration de router se trouve dans App.tsx
// C:            et est combinée avec PageContext pour partager l’API et les erreurs entre les pages
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
        // C: erreur – route /home absente dans la solution, la page d’accueil est l’index (Welcome)
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} /> // C: erreur – dans la solution, main.tsx rend <App /> uniquement
  // C:            et c’est App qui contient RouterProvider + PageContext (gestion API + erreurs centralisée)
);

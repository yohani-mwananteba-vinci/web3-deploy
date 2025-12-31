import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { Toaster } from "sonner"; // C: erreur – la solution importe le Toaster depuis '@/components/ui/sonner', pas directement depuis la lib

export const Layout = () => {
  return (
    <div> {/* C: erreur – dans la solution, le conteneur racine est "min-h-screen flex flex-col" pour occuper toute la hauteur et structurer header/main/footer */}
      <NavBar />
      <div className="flex items-center justify-center m-auto text-center"> {/* C: erreur – la solution utilise <main className="flex-1 w-7xl m-auto p-4"> comme zone de contenu plutôt qu'un simple div centré */}
        <Toaster /> {/* C: erreur – dans la solution, le Toaster est en dehors du main, en bas du layout, pour être vraiment global */}
        <Outlet />
      </div>
    </div>
  );
};

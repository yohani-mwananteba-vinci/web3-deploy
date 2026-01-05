import { Outlet } from "react-router";
import { useState } from "react";
import type { User } from "@/types/User";
import { Toaster } from "sonner";
import Header from "@/components/Header";

export default function Layout() {
  // C: inutile car déjà géré par useAuth() (voir NewExpense/Component.tsx)
  const [currentUser, setCurrentUser] = useState<null | User>(null); // C: inutile car déjà géré par le contexte d'authentification

  // C: inutile car on a plus de besoin de context ici (on utilise useAuth() dans les enfants)
  const outletContext = {
    currentUser,
  };

  // C: inutile car on a plus de besoin de context ici (on utilise useAuth() dans les enfants)
  return (
    <div>
      <Header />
      <main className="p-6">
        <Outlet context={outletContext} />  
      </main>
      <Toaster />
    </div>
  );
}

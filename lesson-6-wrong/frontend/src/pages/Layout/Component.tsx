import { Outlet } from "react-router";
import { useState } from "react";
import type { User } from "@/types/User";
import { Toaster } from "sonner";
import Header from "@/components/Header";

export default function Layout() {
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  const outletContext = {
    currentUser,
  };

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

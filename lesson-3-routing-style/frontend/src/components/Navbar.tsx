import { NavLink, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export const NavBar = () => {
  const location = useLocation();
  return (
    <div className="bg-green-700 items-center">
      <NavigationMenu className="mx-auto flex max-w-5xl px-4 py-3 text-white">
        <NavigationMenuList className="flex gap-6">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink
                className={location.pathname === "/" ? "font-bold" : ""}
                to={"/"}
              >
                Home
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink
                className={location.pathname === "/add" ? "font-bold" : ""}
                to={"/add"}
              >
                Add Expense
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink
                className={location.pathname === "/list" ? "font-bold" : ""}
                to={"/list"}
              >
                View Expenses
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

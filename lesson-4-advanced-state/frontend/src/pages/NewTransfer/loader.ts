import ApiClient from "@/lib/api";
import type { User } from "@/types/User";

export interface LoaderData {
  users: User[];
  // C: Dans la solution, le loader ne renvoie que la liste des utilisateurs.
  // C: La propriété "transfers" ajoutée ici n'est jamais remplie ni utilisée.
  transfers: [];
}

export async function loader() {
  const users = await ApiClient.getUsers();
  // C: La solution renvoie directement { users } sans appliquer ?? [] ;
  //    ta version est plus défensive, mais le type LoaderData pourrait alors refléter que users peut être vide.
  return { users: users ?? [] };
}

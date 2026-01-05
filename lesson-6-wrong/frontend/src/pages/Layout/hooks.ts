// C: Ce fichier devait être déplacé dans un autre dossier car il n'a plus de lien avec le Layout
// => frontend/src/contexts/hooks.ts
import type { User } from '@/types/User';
import { useOutletContext } from 'react-router';

// C: Il fallait que cette fonction utilise useAuth() pour récupérer l'utilisateur courant, plus de OutletContext 
export function useCurrentUser() {
  const { currentUser } = useOutletContext<{ currentUser: User | null }>();
  return currentUser;
}


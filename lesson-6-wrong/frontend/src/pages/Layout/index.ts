// C: Ce fichier devait être déplacé dans un autre dossier car il n'a plus de lien avec le Layout
// => frontend/src/contexts/index.ts
export { default } from './Component';
export { loader } from './loader'; //C: export inutile car le loader n'est plus utile
export { useCurrentUser } from './hooks';

// C: Voici la structure recommandée pour ce fichier déplacé :
// export { default as AuthContext } from './Context';
// export { default as AuthProvider } from './Provider';
// export { default as useAuth, useCurrentUser } from './hook';
// export * from './types';

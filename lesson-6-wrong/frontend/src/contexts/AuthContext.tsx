// C: Ce fichier aurait pû être renommé en Provider.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

// C: On pouvait déplacer les types User et AuthContextType dans un fichier contexts/types.ts
interface User {
  userId: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// C: Cette fonction aurait pû être dans un fichier contexts/Context.ts et être uniquement invoquée ici
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      try {
        return jwtDecode<User>(storedToken);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
    }
    return null;
  });

  const login = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    const decoded = jwtDecode<User>(newToken);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  // Check if token is expired on mount and periodically
  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // Token expired
          logout();
        }
      } catch {
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// C: Cette fonction n'aurait pas être là, il fallait la déplacer dans un fichier contexts/hooks.ts
export function useAuth() {
  const context = useContext(AuthContext);  //C: AuthContext aurait dû être importé (voir plus haut)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

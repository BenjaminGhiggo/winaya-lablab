/* import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Definimos la estructura de nuestro contexto
interface AuthContextType {
  isAuthenticated: boolean;
  handleSignOut: () => Promise<void>;
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Monitorea el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definimos la estructura de nuestro contexto
interface AuthContextType {
  isAuthenticated: boolean;
  handleSignOut: () => void; // Ahora no hace nada
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Siempre consideramos que el usuario está "autenticado" para eliminar la necesidad de Firebase
  const [isAuthenticated] = useState<boolean>(true);

  // handleSignOut no necesita interactuar con Firebase
  const handleSignOut = () => {
    console.log("SignOut: No hay autenticación activa");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

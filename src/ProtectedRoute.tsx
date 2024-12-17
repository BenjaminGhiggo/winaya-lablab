/* import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/welcome" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
 */

import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Redirigir a la página de bienvenida sin comprobar autenticación
  return <Navigate to="/auth/welcome" />;
};

export default ProtectedRoute;

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
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  // Elimina la condición que bloquea la navegación
  return <>{children}</>;
};

export default ProtectedRoute;

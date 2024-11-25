// AuthRoutes.tsx
import React from 'react';
import { Routes, Route,/* Navigate */} from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Welcome from './pages/Welcome';

const AuthRoutes: React.FC = () => (
    <Routes>
      {/* <Route path="/" element={<Navigate to="welcome"/>} /> */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="welcome" element={<Welcome />} />
    </Routes>
);

export default AuthRoutes;

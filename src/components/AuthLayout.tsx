import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import "../pages/AnimatedBackground.css"; // Archivo de estilos de fondo 
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="animated-background"></div>
      <div className="w-full max-w-md bg-white rounded-3xl p-8 auth-container">
        <Link to="/auth/welcome" className="flex items-center text-gray-600 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Volver</span>
        </Link>
        
        <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
        <p className="text-gray-600 text-center mb-8">{subtitle}</p>
        
        {children}
      </div>
    </div>
  );
};
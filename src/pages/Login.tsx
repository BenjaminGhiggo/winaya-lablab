import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Manejar cambios en los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulación de inicio de sesión (sin autenticación)
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Acceso directo permitido. No se validan credenciales.");
    navigate('/feed'); // Redirige directamente al feed
  };

  const handleGoogleLogin = () => {
    console.log("Acceso directo permitido con Google Login simulado.");
    navigate('/feed'); // Redirige directamente al feed
  };

  return (
    <AuthLayout
      title="Iniciar Sesión"
      subtitle="¡Bienvenido de vuelta!"
    >
      <form onSubmit={handleEmailLogin}>
        <AuthInput
          type="email"
          name="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="Tu contraseña"
          value={formData.password}
          onChange={handleChange}
        />

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-medium auth-gradient mb-4 hover:bg-auth-gradient2 transition-ease duration-30"
        >
          Iniciar Sesión
        </button>
      </form>

      <p className="text-center text-gray-600 mb-4">
        ¿No tienes una cuenta?{' '}
        <Link to="/auth/register" className="text-purple-600 font-medium hover:underline">
          Regístrate
        </Link>
      </p>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-gray-500">O continúa con</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full py-3 px-4 border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        <span className="text-gray-700">Google</span>
      </button>
    </AuthLayout>
  );
};

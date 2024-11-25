import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/'); // Updated to redirect to WINAYA
    } catch (error) {
      setError('Error al crear la cuenta. Por favor, intenta de nuevo.');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/'); // Updated to redirect to WINAYA
    } catch (error) {
      setError('Error al registrarse con Google. Por favor, intenta de nuevo.');
    }
  };

  return (
    <AuthLayout
      title="Registrarse"
      subtitle="Crea una cuenta para comenzar"
    >
      <form onSubmit={handleEmailRegister}>
        <AuthInput
          type="text"
          name="name"
          placeholder="Tu nombre completo"
          value={formData.name}
          onChange={handleChange}
        />
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
          Registrarse
        </button>
      </form>

      <p className="text-center text-gray-600 mb-4">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/auth/login" className="text-purple-600 font-medium hover:underline">
          Inicia sesión
        </Link>
      </p>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-gray-500">O continúa con</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <button
        onClick={handleGoogleRegister}
        className="w-full py-3 px-4 border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        <span className="text-gray-700">Google</span>
      </button>
    </AuthLayout>
  );
};
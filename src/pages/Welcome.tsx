import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./AnimatedBackground.css"; // Archivo de estilos de fondo 

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Fondo animado */}
      <div className="animated-background"></div>

      {/* Contenido principal */}
      <div className="z-10 max-w-md w-full bg-white backdrop-blur-lg rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-40 h-30 bg-white rounded-2xl flex items-center justify-center">
            <img
              src="https://i.postimg.cc/9f72QTtk/WINAYA-LOGO.jpg"
              alt="Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <h1 className="text-3xl font-bold text-center bg-gradient-to-l from-orange-600 to-fuchsia-500 bg-clip-text text-transparent">
            WINAYA
          </h1>

          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
            Donde las emprendedoras hacen historia.
            </h2>
            <p className="text-gray-600">
              Muestra tus productos, aprende y crece con nosotras.
            </p>
          </div>

          <button
            onClick={() => navigate("/auth/login")}
            className="w-full text-white py-3 px-6 rounded-xl font-semibold 
           flex items-center justify-center space-x-2 
           bg-gradient-to-r from-orange-500 to-pink-500 
           hover:animate-gradient transition-all duration-1000"
          >
            <span>Empezar</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
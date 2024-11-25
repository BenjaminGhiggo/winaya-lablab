// src/components/agents/MarketingAgent.tsx

import { useState, useEffect, useRef } from 'react';
import { Paperclip, ArrowUp } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function MarketingAgent() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy Clara, tu Agente de Marketing, y aunque soy una papa, ¡no soy nada básica! Estoy aquí para ayudarte a sembrar estrategias de marketing efectivas, cosechar seguidores en redes sociales y hacer que tu marca destaque. ¿Qué proyecto quieres cultivar hoy?',
      isBot: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Variables de estado para datos adicionales y mensaje original
  const [needsAdditionalData, setNeedsAdditionalData] = useState(false);
  const [producto, setProducto] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [originalMessage, setOriginalMessage] = useState('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const suggestions = [
    '💡 ¿Puedes crearme una campaña de marketing?',
    '🎯 ¿Cómo puedo atraer más clientes sin gastar dinero?',
    '📢 ¿Qué tipo de anuncios funcionan mejor en redes sociales?',
    '💰 ¿Qué es el ROI?',
  ];

  // Definir la URL base de la API
  const API_BASE_URL = 'http://localhost:8000';

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || inputText;

    if (messageToSend.trim() === '') return;

    const userMessage = { id: Date.now(), text: messageToSend, isBot: false };
    setMessages([...messages, userMessage]);
    setInputText('');
    setLoading(true);
    setShowSuggestions(false);

    // Determinar si se necesitan datos adicionales
    if (messageToSend.toLowerCase().includes('crear') && messageToSend.toLowerCase().includes('campaña de marketing')) {
      setNeedsAdditionalData(true);
      setOriginalMessage(messageToSend); // Guardar el mensaje original
      setLoading(false);
      return;
    }

    // Preparar el payload
    const payload: any = {
      user_input: messageToSend,
      producto: producto || null,
      objetivo: objetivo || null,
      presupuesto: presupuesto ? parseFloat(presupuesto) : null,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/agente_marketing/`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.respuesta || 'Lo siento, no pude obtener una respuesta.',
        isBot: true,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      // Resetear datos adicionales
      setProducto('');
      setObjetivo('');
      setPresupuesto('');
      setOriginalMessage('');
    } catch (error: any) {
      console.error('Error al enviar el mensaje:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      const botMessage = {
        id: Date.now() + 1,
        text: 'Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.',
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      toast.error('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
      setNeedsAdditionalData(false);
    }
  };

  const handleSubmitAdditionalData = async () => {
    if (producto.trim() === '' || objetivo.trim() === '' || presupuesto.trim() === '' || !originalMessage) {
      alert('Por favor, completa toda la información solicitada.');
      return;
    }

    setLoading(true);
    setNeedsAdditionalData(false);

    // Preparar el payload con el mensaje original y los datos adicionales
    const payload: any = {
      user_input: originalMessage,
      producto: producto,
      objetivo: objetivo,
      presupuesto: parseFloat(presupuesto),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/agente_marketing/`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.respuesta || 'Lo siento, no pude obtener una respuesta.',
        isBot: true,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      // Resetear datos adicionales
      setProducto('');
      setObjetivo('');
      setPresupuesto('');
      setOriginalMessage('');
    } catch (error: any) {
      console.error('Error al enviar el mensaje:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      const botMessage = {
        id: Date.now() + 1,
        text: 'Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.',
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      toast.error('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (loading) {
      intervalRef.current = setInterval(() => {
        setDots((prev) => (prev.length === 3 ? '' : prev + '.'));
      }, 500);
    } else {
      setDots('');
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loading]);

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Header */}
      <div className="flex direction-row bg-white p-4 border-b justify-center gap-2">
        <h1 className="text-xl font-semibold text-black flex justify-center items-center">Agente de Marketing</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white overflow-y-auto p-4 space-y-4 h-3/4 gap-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <img
                src="https://i.pinimg.com/736x/45/ae/10/45ae101f8a4a21b2c249e88f52602a6c.jpg" // Cambia esta URL por la imagen del robot
                alt="Robot"
                className="w-12 h-12 mr-1"
              />
            )}
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.isBot
                  ? 'bg-plomo-chat text-black-400 font-normal shadow-md'
                  : 'bg-purple-500 text-white shadow-md'
              }`}
            >
              <p>{message.text}</p>
            </div>
            {!message.isBot && (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBD_ykDcG8TKeoMNSGsF88UYXjqjx3ZCeX-g&s"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-purple-500 ml-3"
              />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-plomo-chat text-black-400 shadow-md">
              <p>Consultando{dots}</p>
            </div>
          </div>
        )}

        {/* Formulario para datos adicionales */}
        {needsAdditionalData && (
          <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Información adicional requerida:</h2>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Ingresa el nombre de tu producto"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Ingresa el objetivo de tu campaña"
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Ingresa tu presupuesto"
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
              <button
                onClick={handleSubmitAdditionalData}
                className="px-4 py-2 bg-purple-600 text-white rounded-md mt-2"
              >
                Enviar
              </button>
            </div>
          </div>
        )}

        {/* Sugerencias */}
        {showSuggestions && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-[#EFDCF4] hover:bg-[#C783D8] text-black px-3 py-2 rounded-lg shadow-md transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Input */}
      <div className="p-3 border-3 bg-pink-200 mx-4 rounded-3xl border-transparent hover:border-3 hover:border-pink-700 transition-all">
        <div className="relative flex items-center gap-3">
          <textarea
            placeholder="Envía un mensaje a Clara"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="flex-1 px-4 py-2 rounded-3xl text-black-400 focus:outline-none resize-none bg-pink-200"
            style={{ overflow: 'hidden' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <button>
            <Paperclip className="w-5 h5" />
          </button>
          <button
            onClick={() => handleSendMessage()} // Llama a la función sin argumentos
            className="p-2 bg-pink-400 text-white rounded-full hover:bg-pink-700"
          >
            <ArrowUp className="w-5 h-5 transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      {/* Contenedor de Notificaciones */}
      <ToastContainer />
    </div>
  );
}

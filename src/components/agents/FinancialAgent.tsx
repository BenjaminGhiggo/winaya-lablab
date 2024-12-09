
// src/components/agents/FinancialAgent.tsx

import { useState, useEffect, useRef } from 'react';
import { ArrowUp, Paperclip } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Definir la URL base de la API directamente
const API_BASE_URL = 'https://3939-3-137-199-132.ngrok-free.app';

export function FinancialAgent() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy Mari 👋, tu Agente Financiera, y aunque no tengo cuerdas como un quipu, estoy aquí para desatar todos los nudos de tus finanzas. ¿Necesitas ordenar tu presupuesto, planear inversiones o encontrar formas de hacer crecer tu negocio? ¡No te preocupes, yo me encargo! ¿Por dónde empezamos?',
      isBot: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const suggestions = [
    '🐖 ¿Cómo puedo ahorrar más dinero?',
    '📈 ¿Qué es un fondo de inversión?',
    '📝 ¿Cómo crear un presupuesto efectivo?',
    '📊 ¿Cuáles son las mejores opciones de financiamiento?',
  ];

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || inputText.trim();

    if (messageToSend === '') return;

    const userMessage = { id: Date.now(), text: messageToSend, isBot: false };
    setMessages([...messages, userMessage]);
    setInputText('');
    setLoading(true);
    setShowSuggestions(false);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/agente_financiero/`,
        {
          user_input: messageToSend,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Verificar si response.data es un objeto y tiene la clave 'respuesta'
      if (response.data && typeof response.data === 'object' && 'respuesta' in response.data) {
        const botMessage = {
          id: Date.now() + 1,
          text: response.data.respuesta || 'Lo siento, no pude obtener una respuesta.',
          isBot: true,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        throw new Error('Respuesta inesperada del servidor.');
      }
    } catch (error: any) {
      console.error('Error al enviar el mensaje:', error);
      toast.error('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.');
      const botMessage = {
        id: Date.now() + 1,
        text: 'Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.',
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
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

  // Desplazarse al final del chat cuando se agregan nuevos mensajes
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Header */}
      <div className="flex direction-row bg-white p-4 border-b justify-center gap-2">
        <h1 className="text-xl font-semibold text-black flex justify-center items-center">Agente Financiero</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white overflow-y-auto p-4 space-y-4 h-3/4 gap-3" id="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <img
                src="https://cdn-icons-png.flaticon.com/512/4598/4598776.png" // Cambia esta URL por la imagen del robot
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

        {/* Sugerencias */}
        {showSuggestions && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-orange-200 hover:bg-orange-400 text-black px-3 py-2 rounded-lg shadow-md transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer Input */}
      <div className="p-3 border-3 bg-pink-200 mx-4 rounded-3xl border-transparent hover:border-3 hover:border-pink-500 transition-all">
        <div className="relative flex items-center gap-3">
          <textarea
            placeholder="Envía un mensaje a Marie"
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


// src/components/agents/MarketAgent.tsx

import { useState, useEffect, useRef } from 'react';
import { ArrowUp, Paperclip } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PropTypes from 'prop-types';

export function MarketAgent() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy Vale 👋, tu Agente Legal. Estoy aquí para proporcionarte el soporte que necesitas en aspectos legales relacionados con tu emprendimiento. Mi enfoque es ayudarte a formalizar tu negocio, cumplir con las normativas vigentes y resolver cualquier duda legal que puedas tener. Con mi orientación, podrás construir una base sólida y segura para el crecimiento de tu empresa. ¿En qué puedo asistirte hoy?',
      isBot: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Variables de estado para datos adicionales y mensaje original (si es necesario en el futuro)
  // Actualmente, no se requieren datos adicionales para las preguntas proporcionadas
  // const [needsAdditionalData, setNeedsAdditionalData] = useState(false);
  // const [categoria, setCategoria] = useState('');
  // const [ubicacion, setUbicacion] = useState('');
  // const [originalMessage, setOriginalMessage] = useState('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Respuestas predefinidas a sugerencias
  const suggestionResponses: { [key: string]: string } = {
    '🛡️ ¿Qué licencias o permisos son obligatorios para mi tipo de negocio?':
      'Dependerá del tipo de actividad que realices. Por ejemplo, negocios en gastronomía necesitan permisos de salubridad, mientras que una tienda requiere licencia de funcionamiento municipal. Consulta con tu municipio para más detalles.',
    '📜 ¿Qué pasos debo seguir para registrar formalmente mi negocio en Perú?':
      'Primero, define el tipo de empresa (persona natural o jurídica). Luego, realiza la búsqueda de nombre en SUNARP, registra tu empresa en SUNAT, obtén una licencia de funcionamiento y, si aplica, inscribe a tus trabajadores en ESSALUD.',
    '🏖️ ¿Cómo manejo beneficios y derechos laborales de mis colaboradores según la ley peruana?':
      'Asegúrate de otorgar beneficios como gratificaciones, CTS y vacaciones, además de respetar la jornada laboral máxima de 48 horas semanales. Consulta la Ley de Productividad y Competitividad Laboral para más detalles.',
    '📄 ¿Cómo redacto un contrato laboral válido?':
      'Incluye la identificación de las partes, tipo de contrato (temporal, indeterminado), funciones específicas, salario, horario y beneficios. Asegúrate de que ambas partes firmen y que cumpla con las normas de la ley laboral vigente.',
    '📑 ¿Qué debo incluir en los términos y condiciones de mi negocio?':
      'Define el uso permitido de tus servicios, políticas de privacidad, condiciones de pago, devoluciones, garantías y limitaciones de responsabilidad. Esto protege legalmente a tu negocio frente a clientes o usuarios.',
  };

  const suggestions = [
    '🛡️ ¿Qué licencias o permisos son obligatorios para mi tipo de negocio?',
    '📜 ¿Qué pasos debo seguir para registrar formalmente mi negocio en Perú?',
    '🏖️ ¿Cómo manejo beneficios y derechos laborales de mis colaboradores según la ley peruana?',
    '📄 ¿Cómo redacto un contrato laboral válido?',
    '📑 ¿Qué debo incluir en los términos y condiciones de mi negocio?',
  ];

  // Definir la URL base de la API
  const API_BASE_URL = 'https://1a46-201-218-159-83.ngrok-free.app';

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || inputText.trim();

    if (messageToSend === '') return;

    const userMessage = { id: Date.now(), text: messageToSend, isBot: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setLoading(true);
    setShowSuggestions(false);

    try {
      // Verificar si el mensaje enviado es una de las sugerencias predefinidas
      if (suggestionResponses[messageToSend]) {
        const botMessage = {
          id: Date.now() + 1,
          text: suggestionResponses[messageToSend],
          isBot: true,
        };
        // Simular un pequeño retraso para la respuesta
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          setLoading(false);
        }, 1000);
      } else {
        // Si no es una sugerencia predefinida, realizar una llamada a la API
        const response = await axios.post(
          `${API_BASE_URL}/agente_mercado/`,
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
    // Agregar el mensaje del usuario
    const userMessage = { id: Date.now(), text: suggestion, isBot: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simular la respuesta predefinida del bot
    const botMessage = {
      id: Date.now() + 1,
      text: suggestionResponses[suggestion] || 'Lo siento, no tengo una respuesta para eso.',
      isBot: true,
    };

    // Simular un pequeño retraso para la respuesta
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setLoading(false);
    }, 1000);

    setShowSuggestions(false); // Ocultar las sugerencias al seleccionar una
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
        <h1 className="text-xl font-semibold text-black flex justify-center items-center">Agente Legal</h1>
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
                src="https://i.pinimg.com/736x/97/57/53/975753493e4e229edc13645fc4c8105b.jpg" // Cambia esta URL por la imagen del agente legal
                alt="Agente Legal"
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
                alt="Usuario"
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
                className="bg-[#FFE0F3] hover:bg-[#FF99D8] text-black px-3 py-2 rounded-lg shadow-md transition-all"
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
            placeholder="Envía un mensaje a Vale"
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
            <Paperclip className="w-5 h-5" />
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

// Declaración de PropTypes (aunque no se utilizan props en el componente)
MarketAgent.propTypes = {};

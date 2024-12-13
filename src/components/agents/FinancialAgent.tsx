// src/components/agents/FinancialAgent.tsx

import { useState, useEffect, useRef } from 'react';
import { ArrowUp, Paperclip } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

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

  // Respuestas predefinidas a sugerencias
  const suggestionResponses: { [key: string]: string } = {
    '🐖 ¿Cómo puedo ahorrar más dinero?':
      'Para ahorrar más dinero, crea un presupuesto mensual, reduce gastos innecesarios y establece metas de ahorro claras. Considera automatizar tus ahorros para asegurar que se realicen regularmente.',
    '📈 ¿Qué es un fondo de inversión?':
      'Un fondo de inversión es un vehículo que agrupa el dinero de varios inversores para comprar una cartera diversificada de activos, como acciones, bonos o bienes raíces, gestionado por profesionales.',
    '📝 ¿Cómo crear un presupuesto efectivo?':
      'Para crear un presupuesto efectivo, identifica tus ingresos y gastos, categoriza tus gastos en esenciales y no esenciales, establece límites para cada categoría y revisa tu presupuesto regularmente para ajustarlo según sea necesario.',
    '📊 ¿Cuáles son las mejores opciones de financiamiento?':
      'Las mejores opciones de financiamiento dependen de tus necesidades específicas. Puedes considerar préstamos bancarios, líneas de crédito, financiamiento a través de inversionistas, o plataformas de crowdfunding según el tipo y tamaño de tu proyecto.',
    '¿Cómo puedo mejorar mi puntaje crediticio?':
      'Paga tus deudas a tiempo, evita utilizar más del 30% de tu línea de crédito disponible y revisa tu historial crediticio para corregir errores.',
    '¿Qué estrategias puedo usar para reducir mis deudas rápidamente?':
      'Usa el método bola de nieve (paga primero las deudas pequeñas) o avalancha (paga primero las deudas con mayor interés), y destina un porcentaje fijo de tus ingresos para pagos extras.',
    '¿Qué tipos de inversión me recomiendas si tengo un perfil conservador?':
      'Considera opciones de bajo riesgo como bonos del gobierno, certificados de depósito (CD) o fondos indexados diversificados.',
    '¿Cómo funciona el interés compuesto y cómo puedo aprovecharlo?':
      'El interés compuesto genera ganancias sobre las ganancias previas. Inicia inversiones a largo plazo y reinvierte los rendimientos para maximizar el efecto compuesto.',
    '¿Cuáles son los errores financieros más comunes y cómo evitarlos?':
      'No presupuestar, gastar más de lo que ganas y no ahorrar para emergencias son errores frecuentes. Planifica tus finanzas, controla tus gastos y establece un fondo de emergencia.',
  };

  const suggestions = [
    '🐖 ¿Cómo puedo ahorrar más dinero?',
    '📈 ¿Qué es un fondo de inversión?',
    '📝 ¿Cómo crear un presupuesto efectivo?',
    '📊 ¿Cuáles son las mejores opciones de financiamiento?',
    '¿Cómo puedo mejorar mi puntaje crediticio?',
    '¿Qué estrategias puedo usar para reducir mis deudas rápidamente?',
    '¿Qué tipos de inversión me recomiendas si tengo un perfil conservador?',
    '¿Cómo funciona el interés compuesto y cómo puedo aprovecharlo?',
    '¿Cuáles son los errores financieros más comunes y cómo evitarlos?',
  ];

  // Definir la URL base de la API
  const API_BASE_URL = 'https://3939-3-137-199-132.ngrok-free.app';

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || inputText.trim();

    if (messageToSend === '') return;

    const userMessage = { id: Date.now(), text: messageToSend, isBot: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setLoading(true);
    setShowSuggestions(false);

    // Simular una respuesta de carga
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
                src="https://cdn-icons-png.flaticon.com/512/4598/4598776.png" // Cambia esta URL por la imagen del agente financiero
                alt="Agente Financiero"
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
            placeholder="Envía un mensaje a Mari"
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
FinancialAgent.propTypes = {};

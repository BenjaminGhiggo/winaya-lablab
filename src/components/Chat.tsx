import { useEffect, useState } from 'react';
import { Paperclip, Send, ArrowLeft } from 'lucide-react';
import useStore from './store/login.store';
import axios from 'axios';
import { useShallow } from 'zustand/react/shallow';

interface User {
  id: string;
  fullName: string;
  email: string;
  profilePicture: string;
  bio: string | null;
  role?: string | null;
  location?: string | null;
  createdAt?: string;
  unreadMessageCount: number;  // Indicador de mensajes no leídos
}

interface Message {
  id: string;
  text: string;
  time: string;
  isUserMessage: boolean;
  isRead: boolean;
}

export function Chat() {
  const urlBase = import.meta.env.VITE_BASE_URL;
  const { id } = useStore(useShallow((state) => ({ id: state.id })));

  const [users, setUsers] = useState<User[]>([]);
  const [receiverUser, setReceiverUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const token = localStorage.getItem('token');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (receiverUser) {
        fetchMessages(receiverUser.id);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [receiverUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${urlBase}api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  

        const updatedUsers = data.map((user: User) => ({
          ...user,
          hasUnreadMessages: false,
        }));
  
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };
  
    const intervalId = setInterval(fetchUsers, 5000);
  
    fetchUsers();
  
    return () => clearInterval(intervalId);
  }, [urlBase, token]);

  const fetchMessages = async (receiverId: string) => {
    try {
      const { data } = await axios.get(`${urlBase}api/chat/messages`, {
        params: { senderId: id, receiverId: receiverId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const updateMessages = async () => {
        const promises = data.map((item: any) => {
          if (receiverUser?.id === item.sender.id) {
            return axios
              .patch(
                `${urlBase}api/chat/${item.id}`,
                { isRead: true },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .catch((error) => {
                console.error(`Error actualizando el mensaje ${item.id}:`, error);
                return null;
              });
          }
          return Promise.resolve(null);
        });
      
        await Promise.all(promises);
        console.log("Mensajes actualizados");
      };
      
      updateMessages();
      
  
      setMessages(
        data.map((msg: any) => ({
          id: msg.id,
          text: msg.content,
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isUserMessage: msg.sender.id === id,
          isRead: msg.isRead,
        }))
      );
  
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === receiverId
            ? {
                ...user,
                hasUnreadMessages: data.some(
                  (msg: any) => !msg.isRead && msg.receiver.id === user.id
                ),
              }
            : user
        )
      );
    } catch (error) {
      console.error("Error al cargar los mensajes:", error);
    }
  };
  

  const handleChatSelect = async (user: User) => {
    console.log(user, 'usuario seleccionado');
    setReceiverUser(user);
    fetchMessages(user.id);

    // Marcar los mensajes como leídos al abrir el chat
    // try {
    //   await axios.patch(`${urlBase}api/chat/${user.id}`, { isRead: true }, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    // } catch (error) {
    //   console.error("Error al marcar los mensajes como leídos:", error);
    // }
  };

  const handleBack = () => {
    setReceiverUser(null);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && receiverUser) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUserMessage: true,
        isRead: true,
      };

      const chatData = {
        senderId: id,
        receiverId: receiverUser.id,
        content: inputMessage,
      };

      try {
        await axios.post(`${urlBase}api/chat`, chatData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
  {/* Lista de chats */}
  <div className={`lg:w-1/3 border-r ${receiverUser ? 'hidden lg:block' : 'block'}`}>
    <div className="p-4">
      <h2 className="text-xl font-semibold text-purple-600 mb-4">Chats</h2>
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleChatSelect(user)}
            className="relative flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
          >
            <img
              src={user.profilePicture}
              alt={user.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium truncate">{user.fullName}</h3>
                {user.createdAt && (
                  <span className="text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{user.bio}</p>
            </div>

            {/* Mostrar el contador rojo si el usuario tiene mensajes no leídos */}
            {user.unreadMessageCount > 0 && (
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {user.unreadMessageCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Ventana de mensajes */}
  <div className={`flex-1 flex flex-col ${receiverUser ? 'block' : 'hidden lg:flex'}`}>
    <div className="p-4 border-b">
      <div className="flex items-center gap-3">
        {receiverUser && (
          <button onClick={handleBack} className="lg:hidden p-2">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        {receiverUser ? (
          <>
            <img
              src={receiverUser.profilePicture}
              alt={receiverUser.fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium">{receiverUser.fullName}</h3>
              <p className="text-sm text-gray-600">@{receiverUser.fullName.split(" ")[0]}</p>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Selecciona usuario</p>
        )}
      </div>
    </div>

    {/* Mostrar mensajes solo si hay un usuario seleccionado */}
    {receiverUser && (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUserMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${message.isUserMessage ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
            >
              {message.text}
              <div className="text-xs text-gray-500 mt-1 text-right">{message.time}</div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Input de mensaje */}
    <div className="p-4 border-t flex gap-3">
      <Paperclip className="w-6 h-6 text-gray-500" />
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
        placeholder="Escribe un mensaje..."
      />
      <button onClick={handleSendMessage} className="text-purple-600">
        <Send className="w-6 h-6" />
      </button>
    </div>
  </div>
</div>
  );
}

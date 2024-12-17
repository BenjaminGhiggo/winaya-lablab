import { ReactNode, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Store, Calendar, MessageCircle, Bell, MessageSquare, Bot, User, LogOut } from 'lucide-react';
import NotificationsDropdown from './Notifications/NotificationsDropdown';
/* import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth'; */
import useStore from './store/login.store';
import { useShallow } from 'zustand/react/shallow'

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [showAgentMenu, setShowAgentMenu] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const agents = [
    { title: 'Agente Financiero', path: '/agent/financial' },
    { title: 'Agente de Marketing', path: '/agent/marketing' },
    { title: 'Agente Legal', path: '/agent/market' },
  ];

  const { profilePicture } = useStore(useShallow((state) => ({
    fullName: state.fullName,
    profilePicture: state.profilePicture,
    email: state.email,
    bio: state.bio,
  })));
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }; */

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 bg-white">
        <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-8">
          <div className="w-15 h-12 bg-white rounded-2xl flex items-center justify-center sm: w-14 h-11">
            <img
              src="https://i.postimg.cc/9f72QTtk/WINAYA-LOGO.jpg"
              alt="Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
            <Link to="/" className="text-xl font-bold">WINAYA</Link>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar en WINAYA"
                className="w-[300px] pl-4 pr-10 py-2 rounded-full bg-[#FFEBF6] focus:outline-none focus:ring-2 focus:ring-pink-500 hidden sm:block"
              />
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center sm:hidden">
                <Search className="text-gray-400 w-5 h-5" />
              </div>
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 hidden sm:block" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            
            <div className="relative">
              <button
                onClick={() => setShowAgentMenu(!showAgentMenu)}
                className="focus:outline-none"
              >
                <Bot className="w-7 h-7 text-gray-600 hover:text-pink-500" />
              </button>
              {showAgentMenu && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border">
                  {agents.map((agent) => (
                    <Link
                      key={agent.path}
                      to={agent.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      onClick={() => setShowAgentMenu(false)}
                    >
                      {agent.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/events">
              <Calendar className="w-6 h-6 text-gray-600 mb-1 hover:text-pink-500" />
            </Link>
            <div className="relative" ref={notificationsRef}>
              <button
                className="relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-500" />
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </button>
              <NotificationsDropdown isOpen={isNotificationsOpen} />
            </div>
            <div className="relative" ref={profileDropdownRef}>
              <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                <img
                  src={profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBD_ykDcG8TKeoMNSGsF88UYXjqjx3ZCeX-g&s'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-pink-500"
                />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 hover:text-pink-500"
                >
                  <User className="w-5 h-5 text-gray-600 hover:text-pink-500" />
                  <span>Ver perfil</span>
                </button>
              
                <button
                  onClick={() => {
                    navigate('/store');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 hover:text-pink-500"
                >
                  <Store className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-500" />
                  <span>Tienda</span>
                </button>
              
                <button
                  onClick={() => {
                    navigate('/forum');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 hover:text-pink-500"
                >
                  <MessageSquare className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-500" />
                  <span>Foro</span>
                </button>
              
                <button
                  onClick={() => {
                    navigate('/chat');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 hover:text-pink-500"
                >
                  <MessageCircle className="w-5 h-5 text-gray-600 hover:text-pink-500" />
                  <span>Mensajes</span>
                </button>
              
                {/* Botón Salir corregido */}
                <button
                  onClick={() => {}} // Función vacía temporal
                  className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Salir</span>
                </button>
              </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="block min-h-screen">{children}</main>
    </div>
  );
}

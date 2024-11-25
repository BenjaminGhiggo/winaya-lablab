import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, ShoppingCart, Calendar, Bell, MessageCircle } from 'lucide-react';
import NotificationsDropdown from '../Notifications/NotificationsDropdown';

export default function Navbar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1920px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-8">
          <Link to="/" className="text-xl font-bold">WINAYA</Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en WIMNAYA"
              className="w-[300px] pl-4 pr-10 py-2 rounded-full bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-500 hidden sm:block"
            />
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center sm:hidden"> {/* Solo para dispotivos mobiles */}
              <Search className="text-gray-400 w-5 h-5" />
            </div>
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5 hidden sm:block" />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <Link to="/">
            <Home className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-500" />
          </Link>
          <Link to="/events">
            <Calendar className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-500" />
          </Link>
          <ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-500" />
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
          <Link to="/forum">
            <MessageCircle className="w-6 h-6 text-gray-600 cursor-pointer hover:text-pink-500" />
            {/* <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span> */}
          </Link>
          <img
            src="https://i.ibb.co/s9wY3Wv/Ari.png"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-pink-500"
          />
        </div>
      </div>
    </nav>
  );
}
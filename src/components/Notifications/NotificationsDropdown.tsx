import React from 'react';
import NotificationItem from './NotificationItem';

interface NotificationsDropdownProps {
  isOpen: boolean;
}

export default function NotificationsDropdown({ isOpen }: NotificationsDropdownProps) {
  const notifications = [
    {
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80",
      username: "Maria Casas",
      action: "ha comentado en tu publicación",
      time: "Hace 5 minutos",
      isUnread: true
    },
    {
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80",
      username: "Kristina Alejandro",
      action: "le gusta tu publicación",
      time: "Hace 15 minutos",
      isUnread: true
    },
    {
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80",
      username: "Sofia Martinez",
      action: "comenzó a seguirte",
      time: "Hace 2 horas"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute right-2 sm:right-0 mt-2 w-72 sm:w-80 max-w-xs sm:max-w-md bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
  <div className="px-4 py-2 border-b border-gray-200">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold">Notificaciones</h3>
      <button className="text-sm text-pink-500 hover:text-pink-600">
        Marcar todas como leídas
      </button>
    </div>
  </div>
  <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
    {notifications.map((notification, index) => (
      <NotificationItem key={index} {...notification} />
    ))}
  </div>
  <div className="px-4 py-2 border-t border-gray-200">
    <button className="text-sm text-gray-600 hover:text-gray-800 w-full text-center">
      Ver todas las notificaciones
    </button>
  </div>
</div>

  );
}
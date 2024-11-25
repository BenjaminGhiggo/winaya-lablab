import React from 'react';
import { Circle } from 'lucide-react';

interface NotificationItemProps {
  avatar: string;
  username: string;
  action: string;
  time: string;
  isUnread?: boolean;
}

export default function NotificationItem({ avatar, username, action, time, isUnread }: NotificationItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors">
      <img src={avatar} alt={username} className="w-10 h-10 rounded-full" />
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-semibold">{username}</span>{' '}
          <span className="text-gray-600">{action}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
      {isUnread && (
        <Circle className="w-2 h-2 fill-pink-500 text-pink-500 flex-shrink-0" />
      )}
    </div>
  );
}
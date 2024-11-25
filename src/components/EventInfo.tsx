import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../types';

interface EventInfoProps {
  event: Event;
  onAttend: (eventId: number) => void;
}

export default function EventInfo({ event, onAttend }: EventInfoProps) {
  return (
    <div className="w-72 p-2">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
        
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {event.latitude.toFixed(4)}, {event.longitude.toFixed(4)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">{event.attendees} attending</span>
          </div>
        </div>

        <button
          onClick={() => onAttend(event.id)}
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
        >
          <Users className="w-4 h-4" />
          I'll Attend
        </button>
      </div>
    </div>
  );
}
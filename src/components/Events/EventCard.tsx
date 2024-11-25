import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  attending?: boolean;
  link: string;
}

interface EventCardProps {
  event: Event;
  onAttend: () => void;
}

export default function EventCard({ event, onAttend }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] flex flex-col h-full">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{event.location}</span>
        </div>

        <div className="text-sm text-gray-500 mb-4 flex flex-row items-center gap-2">
          <Calendar className="w-4 h-4" />
          {formattedDate}
        </div>

        <div className="flex gap-3 mt-auto">
          <button
            onClick={onAttend}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${event.attending
              ? 'bg-pink-100 text-pink-600'
              : 'bg-pink-500 text-white hover:bg-pink-600'
              }`}
          >
            {event.attending ? 'Asistiré ✓' : 'Asistiré'}
          </button>
          <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
            <a className='flex-1' href={event.link} target="_blank">
              Inscribirme
            </a>
          </button>

        </div>
      </div>
    </div>
  );
}
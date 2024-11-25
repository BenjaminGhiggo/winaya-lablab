import { Marker, Popup } from 'react-leaflet';
import { Calendar, MapPin, Users } from 'lucide-react';
import L from 'leaflet';
import { Event } from '../types';

interface EventMarkerProps {
  event: Event;
  onAttend: (eventId: number) => void;
}

export default function EventMarker({ event, onAttend }: EventMarkerProps) {
  const customIcon = L.divIcon({
    className: 'bg-pink-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white',
    iconSize: [24, 24],
    html: `<div class="flex items-center justify-center h-full w-full">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="white"/>
            </svg>
          </div>`
  });

  return (
    <Marker
      position={[event.latitude, event.longitude]}
      icon={customIcon}
    >
      <Popup className="w-72">
        <div className="space-y-4">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="space-y-2">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-gray-600 text-sm">{event.description}</p>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {event.latitude.toFixed(4)}, {event.longitude.toFixed(4)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Users className="w-4 h-4" />
              <span className="text-sm">{event.attendees} Asistiendo</span>
            </div>
            <button
              onClick={() => onAttend(event.id)}
              className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Atenderé
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
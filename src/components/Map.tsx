import { useState, useCallback, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';
import { Event } from '../types';
import { eventService } from '../services/eventService';
import EventInfo from './EventInfo';


const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

// SVG marker path for custom marker
const MARKER_SVG = `
<svg viewBox="0 0 24 24" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
  <path fill="#DB2777" stroke="#FFFFFF" stroke-width="1" d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8z"/>
</svg>`;

export default function EventMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB80siyuXqIAwn3sfhPp40uzvhD0HZ5Pnc',
    libraries: ['places'],
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [center, setCenter] = useState({ lat: -12.046374, lng: -77.042793 });
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [markerScale, setMarkerScale] = useState(1);

  // Create marker icons
  const markerIcon = {
    url: `data:image/svg+xml;base64,${btoa(MARKER_SVG)}`,
    scaledSize: isLoaded ? new window.google.maps.Size(48 * markerScale, 48 * markerScale) : undefined,
    anchor: isLoaded ? new window.google.maps.Point(24 * markerScale, 48 * markerScale) : undefined,
  };

  const userLocationIcon = {
    path: isLoaded ? window.google.maps.SymbolPath.CIRCLE : undefined,
    scale: 7,
    fillColor: '#4285F4',
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 2,
  };

  // Animation effect
  useEffect(() => {
    const animateMarker = () => {
      setMarkerScale(scale => scale === 1 ? 0.8 : 1);
    };

    const animationInterval = setInterval(animateMarker, 1000);
    return () => clearInterval(animationInterval);
  }, []);

  useEffect(() => {
    setEvents(eventService.getEvents());

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setCenter(location);
        },
        () => {
          console.log('Error getting location');
        }
      );
    }
  }, []);

  const handleAttend = useCallback((eventId: number) => {
    eventService.updateAttendees(eventId);
    setEvents(eventService.getEvents());
  }, []);

  const onMapClick = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="h-full w-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
      >
        {userLocation && (
          <MarkerF
            position={userLocation}
            icon={userLocationIcon}
          />
        )}

        {events.map((event) => (
          <MarkerF
            key={event.id}
            position={{ lat: event.latitude, lng: event.longitude }}
            onClick={() => setSelectedEvent(event)}
            icon={markerIcon}
            animation={window.google.maps.Animation.BOUNCE}
          />
        ))}

        {selectedEvent && (
          <InfoWindowF
            position={{
              lat: selectedEvent.latitude,
              lng: selectedEvent.longitude,
            }}
            onCloseClick={() => setSelectedEvent(null)}
          >
            <EventInfo event={selectedEvent} onAttend={handleAttend} />
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
}
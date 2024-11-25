import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

export default function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, 13);
    });
  }, [map]);

  if (!position) return null;

  return (
    <Marker 
      position={position}
      icon={L.divIcon({
        className: 'bg-blue-500 rounded-full w-4 h-4 border-2 border-white',
        iconSize: [16, 16],
      })}
    >
      <Popup>Estas aquí</Popup>
    </Marker>
  );
}
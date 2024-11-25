import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventCard from './EventCard';
/* import { MapPin } from 'lucide-react'; */
import EventMap from '../Map';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  attending?: boolean;
  link:string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Curso gratis online "Excel intermedio" de la Municipalidad de Majes',
      description: 'La Municipalidad de *MAJES* , en coordinación con el Instituto de Formación Empresarial Avanzys te invita a participa del curso virtual ...',
      image: 'https://i.pinimg.com/236x/55/12/84/551284a43a02b1ee63263ad182dab166.jpg',
      location: 'Virtual',
      date: '2024-11-23',
      link:'https://docs.google.com/forms/d/e/1FAIpQLSdr3uAGtmqSty5KOHiRto2jrVViYRx5PhkGrqtphIlmtWedcw/viewform'
    },
    {
      id: '2',
      title: 'Taller online gratis "Introducción al Branding Digital"',
      description: 'Klassna STEAM te invita a participar de manera GRATUITA del curso Introducción al Branding Digital...',
      image: 'https://i.pinimg.com/236x/83/64/4b/83644b017404267d844506e59167107a.jpg',
      location: 'Virtual',
      date: '2024-11-11',
      link:'https://docs.google.com/forms/d/e/1FAIpQLScgE4FUNYMLXMdGf7VZz2fk8H0ILiKuXraut_jAlNlai8rO3Q/viewform'
    },
    {
      id: '3',
      title: 'Curso gratis online "Asistente contable" de la Municipalidad de Majes',
      description: 'La Municipalidad de *MAJES* , en coordinación con el Instituto de Formación Empresarial Avanzys te invita a participa del curso virtual ...',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAqEo8pu1_W7qWznfOd7gu2LtwUlBbWX_8Iw&s',
      location: 'Virtual',
      date: '2024-11-5',
      link:'https://docs.google.com/forms/d/e/1FAIpQLSdr3uAGtmqSty5KOHiRto2jrVViYRx5PhkGrqtphIlmtWedcw/viewform'
    },
  ]);
  // Estado de conferencias
  const [conference, setConference] = useState<Event[]>([
    {
      id: '4',
      title: 'Cumbre Mundial de Mujeres 2024',
      description: 'Este es el lugar para ti, si eres una mujer emprendedora, empresaria o directiva con ganas de crear, inspirar y liderar. Aquí encontrarás no solo el impulso para transformar tu vida profesional, sino también una oportunidad única para contribuir a un cambio real en la sociedad..',
      image: 'https://www.cumbremundialmujeres.org/wp-content/uploads/2024/10/cumbre-1.jpg',
      location: 'Guayaquil, Mall del Sol',
      date: '2024-11-28',
      link:'https://www.cumbremundialmujeres.org/'
    },
    {
      id: '5',
      title: 'Women in Technology Summit Latinoamérica 2024',
      description: 'El Women in Technology Summit 2024, ofrecerá una nutrida agenda de actividades diseñadas para reconocer, inspirar, educar, promover y fomentar la participación de mujeres en los sectores de tecnología e innovación.',
      image: 'https://www.revistaeconomia.com/wp-content/uploads/2024/09/Economia_Web-1-3.jpg',
      location: 'Marriott Hotel',
      date: '2024-10-10',
      link:'https://www.revistaeconomia.com/women-in-technology-summit-latinoamerica-2024-la-primera-cumbre-tecnologica-de-mujeres-en-el-peru-que-promueve-el-liderazgo-y-la-diversidad/'
    },
    {
      id: '6',
      title: 'Mujeres y empresas',
      description: 'Este evento internacional está diseñado para promover la igualdad de oportunidades y la autonomía económica de las mujeres emprendedoras.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTliXEgkp_Lp9SNh5JPUkhzFyHkiOoMhVAigA&s',
      location: 'Puerto Varas',
      date: '2024-09-04',
      link:'https://www.instagram.com/incubatecufro/p/C-qj_2gSoKj/?img_index=1'
    },
  ]);

  // Función para manejar asistencia en eventos y conferencias
  const handleAttendance = (id: string, listType: 'events' | 'conference') => {
    if (listType === 'events') {
      setEvents(events.map(event =>
        event.id === id
          ? { ...event, attending: !event.attending }
          : event
      ));
    } else if (listType === 'conference') {
      setConference(conference.map(conf =>
        conf.id === id
          ? { ...conf, attending: !conf.attending }
          : conf
      ));
    }
  };

  // Lista de eventos para el calendario
  const calendarEvents = events
    .filter(event => event.attending)
    .map(event => ({
      title: event.title,
      date: event.date,
    }));

  // Lista de conferencias para el calendario
  const calendarConferences = conference
    .filter(conf => conf.attending)
    .map(conf => ({
      title: conf.title,
      date: conf.date,
    }));

  return (
    <div className="max-w-7xl mx-auto py-1 px-4">
      <div className="mb-8 bg-white rounded-lg shadow-md p-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold flex items-center justify-center mb-7 pt-5">
          <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-purple-600 text-transparent bg-clip-text ">
            Eventos
          </span>
        </h1>
        <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold flex items-center justify-left mb-7 pt-5">
          <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-purple-600 text-transparent bg-clip-text">
            Talleres
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onAttend={() => handleAttendance(event.id, 'events')} // Especifica "events"
            />
          ))}
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold flex items-center justify-left mb-7 pt-5">
          <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-purple-600 text-transparent bg-clip-text">
            Conferencias
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {conference.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onAttend={() => handleAttendance(event.id, 'conference')} // Especifica "conference"
            />
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold flex items-center justify-center mb-7 pt-5">
        <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-purple-600 text-transparent bg-clip-text">
          Calendario
        </span>
         </h1>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={[...calendarEvents, ...calendarConferences]} // Combina ambas listas en un solo array
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
          }}
          height="auto"
        />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold flex items-center justify-center mb-7 pt-5">
          <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-purple-600 text-transparent bg-clip-text">
            Mapas
          </span>
        </h1>
        <div className="min-h-screen bg-gray-50 py-5">
          <div className="flex-1 h-[calc(100vh-4rem)] py-30 border border-4 border-pink-500 rounded-ld">
            <EventMap />
          </div>
        </div>
      </div>
    </div>
  );
}
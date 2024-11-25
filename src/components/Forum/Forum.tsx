import React, { useState } from 'react';
import { ArrowBigUp, ArrowBigDown, MessageCircle, Share, Bookmark, TrendingUp, Clock, Star } from 'lucide-react';
import ForumPost from './ForumPost';
import CreateForumPost from './CreateForumPost';

export default function Forum() {
  const [sortBy, setSortBy] = useState<'trending' | 'new' | 'top'>('trending');
  
  const posts = [
    {
      id: '1',
      title: '¿Cómo manejan el balance entre familia y emprendimiento?',
      content: 'Soy madre de dos niños y acabo de empezar mi negocio online. Me gustaría saber cómo otras emprendedoras manejan su tiempo.',
      author: {
        name: 'Laura Mendoza',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80'
      },
      category: 'Consejos',
      upvotes: 156,
      comments: 45,
      time: '2h'
    },
    {
      id: '2',
      title: 'Recursos gratuitos para aprender marketing digital',
      content: 'He recopilado una lista de cursos y herramientas gratuitas que me han ayudado con mi emprendimiento.',
      author: {
        name: 'María García',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80'
      },
      category: 'Recursos',
      upvotes: 234,
      comments: 67,
      time: '4h'
    },
    {
      id: '3',
      title: 'Mi experiencia consiguiendo financiamiento',
      content: 'Quiero compartir mi experiencia obteniendo un préstamo para mi startup y los consejos que aprendí en el proceso.',
      author: {
        name: 'Ana Torres',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80'
      },
      category: 'Finanzas',
      upvotes: 98,
      comments: 23,
      time: '6h'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h1 className="text-2xl font-bold mb-4">Foro Emprendedoras</h1>
        <p className="text-gray-600 mb-4">
          Un espacio para compartir experiencias, hacer preguntas y conectar con otras mujeres emprendedoras.
        </p>
        <CreateForumPost />
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex gap-4 border-b pb-3">
          <button
            onClick={() => setSortBy('trending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              sortBy === 'trending' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Tendencias
          </button>
          <button
            onClick={() => setSortBy('new')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              sortBy === 'new' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Clock className="w-4 h-4 hidden" />
            Nuevo
          </button>
          <button
            onClick={() => setSortBy('top')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              sortBy === 'top' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Star className="w-4 h-4" />
            Destacado
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <ForumPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
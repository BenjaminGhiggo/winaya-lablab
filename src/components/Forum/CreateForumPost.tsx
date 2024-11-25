import React from 'react';
import { Image, Link } from 'lucide-react';

export default function CreateForumPost() {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <input
        type="text"
        placeholder="Crear publicación"
        className="w-full px-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
      />
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
            <Image className="w-5 h-5" />
            <span>Imagen</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
            <Link className="w-5 h-5" />
            <span>Link</span>
          </button>
        </div>
        <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
          Publicar
        </button>
      </div>
    </div>
  );
}
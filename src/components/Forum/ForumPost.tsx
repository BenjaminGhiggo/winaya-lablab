import React from 'react';
import { ArrowBigUp, ArrowBigDown, MessageCircle, Share, Bookmark } from 'lucide-react';

interface ForumPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    category: string;
    upvotes: number;
    comments: number;
    time: string;
  };
}

export default function ForumPost({ post }: ForumPostProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:border-pink-200 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1">
          <button className="text-gray-400 hover:text-pink-500 transition-colors">
            <ArrowBigUp className="w-6 h-6" />
          </button>
          <span className="font-medium text-gray-700">{post.upvotes}</span>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowBigDown className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs font-medium rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">• {post.time}</span>
          </div>

          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.content}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-600">{post.author.name}</span>
            </div>

            <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{post.comments}</span>
            </button>

            <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500">
              <Share className="w-4 h-4" />
              <span className="text-sm">Compartir</span>
            </button>

            <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500">
              <Bookmark className="w-4 h-4" />
              <span className="text-sm">Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
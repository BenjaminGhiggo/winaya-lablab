import React from 'react';
import { Users, Bookmark } from 'lucide-react';
import useStore from '../store/login.store';
import { useShallow } from 'zustand/react/shallow';

export default function LeftSidebar() {
  const { profilePicture, bio, email, fullName } = useStore(useShallow((state) => ({
    fullName: state.fullName,
    profilePicture: state.profilePicture,
    email: state.email,
    bio: state.bio,
  })));

  const nameParts = fullName.split(" ");
  const firstAndLastNames = `${nameParts[0]} ${nameParts[1]}`;
  const username = firstAndLastNames.replace(/\s+/g, "_");
  return (
    <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] border-r border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <img
          src={ profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBD_ykDcG8TKeoMNSGsF88UYXjqjx3ZCeX-g&s'}
          alt={fullName}
          className="w-12 h-12 rounded-full"
        />
        <div>
        <h2 className="font-semibold">{ firstAndLastNames }</h2>
        <p className="text-sm text-gray-500">
          @{username.toLocaleLowerCase()}
        </p>
        </div>
      </div>

      <div className="space-y-4">
        <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg">
          <Users className="w-5 h-5 text-pink-500" />
          <span>Amigos (70 conectadas)</span>
        </button>
        <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg">
          <Bookmark className="w-5 h-5 text-pink-500" />
          <span>Guardados</span>
        </button>
      </div>
    </div>
  );
}
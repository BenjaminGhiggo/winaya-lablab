import { useState } from 'react';
import { Image, Video, Paperclip } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import useStore from '../store/login.store';
import { Modal } from '../Modal';
import { ImageUploadForm } from '../ImageUploadForm';
import axios from 'axios';
import { FeedItem } from './interfaces/Feed-interface.interface'; // Asegúrate de importar el tipo FeedItem

interface CreatePostProps {
  onPostCreated: (newPost: FeedItem) => void; // Recibir la función callback
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Nuevo estado para cargar

  const handleSubmit = async (data: { image: File | null; description: string }) => {
    if (!data.image) {
      console.log('No image selected');
      return;
    }

    setLoading(true); // Activar el estado de carga

    const formData = new FormData();
    formData.append('files', data.image);

    const urlBack = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${urlBack}api/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const secureUrl = response.data.secure_url;
      const token = localStorage.getItem('token');
      console.log(data, 'data');
      const responsePost = await axios.post(`${urlBack}api/post`, {
        "content": data.description, // Usar la descripción del formulario
        "imageUrls": [
          `${secureUrl}`
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Image uploaded successfully', responsePost.data);
      
      // Llamar al callback para agregar el nuevo post al feed
      const newPost: FeedItem = responsePost.data; // Asegúrate de que el tipo sea adecuado
      onPostCreated(newPost);

      setIsModalOpen(false); // Cerrar el modal después de subir la imagen
    } catch (error) {
      console.error('Error uploading image', error);
    }

    setLoading(false); // Desactivar el estado de carga
    console.log('Submitted:', data);
    setIsModalOpen(false);
  };

  const { profilePicture, bio, email, fullName } = useStore(useShallow((state) => ({
    fullName: state.fullName,
    profilePicture: state.profilePicture,
    email: state.email,
    bio: state.bio,
  })));

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBD_ykDcG8TKeoMNSGsF88UYXjqjx3ZCeX-g&s'}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder={`¿En que piensas ${fullName.split(' ')[0]}?`}
          className="flex-1 bg-pink-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
            <Image className="w-5 h-5" />
            <span>Image</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
            <Video className="w-5 h-5" />
            <span>Videos</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
            <Paperclip className="w-5 h-5" />
            <span>Attach</span>
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ImageUploadForm onSubmit={handleSubmit} loading={loading} />
      </Modal>
    </div>
  );
}

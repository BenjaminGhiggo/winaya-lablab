import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadFormProps {
  onSubmit: (data: { image: File | null; description: string }) => void;
  loading: boolean; // Recibimos el estado de carga como prop
}

export function ImageUploadForm({ onSubmit, loading }: ImageUploadFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ image, description });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Subir Imagen</h2>

      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer block"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-48 object-contain mb-2"
              />
            ) : (
              <div className="py-8">
                <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-gray-500">Haz clic para seleccionar una imagen</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          placeholder="Escribe una descripción..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
        disabled={loading} // Deshabilitar el botón mientras se sube la imagen
      >
        {loading ? (
          <span className="animate-spin">Subiendo...</span> // Indicador de carga
        ) : (
          'Subir'
        )}
      </button>
    </form>
  );
}

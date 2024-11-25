import { Heart, MessageCircle, Share2 } from 'lucide-react';

export function Feed() {
  const posts = [
    {
      id: 1,
      user: {
        name: 'Alexandara Simonic',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        role: '3D artista, Diseño gráfico'
      },
      content: 'Nuevo diseño para la campaña de primavera 🌸',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      likes: 124,
      comments: 15,
      time: '2h'
    },
    {
      id: 2,
      user: {
        name: 'Alexandara Simonic',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        role: '3D artista, Diseño gráfico'
      },
      content: 'Mi último proyecto de ilustración infantil ✨',
      image: 'https://images.unsplash.com/photo-1594735812599-e2ad264b0d31?w=400',
      likes: 89,
      comments: 8,
      time: '5h'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 flex items-center gap-3">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium">{post.user.name}</h3>
              <p className="text-sm text-gray-600">{post.user.role}</p>
            </div>
          </div>
          
          <img src={post.image} alt="Post" className="w-full aspect-video object-cover" />
          
          <div className="p-4">
            <div className="flex gap-4 mb-4">
              <button className="flex items-center gap-2 text-gray-600">
                <Heart className="w-6 h-6" />
                {post.likes}
              </button>
              <button className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-6 h-6" />
                {post.comments}
              </button>
              <button className="flex items-center gap-2 text-gray-600">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
            
            <p className="mb-2">{post.content}</p>
            <span className="text-sm text-gray-500">{post.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
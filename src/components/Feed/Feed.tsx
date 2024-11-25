import { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from './CreatePost';
import Post from './Post';
import { FeedItem } from './interfaces/Feed-interface.interface';

export default function Feed() {
  const [posts, setPosts] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const token = "";

  useEffect(() => {
    const urlBase = import.meta.env.VITE_BASE_URL;
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${urlBase}api/post`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response, 'res');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  // Función para agregar un nuevo post al feed
  const addNewPost = (newPost: FeedItem) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Agregar el nuevo post al inicio
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-4 px-4">
      <CreatePost onPostCreated={addNewPost} /> {/* Pasar el callback al componente CreatePost */}
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
}

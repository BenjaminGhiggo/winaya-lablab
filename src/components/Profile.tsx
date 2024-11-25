import { Award, Users, Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';

const events = [
  {
    id: 1,
    title: 'Workshop de Emprendimiento',
    description: 'Aprende las bases para iniciar tu propio negocio con expertos del sector.',
    location: 'Centro Empresarial Lima',
    date: '14 de marzo de 2024',
  },
  {
    id: 2,
    title: 'Conferencia Tech Women',
    description: 'Únete a las mujeres líderes en tecnología para una jornada de networking.',
    location: 'Hotel Westin Lima',
    date: '19 de marzo de 2024',
  },
  {
    id: 3,
    title: 'Feria de Emprendedoras',
    description: 'Exhibe tus productos y conecta con otras emprendedoras.',
    location: 'Parque Kennedy, Miraflores',
    date: '24 de marzo de 2024',
  },
];


export function Profile() {
  const navigate = useNavigate();
  const handleViewProductDetail = () => {
    navigate('/product/1');
  };
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const posts = [
    {
      id: 1,
      content: 'Nuevo producto de menta para la tienda 🌸',
      image: 'https://i.pinimg.com/564x/cc/87/13/cc8713d42cb54a9720c3dcd2d5c4c14a.jpg',
      likes: 124,
      comments: 15,
      time: '2h'
    },
    {
      id: 2,
      content: 'Tenemos una nueva vitrina en la tienda✨',
      image: 'https://i.pinimg.com/1200x/cb/9b/27/cb9b2787fdb520c69900a1df1f074cc4.jpg',
      likes: 89,
      comments: 8,
      time: '5h'
    }
  ];

  const experiences = [
    {
      id: 1,
      content: 'Culmine mi especialidad en manejo de chocolate!',
      date: 'Octubre 2024',
      image: 'https://i.pinimg.com/control2/736x/1d/45/d1/1d45d1ecd050491682dab6aff96490b0.jpg'
    },
    {
      id: 2,
      content: 'Presentación en la ExpoAlimentaria',
      date: 'Septiembre 2024',
      image: 'https://i.ytimg.com/vi/ID4oR-lIEyw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBn_P8cJu2PIOAfRhRKD-pxN5cGKQ'
    }
  ];


  return (
    <div className="max-w-3xl bg-[#F7F7F7] mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://www.mujeres.la/wp-content/uploads/2021/06/peruana.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <div>
            <h1 className="text-2xl font-semibold">Marina Loaz</h1>
            <p className="text-gray-600 mb-2">Repostería</p>
            <p className="text-gray-600">Lima, Perú</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleViewProductDetail}
                className="bg-purple-600 text-white font-medium rounded-md px-4 py-2 border border-purple-600 hover:bg-purple-700 transition duration-200"
              >
                Ver en tienda
              </button>
              <button
                onClick={toggleFollow}
                className={`font-medium rounded-md px-4 py-2 border transition duration-200 ${
                  isFollowing
                    ? 'bg-pink-500 text-white border-pink-500 hover:bg-pink-600'
                    : 'bg-white text-pink-500 border-pink-500 hover:bg-pink-100'
                }`}
              >
                {isFollowing ? 'Siguiendo' : 'Seguir'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-8 sm:gap-6 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="text-xl font-semibold">57</div>
            <div className="text-gray-600">Eventos</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-xl font-semibold">320</div>
            <div className="text-gray-600">Seguidores</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-xl font-semibold">10</div>
            <div className="text-gray-600">Insignias</div>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Insignias</h2>
        <div className="flex flex-wrap gap-4 justify-center">
  {[
    {
      icon: 'https://i.pinimg.com/736x/c0/2c/97/c02c973421277db04e59b7f4c84a9572.jpg',
      title: 'Primeros pasos',
      desc: 'Para usuarios que completaron su perfil empresarial',
    },
    {
      icon: 'https://i.pinimg.com/736x/5d/8e/6e/5d8e6e3d41480cd5be41c855bfdf64b3.jpg',
      title: 'Conectora',
      desc: 'Por participar en más de 30 eventos de networking',
    },
    {
      icon: 'https://i.pinimg.com/736x/1b/c0/62/1bc0623755a9081a9b1118722b433b16.jpg',
      title: 'Top Estudiante',
      desc: 'Para emprendedoras que completen 15 talleres',
    },
    {
      icon: 'https://i.pinimg.com/736x/55/9e/25/559e25b92aca3b8c57a38f7a1a25da3c.jpg',
      title: 'Mentora',
      desc: 'Para quienes ofrecen mentoría a otras emprendedoras',
    },
  ].map((badge, i) => (
    <div
      key={i}
      className="bg-white rounded-xl p-4 text-center flex-1 min-w-[250px] min-h-[250px]"
    >
      <div className="w-40 h-40 mx-auto mb-2 bg-pink-100 rounded-lg flex items-center justify-center">
        <img
          src={badge.icon}
          alt={badge.title}
          className="w-32 h-32 object-contain"
        />
      </div>
      <h3 className="font-medium mb-1">{badge.title}</h3>
      <p className="text-sm text-gray-600">{badge.desc}</p>
    </div>
  ))}
</div>

      </section>

      

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Experiencias y Logros</h2>
        <div className="space-y-4">
          {experiences.map(exp => (
            <div key={exp.id} className="bg-white rounded-xl shadow-sm flex p-4 gap-4 items-center">
              <img src={exp.image} alt="Experience" className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <p className="text-gray-800 mb-1">{exp.content}</p>
                <span className="text-sm text-gray-500">{exp.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
                <p className="text-gray-500 text-sm mt-1">{event.date}</p>
              </div>
              <div className="flex mt-4 gap-2">
                <button className="flex-1 bg-pink-500 text-white font-medium py-2 rounded-md">
                  Asistiré
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 rounded-md">
                  Ver evento
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="mb-8">
  <h2 className="text-xl font-semibold mb-4">Publicaciones</h2>
  <div className="space-y-6 flex flex-wrap gap-4 justify-center">
    {posts.map(post => (
      <div key={post.id} className="bg-white rounded-xl shadow-sm max-w-[400px] max-h-[400px] w-full">
        <img src={post.image} alt="Post" className="w-full aspect-video object-cover rounded-t-xl" />
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
</section>

    </div>
  );
}

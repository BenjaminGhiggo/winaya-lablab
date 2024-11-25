import { Star, MapPin, Heart, Share2, MessageCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const businesses = [
  {
    id: 1,
    name: 'Sueños de azúcar',
    description: 'Descubre el placer de los sabores únicos y el arte en cada detalle con Dulces Momentos. Nos especializamos en repostería artesanal, ofreciendo una selección de pasteles, cupcakes y galletas personalizadas para todas tus ocasiones especiales.',
    rating: 4.5,
    deliveries: '300+',
    location: 'Lima, Perú',
    owner: {
      name: 'Marina Loaz',
      role: 'Repostera',
      image: 'https://www.mujeres.la/wp-content/uploads/2021/06/peruana.jpg'
    },
    coverImage: 'https://i.pinimg.com/564x/9a/36/fe/9a36fec0b2a1ea95644bf2bdc0c9bc24.jpg',
 
    catalog: [
      {
        id: 1,
        name: 'Cupcakes de Arándanos',
        price: 'S/ 25.00',
        description: 'Deliciosos cupcakes decorados con crema de arándanos frescos',
        image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400'
      },
      {
        id: 2,
        name: 'Galletas con Chispas',
        price: 'S/ 18.00',
        description: 'Galletas caseras con chispas de chocolate belga',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400'
      },
      {
        id: 3,
        name: 'Torta de Chocolate',
        price: 'S/ 85.00',
        description: 'Torta de chocolate con ganache y frutos rojos',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
      },
      {
        id: 4,
        name: 'Donuts Variados',
        price: 'S/ 30.00',
        description: 'Surtido de donuts con diferentes coberturas y decoraciones',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400'
      }
    ],
    services: [
      'Pasteles personalizados para cumpleaños, bodas y eventos corporativos',
      'Galletas decoradas y temáticas, perfectas para obsequios',
      'Cupcakes exclusivos, con sabores únicos y diseños innovadores',
      'Servicio de entrega a domicilio',
      'Asesoría personalizada para eventos'
    ]
  },

  {
    id: 2,
    name: 'AromaCielo',
    description: 'Sumérgete en el mundo de las fragancias exclusivas con AromaCielo, donde cada esencia está diseñada para expresar tu personalidad. Perfumes artesanales con ingredientes exóticos que harán que cada momento sea inolvidable.',
    rating: 4.1,
    deliveries: '100+',
    location: 'Lima, Perú',
    owner: {
      name: 'Paola Robles',
      role: 'Consultora de belleza',
      image: 'https://i.pinimg.com/736x/40/32/1a/40321a1821372c222b9ccc51932025ef.jpg'
    },
    coverImage: 'https://i.pinimg.com/736x/62/7b/6d/627b6d12292c7719d74673601c8fb37b.jpg',
 
    catalog: [
      {
        id: 1,
        name: 'Victoria secret Love Spell',
        price: 'S/ 250.00',
        description: 'Celebra la colección que te celebra a ti. Para cada momento y cada lado de ti, descubre aromas únicos que lo abarcan todo',
        image: 'https://i.pinimg.com/736x/a6/38/13/a638131fa8575f94252369f81abe0de0.jpg'
      },
      {
        id: 2,
        name: 'Prada Milano',
        price: 'S/ 170.00',
        description: 'La esencia de mandarina enriquece la frescura juvenil de la plumeria, mientras que la flor de cananga la suaviza',
        image: 'https://i.pinimg.com/564x/7a/0e/f5/7a0ef5c5588d8c4f699c731921359e22.jpg'
      },
      {
        id: 3,
        name: 'Perfume Mia',
        price: 'S/ 85.00',
        description: 'Con fascinantes notas de gardenia dorada de África y pimienta rosa',
        image: 'https://i.pinimg.com/564x/92/db/95/92db953aad58e9d46ba3625d991d92a2.jpg'
      },
      {
        id: 4,
        name: 'Sweet Thoot',
        price: 'S/ 210.00',
        description: 'Dulce y juguetón, un placer irresistible Sweet Tooth, la primera fragancia de Sabrina, es femenina, floral y duradera',
        image: 'https://i.pinimg.com/564x/14/15/72/141572704d13dae8bcb1cadff8792405.jpg'
      }
    ],
    services: [
      'Perfumes personalizados para todas las ocasiones',
      'Sets de regalo con fragancias únicas',
      'Experiencia de aromas exclusivos para eventos privados'
    ]
  },

  {
    id: 3,
    name: 'RamenSutra',
    description: 'Disfruta de auténtico ramen japonés en RamenSutra, donde cada plato se prepara con ingredientes frescos y técnicas tradicionales. ¡Sumérgete en una experiencia de sabor que te transportará a Japón!',
    rating: 4.5,
    deliveries: '300+',
    location: 'Lima, Perú',
    owner: {
      name: 'Petruzca Robles',
      role: 'Repostero',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400'
    },
    coverImage: 'https://i.pinimg.com/564x/72/5b/61/725b61b185e31abe0c064967fff47553.jpg',
 
    catalog: [
      {
        id: 1,
        name: 'Cupcakes de Arándanos',
        price: 'S/ 25.00',
        description: 'Deliciosos cupcakes decorados con crema de arándanos frescos',
        image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400'
      },
      {
        id: 2,
        name: 'Galletas con Chispas',
        price: 'S/ 18.00',
        description: 'Galletas caseras con chispas de chocolate belga',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400'
      },
      {
        id: 3,
        name: 'Torta de Chocolate',
        price: 'S/ 85.00',
        description: 'Torta de chocolate con ganache y frutos rojos',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
      },
      {
        id: 4,
        name: 'Donuts Variados',
        price: 'S/ 30.00',
        description: 'Surtido de donuts con diferentes coberturas y decoraciones',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400'
      }
    ],
    services: [
      'Pasteles personalizados para cumpleaños, bodas y eventos corporativos',
      'Galletas decoradas y temáticas, perfectas para obsequios',
      'Cupcakes exclusivos, con sabores únicos y diseños innovadores',
      'Servicio de entrega a domicilio',
      'Asesoría personalizada para eventos'
    ]
  },
  // ... other businesses
];

export function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const business = businesses.find(b => b.id === Number(id));

  if (!business) return <div>Negocio no encontrado</div>;

  const handleContact = () => {
    navigate(`/chat`);
  };
  const handleViewProfile = () => {
    navigate(`/profile`); // Navega al perfil específico usando el ID del negocio
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
  <img
    src={business.coverImage}
    alt={business.name}
    className="w-full max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md rounded-xl mb-6 object-contain mx-auto"
  />
  <div className="bg-white rounded-xl p-4 shadow-sm w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
      <img
        src={business.owner.image}
        alt={business.owner.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="text-center sm:text-left">
        <h3 className="font-medium">{business.owner.name}</h3>
        <p className="text-gray-600 text-sm">{business.owner.role}</p>
      </div>
    </div>
    <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600 text-sm">
      <MapPin className="w-4 h-4" />
      {business.location}
    </div>
    <button
              onClick={handleViewProfile} // Ejecuta la función al hacer clic
              className="mt-4 bg-purple-600 text-white font-medium rounded-md px-4 py-2 border border-purple-600 hover:bg-purple-700 transition duration-200"
            >
              Ver en perfil
            </button>
  </div>
</div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h1 className="text-2xl font-semibold mb-4">{business.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{business.rating}</span>
              </div>
              <span className="text-gray-600">·</span>
              <span className="text-gray-600">{business.deliveries} Entregas</span>
            </div>

            <div className="prose max-w-none mb-6">
              <p>{business.description}</p>
              <h3 className="text-lg font-medium mt-6 mb-3">Servicios Destacados:</h3>
              <ul className="space-y-2">
                {business.services.map((service, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleContact}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Contactar
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-50">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-50">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Catálogo de Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {business.catalog.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="bg-gray-50 rounded-xl overflow-hidden mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <p className="text-purple-600 font-medium">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
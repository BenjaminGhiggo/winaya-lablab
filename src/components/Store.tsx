import { Plus, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    title: 'Sueños de azúcar',
    rating:'4.5',
    description: 'Tortas, kekes, bocaditos y tortas a pedido',
    image: 'https://i.pinimg.com/564x/9a/36/fe/9a36fec0b2a1ea95644bf2bdc0c9bc24.jpg',
  },
  {
    id: 2,
    title: 'AromaCielo',
    rating:'4.1',
    description: 'Fragancias que inspiran',
    image: 'https://i.pinimg.com/736x/62/7b/6d/627b6d12292c7719d74673601c8fb37b.jpg',
  },
  {
    id: 3,
    title: 'RamenSutra',
    rating:'3.7',
    description: 'Sabor japonés en cada sorbo',
    image: 'https://i.pinimg.com/564x/72/5b/61/725b61b185e31abe0c064967fff47553.jpg',
  },
  {
    id: 4,
    title: 'GlamPop',
    rating:'4.8',
    description: 'Colores para brillar cada día.',
    image: 'https://i.pinimg.com/736x/89/63/52/8963524761b32bb9167b43a36d619b7c.jpg',
  },
  {
    id: 5,
    title: 'PastAmore',
    rating:'4.2',
    description: 'Italia en cada bocado.',
    image: 'https://i.pinimg.com/564x/f3/65/f9/f365f9924a1630c605123d1ea2b94265.jpg',
  },
  {
    id: 6,
    title: 'LibroLuz',
    rating:'3.5',
    description: 'Historias que iluminan tu mente',
    image: 'https://i.pinimg.com/564x/85/6f/04/856f04e7a3c1c5eb466821a9613c71fd.jpg',
  },
  {
    id: 7,
    title: 'TakeCare',
    description: 'Cuida y revive tu piel',
    image: 'https://i.pinimg.com/564x/2c/2b/89/2c2b8957a8160fff1b9e216f9e20a252.jpg',
  },
  {
    id: 8,
    title: 'SuaviAmigos',
    rating:'3.3',
    description: 'Abrazos que siempre están',
    image: 'https://i.pinimg.com/736x/df/f0/40/dff040f57986c6194fdd0530de8f63fb.jpg',
  },
  {
    id: 9,
    title: 'CocinaCreativa',
    rating:'4.1',
    description: 'Herramientas para chefs apasionados',
    image: 'https://i.pinimg.com/564x/1f/6f/fa/1f6ffa7636b2ac676cdc046d4d431074.jpg',
  },

  
  // Add more products...
];

export function Store() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
  <div>
    <h1 className="text-2xl font-semibold mb-2">Bienvenida a la tienda</h1>
    <p className="text-gray-600">Te mostramos productos que quizás te interesen</p>
  </div>
  {/* Contenedor de búsqueda que cambia de columna en pantallas pequeñas */}
  <div className="relative mt-4 lg:mt-0 lg:w-1/3 w-full">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="search"
      placeholder="Buscar producto"
      className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
    />
  </div>
</div>


      <button className="flex items-center gap-2 mb-8 bg-purple-50 text-purple-600 px-4 py-2 rounded-lg">
        <Plus className="w-5 h-5" />
        <span>Publica aquí los productos que ofreces y crea un catálogo</span>
      </button>

      {/* Contenedor de productos responsivo usando flex-wrap */}
      <div className="flex flex-wrap gap-6 justify-evenly">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group w-full sm:w-1/2 lg:w-1/4">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-shadow group-hover:shadow-md">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-medium mb-1">{product.title}</h3>
  
                  <div className="flex items-center mb-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium ml-1">{product.rating}</span>
                </div>

                <p className="text-sm text-gray-600">{product.description}</p>
                </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
import { Award, Users, Calendar } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex items-start gap-6">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-semibold">Alexandara Simonic</h1>
            <p className="text-gray-600 mb-2">3D artista, Diseño gráfico</p>
            <p className="text-gray-600">Lima, Perú</p>
            <button className="mt-4 text-purple-600 font-medium">Ver en tienda</button>
          </div>
        </div>

        <div className="flex gap-8 mt-8">
          <div className="text-center">
            <div className="text-xl font-semibold">57</div>
            <div className="text-gray-600">Eventos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">300</div>
            <div className="text-gray-600">Entregas</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">10</div>
            <div className="text-gray-600">Insignias</div>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Insignias</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Award, title: 'Primeros pasos', desc: 'Para usuarios que completaron su perfil empresarial' },
            { icon: Users, title: 'Conectora', desc: 'Por participar en más de 30 eventos de networking' },
            { icon: Award, title: 'Top Seller', desc: 'Para emprendedoras que alcanzan una meta de ventas en la tienda' },
            { icon: Award, title: 'Mentora', desc: 'Para quienes ofrecen mentoría a otras emprendedoras' },
          ].map((badge, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-pink-100 rounded-lg flex items-center justify-center">
                <badge.icon className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-medium mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Experiencia y Logros</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Ilustración infantil', subtitle: 'Certificación', img: 'https://images.unsplash.com/photo-1594735812599-e2ad264b0d31?w=400' },
            { title: 'Campaña de marketing', subtitle: 'Trabajo para Gloria', img: 'https://images.unsplash.com/photo-1611162618758-2a29a995354b?w=400' },
            { title: 'Colaboración con Vogue', subtitle: 'Brasil edición Abril', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
          ].map((achievement, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden">
              <img src={achievement.img} alt={achievement.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-medium">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
import React from 'react';

export default function RightSidebar() {
  const ads = [
    {
      title: "Floristería Bella Rosa ",
      subtitle: "bellarosa.com",
      image: "https://us.images.westend61.de/0001926546pw/mujer-florista-sonriente-y-feliz-vendiendo-un-ramo-a-un-cliente-en-una-floristeria-rodeada-de-varias-flores-ADSF50551.jpg"
    },
    {
      title: "Odontología Auladent",
      subtitle: "auladent.com",
      image: "https://blog.auladent.com/wp-content/uploads/2019/03/mujeres-dentistas-1024x538.png"
    }
  ];

  return (
    <div className="fixed right-0 top-16 w-64 h-[calc(100vh-4rem)] border-l border-gray-200 bg-white p-4">
      <h3 className="font-semibold text-gray-500 mb-4">Lo más destacado</h3>
      <div className="space-y-4">
        {ads.map((ad, index) => (
          <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
            <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h4 className="font-semibold">{ad.title}</h4>
              <p className="text-sm text-gray-500">{ad.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
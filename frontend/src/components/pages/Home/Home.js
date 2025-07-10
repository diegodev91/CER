import React from 'react';
import { Play, Users, Calendar, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cer-green-800 to-cer-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              CER - Cuidando el Rancho
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cer-green-100 max-w-3xl mx-auto">
              El programa de televisión favorito de la familia. Únete a nosotros en cada episodio 
              lleno de aventuras, risas y momentos inolvidables en el rancho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-cer-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-cer-green-50 transition-colors flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Ver Último Episodio</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-cer-green-800 transition-colors">
                Conoce el Cast
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episodes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Episodios Destacados</h2>
            <p className="text-lg text-gray-600">No te pierdas los episodios más populares</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Episode placeholders */}
            {[1, 2, 3].map((episode) => (
              <div key={episode} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-cer-green-100 flex items-center justify-center">
                  <Play className="h-12 w-12 text-cer-green-600" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Episodio {episode}</h3>
                  <p className="text-gray-600 mb-4">
                    Una nueva aventura en el rancho que no te puedes perder. 
                    Llena de diversión y momentos emotivos.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Temporada 1</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-cer-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-cer-green-200">Episodios</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-cer-green-200">Temporadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-cer-green-200">Seguidores</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-cer-green-200">Rating Promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Últimas Noticias</h2>
            <p className="text-lg text-gray-600">Mantente al día con todo lo que pasa en el rancho</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News placeholders */}
            {[1, 2, 3].map((news) => (
              <div key={news} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Hace 2 días</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Noticia Importante {news}</h3>
                  <p className="text-gray-600">
                    Entérate de las últimas novedades del programa y del equipo de producción.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

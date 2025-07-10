import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Star, Calendar, Youtube, Heart } from 'lucide-react';

const Home = () => {
  const stats = [
    { label: 'CerRanos', value: '50K+', icon: Users, color: 'text-blue-600' },
    { label: 'Episodios', value: '100+', icon: Play, color: 'text-green-600' },
    { label: 'Años al aire', value: '3+', icon: Calendar, color: 'text-purple-600' },
    { label: 'Reels', value: '200+', icon: Star, color: 'text-yellow-600' },
  ];

  const features = [
    {
      title: '📺 Episodios Completos',
      description: 'Disfruta de todos los episodios de CER directamente desde YouTube en nuestra plataforma.',
      link: '/episodes',
      icon: Play,
      color: 'bg-blue-500'
    },
    {
      title: '🎬 Reels Exclusivos',
      description: 'Los mejores momentos, bloopers y contenido exclusivo en formato corto.',
      link: '/reels',
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      title: '📰 Noticias CerRanos',
      description: 'Mantente al día con las últimas noticias y actualizaciones del programa.',
      link: '/news',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: '🛒 Tienda Oficial',
      description: 'Merchandising exclusivo para la comunidad CerRanos.',
      link: '/shop',
      icon: Heart,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-3 mb-4">
                <Youtube className="h-12 w-12 text-red-400" />
                <div className="text-left">
                  <p className="text-lg font-medium text-green-100">En RORO Network</p>
                  <p className="text-sm text-green-200">Canal de YouTube Oficial</p>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              CER - Cuidando el Rancho
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-green-100">
              El programa de YouTube favorito de la familia. 
              Únete a la comunidad <span className="font-bold text-yellow-300">CerRanos</span> y 
              disfruta del mejor contenido rural y familiar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/episodes"
                className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Youtube className="h-5 w-5 mr-2" />
                Ver Episodios
              </Link>
              <Link
                to="/reels"
                className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
              >
                <Star className="h-5 w-5 mr-2" />
                Reels Destacados
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              La Comunidad CerRanos
            </h2>
            <p className="text-lg text-gray-600">
              Unidos por la pasión del campo y la familia
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Qué encontrarás aquí?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tu plataforma completa para disfrutar de todo el contenido de 
              Cuidando el Rancho y conectar con otros CerRanos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.color} text-white mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¡Únete a la Familia CerRanos!
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro canal de YouTube y no te pierdas ningún episodio 
            de las aventuras en el rancho.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://youtube.com/@roronetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Youtube className="h-5 w-5 mr-2" />
              Suscribirse en YouTube
            </a>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
            >
              Conoce más sobre CER
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

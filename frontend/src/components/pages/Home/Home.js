import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Star, Calendar, Youtube, Heart, ArrowRight } from 'lucide-react';
import YouTubeEmbed from '../../common/YouTubeEmbed/YouTubeEmbed';
import YouTubePlaylist from '../../common/YouTubePlaylist/YouTubePlaylist';
import YouTubeShorts from '../../common/YouTubeShorts/YouTubeShorts';
import api from '../../../services/api';

const Home = () => {
  const [featuredEpisode, setFeaturedEpisode] = useState(null);
  const [featuredReels, setFeaturedReels] = useState([]);
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [allReels, setAllReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      setLoading(true);
      
      // Fetch all episodes for playlist - use the first one as featured
      const allEpisodesData = await api.get('/episodes?limit=10');
      if (allEpisodesData.success && allEpisodesData.data.length > 0) {
        setAllEpisodes(allEpisodesData.data);
        setFeaturedEpisode(allEpisodesData.data[0]); // Use first episode as featured
      }

      // Fetch featured reels
      const reelsData = await api.get('/reels/featured?limit=6');
      if (reelsData.success) {
        setFeaturedReels(reelsData.data);
      }

      // Fetch all reels for shorts section
      const allReelsData = await api.get('/reels?limit=8');
      if (allReelsData.success) {
        setAllReels(allReelsData.data);
      }
    } catch (error) {
      console.error('Error fetching featured content:', error);
    } finally {
      setLoading(false);
    }
  };
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

      {/* Featured Episode Section */}
      {!loading && featuredEpisode && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🎬 Episodio Destacado
              </h2>
              <p className="text-lg text-gray-600">
                El último episodio de Cuidando el Rancho
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <YouTubeEmbed
                    videoId={featuredEpisode.youtubeVideoId}
                    title={featuredEpisode.title}
                    thumbnail={featuredEpisode.thumbnailUrl}
                    duration={featuredEpisode.duration * 60}
                    viewCount={featuredEpisode.viewCount}
                    publishedAt={featuredEpisode.airDate}
                    showDetails={false}
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      Temporada {featuredEpisode.season} • Episodio {featuredEpisode.episodeNumber}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredEpisode.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {featuredEpisode.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/episodes/${featuredEpisode.id}`}
                      className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Ver Episodio Completo
                    </Link>
                    <Link
                      to="/episodes"
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      Ver todos los episodios
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Playlist Section */}
      {!loading && allEpisodes.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <YouTubePlaylist
              playlistId="PLQovf0jBx8pRPepxCD9rjsQOXsS8grL2K"
              title="🎬 Todos los Episodios de CER"
              description="La lista completa de episodios de Cuidando el Rancho en nuestro canal oficial"
              videos={allEpisodes}
              showVideoList={true}
              maxVideosToShow={5}
            />
          </div>
        </div>
      )}

      {/* YouTube Shorts Section */}
      {!loading && allReels.length > 0 && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🎬 CER Shorts & Reels
              </h2>
              <p className="text-lg text-gray-600">
                Los mejores momentos del programa en formato corto
              </p>
            </div>
            
            <YouTubeShorts
              shorts={allReels}
              title=""
              showGrid={true}
              columns={4}
            />
            
            <div className="text-center mt-8">
              <Link
                to="/reels"
                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Ver todos los Reels
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Featured Reels Section */}
      {!loading && featuredReels.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ⭐ Reels Destacados
              </h2>
              <p className="text-lg text-gray-600">
                Los mejores momentos en formato corto
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredReels.map((reel) => (
                <div key={reel.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <YouTubeEmbed
                    videoId={reel.youtubeVideoId}
                    title={reel.title}
                    thumbnail={reel.thumbnailUrl}
                    duration={reel.duration}
                    viewCount={reel.viewCount}
                    publishedAt={reel.publishedAt}
                    showDetails={false}
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {reel.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {reel.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⭐ Destacado
                      </span>
                      <button
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${reel.youtubeVideoId}`, '_blank')}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Ver Reel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/reels"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                Ver todos los Reels
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}

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
              href="https://www.youtube.com/@LaRoroNetworkOficial"
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

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Eye, Play, Filter, Plus } from 'lucide-react';
import YouTubeEmbed from '../../common/YouTubeEmbed/YouTubeEmbed';
import api from '../../../services/api';
import { endpoints } from '../../../config/api';
import { useAuth } from '../../../context/AuthContext';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [seasons, setSeasons] = useState([]);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchEpisodes();
    fetchSeasons();
  }, []);

  useEffect(() => {
    fetchEpisodes();
  }, [selectedSeason]);

  const fetchSeasons = async () => {
    try {
      const data = await api.get(endpoints.episodes.getSeasons);
      if (data.success) {
        setSeasons([
          { value: 'all', label: 'Todas las temporadas' },
          ...data.data
        ]);
      }
    } catch (error) {
      console.error('Error fetching seasons:', error);
    }
  };

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      const url = selectedSeason === 'all' 
        ? endpoints.episodes.getAll
        : `${endpoints.episodes.getAll}?season=${selectedSeason}`;
      
      const data = await api.get(url);
      if (data.success) {
        setEpisodes(data.data);
      }
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count?.toString() || '0';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📺 Episodios de CER
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Todos los episodios completos de <span className="font-semibold text-green-600">CER</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                🎬 RORO Network
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                🎭 Humor Sin Filtros
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                👥 Comunidad CERranos
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Season Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtrar por temporada</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {seasons.map((season) => (
              <button
                key={season.value}
                onClick={() => setSelectedSeason(season.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSeason === season.value
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {season.label}
              </button>
            ))}
          </div>
        </div>

        {/* Episodes List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Cargando episodios...</p>
          </div>
        ) : episodes.length > 0 ? (
          <div className="space-y-8">
            {episodes.map((episode) => (
              <div key={episode.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="lg:flex">
                  {/* Video */}
                  <div className="lg:w-1/2">
                    <YouTubeEmbed
                      videoId={episode.youtubeVideoId}
                      title={episode.title}
                      description={episode.description}
                      thumbnail={episode.thumbnailUrl}
                      duration={episode.duration * 60} // Convert minutes to seconds
                      viewCount={episode.viewCount}
                      publishedAt={episode.airDate}
                      showDetails={false}
                      className="h-full"
                    />
                  </div>
                  
                  {/* Episode Info */}
                  <div className="lg:w-1/2 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          T{episode.season}E{episode.episodeNumber}
                        </span>
                        {episode.isPublished && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Publicado
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {episode.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {episode.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      {episode.duration && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDuration(episode.duration)}
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {formatViewCount(episode.viewCount)} visualizaciones
                      </div>
                      
                      {episode.airDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(episode.airDate).toLocaleDateString('es-ES')}
                        </div>
                      )}
                    </div>
                    
                    {/* Tags */}
                    {episode.tags && Array.isArray(episode.tags) && episode.tags.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {episode.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${episode.youtubeVideoId}`, '_blank')}
                        className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Ver en YouTube
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay episodios disponibles
            </h3>
            <p className="text-gray-600">
              {selectedSeason === 'all' 
                ? 'Aún no hemos subido episodios. ¡Vuelve pronto!'
                : 'No hay episodios en esta temporada. Prueba con otra temporada.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Episodes;

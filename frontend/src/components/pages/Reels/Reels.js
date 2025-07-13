import React, { useState, useEffect } from 'react';
import { Play, Eye, Clock, Tag } from 'lucide-react';
import api from '../../../services/api';

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [featuredReels, setFeaturedReels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryColors = {
    funny: 'bg-yellow-100 text-yellow-800',
    highlights: 'bg-blue-100 text-blue-800',
    'behind-scenes': 'bg-purple-100 text-purple-800',
    community: 'bg-green-100 text-green-800',
    other: 'bg-gray-100 text-gray-800'
  };

  useEffect(() => {
    fetchCategories();
    fetchFeaturedReels();
    fetchReels();
  }, []);

  useEffect(() => {
    fetchReels();
  }, [selectedCategory, currentPage]);

  const fetchCategories = async () => {
    try {
      const data = await api.get('/reels/categories');
      if (data.success) {
        setCategories([
          { value: 'all', label: 'Todos', emoji: '📺' },
          ...data.data
        ]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFeaturedReels = async () => {
    try {
      const data = await api.get('/reels/featured');
      if (data.success) {
        setFeaturedReels(data.data);
      }
    } catch (error) {
      console.error('Error fetching featured reels:', error);
    }
  };

  const fetchReels = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all' 
        ? `/reels?page=${currentPage}&limit=12`
        : `/reels?page=${currentPage}&limit=12&category=${selectedCategory}`;
      
      const data = await api.get(url);
      if (data.success) {
        setReels(data.data);
      }
    } catch (error) {
      console.error('Error fetching reels:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `0:${secs.toString().padStart(2, '0')}`;
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleReelClick = (videoId) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎬 CER Reels
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Los mejores momentos de <span className="font-semibold text-green-600">CER</span> en formato corto
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                📺 RORO Network
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                👥 Comunidad CERranos
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Reels */}
        {featuredReels.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              ⭐ Reels Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredReels.map((reel) => (
                <div
                  key={reel.id}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => handleReelClick(reel.youtubeVideoId)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={reel.thumbnailUrl || `https://img.youtube.com/vi/${reel.youtubeVideoId}/maxresdefault.jpg`}
                      alt={reel.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {reel.duration && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {formatDuration(reel.duration)}
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900">
                        ⭐ Destacado
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {reel.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Eye className="h-4 w-4 mr-1" />
                      {formatViewCount(reel.viewCount)} visualizaciones
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Todos los Reels</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setSelectedCategory(category.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {category.emoji} {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reels Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Cargando reels...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reels.map((reel) => (
              <div
                key={reel.id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleReelClick(reel.youtubeVideoId)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={reel.thumbnailUrl || `https://img.youtube.com/vi/${reel.youtubeVideoId}/maxresdefault.jpg`}
                    alt={reel.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <Play className="h-10 w-10 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {reel.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {formatDuration(reel.duration)}
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[reel.category] || categoryColors.other}`}>
                      <Tag className="h-3 w-3 mr-1" />
                      {categories.find(c => c.value === reel.category)?.label || 'Otros'}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                    {reel.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {formatViewCount(reel.viewCount)}
                    </div>
                    {reel.publishedAt && (
                      <span>
                        {new Date(reel.publishedAt).toLocaleDateString('es-ES')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {reels.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay reels disponibles
            </h3>
            <p className="text-gray-600">
              {selectedCategory === 'all' 
                ? 'Aún no hemos subido reels. ¡Vuelve pronto!'
                : 'No hay reels en esta categoría. Prueba con otra categoría.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reels;

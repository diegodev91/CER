import React, { useState } from 'react';
import { Play, ExternalLink, Calendar, Eye, Clock } from 'lucide-react';

const YouTubeEmbed = ({ 
  videoId, 
  title, 
  description, 
  thumbnail, 
  duration, 
  viewCount, 
  publishedAt,
  autoplay = false,
  showDetails = true,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViewCount = (count) => {
    if (!count) return '0';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const openInYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  if (!videoId) {
    return (
      <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Video no disponible</p>
      </div>
    );
  }

  return (
    <div className={`youtube-embed ${className}`}>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
        {!isPlaying ? (
          <>
            {/* Thumbnail with Play Button */}
            <div className="relative w-full h-full group cursor-pointer" onClick={handlePlay}>
              <img
                src={thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  // Fallback to hqdefault if maxresdefault fails
                  e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              
              {/* Loading placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500">Cargando...</div>
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Play className="h-8 w-8 ml-1" fill="currentColor" />
                </button>
              </div>
              
              {/* Duration Badge */}
              {duration && (
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {formatDuration(duration)}
                </div>
              )}
              
              {/* Open in YouTube Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openInYouTube();
                }}
                className="absolute top-3 right-3 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Abrir en YouTube"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          // YouTube Iframe
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        )}
      </div>
      
      {/* Video Details */}
      {showDetails && (
        <div className="mt-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {viewCount && (
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {formatViewCount(viewCount)} visualizaciones
              </div>
            )}
            
            {publishedAt && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(publishedAt)}
              </div>
            )}
            
            <button
              onClick={openInYouTube}
              className="flex items-center text-red-600 hover:text-red-700 font-medium"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Ver en YouTube
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed;

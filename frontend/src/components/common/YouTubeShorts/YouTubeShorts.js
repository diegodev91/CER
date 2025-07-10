import React, { useState } from 'react';
import { Play, ExternalLink, Hash, Heart, MessageCircle, Share2, Eye } from 'lucide-react';

const YouTubeShorts = ({ 
  shorts = [], 
  title = "YouTube Shorts", 
  className = "",
  showGrid = true,
  columns = 4
}) => {
  const [selectedShort, setSelectedShort] = useState(null);

  const formatViewCount = (count) => {
    if (!count) return '0';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const openShortInYouTube = (videoId) => {
    window.open(`https://youtube.com/shorts/${videoId}`, '_blank');
  };

  const playShort = (short) => {
    setSelectedShort(short);
  };

  const closePlayer = () => {
    setSelectedShort(null);
  };

  const getGridCols = () => {
    switch(columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 5: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className={`youtube-shorts ${className}`}>
      {/* Header */}
      <div className="shorts-header mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Hash className="h-6 w-6 text-red-600 mr-2" />
          {title}
        </h2>
      </div>

      {/* Shorts Grid */}
      {showGrid && (
        <div className={`grid ${getGridCols()} gap-4`}>
          {shorts.map((short, index) => (
            <div key={short.id || index} className="shorts-card group">
              <div className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                {/* Thumbnail */}
                <img
                  src={short.thumbnail_url || `https://img.youtube.com/vi/${short.youtube_video_id}/mqdefault.jpg`}
                  alt={short.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-opacity" />
                
                {/* Play Button */}
                <button
                  onClick={() => playShort(short)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </button>
                
                {/* Duration Badge */}
                {short.duration && (
                  <div className="absolute top-3 left-3 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(short.duration)}
                  </div>
                )}
                
                {/* Category Badge */}
                {short.category && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded capitalize">
                    {short.category}
                  </div>
                )}
                
                {/* Stats */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                      {short.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {formatViewCount(short.view_count)}
                        </div>
                        {short.like_count && (
                          <div className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {formatViewCount(short.like_count)}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openShortInYouTube(short.youtube_video_id);
                        }}
                        className="bg-black bg-opacity-50 hover:bg-opacity-70 p-1 rounded"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile-style Player Modal */}
      {selectedShort && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm mx-auto">
            {/* Close Button */}
            <button
              onClick={closePlayer}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Player */}
            <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${selectedShort.youtube_video_id}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                title={selectedShort.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            
            {/* Video Info */}
            <div className="mt-4 text-white">
              <h3 className="font-semibold text-lg mb-2">{selectedShort.title}</h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                {selectedShort.description}
              </p>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {formatViewCount(selectedShort.view_count)} views
                  </div>
                  {selectedShort.like_count && (
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {formatViewCount(selectedShort.like_count)}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openShortInYouTube(selectedShort.youtube_video_id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Ver en YouTube
                  </button>
                </div>
              </div>
              
              {/* Tags */}
              {selectedShort.tags && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {JSON.parse(selectedShort.tags).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeShorts;

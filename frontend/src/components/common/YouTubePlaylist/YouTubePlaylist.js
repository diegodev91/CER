import React, { useState } from 'react';
import { Play, ExternalLink, List, Clock, Eye } from 'lucide-react';
import YouTubeEmbed from '../YouTubeEmbed/YouTubeEmbed';

const YouTubePlaylist = ({ 
  playlistId, 
  title, 
  description, 
  videos = [], 
  showVideoList = true,
  maxVideosToShow = 5,
  className = ""
}) => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0] || null);
  const [showAllVideos, setShowAllVideos] = useState(false);

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

  const openPlaylistInYouTube = () => {
    window.open(`https://www.youtube.com/playlist?list=${playlistId}`, '_blank');
  };

  const videosToShow = showAllVideos ? videos : videos.slice(0, maxVideosToShow);

  return (
    <div className={`youtube-playlist ${className}`}>
      {/* Playlist Header */}
      <div className="playlist-header mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <List className="h-6 w-6 text-red-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {description && (
                <p className="text-gray-600 mt-1">{description}</p>
              )}
            </div>
          </div>
          <button
            onClick={openPlaylistInYouTube}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Ver Playlist Completa</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Player */}
        <div className="lg:col-span-2">
          {selectedVideo && (
            <YouTubeEmbed
              videoId={selectedVideo.youtubeVideoId || selectedVideo.youtube_video_id}
              title={selectedVideo.title}
              description={selectedVideo.description}
              duration={selectedVideo.duration}
              viewCount={selectedVideo.viewCount || selectedVideo.view_count}
              publishedAt={selectedVideo.airDate || selectedVideo.published_at}
              autoplay={false}
              showDetails={true}
            />
          )}
        </div>

        {/* Video List */}
        {showVideoList && (
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <List className="h-5 w-5 mr-2" />
                Lista de Videos ({videos.length})
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {videosToShow.map((video, index) => (
                  <div
                    key={video.id || index}
                    className={`playlist-item cursor-pointer p-3 rounded-lg transition-all ${
                      selectedVideo?.id === video.id || selectedVideo === video
                        ? 'bg-red-100 border border-red-300'
                        : 'bg-white hover:bg-gray-100 border border-gray-200'
                    }`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="flex space-x-3">
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnailUrl || video.thumbnail_url || `https://img.youtube.com/vi/${video.youtubeVideoId || video.youtube_video_id}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded">
                          <Play className="h-4 w-4 text-white" fill="currentColor" />
                        </div>
                        {video.duration && (
                          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                            <Clock className="h-2 w-2 inline mr-1" />
                            {formatDuration(video.duration)}
                          </div>
                        )}
                      </div>
                      
                      {/* Video Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {video.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          {video.episodeNumber && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                              Ep. {video.episodeNumber}
                            </span>
                          )}
                          {(video.viewCount || video.view_count) && (
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {formatViewCount(video.viewCount || video.view_count)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Show More/Less Button */}
              {videos.length > maxVideosToShow && (
                <button
                  onClick={() => setShowAllVideos(!showAllVideos)}
                  className="w-full mt-4 text-center text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  {showAllVideos ? 'Mostrar menos' : `Mostrar ${videos.length - maxVideosToShow} videos más`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubePlaylist;

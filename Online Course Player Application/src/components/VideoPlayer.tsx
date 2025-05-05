import React, { useState } from 'react';
import { Maximize2, Minimize2, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, posterSrc, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full rounded-lg overflow-hidden bg-gray-900 aspect-video shadow-lg"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={videoSrc}
        poster={posterSrc}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying && (
          <button 
            onClick={togglePlay}
            className="bg-white/30 hover:bg-white/40 transition-colors rounded-full p-4 backdrop-blur-sm"
          >
            <Play size={24} className="text-white" />
          </button>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium text-sm md:text-base truncate">{title}</h3>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={toggleMute}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
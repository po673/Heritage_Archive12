import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft, Clock, Calendar, Sparkles, AlertCircle } from 'lucide-react';
import RelatedVideos from './RelatedVideos';
import './VideoPlayer.css';

export default function VideoPlayer({ video, onBack, onSelectRelated, relatedVideos = [] }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            // Autoplay policy restriction catch
            setIsPlaying(false);
          });
      }
    }
  }, [video?.id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        const p = videoRef.current.play();
        if (p !== undefined) {
          p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      videoRef.current.muted = vol === 0;
      setIsMuted(vol === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!video) return null;

  return (
    <div className="video-player-page fade-in">
      {/* Top Back Navigation Bar */}
      <div className="vpp-back-bar">
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={18} /> அனைத்து வீடியோக்கள் பட்டியலுக்குத் திரும்பு (Back to Videos)
        </button>
      </div>

      {/* Main Video Screen Container */}
      <div className="vpp-player-card">
        <div className="vpp-video-wrapper">
          <video
            ref={videoRef}
            src={video.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
            poster={video.thumb}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
            onClick={togglePlay}
            controls
            playsInline
          />

          {hasError && (
            <div className="vpp-error-banner" style={{
              position: 'absolute', top: 10, left: 10, right: 10,
              background: 'rgba(220, 38, 38, 0.9)', color: '#fff',
              padding: '8px 16px', borderRadius: '8px', display: 'flex',
              alignItems: 'center', gap: '8px', fontSize: '0.85rem', zIndex: 10
            }}>
              <AlertCircle size={16} />
              <span>காணொளியை ஏற்றுவதில் சிக்கல் ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.</span>
            </div>
          )}
        </div>

        {/* Video Info Section */}
        <div className="vpp-info-box">
          <div className="vpp-meta-tags">
            {video.cat && <span className="vpp-cat-chip"><Sparkles size={13} /> {video.cat}</span>}
            {(video.date || video.year) && <span><Calendar size={14} /> {video.date || video.year}</span>}
            {video.duration && <span><Clock size={14} /> {video.duration}</span>}
          </div>

          <h1 className="vpp-title">{video.title || 'வரலாற்று காணொளி'}</h1>
          <p className="vpp-desc">{video.desc || 'தமிழ் பண்பாட்டு மற்றும் வரலாற்று மரபு காணொளி ஆவணம்.'}</p>
        </div>
      </div>

      {/* Reusable Related Videos Section */}
      <RelatedVideos
        videos={relatedVideos}
        currentVideoId={video.id}
        onSelectRelated={onSelectRelated}
      />
    </div>
  );
}


import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Music } from 'lucide-react';
import './AudioPlayer.css';

export default function AudioPlayer({ audio, isPlaying, onPlayPause, onClose }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current && audio) {
      if (isPlaying) {
        audioRef.current.play().catch(() => { });
      } else {
        audioRef.current.pause();
      }
    }
  }, [audio, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!audio) return null;

  return (
    <div className="floating-audio-player fade-in-up">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        preload="none"
        src={audio.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onPlayPause(false)}
      />

      {/* Close Button */}
      <button className="player-close-btn" onClick={onClose} title="Close Player" aria-label="Close audio player">
        <X size={16} />
      </button>

      {/* Main Track Info */}
      <div className="player-main-row">
        <div className="player-cover-wrap">
          <img src={audio.img || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=200'} alt={audio.title} />
          {isPlaying && <div className="playing-equalizer-bars"><span></span><span></span><span></span></div>}
        </div>

        <div className="player-track-info">
          <h4 className="player-title">{audio.title}</h4>
          <p className="player-speaker">{audio.speaker || audio.artist}</p>
        </div>

        {/* Play/Pause Button */}
        <button
          className="player-play-btn"
          onClick={() => onPlayPause(!isPlaying)}
          title={isPlaying ? 'Pause' : 'Play'}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
        </button>
      </div>

      {/* Progress Bar & Time */}
      <div className="player-progress-section">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="player-progress-slider"
          style={{
            backgroundSize: `${((currentTime / (duration || 1)) * 100)}% 100%`
          }}
        />
        <div className="player-time-row">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control Bar */}
      <div className="player-volume-row">
        <button className="vol-icon-btn" onClick={toggleMute} aria-label="Toggle mute">
          {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="player-vol-slider"
        />
      </div>
    </div>
  );
}

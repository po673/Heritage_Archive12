import React from 'react';
import { Play, Pause, Clock, Mic, Download } from 'lucide-react';

export default function AudioCard({ item, currentAudio, isPlaying, onPlayAudio, onTogglePlay }) {
  const isThisActive = currentAudio && currentAudio.id === item.id;
  const isThisPlaying = isThisActive && isPlaying;

  return (
    <div 
      className={`audio-card-item ${isThisActive ? 'is-active' : ''}`}
      onClick={() => onPlayAudio(item)}
    >
      {/* Top Image Banner */}
      <div className="audio-card-thumb-wrap">
        <img 
          src={item.img} 
          alt={item.title} 
          loading="lazy" 
          decoding="async" 
          className="audio-card-thumb-img"
        />
        
        {/* Dark overlay with play badge on hover/active */}
        <div className="audio-card-thumb-overlay">
          <div className="audio-card-center-play">
            {isThisPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" style={{ marginLeft: 2 }} />}
          </div>
        </div>

        {/* Equalizer animation when playing */}
        {isThisPlaying && (
          <div className="audio-card-eq-bars">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      {/* Card Content Details */}
      <div className="audio-card-content">
        <h4 className="audio-card-title" title={item.title}>
          {item.title}
        </h4>
        
        <p className="audio-card-speaker">
          {item.speaker}
        </p>

        {/* Bottom Actions Row */}
        <div className="audio-card-actions">
          <span className="audio-card-time">
            {item.duration}
          </span>

          <div className="audio-card-btn-group">
            <button 
              className={`audio-card-play-btn ${isThisPlaying ? 'playing' : ''}`}
              title={isThisPlaying ? "Pause" : "Play"}
              onClick={(e) => {
                e.stopPropagation();
                if (isThisActive) {
                  onTogglePlay();
                } else {
                  onPlayAudio(item);
                }
              }}
            >
              {isThisPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" style={{ marginLeft: 1 }} />}
            </button>

            {item.audioUrl && (
              <a 
                href={item.audioUrl} 
                download 
                className="audio-card-download-btn"
                title="Download Audio"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


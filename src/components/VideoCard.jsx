import React from 'react';
import { Play, Clock, Calendar, Sparkles } from 'lucide-react';

export default function VideoCard({ video, onSelectVideo }) {
  return (
    <div className="media-card video-card" onClick={() => onSelectVideo(video)}>
      <div className="media-thumb-wrap">
        <img src={video.thumb} alt={video.title} loading="lazy" decoding="async" />
        <span className="duration-tag"><Clock size={12} /> {video.duration}</span>
        <div className="thumb-overlay">
          <button className="play-circle-btn" onClick={(e) => { e.stopPropagation(); onSelectVideo(video); }}>
            <Play size={28} fill="#fff" color="#fff" />
          </button>
        </div>
      </div>
      <div className="media-card-info">
        <span className="video-cat-badge"><Sparkles size={12} /> {video.cat}</span>
        <h3>{video.title}</h3>
        <div className="video-meta-row">
          <span><Calendar size={13} /> {video.date}</span>
          <span>• {video.duration}</span>
        </div>
        <p className="video-desc-snippet">{video.desc}</p>
      </div>
    </div>
  );
}

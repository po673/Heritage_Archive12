import React from 'react';
import { Play, Clock, Film } from 'lucide-react';

export default function RelatedVideos({ videos = [], currentVideoId, onSelectRelated }) {
  const filtered = videos.filter(v => v.id !== currentVideoId);

  return (
    <div className="vpp-related-section">
      <h2><Film size={22} color="#2563eb" style={{ verticalAlign: 'middle', marginRight: 8 }} /> தொடர்புடைய காணொளிகள் (Related Videos)</h2>
      <div className="grid-3" style={{ marginTop: 20 }}>
        {filtered.map((relVideo) => (
          <div key={relVideo.id} className="related-video-card" onClick={() => onSelectRelated(relVideo)}>
            <div className="rvc-thumb-wrap">
              <img src={relVideo.thumb} alt={relVideo.title} />
              <span className="rvc-dur"><Clock size={12} /> {relVideo.duration}</span>
              <div className="rvc-play-overlay">
                <Play size={24} fill="#fff" color="#fff" />
              </div>
            </div>
            <div className="rvc-info">
              <h4>{relVideo.title}</h4>
              <p>{relVideo.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

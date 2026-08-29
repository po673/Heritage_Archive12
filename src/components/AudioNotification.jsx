import React, { useEffect, useState } from 'react';
import { Music, Volume2, X } from 'lucide-react';
import './AudioNotification.css';

export default function AudioNotification({ audio, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, [audio]);

  if (!audio || !visible) return null;

  return (
    <div className="audio-toast-notification fade-in-slide">
      <div className="toast-icon-wrap">
        <Music size={20} className="toast-music-pulse" />
      </div>
      <div className="toast-content">
        <span className="toast-badge"><Volume2 size={12} /> Now Playing</span>
        <h4>{audio.title}</h4>
        <p>{audio.speaker}</p>
      </div>
      <button className="toast-close-btn" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}

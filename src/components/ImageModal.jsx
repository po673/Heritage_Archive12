import React, { useEffect, useRef, useState } from 'react';
import {
  X, ArrowRight, Calendar, Tag, Info, Download, Play, Pause,
  Volume2, VolumeX, Music, Film, Image as ImageIcon, Sparkles,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import CommentSection from './CommentSection/CommentSection';
import './ImageModal.css';

export default function ImageModal({
  item,
  onClose,
  onMoreInfo,
  onPrev,
  onNext,
  currentIndex,
  totalCount
}) {
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Initialize and persist like state in localStorage
  useEffect(() => {
    if (!item) return;
    const itemId = item.id || item.title || item.name;
    const savedLikes = JSON.parse(localStorage.getItem('heritage_likes') || '{}');
    setIsLiked(!!savedLikes[itemId]);
  }, [item]);

  const toggleLike = (e) => {
    e.stopPropagation();
    if (!item) return;
    const itemId = item.id || item.title || item.name;
    const savedLikes = JSON.parse(localStorage.getItem('heritage_likes') || '{}');
    const newStatus = !isLiked;
    setIsLiked(newStatus);
    if (newStatus) {
      savedLikes[itemId] = true;
    } else {
      delete savedLikes[itemId];
    }
    localStorage.setItem('heritage_likes', JSON.stringify(savedLikes));
  };

  // Close modal on Escape key & navigate on Left / Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Safely attempt autoplay without breaking if blocked by browser policy
    if (mediaRef.current) {
      const playPromise = mediaRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, item]);

  if (!item) return null;

  const isVideo = !!item.videoUrl || item.cat === 'speeches' || item.cat === 'documentaries' || item.cat === 'poetry_recitation';
  const isAudio = !isVideo && (!!item.audioUrl || item.cat === 'கவிதை இசை' || item.cat === 'மரபு இசை' || item.cat === 'புரட்சிக் கவி' || item.cat === 'விடுதலைப் பா');

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
        setIsPlaying(false);
      } else {
        const p = mediaRef.current.play();
        if (p !== undefined) {
          p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fullscreen-modal-backdrop fade-in" onClick={onClose}>
      {/* Top Controls Overlay Bar */}
      <div className="modal-top-bar" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-info">
          <span className="modal-category-chip">
            {isVideo ? <Film size={14} /> : isAudio ? <Music size={14} /> : <ImageIcon size={14} />}
            {item.cat || 'தமிழ் மரபு ஆவணம்'}
          </span>
          {item.year && (
            <span className="modal-year-chip">
              <Calendar size={13} /> {item.year}
            </span>
          )}
          {currentIndex !== undefined && totalCount !== undefined && (
            <span className="modal-counter-chip">
              {currentIndex} / {totalCount}
            </span>
          )}
        </div>

        <div className="modal-top-actions">
          {/* Download Button */}
          <button
            className="modal-icon-btn"
            onClick={async (e) => {
              e.stopPropagation();
              const mediaSrc = item.videoUrl || item.audioUrl || item.img || item.thumb || item.poster;
              if (!mediaSrc) return;
              const ext = isVideo ? 'mp4' : isAudio ? 'mp3' : 'jpg';
              const filename = `${item.title || item.name || 'heritage-media'}.${ext}`;

              try {
                const response = await fetch(mediaSrc);
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
              } catch (err) {
                // Fallback direct download link
                const a = document.createElement('a');
                a.href = mediaSrc;
                a.download = filename;
                a.target = '_blank';
                a.click();
              }
            }}
            title="பதிவிறக்கம் (Download)"
            aria-label="Download media"
          >
            <Download size={22} />
          </button>

          {/* More Info Button */}
          {onMoreInfo && (
            <button
              className="modal-icon-btn"
              onClick={() => {
                onClose();
                onMoreInfo(item);
              }}
              title="மேலும் விவரங்கள் (More Info)"
              aria-label="More info"
            >
              <Info size={22} />
            </button>
          )}

          {/* Close (X / Wrong) Button */}
          <button
            className="modal-icon-btn btn-close-modal"
            onClick={onClose}
            title="மூடு (Close - Press Esc)"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Floating Side Navigation Buttons (Previous & Next) */}
      {onPrev && (
        <button
          className="modal-nav-btn nav-prev-btn"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          title="முந்தைய படம் (Previous - Left Arrow)"
          aria-label="Previous item"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {onNext && (
        <button
          className="modal-nav-btn nav-next-btn"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          title="அடுத்த படம் (Next - Right Arrow)"
          aria-label="Next item"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Main Full Width & Height Stage */}
      <div className="modal-fullscreen-stage" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video
            ref={mediaRef}
            src={item.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
            poster={item.img || item.thumb}
            controls
            autoPlay
            playsInline
            className="fullscreen-media"
          />
        ) : isAudio ? (
          <div className="modal-audio-fullscreen-wrap">
            <img src={item.img || item.thumb} alt={item.title} className="fullscreen-media" />
            <div className="modal-audio-player-bar">
              <button className="audio-ctrl-btn" onClick={togglePlay}>
                {isPlaying ? <Pause size={22} /> : <Play size={22} />}
              </button>
              <audio
                ref={mediaRef}
                src={item.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
                onEnded={() => setIsPlaying(false)}
              />
              <div className="audio-info-text">
                <span>{item.title}</span>
                <small>{item.speaker || 'தமிழ் மரபு ஒலி'}</small>
              </div>
              <button className="audio-ctrl-btn" onClick={toggleMute}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        ) : (
          <img
            src={item.img || item.thumb || item.poster || item.videoUrl}
            alt={item.name || item.title}
            className="fullscreen-media"
          />
        )}
      </div>

      {/* Bottom Floating Caption Details Overlay */}
      <div className="modal-bottom-details" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-details-title">{item.name || item.title}</h2>
        <p className="modal-details-desc">
          {item.desc || item.shortIntro || (item.biography ? item.biography.slice(0, 200) + '...' : 'தமிழ் கலாச்சாரம் மற்றும் வரலாற்றுச் சிறப்புமிக்க அரிய மரபு ஆவணம்.')}
        </p>

        {/* Modal Comment Section */}
        <CommentSection
          contentId={`modal_${item.id || item.title}`}
          contentTitle={item.name || item.title}
        />
      </div>
    </div>
  );
}


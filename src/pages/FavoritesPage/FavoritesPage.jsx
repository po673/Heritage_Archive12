import React, { useState } from 'react';
import {
  Heart, Image, Video, Mic, FileText, Trash2,
  ExternalLink, Play, Bookmark, ArrowRight, Eye, ShieldCheck
} from 'lucide-react';
import './FavoritesPage.css';

export default function FavoritesPage({
  favorites,
  onRemoveFavorite,
  onClearAll,
  onNavigate,
  onPlayAudio
}) {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'அனைத்தும் (All)', icon: Bookmark },
    { id: 'photo', label: 'படங்கள் (Photos)', icon: Image },
    { id: 'video', label: 'வீடியோக்கள் (Videos)', icon: Video },
    { id: 'audio', label: 'ஆடியோக்கள் (Audio)', icon: Mic },
    { id: 'document', label: 'ஆவணங்கள் (Documents)', icon: FileText },
  ];

  const filteredFavorites = activeTab === 'all'
    ? favorites
    : favorites.filter((fav) => fav.type === activeTab);

  const getBadgeClass = (type) => {
    switch (type) {
      case 'photo': return 'fav-type-photo';
      case 'video': return 'fav-type-video';
      case 'audio': return 'fav-type-audio';
      case 'document': return 'fav-type-doc';
      default: return 'fav-type-default';
    }
  };

  const getTypeName = (type) => {
    switch (type) {
      case 'photo': return 'புகைப்படம்';
      case 'video': return 'வீடியோ';
      case 'audio': return 'ஆடியோ';
      case 'document': return 'ஆவணம்';
      default: return 'விருப்பமானவை';
    }
  };

  const handleAction = (item) => {
    if (item.type === 'photo') {
      onNavigate('photos');
    } else if (item.type === 'video') {
      onNavigate('videos', item.id);
    } else if (item.type === 'audio') {
      if (onPlayAudio) {
        onPlayAudio(item);
      } else {
        onNavigate('audio');
      }
    } else if (item.type === 'document') {
      onNavigate('documents');
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="favorites-page-container fade-in">
      {/* Header Banner */}
      <div className="page-title-strip fav-hero-strip">
        <div className="fav-title-group">
          <Heart size={36} className="fav-main-heart-icon" />
          <div>
            <h1>எனக்கு பிடித்தவை (My Favorites)</h1>
            <p>நீங்கள் சேமித்த படங்கள், வீடியோக்கள், ஆடியோக்கள் மற்றும் ஆவணங்களின் மொத்தப் பொக்கிஷம்</p>
          </div>
        </div>

        {favorites.length > 0 && (
          <button className="clear-all-fav-btn" onClick={onClearAll}>
            <Trash2 size={16} />
            <span>அனைத்தையும் நீக்குக</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="fav-tabs-bar">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const count = cat.id === 'all'
            ? favorites.length
            : favorites.filter((f) => f.type === cat.id).length;

          return (
            <button
              key={cat.id}
              className={`fav-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <IconComp size={16} />
              <span>{cat.label}</span>
              <span className="fav-count-pill">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredFavorites.length === 0 ? (
        <div className="fav-empty-box">
          <Heart size={64} className="fav-empty-icon" />
          <h3>இன்னும் எதுவுமில்லை!</h3>
          <p>
            {activeTab === 'all'
              ? 'நீங்கள் எந்த ஒரு புகைப்படத்தையும், ஆடியோவையோ அல்லது ஆவணத்தையோ பிடித்தவையில் சேர்க்கவில்லை. இதயம் (<Heart size={16}/>) குறியீட்டைக் கிளிக் செய்து உங்கள் விருப்பங்களைச் சேமிக்கவும்.'
              : `இந்த பிரிவில் (${getTypeName(activeTab)}) எதுவும் சேமிக்கப்படவில்லை.`}
          </p>
          <button className="fav-explore-btn" onClick={() => onNavigate('photos')}>
            <span>பொக்கிஷங்களை ஆராய்க</span>
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="fav-grid">
          {filteredFavorites.map((item) => (
            <div key={item.id} className="fav-card">
              {/* Media Thumbnail/Preview Header */}
              <div className="fav-card-media-wrapper">
                {item.image || item.thumbnail ? (
                  <img
                    src={item.image || item.thumbnail}
                    alt={item.title}
                    className="fav-card-img"
                  />
                ) : (
                  <div className="fav-card-fallback-thumb">
                    {item.type === 'audio' && <Mic size={40} />}
                    {item.type === 'document' && <FileText size={40} />}
                    {item.type === 'video' && <Video size={40} />}
                    {item.type === 'photo' && <Image size={40} />}
                  </div>
                )}

                <span className={`fav-badge ${getBadgeClass(item.type)}`}>
                  {getTypeName(item.type)}
                </span>

                <button
                  className="fav-remove-icon-btn"
                  onClick={() => onRemoveFavorite(item.id)}
                  title="விருப்பப்பட்டியலிலிருந்து நீக்குக"
                >
                  <Heart size={18} fill="#ff4d4f" color="#ff4d4f" />
                </button>
              </div>

              {/* Content Body */}
              <div className="fav-card-body">
                <h4 className="fav-card-title">{item.title || item.name}</h4>
                {item.description && (
                  <p className="fav-card-desc">{item.description}</p>
                )}
                {item.category && (
                  <span className="fav-category-tag">{item.category}</span>
                )}

                {/* Footer Action Button */}
                <button className="fav-card-action-btn" onClick={() => handleAction(item)}>
                  {item.type === 'audio' ? (
                    <>
                      <Play size={16} />
                      <span>ஒலிபரப்புக</span>
                    </>
                  ) : item.type === 'video' ? (
                    <>
                      <Eye size={16} />
                      <span>வீடியோ காண்க</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink size={16} />
                      <span>விவரங்களை காண்க</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

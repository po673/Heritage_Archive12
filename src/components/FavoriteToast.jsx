import React, { useEffect } from 'react';
import { Heart, X, CheckCircle } from 'lucide-react';
import './FavoriteToast.css';

export default function FavoriteToast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const { isAdded, itemTitle, itemType } = toast;

  const getTypeName = (type) => {
    switch (type) {
      case 'photo': return 'புகைப்படம்';
      case 'video': return 'வீடியோ';
      case 'audio': return 'ஆடியோ';
      case 'document': return 'ஆவணம்';
      default: return 'பொருள்';
    }
  };

  return (
    <div className={`fav-toast-box slide-up ${isAdded ? 'added' : 'removed'}`}>
      <div className="fav-toast-icon">
        <Heart size={20} fill={isAdded ? '#ff4d4f' : 'none'} color={isAdded ? '#ff4d4f' : '#888'} />
      </div>

      <div className="fav-toast-content">
        <span className="fav-toast-title">
          {isAdded
            ? `உங்கள் விருப்பமான ${getTypeName(itemType)} சேர்க்கப்பட்டது!`
            : `${getTypeName(itemType)} நீக்கப்பட்டது`}
        </span>
        <span className="fav-toast-sub">
          {isAdded
            ? `"${itemTitle || ''}" உங்கள் விருப்பமானவை பக்கத்தில் சேமிக்கப்பட்டுள்ளது.`
            : `விருப்பப்பட்டியலிலிருந்து அகற்றப்பட்டது.`}
        </span>
      </div>

      <button className="fav-toast-close" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}

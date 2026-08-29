import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import CommentSection from '../../components/CommentSection/CommentSection';
import './PhotosPage.css';

export default function PhotosPage({ onToggleFavorite = () => { }, isFavorite = () => false }) {
  const [activeCategory, setActiveCategory] = useState('இயற்கை');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const categories = ['இயற்கை', 'பயணம்', 'கட்டடக்கலை', 'மக்கள்'];

  const sampleImages = {
    Nature: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
    ],
    Travel: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80',
    ],
    Architecture: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516617442634-75371039cb3a?auto=format&fit=crop&w=600&q=80',
    ],
    People: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    ]
  };

  const categoryTitles = {
    Nature: 'இயற்கைக் காட்சி',
    Travel: 'பயண இடங்கள்',
    Architecture: 'கோயில் கட்டடக்கலை',
    People: 'தமிழ் மக்கள் & பண்பாடு'
  };

  const photos = ['Nature', 'Travel', 'Architecture', 'People'].flatMap((cat) => {
    const list = sampleImages[cat];
    return Array.from({ length: 20 }, (_, i) => ({
      id: `${cat}-${i + 1}`,
      title: `${categoryTitles[cat]} - படம் ${i + 1}`,
      category: cat,
      tamilCatName: cat === 'Nature' ? 'இயற்கை' : cat === 'Travel' ? 'பயணம்' : cat === 'Architecture' ? 'கட்டடக்கலை' : 'மக்கள்',
      description: `தமிழர் மரபு மற்றும் பேரழகு நிறைந்த காட்சி படம் ${i + 1}.`,
      image: list[i % list.length],
    }));
  });

  const filteredPhotos = photos.filter(p => p.tamilCatName === activeCategory);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null && filteredPhotos.length > 0) {
      setSelectedIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null && filteredPhotos.length > 0) {
      setSelectedIndex((prev) => (prev + 1) % filteredPhotos.length);
    }
  };

  // Keyboard navigation for image modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredPhotos.length]);

  const selectedPhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  return (
    <div className="gallery-page-container fade-in">
      {/* Page Title Strip with Heritage Background & Gold Accents */}
      <div className="page-title-strip">
        <h1>புகைப்படங்கள் & மரபுப் படங்கள் (Photo Gallery)</h1>
        <p>எமது தொன்மையான வரலாற்றுச் சிறப்புமிக்க இடங்கள், கோயில்கள் மற்றும் அழகிய தருணங்களின் தொகுப்பு</p>
      </div>

      {/* Filter Navigation Tabs */}
      <nav className="gallery-filter-nav">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedIndex(null);
            }}
          >
            {cat} (20)
          </button>
        ))}
      </nav>

      {/* Photo Grid */}
      <main className="gallery-grid">
        {filteredPhotos.map((photo, idx) => {
          const fav = isFavorite(photo.id);
          return (
            <div
              key={photo.id}
              className="gallery-card"
              onClick={() => setSelectedIndex(idx)}
            >
              <img src={photo.image} alt={photo.title} loading="lazy" />
              <button
                className={`gallery-fav-btn ${fav ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite({
                    id: photo.id,
                    type: 'photo',
                    title: photo.title,
                    description: photo.description,
                    image: photo.image,
                    category: photo.tamilCatName
                  });
                }}
                title={fav ? 'பிடித்தவைகளிலிருந்து நீக்குக' : 'பிடித்தவைகளில் சேர்க்க'}
              >
                <Heart size={18} fill={fav ? '#ff4d4f' : 'transparent'} color={fav ? '#ff4d4f' : '#ffffff'} />
              </button>
              <div className="gallery-card-hover-overlay">
                <span className="photo-hover-title">{photo.title}</span>
              </div>
            </div>
          );
        })}
      </main>

      {/* Main Photo Gallery Comment Section */}
      <CommentSection
        contentId={`photo_gallery_${activeCategory}`}
        contentTitle={`புகைப்படங்கள் (${activeCategory})`}
      />

      {/* Modal Lightbox Popup with External Prev / Next Navigation Buttons on Backdrop Sides */}
      {selectedPhoto && ReactDOM.createPortal(
        <div className="gallery-modal-backdrop" onClick={() => setSelectedIndex(null)}>
          {/* External Left Side Previous Button */}
          <button
            className="gallery-backdrop-nav-btn nav-prev"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={44} strokeWidth={2.8} />
          </button>

          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery-modal-close"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close modal"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className="gallery-modal-image-wrapper">
              <img src={selectedPhoto.image} alt={selectedPhoto.title} />

              <div className="gallery-modal-caption">
                <div className="caption-text">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h3 className="caption-title" style={{ margin: 0 }}>{selectedPhoto.title}</h3>
                    <button
                      className="modal-fav-heart-btn"
                      onClick={() => {
                        onToggleFavorite({
                          id: selectedPhoto.id,
                          type: 'photo',
                          title: selectedPhoto.title,
                          description: selectedPhoto.description,
                          image: selectedPhoto.image,
                          category: selectedPhoto.tamilCatName
                        });
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                    >
                      <Heart
                        size={22}
                        fill={isFavorite(selectedPhoto.id) ? '#ff4d4f' : 'transparent'}
                        color={isFavorite(selectedPhoto.id) ? '#ff4d4f' : '#ffffff'}
                      />
                    </button>
                  </div>
                  <p className="caption-desc">{selectedPhoto.description}</p>
                </div>
                <span className="caption-counter">{selectedIndex + 1} / {filteredPhotos.length}</span>
              </div>
            </div>
          </div>

          {/* External Right Side Next Button */}
          <button
            className="gallery-backdrop-nav-btn nav-next"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight size={44} strokeWidth={2.8} />
          </button>

        </div>,
        document.body
      )}

    </div>
  );
}








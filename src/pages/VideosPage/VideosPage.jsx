import React, { useState, useRef, useEffect } from 'react';
import { Play, Film, Radio, Award, Compass, Shield, BookOpen, Flame, Music, ScrollText, Layers, Eye, Search, ChevronLeft, ChevronRight, Landmark, Users, Heart } from 'lucide-react';
import { videoSections, featuredVideos } from '../../data/heritageData';
import useScrollReveal from '../../hooks/useScrollReveal';
import CommentSection from '../../components/CommentSection/CommentSection';
import './VideosPage.css';

export default function VideosPage({ selectedVideoId, onSelectVideo, onToggleFavorite = () => { }, isFavorite = () => false }) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const videoRef = useRef(null);

  // Initialize selected video from prop if available
  useEffect(() => {
    if (selectedVideoId) {
      videoSections.forEach((sec, secIdx) => {
        const itemIdx = sec.items.findIndex(v => v.id === Number(selectedVideoId));
        if (itemIdx !== -1) {
          setActiveCategoryIndex(secIdx);
          setCurrentVideoIndex(itemIdx);
        }
      });
    }
  }, [selectedVideoId]);

  // Reset pagination on category or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategoryIndex, searchQuery]);

  useScrollReveal([activeCategoryIndex, searchQuery, currentPage]);

  // 10 Distinct Tamil Categories
  const categories = [
    { id: 'temples', label: '1. கோயில்கள் & கட்டடக்கலை', icon: Shield },
    { id: 'history', label: '2. தமிழ் பேரரசுகள் வரலாறு', icon: Award },
    { id: 'culture', label: '3. பாரம்பரியம் & பண்பாடு', icon: Compass },
    { id: 'literature', label: '4. தமிழ் இலக்கியம் & ஏடுகள்', icon: BookOpen },
    { id: 'festivals', label: '5. விழாக்கள் & மரபுகள்', icon: Flame },
    { id: 'documentaries', label: '6. வரலாற்று ஆவணப் படங்கள்', icon: Film },
    { id: 'arts', label: '7. தமிழ் மரபுக் கலைகள்', icon: Music },
    { id: 'poetry_recitation', label: '8. கவிதை அரங்கம் & இசை', icon: Layers },
    { id: 'inscriptions', label: '9. கல்வெட்டுச் சாசனங்கள்', icon: ScrollText },
  ];

  const currentCategory = categories[activeCategoryIndex] || categories[0];
  const currentSection = videoSections.find(sec => sec.catId === currentCategory.id) || videoSections[0];
  const sectionItems = currentSection.items || [];

  // Filtered list if search query exists
  const displayedVideos = searchQuery
    ? sectionItems.filter(v =>
      v.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.speaker?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : sectionItems;

  const totalPages = Math.ceil(displayedVideos.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPaginatedVideos = displayedVideos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Sync page number when currentVideoIndex changes
  useEffect(() => {
    const requiredPage = Math.floor(currentVideoIndex / ITEMS_PER_PAGE) + 1;
    if (requiredPage !== currentPage && requiredPage <= totalPages && requiredPage > 0) {
      setCurrentPage(requiredPage);
    }
  }, [currentVideoIndex, totalPages]);

  // Active video within current section
  const activeVideo = displayedVideos[currentVideoIndex] || displayedVideos[0] || sectionItems[0];

  const handleSelectVideo = (video, fullIndex = 0) => {
    setCurrentVideoIndex(fullIndex);
    if (onSelectVideo) onSelectVideo(video.id);
  };

  // Next & Previous Video inside the same section
  const handleNextVideo = () => {
    if (currentVideoIndex < displayedVideos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    }
  };

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    }
  };

  return (
    <div className="heritage-3col-page-root fade-in">
      {/* Top Page Header: Title & Search Input */}
      <div className="video-page-top-header">
        <div className="vpth-title-box">
          <Film size={22} className="gold-icon" />
          <h2>{activeVideo ? activeVideo.title : currentSection.sectionTitle}</h2>
        </div>

        <div className="vpth-search-box">
          <Search size={16} className="vpth-search-icon" />
          <input
            type="text"
            placeholder="காணொளிகளைத் தேடுக..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Top Navigation Header for Next / Previous Video inside Current Section */}

      <div className="heritage-3col-layout">
        {/* Left Column: Topic Categories Selector */}
        <aside className="left-topics-sidebar">
          <div className="sidebar-topics-header">
            <Film size={20} className="gold-icon" />
            <h3>காணொளிப் பிரிவுகள் ({categories.length} Topics)</h3>
          </div>

          <div className="topics-list-container">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              const isActive = activeCategoryIndex === idx;
              const secData = videoSections.find(s => s.catId === cat.id);
              const itemCount = secData ? secData.items.length : 25;
              return (
                <div
                  key={cat.id}
                  className={`topic-item-card ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategoryIndex(idx);
                    setCurrentVideoIndex(0);
                    setCurrentPage(1);
                  }}
                >
                  <div className="tic-icon">
                    <IconComp size={18} />
                  </div>
                  <div className="tic-info">
                    <span className="tic-title">{cat.label}</span>
                    <span className="tic-sub">{itemCount} காணொளிகள்</span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center Column: Video Player Stage */}
        <main className="center-video-stage">
          {activeVideo && (
            <>
              <div className="center-video-screen-wrap">
                <video
                  ref={videoRef}
                  src={activeVideo.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                  poster={activeVideo.thumb || activeVideo.poster || activeVideo.img}
                  controls
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  autoPlay
                  playsInline
                  className="stage-video-element"
                />
              </div>

              {/* Title & Meta Info Box */}
              <div className="center-video-meta-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <h1 className="stage-video-title">{activeVideo.title}</h1>
                  <button
                    className={`video-fav-btn ${isFavorite(activeVideo.id) ? 'active' : ''}`}
                    onClick={() => {
                      onToggleFavorite({
                        id: activeVideo.id,
                        type: 'video',
                        title: activeVideo.title,
                        description: activeVideo.description || activeVideo.speaker,
                        thumbnail: activeVideo.thumb || activeVideo.poster || activeVideo.img,
                        category: currentCategory.label
                      });
                    }}
                    title={isFavorite(activeVideo.id) ? 'பிடித்தவைகளிலிருந்து நீக்குக' : 'பிடித்தவைகளில் சேர்க்க'}
                    style={{
                      background: isFavorite(activeVideo.id) ? '#ff4d4f' : 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <Heart
                      size={20}
                      fill={isFavorite(activeVideo.id) ? '#ffffff' : 'transparent'}
                      color={isFavorite(activeVideo.id) ? '#ffffff' : '#f4b400'}
                    />
                  </button>
                </div>
                <div className="stage-video-subrow">
                  <span className="speaker-tag">{activeVideo.speaker || 'தமிழ் மரபு ஆவணம்'}</span>
                  <span className="year-tag">{activeVideo.year ? `ஆண்டு: ${activeVideo.year}` : 'மரபு ஆவணம்'}</span>
                  <span className="duration-tag">{activeVideo.duration}</span>
                </div>
                <div className="stage-video-desc">
                  <p>{activeVideo.desc || 'தமிழ் கலாச்சாரம் மற்றும் வரலாறு தொடர்பான அரிய வரலாற்று மரபு ஆவணக் காணொளி.'}</p>
                </div>
              </div>
            </>
          )}
        </main>

        {/* Right Column: 15 Videos per Page Playlist */}
        <aside className="right-playlist-sidebar">
          <div className="right-playlist-header">
            <h3>{currentSection.sectionTitle}</h3>
            <span className="items-count-badge">
              பக்கம் {currentPage} / {totalPages} ({displayedVideos.length} Videos)
            </span>
          </div>

          <div className="playlist-cards-list">
            {currentPaginatedVideos.map((video, idx) => {
              const fullIndex = startIndex + idx;
              const isPlaying = activeVideo && activeVideo.id === video.id;
              return (
                <div
                  key={video.id || fullIndex}
                  className={`playlist-video-card ${isPlaying ? 'playing' : ''}`}
                  onClick={() => handleSelectVideo(video, fullIndex)}
                >
                  <div className="card-thumb-box">
                    <img src={video.thumb || video.img} alt="" role="presentation" />
                    <div className="thumb-play-overlay">
                      <Play size={18} fill="#ffffff" color="#ffffff" />
                    </div>
                  </div>

                  <div className="card-details">
                    <h4>{fullIndex + 1}. {video.title}</h4>
                    <span className="card-speaker">{video.speaker}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination Controls for 15-video pages */}
          <div className="playlist-bottom-nav">
            <button
              className="pbn-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} /> முந்தைய பக்கம்
            </button>
            <span className="pbn-counter">{currentPage} / {totalPages}</span>
            <button
              className="pbn-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              அடுத்த பக்கம் <ChevronRight size={16} />
            </button>
          </div>
        </aside>
      </div>

      {/* 100% Full-Width Comment Section for Active Video */}
      {activeVideo && (
        <div className="video-fullwidth-comment-wrapper">
          <CommentSection
            contentId={`video_${activeVideo.id}`}
            contentTitle={activeVideo.title}
          />
        </div>
      )}

      {/* Extended Information & Cultural Context Section under Video Page */}


      <section className="video-heritage-info-section">

        {/* Section Heading */}
        <div className="vh-section-heading">
          <span>தமிழ் மரபின் காட்சி பயணம்</span>
          <h2>தமிழ் பாரம்பரிய காணொளி காப்பகம்</h2>
          <p>
            தமிழரின் தொன்மையான வரலாறு, கலை, இலக்கியம், ஆன்மிகம் மற்றும்
            பண்பாட்டை காணொளிகள் மூலம் அறிந்து கொள்ளுங்கள்.
          </p>
        </div>

        {/* Information Cards */}
        <div className="vh-info-grid">

          <div className="vh-info-card">
            <div className="vh-card-header">
              <Film size={22} className="gold-icon" />
              <h3>தமிழ் காணொளித் தொகுப்பு</h3>
            </div>
            <p>
              தமிழ் கலாச்சாரம், வரலாறு, கட்டடக்கலை மற்றும் தொல்பொருள் ஆய்வுகள்
              தொடர்பான அரிய காணொளிகள் மற்றும் ஆவணப் படங்கள் இங்கே
              ஒழுங்கமைக்கப்பட்டுள்ளன.
            </p>
            <span className="vh-card-link">காணொளிகளை காண்க →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <Compass size={22} className="gold-icon" />
              <h3>வரலாற்று ஆவணப் படங்கள்</h3>
            </div>
            <p>
              பண்டைய தமிழக பேரரசுகள், சோழர், பாண்டியர் மற்றும் சேரர் வரலாற்றுச்
              சின்னங்கள், கோயில்கள் மற்றும் கல்வெட்டுகள் பற்றிய வரலாற்றுச்
              சான்றுகளை எளிதில் அறியலாம்.
            </p>
            <span className="vh-card-link">வரலாற்றை அறிக →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <Music size={22} className="gold-icon" />
              <h3>மரபுக் கலைகள் & இசை</h3>
            </div>
            <p>
              பரதநாட்டியம், கரகாட்டம், பொம்மலாட்டம், வில்லுப்பாட்டு போன்ற
              நாட்டுப்புறக் கலைகள் மற்றும் தமிழ் இசை பாரம்பரியத்தை விளக்கும்
              சிறப்பு காணொளிகள்.
            </p>
            <span className="vh-card-link">கலைகளை காண்க →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <BookOpen size={22} className="gold-icon" />
              <h3>இலக்கியப் சொற்பொழிவுகள்</h3>
            </div>
            <p>
              சங்க இலக்கியம், திருக்குறள், சிலப்பதிகாரம் மற்றும் தமிழ்
              இலக்கியங்களைக் குறித்து அறிஞர்களின் உரைகள் மற்றும் விரிவான
              விளக்கங்கள் இடம்பெற்றுள்ளன.
            </p>
            <span className="vh-card-link">சொற்பொழிவுகளை காண்க →</span>
          </div>

          {/* New Card */}
          <div className="vh-info-card">
            <div className="vh-card-header">
              <Landmark size={22} className="gold-icon" />
              <h3>கோயில் & கட்டடக்கலை</h3>
            </div>
            <p>
              தமிழர்களின் சிறப்பான கோயில் கட்டடக்கலை, சிற்பங்கள், கோபுரங்கள்,
              மண்டபங்கள் மற்றும் பழமையான கட்டிடங்களின் வரலாற்றை காணொளிகள்
              மூலம் அறிந்து கொள்ளலாம்.
            </p>
            <span className="vh-card-link">கட்டடக்கலையை காண்க →</span>
          </div>

          {/* New Card */}
          <div className="vh-info-card">
            <div className="vh-card-header">
              <Users size={22} className="gold-icon" />
              <h3>தமிழர் வாழ்க்கை முறை</h3>
            </div>
            <p>
              பாரம்பரிய உணவு, உடை, திருவிழாக்கள், விவசாயம், கிராமிய வாழ்க்கை
              மற்றும் பழமையான சமூக நடைமுறைகளைப் பற்றிய சிறப்பு காணொளிகள்.
            </p>
            <span className="vh-card-link">வாழ்க்கை முறையை அறிக →</span>
          </div>

        </div>


        {/* Archive Statistics */}
        <div className="vh-stats-section">

          <div className="vh-stat-item">
            <strong>500+</strong>
            <span>காணொளிகள்</span>
          </div>

          <div className="vh-stat-item">
            <strong>100+</strong>
            <span>வரலாற்று தலைப்புகள்</span>
          </div>

          <div className="vh-stat-item">
            <strong>50+</strong>
            <span>சிறப்பு சொற்பொழிவுகள்</span>
          </div>

          <div className="vh-stat-item">
            <strong>25+</strong>
            <span>மரபுக் கலைகள்</span>
          </div>

        </div>


        {/* Main Banner */}
        <div className="vh-banner-box">
          <div className="vh-banner-content">
            <span className="vh-banner-label">
              TAMIL HERITAGE VIDEO ARCHIVE
            </span>

            <h3>
              தமிழர் மரபை காணொளிகளில் பாதுகாப்போம்
            </h3>

            <p>
              எமது இலக்கு பண்டைய தமிழ் நாகரிகத்தின் கலை, கட்டடக்கலை, இசை,
              இலக்கியம், ஆன்மிகம் மற்றும் பண்பாட்டுத் தொன்மைகளை டிஜிட்டல்
              வடிவில் பாதுகாத்து அடுத்த தலைமுறைக்குக் கொண்டு செல்வதாகும்.
            </p>

            <div className="vh-banner-points">
              <span>✓ அரிய வரலாற்று பதிவுகள்</span>
              <span>✓ நம்பகமான தகவல்கள்</span>
              <span>✓ தமிழ் மரபின் பாதுகாப்பு</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}

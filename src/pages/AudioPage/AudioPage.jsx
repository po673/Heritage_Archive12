import React, { useState, useMemo } from 'react';
import {
  Search, ChevronLeft, ChevronRight, Music, Disc, Radio,
  Filter, Play, Pause, Calendar, Feather, Mic, Headphones, Heart
} from 'lucide-react';
import { audioSections } from '../../data/heritageData';
import useScrollReveal from '../../hooks/useScrollReveal';
import CommentSection from '../../components/CommentSection/CommentSection';
import './AudioPage.css';

export default function AudioPage({ currentAudio = null, isPlaying = false, onPlayAudio = () => { }, onTogglePlay = () => { }, onToggleFavorite = () => {}, isFavorite = () => false } = {}) {
  const [activeCategory, setActiveCategory] = useState('1'); // Default to 1st category
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalAudio, setModalAudio] = useState(null);

  const ITEMS_PER_PAGE = 15;

  useScrollReveal([activeCategory, currentPage]);

  const activeSectionObj = useMemo(() => {
    return audioSections.find(sec => String(sec.sectionId) === String(activeCategory)) || audioSections[0] || {};
  }, [activeCategory]);

  const categories = [
    { id: '1', label: '1. சங்க கால பாடல்கள்', count: 20, icon: Music },
    { id: '2', label: '2. தேவாரம் & திருமுறைகள்', count: 20, icon: Disc },
    { id: '3', label: '3. பக்திப் பாடல்கள்', count: 20, icon: Radio },
    { id: '4', label: '4. நாட்டுப்புறப் பாடல்கள்', count: 20, icon: Mic },
    { id: '5', label: '5. பாரம்பரிய தமிழ் இசைகள்', count: 20, icon: Feather },
    { id: '6', label: '6. திருக்குறள் உரைகள்', count: 20, icon: Headphones },
    { id: '7', label: '7. வரலாற்றுச் சொற்பொழிவுகள்', count: 20, icon: Search },
    { id: '8', label: '8. பாரதியார் கவிதைகள்', count: 20, icon: Feather },
    { id: '9', label: '9. காப்பிய இசைகள்', count: 20, icon: Music },
    { id: '10', label: '10. கீழடி தொல்லியல்', count: 20, icon: Disc },
    { id: '11', label: '11. பேரரசுகள் வரலாறு', count: 20, icon: Radio },
    { id: '12', label: '12. கோயில் கலைகள்', count: 20, icon: Mic },
    { id: '13', label: '13. சித்தர் மருத்துவம்', count: 20, icon: Feather },
    { id: '14', label: '14. கிராமிய கலைகள்', count: 20, icon: Music },
    { id: '15', label: '15. தற்கால உரைவீச்சு', count: 20, icon: Headphones },
  ];

  const handleSelectCategoryTab = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  // Filter and sort items across audio sections
  const allMatchingItems = useMemo(() => {
    let items = [];
    const sec = audioSections.find(s => String(s.sectionId) === String(activeCategory));
    if (sec) {
      items = sec.items.map(item => ({ ...item, sectionTitle: sec.sectionTitle }));
    } else {
      items = (audioSections[0]?.items || []).map(item => ({ ...item, sectionTitle: audioSections[0].sectionTitle }));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.speaker?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
      );
    }

    if (selectedSort === 'oldest') {
      return [...items].reverse();
    }
    return items;
  }, [activeCategory, searchQuery, selectedSort]);

  const totalPages = Math.ceil(allMatchingItems.length / ITEMS_PER_PAGE) || 1;

  // Paginated audio tracks (15 per page)
  const paginatedItems = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return allMatchingItems.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [allMatchingItems, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const currentCategoryLabel = useMemo(() => {
    const found = categories.find(c => c.id === activeCategory);
    return found ? found.label : 'ஆடியோ ஆவணம்';
  }, [activeCategory]);

  return (
    <div className="audio-exact-page-root fade-in">
      <div className="audio-exact-layout">

        {/* LEFT SIDEBAR (15 Topics Y-Axis Scroll List) */}
        <aside className="audio-left-sidebar">
          <div className="audio-sidebar-card">
            <div className="asc-header">
              <Disc size={18} className="purple-icon" />
              <h3>ஆடியோ தலைப்புகள் (15 Topics)</h3>
            </div>

            <ul className="asc-cat-list mobile-inline-scroll">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <li
                    key={cat.id}
                    className={`asc-cat-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectCategoryTab(cat.id)}
                  >
                    <div className="asc-cat-left">
                      <Icon size={15} />
                      <span>{cat.label}</span>
                    </div>
                    <span className="asc-cat-badge">{cat.count} Tracks</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* CENTER MAIN 15 AUDIOS PAGINATED AREA */}
        <main className="audio-center-main">

          {/* TOP FILTERS & SEARCH BAR */}
          <div className="acm-top-filter-bar">
            <div className="acm-tf-header">
              <Filter size={16} className="purple-icon" />
              <span>வடிகட்டிகள் & தேடல்:</span>
            </div>
            <div className="acm-tf-controls">
              <div className="acm-search-wrap">
                <Search size={15} className="asc-search-icon" />
                <input
                  type="text"
                  className="acm-search-input"
                  placeholder="ஆடியோ தலைப்புகள் / அறிஞர்களின் பெயரைத் தேடுக..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <select
                className="asc-select"
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="newest">வரிசை: புதியது முதல்</option>
                <option value="oldest">வரிசை: பழையது முதல்</option>
              </select>
            </div>
          </div>

          {/* ACTIVE CATEGORY HEADER & STATS */}
          <div className="acm-header-bar">
            <div className="acm-title-group">
              <div className="acm-icon-box">
                <Headphones size={22} color="#7c3aed" />
              </div>
              <div>
                <h2>{currentCategoryLabel}</h2>
                <span className="acm-sub-count">
                  மொத்தம் {allMatchingItems.length} ஆடியோக்கள் • பக்கம் {currentPage} / {totalPages}
                </span>
              </div>
            </div>
          </div>

          {/* 15 AUDIOS GRID DISPLAY */}
          {paginatedItems.length === 0 ? (
            <div className="audio-empty-state">
              <Music size={48} color="#94a3b8" />
              <p>தேடலுக்குப் பொருத்தமான ஆடியோக்கள் எதுவும் கிடைக்கவில்லை.</p>
            </div>
          ) : (
            <div className="audio-cards-5grid">
              {paginatedItems.map((item) => {
                const isCurrentPlaying = currentAudio?.id === item.id && isPlaying;

                return (
                  <div
                    key={item.id}
                    className={`audio-card-item ${isCurrentPlaying ? 'playing' : ''}`}
                    onClick={() => setModalAudio(item)}
                  >
                    <div className="aci-thumb-container">
                      <div className="aci-audio-icon-box">
                        <Music size={28} className="aci-icon-music" />
                      </div>

                      <button
                        className={`audio-fav-btn ${isFavorite(item.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite({
                            id: item.id,
                            type: 'audio',
                            title: item.title,
                            speaker: item.speaker,
                            duration: item.duration,
                            audioUrl: item.audioUrl,
                            category: item.category || item.sectionTitle
                          });
                        }}
                        title={isFavorite(item.id) ? 'பிடித்தவைகளிலிருந்து நீக்குக' : 'பிடித்தவைகளில் சேர்க்க'}
                        style={{
                          position: 'absolute',
                          top: 6,
                          right: 6,
                          background: 'rgba(0,0,0,0.5)',
                          border: 'none',
                          borderRadius: '50%',
                          width: 28,
                          height: 28,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          zIndex: 5
                        }}
                      >
                        <Heart
                          size={15}
                          fill={isFavorite(item.id) ? '#ff4d4f' : 'transparent'}
                          color={isFavorite(item.id) ? '#ff4d4f' : '#ffffff'}
                        />
                      </button>

                      <button
                        className="aci-play-overlay-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentAudio?.id === item.id) {
                            onTogglePlay();
                          } else {
                            onPlayAudio(item);
                          }
                        }}
                        aria-label={isCurrentPlaying ? 'Pause audio' : 'Play audio'}
                      >
                        {isCurrentPlaying ? (
                          <Pause size={18} fill="#ffffff" />
                        ) : (
                          <Play size={18} fill="#ffffff" className="play-offset" />
                        )}
                      </button>

                      <span className="aci-duration-badge">{item.duration}</span>
                    </div>

                    <div className="aci-details">
                      <h4 className="aci-title" title={item.title}>{item.title}</h4>
                      <span className="aci-meta-line"><Feather size={12} /> {item.speaker || 'தமிழ் அறிஞர்கள்'}</span>
                      <span className="aci-meta-line"><Calendar size={12} /> {item.category || 'மரபு ஆவணம்'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 15 AUDIOS FLEX MODE PAGINATION BAR */}
          {totalPages > 1 && (
            <div className="audio-pagination-bar">
              <button
                className="apb-btn apb-prev-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} /> முந்தையது (Previous)
              </button>

              <div className="apb-center-group">
                <div className="apb-nums">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                    .map((p, idx, arr) => (
                      <React.Fragment key={p}>
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span className="apb-dots">...</span>
                        )}
                        <button
                          className={`apb-num-btn ${currentPage === p ? 'active' : ''}`}
                          onClick={() => handlePageChange(p)}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    ))}
                </div>
              </div>

              <button
                className="apb-btn apb-next-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                அடுத்தது (Next) <ChevronRight size={16} />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* AUDIO DETAIL POPUP MODAL */}
      {modalAudio && (
        <div className="audio-modal-backdrop" onClick={() => setModalAudio(null)}>
          <div className="audio-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="audio-modal-close-btn" onClick={() => setModalAudio(null)}>
              ✕
            </button>

            <div className="audio-modal-header">
              <div className="audio-modal-icon-wrap">
                <Music size={40} color="#a855f7" />
              </div>
              <div className="audio-modal-title-group">
                <h3>{modalAudio.title}</h3>
                <p>{modalAudio.category || 'சங்க தமிழ் ஆவணம்'} • {modalAudio.duration || '03:45'}</p>
              </div>
            </div>

            <div className="audio-modal-body">
              <div className="audio-modal-meta-grid">
                <div className="am-meta-box">
                  <span>பாடகர்/உரையாளர்</span>
                  <strong>{modalAudio.speaker || 'தமிழ் அறிஞர்கள்'}</strong>
                </div>
                <div className="am-meta-box">
                  <span>காலகட்டம்</span>
                  <strong>சங்க காலம் (Ancient Era)</strong>
                </div>
                <div className="am-meta-box">
                  <span>வகைப்பாடு</span>
                  <strong>மரபு இசை & செய்யுள்</strong>
                </div>
                <div className="am-meta-box">
                  <span>கோப்பு அளவு</span>
                  <strong>4.8 MB</strong>
                </div>
              </div>

              <div className="audio-modal-controls">
                <button
                  className="audio-modal-play-btn"
                  onClick={() => {
                    if (currentAudio?.id === modalAudio.id) {
                      onTogglePlay();
                    } else {
                      onPlayAudio(modalAudio);
                    }
                  }}
                >
                  {currentAudio?.id === modalAudio.id && isPlaying ? (
                    <> <Pause size={18} fill="#ffffff" /> இடைநிறுத்துக </>
                  ) : (
                    <> <Play size={18} fill="#ffffff" /> இயக்குக (Play Audio) </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Comment Section for Audio Content */}
      <CommentSection
        contentId={`audio_${activeCategory}`}
        contentTitle={activeSectionObj.sectionTitle || 'ஆடியோ ஆவணம்'}
      />

      {/* Extended Information & Cultural Context Section under Audio Page */}
      <section className="video-heritage-info-section">
        {/* Section Heading */}
        <div className="vh-section-heading">
          <span>தமிழ் இசையின் ஒலிப் பயணம்</span>
          <h2>தமிழ் பாரம்பரிய ஒலி காப்பகம்</h2>
          <p>
            தமிழரின் தொன்மையான பக்தி பாடல்கள், சங்க தமிழ் செய்யுள்கள், தேவாரம்,
            நாட்டுப்புறக் கலைகள் மற்றும் இலக்கிய உரைகளை கேட்டு மகிழுங்கள்.
          </p>
        </div>

        {/* Information Cards */}
        <div className="vh-info-grid">
          <div className="vh-info-card">
            <div className="vh-card-header">
              <Music size={22} className="gold-icon" />
              <h3>சங்க கால பாடல்கள்</h3>
            </div>
            <p>
              புறநானூறு, அகநானூறு, குறுந்தொகை போன்ற சங்க இலக்கியப் பாடல்களின்
              இசை வடிவம் மற்றும் அறிஞர்களின் விளக்க உரைகள்.
            </p>
            <span className="vh-card-link">பாடல்களைக் கேட்க →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <Disc size={22} className="gold-icon" />
              <h3>தேவாரம் & பக்தி இசை</h3>
            </div>
            <p>
              நாயன்மார்கள் மற்றும் ஆழ்வார்கள் அருளிச்செய்த பன்னிரு திருமுறைகள்,
              தேவாரப் பண்கள் மற்றும் திவ்யப்பிரபந்த இசைப் பதிவுகள்.
            </p>
            <span className="vh-card-link">பக்தி இசையைக் கேட்க →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <Mic size={22} className="gold-icon" />
              <h3>நாட்டுப்புறப் பாடல்கள்</h3>
            </div>
            <p>
              ஏற்றப்பாட்டு, நட்டவுழவுப் பாட்டு, வில்லுப்பாட்டு, தாலாட்டு மற்றும்
              கிராமிய தமிழ் பண்பாட்டு ஒலிகள்.
            </p>
            <span className="vh-card-link">நாட்டுப்புறப் பாடல்கள் →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <Headphones size={22} className="gold-icon" />
              <h3>இலக்கியச் சொற்பொழிவுகள்</h3>
            </div>
            <p>
              தமிழறிஞர்கள், பேராசிரியர்களின் திருக்குறள், சிலப்பதிகாரம் மற்றும்
              கம்பராமாயணம் பற்றிய வரலாற்று உரைவீச்சுகள்.
            </p>
            <span className="vh-card-link">உரைகளைக் கேட்க →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <Radio size={22} className="gold-icon" />
              <h3>பாரம்பரிய இசைக்கருவிகள்</h3>
            </div>
            <p>
              யாழ், குழல், முழவு, தவில், நாதஸ்வரம் போன்ற பண்டைய தமிழ்
              இசைக்கருவிகளின் தனித்துவமான ஒலிப்பதிவுகள்.
            </p>
            <span className="vh-card-link">இசையை உணர →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <Feather size={22} className="gold-icon" />
              <h3>கவிதை அரங்கம் & உரை</h3>
            </div>
            <p>
              மகாகவி பாரதியார், பாரதிதாசன் கவிதைகள் மற்றும் நவீன தமிழ்
              கவிஞர்களின் கவிதை வாசிப்பு ஒலிப்பதிவுகள்.
            </p>
            <span className="vh-card-link">கவிதைகளைக் கேட்க →</span>
          </div>
        </div>

        {/* Archive Statistics */}
        <div className="vh-stats-section">
          <div className="vh-stat-item">
            <strong>300+</strong>
            <span>ஒலிப் பதிவுகள்</span>
          </div>
          <div className="vh-stat-item">
            <strong>80+</strong>
            <span>சங்க பாடல்கள்</span>
          </div>
          <div className="vh-stat-item">
            <strong>50+</strong>
            <span>தேவாரப் பண்கள்</span>
          </div>
          <div className="vh-stat-item">
            <strong>30+</strong>
            <span>இலக்கிய உரைகள்</span>
          </div>
        </div>

        {/* Main Banner */}
        <div className="vh-banner-box">
          <div className="vh-banner-content">
            <span className="vh-banner-label">TAMIL HERITAGE AUDIO ARCHIVE</span>
            <h3>தமிழர் மரபை இசையிலும் ஒலியிலும் பாதுகாப்போம்</h3>
            <p>
              எமது இலக்கு பண்டைய தமிழ் இசையின் மரபு, பண்ணிசை, பக்திப் பாடல்கள் மற்றும்
              இலக்கிய உரைகளை உயர்தர டிஜிட்டல் ஒலியமைப்பில் பாதுகாப்பதாகும்.
            </p>
            <div className="vh-banner-points">
              <span>✓ உயர்தர ஆடியோ பதிவுகள்</span>
              <span>✓ பண்டைய பண்ணிசை சான்றுகள்</span>
              <span>✓ தமிழ் இசையின் பாதுகாப்பு</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

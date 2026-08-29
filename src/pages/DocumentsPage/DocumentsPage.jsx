import React, { useState } from 'react';
import { FileText, BookOpen, Layers, Activity, Feather, Search, ChevronLeft, ChevronRight, Download, GraduationCap, Award, Compass, Heart, Share2, Sparkles, FolderDown, Music, Film, ScrollText, Scroll } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';
import CommentSection from '../../components/CommentSection/CommentSection';
import './DocumentsPage.css';

export default function DocumentsPage({ onToggleFavorite = () => {}, isFavorite = () => false }) {
  const [activeCategory, setActiveCategory] = useState('literature');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [eraFilter, setEraFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [favDocs, setFavDocs] = useState({});

  const ITEMS_PER_PAGE = 8;

  React.useEffect(() => {
    try {
      const favMap = JSON.parse(localStorage.getItem('heritage_favorites') || '{}');
      const docFavs = {};
      Object.keys(favMap).forEach(key => {
        if (key.startsWith('doc_')) {
          docFavs[key.replace('doc_', '')] = true;
        }
      });
      setFavDocs(docFavs);
    } catch (e) { }
  }, []);

  useScrollReveal([activeCategory]);

  const categories = [
    { id: 'literature', label: 'தமிழ் இலக்கியம்', count: 30, icon: BookOpen },
    { id: 'sangam', label: 'சங்க இலக்கியம்', count: 30, icon: Layers },
    { id: 'history', label: 'வரலாறு', count: 30, icon: Compass },
    { id: 'linguistics', label: 'மொழியியல்', count: 30, icon: Feather },
    { id: 'culture', label: 'பண்பாடு & வழக்குகள்', count: 30, icon: Heart },
    { id: 'research', label: 'கல்வி & ஆய்வு', count: 30, icon: GraduationCap },
    { id: 'heritage_docs', label: 'மரபு ஆவணங்கள்', count: 25, icon: FileText },
    { id: 'textbooks', label: 'பாடநூல்கள்', count: 25, icon: Award },
  ];

  const categoryColorMap = {
    literature: { bg: '#fef2f2', text: '#ef4444', badgeBg: '#fee2e2' },
    sangam: { bg: '#fef3c7', text: '#d97706', badgeBg: '#fde68a' },
    history: { bg: '#eff6ff', text: '#2563eb', badgeBg: '#dbeafe' },
    linguistics: { bg: '#f0fdf4', text: '#16a34a', badgeBg: '#dcfce7' },
    culture: { bg: '#fdf4ff', text: '#c026d3', badgeBg: '#fae8ff' },
    research: { bg: '#fff7ed', text: '#ea580c', badgeBg: '#ffedd5' },
    heritage_docs: { bg: '#f3e8ff', text: '#7c3aed', badgeBg: '#e9d5ff' },
    textbooks: { bg: '#ecfeff', text: '#0891b2', badgeBg: '#cffafe' },
  };

  const currentCategoryObj = categories.find(c => c.id === activeCategory) || categories[0];
  const totalCategoryItemsCount = currentCategoryObj.count; // 30 or 25 items

  const categorySampleTitles = {
    literature: ['திருக்குறள் - மூலமும் உரையும்', 'சிலப்பதிகாரம் - உரைநடை', 'கம்பராமாயணம் - பாடல்கள்', 'மணிமேகலை - காப்பியம்'],
    sangam: ['புறநானூறு - முழு பாடல்கள்', 'அகநானூறு - மூலக்கூறுகள்', 'நற்றிணை - பாடல்கள்', 'குறுந்தொகை - செய்யுள்கள்'],
    history: ['தமிழர் வரலாறு - தொகுப்பு', 'சோழர் வரலாறு - கல்வெட்டுகள்', 'பாண்டியர் வரலாறு - செப்பேடுகள்', 'பல்லவர் கலை ஆவணம்'],
    linguistics: ['தமிழ் இலக்கணம் - நன்னூல்', 'தொல்காப்பியம் - உரை', 'தமிழ் எழுத்து வரலாறு', 'சொல்லியல் ஆய்வு'],
    culture: ['தமிழர் பண்பாடு - ஆய்வுக்குறிப்பு', 'தமிழ் பழமொழிகள் - விளக்கம்', 'கிராமிய விழாக்கள் மரபு', 'தமிழ்ப் பாரம்பரிய வாழ்வியல்'],
    research: ['இந்துசமயம் - தமிழ் இலக்கியங்களில்', 'தமிழ்ப் பல்கலைக்கழக ஆய்வேடு', 'கீழடி அகழ்வாராய்ச்சி சான்று', 'செம்மொழி ஆய்வுத்தாள்'],
    heritage_docs: ['பண்டைய ஓலைச்சுவடி - ஆவணம்', 'செப்புப் பட்டயம் சாசனம்', 'அரச அரசாணை ஏடு', 'பழங்கால வரைபடம்'],
    textbooks: ['தமிழ் மொழி கற்றல் - தொடக்கநிலை', 'நவீன தமிழ் உரைநடை பாடநூல்', 'செம்மொழித் தமிழ் பயிற்றுநூல்', 'இலக்கணப் பயிற்சி நூல்']
  };

  const activeCategoryTitles = categorySampleTitles[activeCategory] || categorySampleTitles.literature;

  const currentCategoryItems = Array.from({ length: totalCategoryItemsCount }, (_, i) => ({
    id: `${activeCategory}_${i + 1}`,
    title: `${activeCategoryTitles[i % activeCategoryTitles.length]} - பகுதி ${i + 1}`,
    catId: activeCategory,
    catName: currentCategoryObj.label,
    size: `${(1.5 + (i * 0.3) % 4).toFixed(1)} MB`,
    format: 'PDF',
    year: i % 2 === 0 ? 'சங்க காலம்' : '1750 CE'
  }));

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const filteredItems = currentCategoryItems.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="study-exact-page-root fade-in">
      {/* Top Banner Bar Header */}
      <div className="study-top-banner">
        <div className="stb-left">
          <div className="stb-icon-wrap">
            <FileText size={26} color="#7c3aed" />
          </div>
          <div className="stb-title-group">
            <h2>கல்விக் காப்பகம் (Study Materials)</h2>
            <p>தமிழ் மரபு, இலக்கியம், வரலாறு, பண்பாடு மற்றும் மொழி கற்றல் வளங்கள்</p>
          </div>
        </div>

        <div className="stb-right-controls">
          <div className="stb-search-box">
            <Search size={16} className="stb-search-icon" />
            <input
              type="text"
              placeholder="ஆவணங்களைத் தேடுங்கள் (Search)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="stb-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">அனைத்து வகை (All Types)</option>
            <option value="manuscripts">ஓலைச்சுவடி</option>
            <option value="books">அச்சுப் பிரதிகள்</option>
          </select>

          <select
            className="stb-select"
            value={eraFilter}
            onChange={(e) => setEraFilter(e.target.value)}
          >
            <option value="all">அனைத்து காலம் (All Eras)</option>
            <option value="ancient">பண்டைய காலம்</option>
            <option value="medieval">இடைக்காலம்</option>
          </select>

          <select className="stb-select disabled-select" defaultValue="tamil" disabled>
            <option value="tamil">தமிழ் மட்டுமே</option>
          </select>
        </div>
      </div>

      {/* Main 3-Column Layout matching Screenshot */}
      <div className="study-main-layout">

        {/* Left Column: Categories & Promotional Box */}
        <aside className="study-left-sidebar">
          <div className="sls-categories-card">
            <div className="sls-header">
              <Layers size={18} className="purple-icon" />
              <h3>பாடப்பிரிவுகள் (Categories)</h3>
            </div>

            <div className="sls-cat-list mobile-inline-scroll">
              {categories.map((cat) => {
                const IconComp = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    className={`sls-cat-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    <div className="sls-cat-left">
                      <IconComp size={16} />
                      <span>{cat.label}</span>
                    </div>
                    <span className="sls-cat-badge">{cat.count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left Bottom Promo Box */}
          <div className="sls-promo-card">
            <div className="sls-promo-text">
              <p>படிக்க, புரிந்துகொள்ள, பரம்பரை தொடரக்.</p>
              <button className="sls-promo-btn">மேலும் அறிக</button>
            </div>
            <div className="sls-promo-icon">
              <GraduationCap size={44} color="#7c3aed" />
            </div>
          </div>
        </aside>

        {/* Center Column: Study Materials Cards Grid */}
        <main className="study-center-content">
          <div className="scc-header-bar">
            <div className="scc-header-left">
              <div className="scc-header-icon">
                <FileText size={20} color="#7c3aed" />
              </div>
              <div className="scc-header-text">
                <h2>{currentCategoryObj.label} (Study Materials)</h2>
                <span className="scc-count-sub">மொத்த ஆவணங்கள்: {filteredItems.length} (பக்கம் {currentPage} / {totalPages})</span>
              </div>
            </div>

            <div className="scc-header-right">
              <select className="scc-sort-dropdown" defaultValue="newest">
                <option value="newest">புதிய முதலில்</option>
                <option value="oldest">பழைய முதலில்</option>
                <option value="title">தலைப்பு வாரியாக</option>
              </select>
            </div>
          </div>

          {/* 4-Column Grid of Cards */}
          <div className="study-cards-grid">
            {paginatedItems.map((doc, idx) => {
              return (
                <div key={doc.id} className="study-item-card">
                  <div className="sic-hero-box">
                    <FileText size={32} />
                  </div>

                  <h4 className="sic-title">{doc.title}</h4>

                  <div className="sic-pill-wrapper">
                    <span className="sic-cat-pill">
                      {doc.catName}
                    </span>
                  </div>

                  <div className="sic-footer-row">
                    <span className="sic-meta">{doc.format} • {doc.size} • தமிழ்</span>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <button
                        className="sic-download-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite({
                            id: doc.id,
                            type: 'document',
                            title: doc.title,
                            description: `${doc.catName} • ${doc.format} (${doc.size})`,
                            category: doc.catName
                          });
                        }}
                        title={isFavorite(doc.id) ? 'பிடித்தவைகளிலிருந்து நீக்குக' : 'பிடித்தவைகளில் சேர்க்க'}
                        style={{
                          background: isFavorite(doc.id) ? 'rgba(239,68,68,0.15)' : 'rgba(0,0,0,0.05)',
                          color: isFavorite(doc.id) ? '#ef4444' : '#64748b'
                        }}
                      >
                        <Heart size={16} fill={isFavorite(doc.id) ? '#ef4444' : 'transparent'} color={isFavorite(doc.id) ? '#ef4444' : '#64748b'} />
                      </button>
                      <button className="sic-download-btn" title="Download Document">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination Bar: Clickable Page Numbers (1, 2, 3...) with Prev & Next */}
          <div className="study-pagination-bar">
            <button
              className="spb-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={16} /> முந்தைய
            </button>

            <div className="spb-page-nums">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  className={`spb-num-btn ${currentPage === num ? 'active' : ''}`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              className="spb-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              அடுத்தது <ChevronRight size={16} />
            </button>
          </div>
        </main>

        {/* Right Column: 3 Widgets (Summary Stats, Recently Added, Quote Banner) */}
        <aside className="study-right-sidebar">

          {/* Widget 1: Dark Purple Summary Statistics */}
          <div className="srs-dark-stats-card">
            <div className="srs-dark-header">
              <BookOpen size={18} color="#a855f7" />
              <h3>கல்வி வளங்கள் சுருக்கம்</h3>
            </div>

            <div className="srs-stats-grid">
              <div className="srs-stat-box">
                <div className="srs-stat-icon-wrap"><FileText size={18} color="#a855f7" /></div>
                <div className="srs-stat-info">
                  <span className="srs-stat-lbl">மொத்த ஆவணங்கள்</span>
                  <span className="srs-stat-val">230</span>
                </div>
              </div>

              <div className="srs-stat-box">
                <div className="srs-stat-icon-wrap"><FolderDown size={18} color="#ec4899" /></div>
                <div className="srs-stat-info">
                  <span className="srs-stat-lbl">PDF கோப்புகள்</span>
                  <span className="srs-stat-val">542</span>
                </div>
              </div>

              <div className="srs-stat-box">
                <div className="srs-stat-icon-wrap"><Music size={18} color="#3b82f6" /></div>
                <div className="srs-stat-info">
                  <span className="srs-stat-lbl">ஆடியோ பாடல்கள்</span>
                  <span className="srs-stat-val">18</span>
                </div>
              </div>

              <div className="srs-stat-box">
                <div className="srs-stat-icon-wrap"><Film size={18} color="#f59e0b" /></div>
                <div className="srs-stat-info">
                  <span className="srs-stat-lbl">வீடியோ பாடங்கள்</span>
                  <span className="srs-stat-val">18</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: Recently Added List */}
          <div className="srs-recent-card">
            <div className="srs-recent-header">
              <Sparkles size={16} color="#7c3aed" />
              <h3>புதியதாக சேர்க்கப்பட்டவை</h3>
            </div>

            <div className="srs-recent-list">
              <div className="srs-recent-item">
                <div className="srs-ri-icon purple"><FileText size={16} /></div>
                <div className="srs-ri-info">
                  <h4>திருக்குறள் - மூலமும் உரையும்</h4>
                  <span>24 ஜூலை, 2026</span>
                </div>
              </div>

              <div className="srs-recent-item">
                <div className="srs-ri-icon blue"><FileText size={16} /></div>
                <div className="srs-ri-info">
                  <h4>தமிழர் வரலாறு - தொகுப்பு</h4>
                  <span>23 ஜூலை, 2026</span>
                </div>
              </div>

              <div className="srs-recent-item">
                <div className="srs-ri-icon orange"><FileText size={16} /></div>
                <div className="srs-ri-info">
                  <h4>சிலப்பதிகாரம் - உரைநடை</h4>
                  <span>22 ஜூலை, 2026</span>
                </div>
              </div>

              <div className="srs-recent-item">
                <div className="srs-ri-icon purple"><FileText size={16} /></div>
                <div className="srs-ri-info">
                  <h4>தமிழ் மொழி கற்றல் - தொடக்கநிலை</h4>
                  <span>21 ஜூலை, 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3: Dark Quote Share Banner */}
          <div className="srs-dark-quote-banner">
            <div className="sdqb-content">
              <h3>அறிவோம், பகிர்வோம். மரபை தொடர்வோம்.</h3>
              <p>தமிழ் அறிவை உலகுடன் பகிர்வோம்.</p>
              <button className="sdqb-share-btn">
                <Share2 size={15} /> ஆவணங்களைப் பகிர்க
              </button>
            </div>
          </div>

        </aside>
      </div>

      {/* Responsive Comment Section for Documents */}
      <CommentSection
        contentId={`doc_${activeCategory}`}
        contentTitle={currentCategoryObj.label}
      />

      {/* Extended Information & Cultural Context Section under Documents Page */}
      <section className="video-heritage-info-section">
        {/* Section Heading */}
        <div className="vh-section-heading">
          <span>தமிழ் நூல்களின் எழுத்துப் பயணம்</span>
          <h2>தமிழ் பாரம்பரிய ஆவணக் காப்பகம்</h2>
          <p>
            தமிழரின் பண்டைய ஓலைச்சுவடிகள், சங்க இலக்கிய நூல்கள், கல்வெட்டுச் சாசனங்கள்,
            செப்பேடுகள் மற்றும் வரலாற்று ஆய்வேடுகளை வாசித்து அறியுங்கள்.
          </p>
        </div>

        {/* Information Cards */}
        <div className="vh-info-grid">
          <div className="vh-info-card">
            <div className="vh-card-header">
              <BookOpen size={22} className="gold-icon" />
              <h3>சங்க தமிழ் இலக்கியங்கள்</h3>
            </div>
            <p>
              திருக்குறள், எட்டுத்தொகை, பத்துப்பாட்டு மற்றும் பதினெண்கீழ்க்கணக்கு
              நூல்களின் மூல உரைகள் மற்றும் விளக்கவுரைகள்.
            </p>
            <span className="vh-card-link">நூல்களை வாசிக்க →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <ScrollText size={22} className="gold-icon" />
              <h3>ஓலைச்சுவடிகள் & ஏடுகள்</h3>
            </div>
            <p>
              பண்டைய தமிழ் மருத்துவம், வானியல், இலக்கணம் மற்றும் ஜோதிடம் தொடர்பான
              அரிய ஓலைச்சுவடி டிஜிட்டல் படப்படிகள்.
            </p>
            <span className="vh-card-link">சுவடிகளை அறிய →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <Compass size={22} className="gold-icon" />
              <h3>வரலாறு & செப்பேடுகள்</h3>
            </div>
            <p>
              சோழ, பாண்டிய, சேர மன்னர்களின் அரசாணைகள், கொடைச் செப்பேடுகள் மற்றும்
              கல்வெட்டுத் தொகுதி ஆவணங்கள்.
            </p>
            <span className="vh-card-link">சாசனங்களை அறிய →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <GraduationCap size={22} className="gold-icon" />
              <h3>கல்வி & ஆய்வுக் கட்டுரைகள்</h3>
            </div>
            <p>
              தமிழ்ப் பல்கலைக்கழகங்கள் மற்றும் வரலாற்று அறிஞர்களின் தொல்பொருள்
              ஆய்வு அறிக்கைகள் மற்றும் செம்மொழி ஆய்வேடுகள்.
            </p>
            <span className="vh-card-link">ஆய்வுகளை வாசிக்க →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <Feather size={22} className="gold-icon" />
              <h3>தமிழ் இலக்கண நூல்கள்</h3>
            </div>
            <p>
              தொல்காப்பியம், நன்னூல், அகப்பொருள் விளக்கம் மற்றும் வீரசோழியம் போன்ற
              தமிழ்ப் பேரிலக்கண நூல்களின் உரைகள்.
            </p>
            <span className="vh-card-link">இலக்கணம் கற்க →</span>
          </div>

          <div className="vh-info-card">
            <div className="vh-card-header">
              <FileText size={22} className="gold-icon" />
              <h3>பழைய அரிய பாடநூல்கள்</h3>
            </div>
            <p>
              19-ஆம் மற்றும் 20-ஆம் நூற்றாண்டின் தொடக்கத்தில் அச்சிடப்பட்ட
              பழமையான தமிழ் பள்ளி மற்றும் கல்லூரி பாடநூல்கள்.
            </p>
            <span className="vh-card-link">பாடநூல்களைக் காண →</span>
          </div>
        </div>

        {/* Archive Statistics */}
        <div className="vh-stats-section">
          <div className="vh-stat-item">
            <strong>1000+</strong>
            <span>டிஜிட்டல் ஆவணங்கள்</span>
          </div>
          <div className="vh-stat-item">
            <strong>250+</strong>
            <span>சங்க இலக்கிய நூல்கள்</span>
          </div>
          <div className="vh-stat-item">
            <strong>150+</strong>
            <span>அரிய ஓலைச்சுவடிகள்</span>
          </div>
          <div className="vh-stat-item">
            <strong>100+</strong>
            <span>வரலாற்றுச் சாசனங்கள்</span>
          </div>
        </div>

        {/* Main Banner */}
        <div className="vh-banner-box">
          <div className="vh-banner-content">
            <span className="vh-banner-label">TAMIL HERITAGE DOCUMENT ARCHIVE</span>
            <h3>தமிழர் மரபை எழுத்து வடிவில் பாதுகாப்போம்</h3>
            <p>
              எமது இலக்கு பண்டைய தமிழ் இலக்கியங்கள், ஓலைச்சுவடிகள், செப்பேடுகள் மற்றும்
              வரலாற்று ஆவணங்களை பிடிஎஃப் (PDF) வடிவிலும் இ-புத்தகங்களாகவும் அடுத்த தலைமுறைக்குப் பாதுகாப்பதாகும்.
            </p>
            <div className="vh-banner-points">
              <span>✓ இலவச பதிவிறக்கம் (PDF)</span>
              <span>✓ தெளிவான மூல உரைகள்</span>
              <span>✓ தமிழ் ஆவணங்களின் பாதுகாப்பு</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


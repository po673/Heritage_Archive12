import React, { useState, useEffect } from 'react';
import {
  Users, Image, Video, Mic, FileText, Feather, BookOpen,
  ChevronRight, ArrowRight, ShieldCheck, Heart, Sparkles,
  Award, Clock, Compass, Bookmark, Eye, CheckCircle2
} from 'lucide-react';
import { personalities, featuredPhotos } from '../../data/heritageData';
import ImageModal from '../../components/ImageModal';
import './HomePage.css';

export default function HomePage({ onNavigate }) {
  const [selectedModalIndex, setSelectedModalIndex] = useState(null);
  const homePhotos = featuredPhotos.slice(0, 4);
  const homePersonalities = personalities.slice(0, 3);

  const handlePrevHomePhoto = () => {
    if (selectedModalIndex !== null && homePhotos.length > 0) {
      setSelectedModalIndex((prev) => (prev - 1 + homePhotos.length) % homePhotos.length);
    }
  };

  const handleNextHomePhoto = () => {
    if (selectedModalIndex !== null && homePhotos.length > 0) {
      setSelectedModalIndex((prev) => (prev + 1) % homePhotos.length);
    }
  };

  const selectedModalItem = selectedModalIndex !== null ? homePhotos[selectedModalIndex] : null;

  const quickCategoryCards = [
    {
      id: 'videos',
      label: 'காணொளிகள் (Videos)',
      desc: 'அரிய வரலாற்று உரைகள் & மரபு ஆவணப்படங்கள்',
      icon: Video,
      color: '#DC2626',
      bgImg: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
      badge: 'நேரலை & காணொளி'
    },
    {
      id: 'audio',
      label: 'ஒலிப் பதிவுகள் (Audio)',
      desc: 'செம்மொழி இலக்கியக் கவிதைகள் & மரபு இசை',
      icon: Mic,
      color: '#9333EA',
      bgImg: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      badge: 'ஒலிக் காப்பகம்'
    },
    {
      id: 'documents',
      label: 'ஆவணங்கள் (Documents)',
      desc: 'பழைய தமிழ் ஓலைச்சுவடிகள் & சாசனங்கள்',
      icon: FileText,
      color: '#D97706',
      bgImg: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
      badge: 'ஏட்டுச் சுவடிகள்'
    },
    {
      id: 'photos',
      label: 'புகைப்படங்கள் (Photos)',
      desc: 'வரலாற்றுத் தலங்கள் & அரிய கலைக் காப்பகம்',
      icon: Image,
      color: '#059669',
      bgImg: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      badge: 'புகைப்பட அரங்கம்'
    },
  ];

  // IntersectionObserver for dynamic scroll reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom');

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    };

    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    revealElements.forEach((el) => {
      // Reveal elements in top viewport immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('reveal-visible');
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page fade-in">

      {/* Hero Section */}
      <div className="hero-section scroll-reveal-zoom">
        <div className="hero-overlay"></div>
        <div className="hero-content">

          <h1 className="hero-title">தமிழ் மரபு & கலாச்சாரப் பொக்கிஷம்</h1>
          <p className="hero-subtitle">
            ஆயிரம் ஆண்டுகால தமிழ் வரலாறு, செம்மொழி இலக்கியங்கள், அரிய ஆவணங்கள் மற்றும் பண்பாட்டுச் சுவடுகளின் நவீன டிஜிட்டல் தளம்.
          </p>

          {/* Featured Poet Spotlight Card in Hero */}
          <div className="poet-hero-spotlight scroll-reveal">
            <div className="poet-avatar-wrap">
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=200" alt="திருவள்ளுவர்" />
            </div>
            <div className="poet-spotlight-info">
              <span className="spotlight-tag"><Feather size={13} /> சிறப்புப் புலவர் அறிமுகம்</span>
              <h3>திருவள்ளுவர் (கி.மு. 31)</h3>
              <p>"யாதானும் நாடாமல் ஊராமால் என்னொருவன் <br /> சாந்துணையும் கல்லாத வாறு." - உலகப் பொதுமறை ஆசிரியர்.</p>
            </div>
          </div>

          <div className="hero-actions">
            <button className="btn-primary-gold" onClick={() => onNavigate('history')}>
              தமிழ் மரபை ஆராய்க <ArrowRight size={18} />
            </button>
            <button className="btn-secondary-outline" onClick={() => onNavigate('about')}>
              எங்களைப் பற்றி அறிந்துகொள்க <Compass size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Major Content Categories Section */}
      <div className="section-block scroll-reveal">
        <div className="section-header">
          <h2><Compass size={24} style={{ verticalAlign: 'middle', marginRight: 8, color: '#2563eb' }} /> முக்கியப் பிரிவுகள்</h2>
          <p>தமிழ் கலாச்சாரம், இலக்கியம் மற்றும் வரலாற்றுப் பொக்கிஷங்களை ஆராயுங்கள்</p>
        </div>

        <div className="category-cards-grid">
          {quickCategoryCards.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.id}
                className="category-card media-category-image-card scroll-reveal-zoom"
                style={{ transitionDelay: `${idx * 0.1}s` }}
                onClick={() => onNavigate(cat.id)}
              >
                {/* Cultural High Quality Background Image */}
                <div className="cat-card-bg-img-wrap">
                  <img src={cat.bgImg} alt={cat.label} loading="lazy" decoding="async" />
                  <div className="cat-card-gradient-overlay" />
                </div>

                {/* Top Badge */}
                <div className="cat-card-top-row">
                  <span className="cat-card-badge-pill" style={{ borderColor: cat.color, color: '#ffffff', background: 'rgba(20, 30, 23, 0.75)' }}>
                    <IconComponent size={14} style={{ color: cat.color }} /> {cat.badge}
                  </span>
                </div>

                {/* Bottom Text Content & Action Button */}
                <div className="cat-card-bottom-content">
                  <h3>{cat.label}</h3>
                  <p>{cat.desc}</p>
                  <button className="cat-card-btn" onClick={(e) => { e.stopPropagation(); onNavigate(cat.id); }}>
                    <span>ஆராய்க (Explore)</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Thiruvalluvar Spotlight Showcase Section */}
      <div className="section-block scroll-reveal">
        <div className="thiruvalluvar-premium-showcase">
          {/* Left Column: Majestic Image */}
          <div className="tps-img-column">
            <div className="tps-crown-badge">
              <Award size={20} color="#F4B400" />
            </div>
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800"
              alt="திருவள்ளுவர்"
              className="tps-main-img"
            />
          </div>

          {/* Right Column: Premium Content & Info */}
          <div className="tps-content-column">
            <div className="tps-header-group">
              <h2 className="tps-main-title">திருவள்ளுவர்</h2>
              <h4 className="tps-sub-title">பொய்யாமொழி புலவர் & உலகப் பொதுமறை ஆசிரியர்</h4>
              <div className="tps-divider-dots"><span>◆</span><span>❖</span><span>◆</span></div>
            </div>

            <p className="tps-intro-para">
              உலகப்புகழ் பெற்ற திருக்குறளை இயற்றிய தமிழ் மாபெரும் புலவர் மற்றும் சிந்தனையாளர். மனித வாழ்வின் அறம், பொருள், இன்பம் எனும் மூன்று அடிப்படைகளை ஒளிவிளக்காக உலகிற்கு வழங்கியவர்.
            </p>

            {/* 4 Core Pillars Grid */}
            <div className="tps-pillars-grid">
              <div className="tps-pillar-card">
                <div className="tps-pillar-icon"><BookOpen size={24} color="#F4B400" /></div>
                <h5>திருக்குறள்</h5>
                <p>1330 குறட்பாக்கள் மூலம் வாழ்வியல் நெறிகளை வழங்கினார்.</p>
              </div>

              <div className="tps-pillar-card">
                <div className="tps-pillar-icon"><Compass size={24} color="#F4B400" /></div>
                <h5>உலகப் புகழ்</h5>
                <p>உலக மொழிகளில் மொழிபெயர்க்கப்பட்ட மிகச் சிறந்த நூல்.</p>
              </div>

              <div className="tps-pillar-card">
                <div className="tps-pillar-icon"><Feather size={24} color="#F4B400" /></div>
                <h5>தமிழ் பெருமை</h5>
                <p>தமிழ் மொழியின் செம்மையையும் சிந்தனையும் உயர்த்தினார்.</p>
              </div>

              <div className="tps-pillar-card">
                <div className="tps-pillar-icon"><Users size={24} color="#F4B400" /></div>
                <h5>மனித நலம்</h5>
                <p>எல்லா மனிதர்களுக்கும் சமத்துவம், அன்பு போதித்தார்.</p>
              </div>
            </div>

            {/* Quote Box */}
            <div className="tps-quote-box">
              <span className="tps-quote-mark left">“</span>
              <p className="tps-quote-text">
                அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு.
              </p>
              <span className="tps-quote-author">- திருக்குறள் 1</span>
              <span className="tps-quote-mark right">”</span>
            </div>

            {/* Bottom Footer Action */}
            <div className="tps-footer-actions">
              <span className="tps-period-tag">
                <Clock size={16} /> கி.மு. 31 (சங்க காலம்)
              </span>
              <button className="tps-more-btn" onClick={() => onNavigate('history')}>
                <span>மேலும் அறிய</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section (50% Text Content | 50% Image Split) */}


      {/* Featured Gallery Section (Direct Navigation to Photos Page) */}
      <div className="section-block scroll-reveal">
        <div className="section-header">
          <h2><Image size={26} style={{ verticalAlign: 'middle', marginRight: 10, color: 'var(--primary-green)' }} /> சிறப்புக் புகைப்படக் காப்பகம்</h2>
          <p>தமிழ் கட்டடக்கலை, ஓலைச்சுவடிகள் மற்றும் மரபுக் கலைகளின் அரிய நிழற்படங்கள் (4 புகைப்படங்கள்)</p>
        </div>

        <div className="grid-4">
          {homePhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="gallery-card image-hover-card scroll-reveal-zoom"
              style={{ transitionDelay: `${idx * 0.12}s` }}
              onClick={() => onNavigate('photos')}
            >
              <div className="gallery-img-wrap full-image">
                <img src={photo.img} alt={photo.title} loading="lazy" decoding="async" />

                {/* Hover Card Overlay (Slides up from bottom on hover) */}
                <div className="gallery-hover-card-overlay">
                  <h3>{photo.title}</h3>
                  <div className="gallery-meta-row">
                    <span className="photo-year-badge">{photo.year}</span>
                    <span className="photo-cat-pill">{photo.category || 'கலை & வரலாறு'}</span>
                  </div>
                  <p>{photo.desc}</p>
                  <button className="zoom-btn-pill" onClick={(e) => { e.stopPropagation(); onNavigate('photos'); }}>
                    <Image size={16} /> புகைப்படங்கள் பக்கம் செல்ல (Go to Photos)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button Go To Photos Page */}
        <div className="page-link-cta-row scroll-reveal">
          <button className="btn-navigate-page" onClick={() => onNavigate('photos')}>
            <Image size={18} /> புகைப்படங்கள் பக்கத்திற்குச் செல்ல (Go to Photos Page) <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* History & Personalities Section (Direct Navigation to History Page) */}
      <div className="section-block history-personalities-section scroll-reveal">
        <div className="section-header">
          <h2><Users size={24} style={{ verticalAlign: 'middle', marginRight: 8, color: '#2563eb' }} /> தமிழ் வரலாற்று ஆளுமைகள்</h2>
          <p>தமிழ் மொழி, இலக்கியம் மற்றும் வரலாற்றுக்கு அளப்பரிய பங்களிப்பு செய்த முன்னோடிகள் (3 ஆளுமைகள்)</p>
        </div>

        <div className="home-personalities-grid">
          {homePersonalities.map((person, idx) => {
            const themes = [
              { bg: '#FFFDF8', border: '#EFE3CE', pillBg: '#2E7045', pillLabel: 'சிறப்புப் பேர்கள்', accentColor: '#2E7045' },
              { bg: '#FFFDF8', border: '#EFE3CE', pillBg: '#E8B86D', pillLabel: 'முன்னோடி', accentColor: '#6B5848' },
              { bg: '#FFFDF8', border: '#EFE3CE', pillBg: '#254A36', pillLabel: 'கலை & கலாச்சாரம்', accentColor: '#2E7045' },
            ];
            const theme = themes[idx % themes.length];

            return (
              <div
                key={person.id}
                className="personality-card home-vertical-person-card scroll-reveal-zoom"
                style={{
                  transitionDelay: `${idx * 0.15}s`,
                  backgroundColor: theme.bg,
                  borderColor: theme.border
                }}
                onClick={() => onNavigate('history', person)}
              >
                <div className="person-avatar-wrap" style={{ borderColor: theme.pillBg }}>
                  <img src={person.img} alt={person.name} loading="lazy" decoding="async" />
                  <span className="person-period" style={{ background: theme.pillBg, color: '#fff' }}>{person.period}</span>
                </div>
                <div className="person-card-body">
                  <div className="hgc-top-category-pill" style={{ backgroundColor: theme.pillBg, color: '#fff', margin: '0 auto 10px auto' }}>
                    <Sparkles size={12} />
                    <span>{theme.pillLabel}</span>
                  </div>
                  <h3>{person.name}</h3>
                  <h4 className="person-title-sub" style={{ color: theme.accentColor }}>{person.title}</h4>
                  <p>{person.shortIntro}</p>
                  <button
                    className="btn-view-details"
                    style={{ backgroundColor: theme.pillBg, color: '#ffffff', borderColor: 'transparent' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('history', person);
                    }}
                  >
                    <span>மேலும் அறிய</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Button Go To History Page */}
        <div className="page-link-cta-row scroll-reveal">
          <button className="btn-navigate-page" onClick={() => onNavigate('history')}>
            <Users size={18} /> வரலாற்றுப் பக்கத்திற்குச் செல்ல (Go to History Page) <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Image / Video Popup Modal Overlay on HomePage */}
      {selectedModalItem && (
        <ImageModal
          item={selectedModalItem}
          currentIndex={selectedModalIndex + 1}
          totalCount={homePhotos.length}
          onPrev={handlePrevHomePhoto}
          onNext={handleNextHomePhoto}
          onClose={() => setSelectedModalIndex(null)}
          onMoreInfo={() => {
            setSelectedModalIndex(null);
            onNavigate('photos');
          }}
        />
      )}
    </div>
  );
}


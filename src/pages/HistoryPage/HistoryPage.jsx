import React, { useState, useEffect } from 'react';
import {
  Users, Clock, Bookmark, Compass, Award, BookOpen, Search,
  ArrowRight, ArrowLeft, Feather, Sparkles, CheckCircle2, Crown,
  Globe, MapPin, Quote, Landmark, FileText, Building2, Heart
} from 'lucide-react';
import { personalities } from '../../data/heritageData';
import './HistoryPage.css';

export default function HistoryPage({ initialPerson, onClearPerson }) {
  const [selectedPerson, setSelectedPerson] = useState(initialPerson || null);

  useEffect(() => {
    if (initialPerson) {
      setSelectedPerson(initialPerson);
    }
  }, [initialPerson]);

  // IntersectionObserver for scroll animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('reveal-visible');
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedPerson]);

  const handleBackToList = () => {
    setSelectedPerson(null);
    if (onClearPerson) onClearPerson();
  };

  // Dedicated Full Personality Detail View matching reference design layout
  if (selectedPerson) {
    return (
      <div className="history-page person-full-view fade-in">
        {/* Top Back Navigation Bar */}
        <div className="back-nav-bar">
          <button className="btn-back" onClick={handleBackToList}>
            <ArrowLeft size={18} /> வரலாற்று முன்னோர்கள் பட்டியலுக்குத் திரும்பு
          </button>
        </div>

        {/* Hero Banner Header (Dark Grand Style matching screenshot) */}
        <div className="pdp-hero-banner">
          <div className="pdp-hero-img-wrap">
            <img src={selectedPerson.img} alt={selectedPerson.name} />
          </div>

          <div className="pdp-hero-info">
            <div className="pdp-hero-tag">
              <Sparkles size={14} /> <span>வரலாற்று ஆளுமை</span>
            </div>
            <h1>{selectedPerson.name}</h1>
            <h2>{selectedPerson.title}</h2>
            <p className="pdp-hero-desc">
              {selectedPerson.biography ? selectedPerson.biography.slice(0, 220) + '...' : selectedPerson.shortIntro}
            </p>

            <div className="pdp-hero-meta-row">
              <div className="phm-card">
                <Clock size={18} className="phm-icon" />
                <div>
                  <strong>{selectedPerson.period}</strong>
                  <span>காலகட்டம் (Era)</span>
                </div>
              </div>

              <div className="phm-card">
                <MapPin size={18} className="phm-icon" />
                <div>
                  <strong>மயிலாப்பூர், தமிழ்நாடு</strong>
                  <span>வரலாற்றுத் தலம்</span>
                </div>
              </div>

              <div className="phm-card">
                <BookOpen size={18} className="phm-icon" />
                <div>
                  <strong>{selectedPerson.importantWorks[0] || 'திருக்குறள்'}</strong>
                  <span>1330 குறள்கள்</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Underneath 2-Column Main Content Grid */}
        <div className="pdp-main-grid">
          {/* Left Column */}
          <div className="pdp-col-left">

            {/* 1. Biography Card */}
            <div className="pdp-card">
              <h2 className="pdp-card-title">
                <Bookmark size={20} className="pdp-card-icon" />
                1. வாழ்க்கை வரலாறு (Biography)
              </h2>
              <p className="pdp-card-text">{selectedPerson.biography}</p>

              {/* 4 Mini Metric Stat Boxes */}
              <div className="pdp-stat-mini-grid">
                <div className="ph-stat-box">
                  <Feather size={18} className="psb-icon" />
                  <strong>1330</strong>
                  <span>குறள்கள்</span>
                </div>
                <div className="ph-stat-box">
                  <BookOpen size={18} className="psb-icon" />
                  <strong>133</strong>
                  <span>அதிகாரங்கள்</span>
                </div>
                <div className="ph-stat-box">
                  <Award size={18} className="psb-icon" />
                  <strong>3</strong>
                  <span>பாட்டுகள்</span>
                </div>
                <div className="ph-stat-box">
                  <Globe size={18} className="psb-icon" />
                  <strong>100+</strong>
                  <span>உலக மொழிகள்</span>
                </div>
              </div>

              {/* Quote Box */}
              <div className="pdp-quote-box">
                <Quote size={28} className="pdp-quote-mark" />
                <div className="pdp-quote-content">
                  <p className="pdp-quote-text">
                    "அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு."
                  </p>
                  <span className="pdp-quote-author">- திருக்குறள் 1</span>
                </div>
                <img src={selectedPerson.img} alt="" className="pdp-quote-img" />
              </div>
            </div>

            {/* 2. Historical Background Card */}
            <div className="pdp-card">
              <h2 className="pdp-card-title">
                <Landmark size={20} className="pdp-card-icon" />
                2. வரலாற்றுப் பின்னணி (Historical Background)
              </h2>
              <p className="pdp-card-text">{selectedPerson.historicalBackground}</p>

              <div className="pdp-bg-flex-box">
                <img src={selectedPerson.img} alt="" className="pdp-bg-thumb" />
                <ul className="pdp-bg-checklist">
                  <li><CheckCircle2 size={16} className="ck-icon" /> <span>சங்க காலத்தின் வரலாற்றுச் சூழல்</span></li>
                  <li><CheckCircle2 size={16} className="ck-icon" /> <span>சமண & புத்த சிந்தனையின் தாக்கம்</span></li>
                  <li><CheckCircle2 size={16} className="ck-icon" /> <span>வணிகம் மற்றும் நகர வளர்ச்சி</span></li>
                  <li><CheckCircle2 size={16} className="ck-icon" /> <span>மனிதநேய சிந்தனையின் எழுச்சி</span></li>
                </ul>
              </div>
            </div>

            {/* 4. Important Works Card */}
            <div className="pdp-card">
              <h2 className="pdp-card-title">
                <BookOpen size={20} className="pdp-card-icon" />
                4. முக்கிய படைப்புகள் (Important Works)
              </h2>
              <div className="pdp-work-showcase">
                <img src={selectedPerson.img} alt="" className="pdp-work-cover" />
                <div className="pdp-work-info">
                  <h3>{selectedPerson.importantWorks[0]}</h3>
                  <p>அறம், பொருள், இன்பம் என முப்பாலாகப் பிரிக்கப்பட்ட 1330 குறள்களைக் கொண்ட உலகப் பொதுமறை.</p>
                  <div className="pdp-work-badges">
                    <span>133 அதிகாரங்கள்</span>
                    <span>1330 குறள்கள்</span>
                    <span>3 பால்கள்</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="pdp-col-right">

            {/* 5. Timeline Card */}
            <div className="pdp-card">
              <h2 className="pdp-card-title">
                <Clock size={20} className="pdp-card-icon" />
                5. வரலாற்றுக் கோடு (Timeline)
              </h2>

              <div className="pdp-timeline-vertical">
                {selectedPerson.timeline.map((t, idx) => {
                  const icons = [Landmark, FileText, Users, Building2, Globe];
                  const TIcon = icons[idx % icons.length] || Clock;

                  return (
                    <div key={idx} className="pdp-tl-step">
                      <div className="pdp-tl-badge">
                        <TIcon size={14} />
                      </div>
                      <div className="pdp-tl-content">
                        <strong>{t.year}</strong>
                        <p>{t.event}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Major Contributions Card */}
            <div className="pdp-card">
              <h2 className="pdp-card-title">
                <Award size={20} className="pdp-card-icon" />
                3. முக்கிய பங்களிப்புகள் (Major Contributions)
              </h2>

              <div className="pdp-contrib-vertical">
                {selectedPerson.majorContributions.map((item, idx) => {
                  const icons = [Globe, Feather, BookOpen, Heart];
                  const CIcon = icons[idx % icons.length] || CheckCircle2;

                  return (
                    <div key={idx} className="pdp-contrib-item">
                      <div className="pdp-ci-icon-box">
                        <CIcon size={16} />
                      </div>
                      <div className="pdp-ci-info">
                        <strong>{item}</strong>
                        <p>மனித சமுதாயத்திற்கு வழிகாட்டும் உயரிய தத்துவப் பங்களிப்பு.</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Special Heritage Banner Section */}
        <section className="pdp-bottom-heritage-section">
          <div className="pdp-bhs-heading">
            <h2>{selectedPerson.name}-ன் வாழ்வியல் நெறிகள்</h2>
          </div>

          <div className="pdp-3col-cards">
            <div className="pdp-bhs-card">
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=400" alt="" />
              <div className="pdp-bhs-card-body">
                <h3>அறம் (Virtue & Morality)</h3>
                <p>நல்ஒழுக்கம், கடமை ஒழுக்கம் ஆகியவை மனித வாழ்க்கையின் அடிப்படை நெறிகள்.</p>
              </div>
            </div>

            <div className="pdp-bhs-card">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="" />
              <div className="pdp-bhs-card-body">
                <h3>பொருள் (Wealth & Society)</h3>
                <p>உழைப்பு, பொருளாதாரம், அரசியல் மற்றும் சமூக நெறிகள் பற்றி விரிவாக விளக்குகிறது.</p>
              </div>
            </div>

            <div className="pdp-bhs-card">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" alt="" />
              <div className="pdp-bhs-card-body">
                <h3>இன்பம் (Love & Harmony)</h3>
                <p>குடும்ப வாழ்க்கை, அன்பு, காதல் போன்ற இன்ப வாழ்க்கை நெறிகளை எடுத்துரைக்கிறது.</p>
              </div>
            </div>
          </div>

          <div className="pdp-quote-banner">
            <Quote size={24} className="qb-icon" />
            <p>"உலகத்தோடு ஒட்டஒழுகல் பலகற்றும் கல்லார் அறிவிலா தார்." - திருக்குறள்</p>
          </div>
        </section>

        {/* Return Button at Bottom */}
        <div style={{ textAlign: 'center', marginTop: 24, marginBottom: 32 }}>
          <button className="btn-back" onClick={handleBackToList} style={{ padding: '12px 28px', fontSize: '1rem' }}>
            <ArrowLeft size={18} /> அனைத்து ஆளுமைகள் பட்டியலுக்குத் திரும்பு
          </button>
        </div>
      </div>
    );
  }

  // Modern 2-Column Grid Layout
  return (
    <div className="history-page fade-in">
      <div className="page-title-strip">
        <h1>தமிழ் வரலாறு & முன்னோர்கள் (History & Heritage)</h1>
        <p>தமிழ் மொழியையும், பண்பாட்டையும், பேரரசையும் செதுக்கிய 8 வரலாற்று ஆளுமைகள் (4 வரிசைகள் × 2 கார்டுகள்)</p>
      </div>

      {/* 2-Column Responsive Card Grid (Horizontal Card Layout aligned with reference design) */}
      <div className="history-2col-grid">
        {personalities.map((person, idx) => {
          const themes = [
            { bg: '#FFFDF5', border: '#FCE7F3', pillBg: '#3B82F6', pillText: '#FFFFFF', pillLabel: 'சிறப்புப் பேர்கள்', accentColor: '#2563eb', leafColor: '#93C5FD' },
            { bg: '#FAF5FF', border: '#F3E8FF', pillBg: '#2563EB', pillLabel: 'சிறப்புப் பேர்கள்', accentColor: '#2563eb', leafColor: '#A5B4FC' },
            { bg: '#F5F3FF', border: '#EDE9FE', pillBg: '#7C3AED', pillLabel: 'முன்னோடி', accentColor: '#7c3aed', leafColor: '#C4B5FD' },
            { bg: '#ECFDF5', border: '#D1FAE5', pillBg: '#059669', pillLabel: 'கலை & கலாச்சாரம்', accentColor: '#059669', leafColor: '#6EE7B7' },
            { bg: '#FFF1F2', border: '#FFE4E6', pillBg: '#E11D48', pillLabel: 'அறிவியல் & தொழில்நுட்பம்', accentColor: '#e11d48', leafColor: '#FCA5A5' },
            { bg: '#FFFBEB', border: '#FEF3C7', pillBg: '#D97706', pillLabel: 'வரலாறு', accentColor: '#d97706', leafColor: '#FDE68A' },
          ];

          const theme = themes[idx % themes.length];
          const formattedPeriod = person.period.startsWith('(') ? person.period : `(${person.period})`;

          return (
            <div
              key={person.id}
              className="history-grid-card scroll-reveal-zoom"
              style={{
                transitionDelay: `${(idx % 4) * 0.1}s`,
                backgroundColor: theme.bg,
                borderColor: theme.border
              }}
              onClick={() => setSelectedPerson(person)}
            >
              {/* Left Image Section */}
              <div className="hgc-left-img-wrap">
                <img src={person.img} alt={person.name} loading="lazy" decoding="async" />
              </div>

              {/* Right Details Section */}
              <div className="hgc-right-content">
                <div>
                  <div className="hgc-top-category-pill" style={{ backgroundColor: theme.pillBg, color: '#fff' }}>
                    <Sparkles size={12} />
                    <span>{theme.pillLabel}</span>
                  </div>

                  <div className="hgc-title-group">
                    <h3 className="hgc-name-heading">{person.name}</h3>
                    <span className="hgc-subtitle" style={{ color: theme.accentColor }}>{person.title}</span>
                  </div>

                  <p className="hgc-short-intro">{person.shortIntro}</p>
                </div>

                <div className="hgc-bottom-row">
                  <div className="hgc-year-chip">
                    <Clock size={13} />
                    <span>{formattedPeriod}</span>
                  </div>

                  <button
                    className="btn-read-full"
                    style={{ backgroundColor: theme.pillBg }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPerson(person);
                    }}
                  >
                    <span>மேலும் அறிய</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

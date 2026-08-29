import React, { useEffect } from 'react';
import { Bookmark, Compass, ShieldCheck, Heart, Users, BookOpen, Feather, Layers, CheckCircle2, Sparkles, Building, FileText, Music, Image as ImageIcon, Video, Mic, ArrowRight } from 'lucide-react';
import './AboutPage.css';

export default function AboutPage() {
  const pillars = [
    {
      icon: BookOpen,
      title: 'செம்மொழி இலக்கியங்கள்',
      desc: 'சங்க இலக்கியங்கள், திருக்குறள், சிலப்பதிகாரம் முதல் பாரதியார் கவிதைகள் வரையிலான தமிழ் இலக்கியப் படைப்புகளின் டிஜிட்டல் தொகுப்பு.',
      color: '#2E7045',
      bgImg: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
      badge: 'இலக்கியக் காப்பகம்'
    },
    {
      icon: Users,
      title: 'வரலாற்று ஆளுமைகள்',
      desc: 'தமிழ் மொழி, சமுதாயம் மற்றும் கலைகளுக்கு அளப்பரிய பங்களிப்பு செய்த முன்னோடிகளின் வாழ்க்கை வரலாறு மற்றும் சாதனைகள்.',
      color: '#E8B86D',
      bgImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      badge: 'தமிழ் முன்னோடிகள்'
    },
    {
      icon: Building,
      title: 'கட்டடக்கலை & சிற்பங்கள்',
      desc: 'தஞ்சைப் பெரிய கோயில், மாமல்லபுரம் சிற்பங்கள் மற்றும் திராவிடக் கட்டிடக்கலை அதிசயங்களின் உயர்தரப் புகைப்படக் காப்பகம்.',
      color: '#254A36',
      bgImg: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      badge: 'திராவிடச் சிற்பங்கள்'
    },
    {
      icon: FileText,
      title: 'அரிய ஓலைச்சுவடிகள்',
      desc: 'பழைய ஓலைச்சுவடிகள், அரசர்களின் கல்வெட்டுச் சாசனங்கள் மற்றும் கையெழுத்துப் பிரதிகளின் டிஜிட்டல் ஆவணப் பதிவு.',
      color: '#D97706',
      bgImg: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
      badge: 'ஏட்டுச் சுவடிகள்'
    },
    {
      icon: Music,
      title: 'மரபுக் கலைகள் & இசை',
      desc: 'பரதநாட்டியம், கரகாட்டம், நாதஸ்வர இசை மற்றும் நாட்டுப்புற மரபுக் கலைகளின் ஒலி-ஒளிக் காப்பகப் பதிவுகள்.',
      color: '#9333EA',
      bgImg: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      badge: 'ஒலி-ஒளி அமுதம்'
    },
    {
      icon: ShieldCheck,
      title: 'டிஜிட்டல் மரபுப் பாதுகாப்பு',
      desc: 'வருங்காலத் தலைமுறையினர் தமிழ் பண்பாட்டுப் பொக்கிஷங்களை எளிதில் அணுகும் வகையில் நவீன முறையில் பாதுகாத்தல்.',
      color: '#059669',
      bgImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      badge: 'நவீனப் பாதுகாப்பு'
    },
  ];

  // Scroll reveal observer
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom');

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('reveal-visible');
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page fade-in">
      <div className="page-title-strip scroll-reveal">
        <h1>எங்களைப் பற்றி (About Tamil Heritage Archive)</h1>
        <div className="title-strip-divider">
          <span className="title-strip-divider-motif">❖</span>
        </div>
        <p>தமிழ் கலாச்சாரம், வரலாறு மற்றும் செம்மொழி ஆவணங்களைப் பாதுகாக்கும் டிஜிட்டல் பொக்கிஷம்</p>
      </div>

      {/* Top Split Section: Left Text Content (50%) | Right Image (50%) */}
      <div className="about-hero-split scroll-reveal">
        <div className="about-split-text-side scroll-reveal-left">
          <span className="about-tag"><ShieldCheck size={16} /> டிஜிட்டல் மரபுப் பாதுகாப்புத் திட்டம்</span>
          <h2>தமிழ் பண்பாட்டுப் பொக்கிஷத்தை தலைமுறை கடந்து பாதுகாத்தல்</h2>
          <p className="about-hero-desc">
            எங்கள் தளம் தமிழ் கலாச்சாரம், செம்மொழி இலக்கியம்r, வரலாறு, வரலாற்று மனிதர்கள், புகைப்படங்கள், அரிய ஆவணங்கள், ஒலி மற்றும் காணொளிகளை நவீன இணையத் தொழில்நுட்பத்தின் மூலம் ஒழுங்கமைத்து டிஜிட்டல் முறையில் பாதுகாத்து உலகிற்கு வழங்கும் ஒரு மதச்சார்பற்ற பண்பாட்டுக் காப்பகமாகும்.
          </p>

          <div className="about-hero-checks">
            <div className="check-item"><CheckCircle2 size={18} color="var(--primary-green)" /> மதச்சார்பற்ற மரபுக் காப்பகம்</div>
            <div className="check-item"><CheckCircle2 size={18} color="var(--primary-green)" /> 2000+ செம்மொழி ஆவணங்கள்</div>
            <div className="check-item"><CheckCircle2 size={18} color="var(--primary-green)" /> HD உயர்தர புகைப்படங்கள்</div>
            <div className="check-item"><CheckCircle2 size={18} color="var(--primary-green)" /> இலவச பொது அணுகல்</div>
          </div>
        </div>

        <div className="about-split-img-side scroll-reveal-right">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800"
            alt="தமிழ் பண்பாட்டு ஆவணம்"
          />
          <div className="about-img-badge">
            <Sparkles size={16} /> தமிழ் பாரம்பரியக் காப்பகம்
          </div>
        </div>
      </div>

      {/* Special Tamil Kavithai Spotlight Box */}
      <div className="kavithai-spotlight-box scroll-reveal-zoom">
        <div className="kavithai-box-inner">
          <div className="kavithai-icon-circle">
            <Feather size={28} />
          </div>
          <span className="kavithai-tag">தமிழ் அறக் கவிதைச் சுடர்</span>
          <blockquote className="kavithai-quote">
            "யாதும் ஊரே யாவரும் கேளிர்;<br />
            தீதும் நன்றும் பிறர்தர வாரா."
          </blockquote>
          <p className="kavithai-author">— கணியன் பூங்குன்றனார் (சங்க இலக்கியப் புறநானூறு: 192)</p>
        </div>
      </div>

      {/* 6 Key Pillar Cards Section */}
      <div className="section-block scroll-reveal">
        <div className="section-header">
          <h2><Compass size={24} style={{ verticalAlign: 'middle', marginRight: 8, color: 'var(--primary-green)' }} /> தளத்தின் 6 முதன்மை தூண்கள் (6 Core Pillars)</h2>
          <p>தமிழ் கலாச்சாரம், இலக்கியம் மற்றும் வரலாற்றுப் பொக்கிஷங்களை பாதுகாக்கும் பிரிவுகள்</p>
        </div>

        <div className="pillar-cards-grid">
          {pillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={idx}
                className="pillar-card scroll-reveal-zoom"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="pillar-icon-box" style={{ color: p.color }}>
                  <IconComp size={26} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Secular & Cultural Focus Banner */}
      <div className="secular-focus-banner scroll-reveal">
        <div className="sf-content">
          <Heart size={32} color="var(--light-golden)" style={{ marginBottom: 12 }} />
          <h2>மதச்சார்பற்ற பண்பாட்டு நெறி</h2>
          <p>
            எங்கள் காப்பகம் தமிழ் மொழியின் தனித்துவமான பண்பாடு, வரலாறு, வாழ்வியல் அறம் மற்றும் கலைகளை மட்டுமே மையமாகக் கொண்டு செயல்படுகிறது. எந்தவொரு குறிப்பிட்ட மதத்தைப் பரப்புவதோ அல்லது சமயச் சார்புடையதோ அன்று; தமிழினத்தின் நாகரிக வரலாற்றை நடுநிலையோடு எதிர்காலத் தலைமுறைக்குக் கடத்துவதே இதன் முதன்மை நோக்கமாகும்.
          </p>
        </div>
      </div>
    </div>
  );
}

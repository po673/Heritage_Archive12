import React from 'react';
import { ChevronRight, Calendar, MapPin, Briefcase, UserCheck } from 'lucide-react';
import './GenerationsPage.css';

export default function GenerationsPage({ onNavigate }) {
  const generationsList = [
    {
      gen: 'தலைமுறை 1',
      title: 'முதலாம் தலைமுறை',
      name: 'திரு. இராமசாமி முதலியார்',
      years: '1860 - 1930',
      desc: 'நமது குடும்பத்தின் அடித்தளத்தை அமைத்தவர்.',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'
    },
    {
      gen: 'தலைமுறை 2',
      title: 'இரண்டாம் தலைமுறை',
      name: 'திரு. சின்னசாமி இராமசாமி',
      years: '1895 - 1965',
      desc: 'கல்வியாளர், சமூக சேவர்.',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300'
    },
    {
      gen: 'தலைமுறை 3',
      title: 'மூன்றாம் தலைமுறை',
      name: 'திரு. சுப்பிரமணியன்',
      years: '1928 - 1998',
      desc: 'கவிஞர், எழுத்தாளர், பேச்சாளர்.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      active: true
    },
    {
      gen: 'தலைமுறை 4',
      title: 'நான்காம் தலைமுறை',
      name: 'திரு. அருண் சுப்பிரமணியன்',
      years: '1965 - இன்றுவரை',
      desc: 'வளர்ச்சி, தலைமுறைத் தொடரும் தலைமுறை.',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
    }
  ];

  return (
    <div className="generations-page fade-in">
      <div className="page-title-strip">
        <h1>தலைமுறைகள் (Generations)</h1>
        <p>எங்கள் குடும்பத்தின் தலைமுறை வழி வரலாற்றுப் பார்வை...</p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        {generationsList.map((item, index) => (
          <div 
            key={index} 
            className={`timeline-item ${item.active ? 'highlighted' : ''}`}
            onClick={() => onNavigate('profile')}
          >
            <div className="timeline-node">
              <span>{index + 1}</span>
            </div>

            <div className="gen-card">
              <div className="gen-img-box">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="gen-info">
                <span className="gen-badge">{item.gen} - {item.title}</span>
                <h2 className="gen-name">{item.name}</h2>
                <div className="gen-years">
                  <Calendar size={14} /> {item.years}
                </div>
                <p className="gen-desc">{item.desc}</p>
                <button className="gen-action-btn">
                  விவரங்கள் பார்க்க <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="gen-footer-note">
        <p>ஒவ்வொரு தலைமுறையையும் கிளிக் செய்து முழு விவரங்களை பார்க்கலாம்.</p>
      </div>
    </div>
  );
}

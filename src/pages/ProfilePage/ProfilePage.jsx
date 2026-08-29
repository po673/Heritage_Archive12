import React, { useState } from 'react';
import {
  Calendar, MapPin, Briefcase, Heart, Image, Video, Mic,
  FileText, Feather, ArrowLeft, ArrowRight, Award, UserCheck
} from 'lucide-react';
import './ProfilePage.css';

export default function ProfilePage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('biography');

  const statsList = [
    { label: 'புகைப்படங்கள்', count: '125+', icon: Image, key: 'photos' },
    { label: 'வீடியோக்கள்', count: '68+', icon: Video, key: 'videos' },
    { label: 'ஆடியோ', count: '89+', icon: Mic, key: 'audio' },
    { label: 'ஆவணங்கள்', count: '45+', icon: FileText, key: 'documents' },
    { label: 'கவிதைகள்', count: '200+', icon: Feather, key: 'poetry' },
  ];

  return (
    <div className="profile-page fade-in">
      {/* Top Header Breadcrumb */}
      <div className="profile-top-bar">
        <div className="profile-nav-breadcrumb">
          <span onClick={() => onNavigate('generations')} className="link">தலைமுறைகள்</span>
          <span>&gt;</span>
          <span onClick={() => onNavigate('generations')} className="link">மூன்றாம் தலைமுறை</span>
          <span>&gt;</span>
          <span className="current">திரு. சுப்பிரமணியன்</span>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="profile-hero-card">
        <div className="profile-avatar-wrap">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
            alt="திரு. சுப்பிரமணியன்"
          />
        </div>

        <div className="profile-details">
          <h1 className="profile-name">திரு. சுப்பிரமணியன்</h1>
          <p className="profile-tags">கவிஞர், எழுத்தாளர், பேச்சாளர்</p>
          <div className="profile-lifespan">1928 - 1998</div>

          <div className="profile-info-grid">
            <div className="info-item">
              <Calendar size={16} />
              <div>
                <label>பிறந்த தேதி</label>
                <span>15 ஜூன் 1928</span>
              </div>
            </div>

            <div className="info-item">
              <MapPin size={16} />
              <div>
                <label>பிறந்த இடம்</label>
                <span>தஞ்சாவூர்</span>
              </div>
            </div>

            <div className="info-item">
              <Briefcase size={16} />
              <div>
                <label>தொழில்</label>
                <span>கவிஞர்</span>
              </div>
            </div>

            <div className="info-item">
              <Heart size={16} />
              <div>
                <label>மறைவு</label>
                <span>23 மே 1998</span>
              </div>
            </div>
          </div>

          <p className="profile-bio-snippet">
            தமிழ் மொழி, இலக்கியம், மற்றும் தமிழ்நாட்டின் குடும்ப அமைப்பிற்காக தனது வாழ்நாளை அர்ப்பணித்தவர்.
            பல கவிதைத் தொகுப்புகள், கட்டுரைகள், உரைகள் மற்றும் பாடல்கள் எழுதியுள்ளார்.
          </p>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="stats-grid">
        {statsList.map((st) => {
          const IconComp = st.icon;
          return (
            <div
              key={st.key}
              className="stat-card"
              onClick={() => onNavigate(st.key)}
            >
              <div className="stat-icon"><IconComp size={22} /></div>
              <div className="stat-count">{st.count}</div>
              <div className="stat-label">{st.label}</div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs for Inner Profile */}
      <div className="profile-tabs-header">
        <button
          className={activeTab === 'biography' ? 'active' : ''}
          onClick={() => setActiveTab('biography')}
        >
          வாழ்க்கை
        </button>
        <button
          className={activeTab === 'achievements' ? 'active' : ''}
          onClick={() => setActiveTab('achievements')}
        >
          சாதனைகள்
        </button>
        <button
          className={activeTab === 'family' ? 'active' : ''}
          onClick={() => setActiveTab('family')}
        >
          குடும்பம்
        </button>
        <button
          className={activeTab === 'notes' ? 'active' : ''}
          onClick={() => setActiveTab('notes')}
        >
          நெறிமுறை
        </button>
      </div>

      {/* Profile Inner Tab Content */}
      <div className="profile-tab-body">
        {activeTab === 'biography' && (
          <div className="tab-section fade-in">
            <h2>வாழ்க்கை வரலாறு (Biography)</h2>
            <p>
              திரு. சுப்பிரமணியன் அவர்கள் 1928 ஆம் ஆண்டு தஞ்சாவூரில் பிறந்தார்.
              சிறுமலை தொடக்கப் பள்ளியில் ஆரம்பக் கல்வியும், மதுரை தியாகராசர் கல்லூரியில் உயர்கல்வியும் பயின்றார்.
              தமிழ் மொழியின் மீதும், இலக்கியத்தின் மீதும் கொண்ட ஆர்வம் அவரை மிகச் சிறந்த கவிஞராக உருமாற்றியது.
            </p>
            <div className="bio-photo-grid">
              <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=500" alt="Group" />
              <p className="caption">1960 - பள்ளி மாணவர்களுக்கு இலக்கிய வகுப்பு எடுக்கும் போது</p>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="tab-section fade-in">
            <h2>சாதனைகள் & விருதுகள்</h2>
            <ul className="bullet-list">
              <li>1972 - மாநில தமிழ் வளா்ச்சித் துறை விருது</li>
              <li>1985 - பாவேந்தர் கவிதைப் பரிசு</li>
              <li>1990 - மதுரை தமிழ்ச் சங்கப் பாராட்டு சான்றிதழ்</li>
            </ul>
          </div>
        )}

        {activeTab === 'family' && (
          <div className="tab-section fade-in">
            <h2>குடும்பக் சுவடுகள்</h2>
            <p>மனைவி: திருமதி. லட்சுமி அம்மாள்</p>
            <p>பிள்ளைகள்: திரு. அருண் சுப்பிரமணியன், திருமதி. மேகலா</p>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="tab-section fade-in">
            <h2>நெறிமுறை & கொள்கைகள்</h2>
            <p>"அறம் செய விரும்பு, தமிழ் வழியில் வாழ்!" என்ற கொள்கையை இறுதி வரை கைக்கொண்டவர்.</p>
          </div>
        )}
      </div>

      {/* Bottom Prev/Next Timeline Nav */}
      <div className="profile-timeline-nav">
        <button className="timeline-nav-btn" onClick={() => onNavigate('generations')}>
          <ArrowLeft size={16} />
          <div>
            <small>முந்தைய தலைமுறை</small>
            <span>திரு. சின்னசாமி இராமசாமி</span>
          </div>
        </button>

        <button className="timeline-nav-btn" onClick={() => onNavigate('generations')}>
          <div>
            <small>அடுத்த தலைமுறை</small>
            <span>திரு. அருண் சுப்பிரமணியன்</span>
          </div>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

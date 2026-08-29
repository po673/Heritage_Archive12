import React from 'react';
import { Calendar, MapPin, Feather, BookOpen, Award } from 'lucide-react';
import './BiographyPage.css';

export default function BiographyPage() {
  return (
    <div className="biography-page fade-in">
      <div className="page-title-strip">
        <h1>வாழ்க்கை வரலாறு (Biography)</h1>
        <p>திரு. சுப்பிரமணியன் அவர்களின் வாழ்க்கை, இலக்கிய மற்றும் சமூகப் பங்களிப்புகள்</p>
      </div>

      {/* Top Main Banner & Quote */}
      <div className="bio-hero">
        <div className="bio-portrait">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
            alt="திரு. சுப்பிரமணியன்" 
          />
          <h3>திரு. சுப்பிரமணியன்</h3>
          <span>1928 - 1998</span>
        </div>

        <div className="bio-intro-text">
          <h2>"தமிழ் என் உயிர்... கவிதை என் மூச்சு..."</h2>
          <p>
            திரு. சுப்பிரமணியன் அவர்கள் 1928 ஆம் ஆண்டு தஞ்சாவூர் கிராமத்தில் பிறந்தார். 
            சிறுமலை தொடக்கப் பள்ளியில் ஆரம்பக் கல்வியும், மதுரை தியாகராசர் கல்லூரியில் உயர்கல்வியும் பயின்றார்.
            தமிழ் மொழியின் மீதும், இலக்கியத்தின் மீதும் கொண்ட தீராத ஆர்வத்தினால், 
            தன் வாழ்நாள் முழுவதையும் கவிதைப் படைப்புகள், கட்டுரைகள் மற்றும் சமூக சேவைகளுக்கு அர்ப்பணித்தார்.
          </p>
          <div className="bio-tags">
            <span><Feather size={14} /> கவிஞர்</span>
            <span><BookOpen size={14} /> எழுத்தாளர்</span>
            <span><Award size={14} /> சொற்பொழிவாளர்</span>
          </div>
        </div>
      </div>

      {/* Structured Chapters */}
      <div className="bio-chapters">
        <div className="chapter-card">
          <div className="chapter-badge">பகுதி 1</div>
          <h3>இளமைப் பருவம் & கல்வி</h3>
          <p>
            தஞ்சாவூர் கிராமப்புறச் சூழலில் வளர்ந்த சுப்பிரமணியன் அவர்களுக்கு தமிழ் இலக்கியத்தின் மீது ஆர்வம் இயல்பாகவே எழுந்தது.
            கல்லூரிப் பருவத்தில் தமிழ் மன்றத் தலைவராகப் பணியாற்றி பல பேச்சுப் போட்டிகளில் தங்கப் பதக்கங்களை வென்றார்.
          </p>
        </div>

        <div className="chapter-card">
          <div className="chapter-badge">பகுதி 2</div>
          <h3>இலக்கியப் பணி</h3>
          <p>
            1955-ஆம் ஆண்டு தனது முதல் கவிதைத் தொகுப்பான "மரபு வழி" நூலை வெளியிட்டார். 
            தொடர்ந்து 200-க்கும் மேற்பட்ட கவிதைகளையும், 45 ஆராய்ச்சி ஆவணங்களையும் தமிழ் உலகிற்கு அளித்துள்ளார்.
          </p>
        </div>

        <div className="chapter-card">
          <div className="chapter-badge">பகுதி 3</div>
          <h3>சமூகச் சேவைகள்</h3>
          <p>
            கிராமப்புற மாணவர்களின் கல்விக்காக இலவச நூலகங்களை அமைத்தார். 
            பாரம்பரிய தமிழ் நூல்களை பாதுகாக்கும் பணிகளில் முன்னோடியாகத் திகழ்ந்தார்.
          </p>
        </div>
      </div>

      {/* Historical Photo Feature */}
      <div className="bio-photo-card">
        <img 
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=900" 
          alt="1960 - பள்ளி மாணவர்களுக்கு இலக்கிய வகுப்பு எடுத்த போது" 
        />
        <div className="photo-legend">
          1960 - பள்ளி மாணவர்களுக்கு இலக்கிய வகுப்பு எடுக்கும் போது திரு. சுப்பிரமணியன்
        </div>
      </div>
    </div>
  );
}

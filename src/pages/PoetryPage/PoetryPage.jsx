import React, { useState } from 'react';
import { Feather, BookOpen, Volume2, X, Search, Sparkles, Heart } from 'lucide-react';
import { featuredPoems } from '../../data/heritageData';
import './PoetryPage.css';

export default function PoetryPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPoem, setSelectedPoem] = useState(null);

  const categories = [
    { id: 'all', label: 'அனைத்துக் கவிதைகள்' },
    { id: 'sangam', label: 'சங்க இலக்கியப் பாடல்கள்' },
    { id: 'bharathiyar', label: 'பாரதியார் கவிதைகள்' },
    { id: 'bharathidasan', label: 'பாரதிதாசன் கவிதைகள்' },
  ];

  const filteredPoems = featuredPoems.filter(poem => {
    const matchesCat = filter === 'all' || 
      (filter === 'sangam' && poem.category.includes('சங்க')) ||
      (filter === 'bharathiyar' && poem.poet.includes('பாரதியார்')) ||
      (filter === 'bharathidasan' && poem.poet.includes('பாரதிதாசன்'));
    const matchesSearch = poem.title.includes(searchQuery) || poem.poet.includes(searchQuery) || poem.excerpt.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="media-page fade-in">
      <div className="page-title-strip">
        <h1>கவிதைகள் & கவிதையரங்கம் (Kavithaigal / Poetry)</h1>
        <p>சங்கக் கவிதைகள், பாரதியார் பாடல்கள் மற்றும் பாவேந்தர் கவிதைகளின் செம்மொழிச் சுவை</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="poetry-controls-bar">
        <div className="poetry-search-box">
          <Search size={18} className="pys-icon" />
          <input 
            type="text" 
            placeholder="கவிதைத் தலைப்பு அல்லது கவிஞரின் பெயரைத் தேடுக..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-bar">
          {categories.map((c) => (
            <button 
              key={c.id} 
              className={`filter-chip ${filter === c.id ? 'active' : ''}`}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Poetry Grid */}
      <div className="grid-3">
        {filteredPoems.map((poem) => (
          <div key={poem.id} className="poem-card">
            <div className="poem-feather-icon">
              <Feather size={28} />
            </div>

            <span className="poem-cat-pill">{poem.category}</span>
            <h3 className="poem-title">{poem.title}</h3>
            <h4 className="poem-poet-name"><Sparkles size={14} /> {poem.poet}</h4>
            
            <div className="poem-excerpt-box">
              <p className="poem-excerpt-text">"{poem.excerpt}"</p>
            </div>

            <button className="poem-read-btn" onClick={() => setSelectedPoem(poem)}>
              முழு கவிதையை வாசிக்க <Feather size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Full Poem Modal */}
      {selectedPoem && (
        <div className="lightbox-modal fade-in" onClick={() => setSelectedPoem(null)}>
          <div className="lightbox-content poem-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPoem(null)}>
              <X size={24} />
            </button>

            <div className="poem-modal-header">
              <Feather size={36} color="var(--accent-bronze)" />
              <div>
                <h2>{selectedPoem.title}</h2>
                <h4 className="poem-modal-author">இயற்றியவர்: {selectedPoem.poet}</h4>
                <span className="poem-modal-cat">{selectedPoem.category}</span>
              </div>
            </div>

            <div className="poem-body-container">
              <pre className="poem-full-text">{selectedPoem.fullText}</pre>
            </div>

            {selectedPoem.meaning && (
              <div className="poem-meaning-box">
                <h4><Heart size={16} color="var(--accent-bronze)" /> கவிதையின் உரை / விளக்கம்:</h4>
                <p>{selectedPoem.meaning}</p>
              </div>
            )}

            <div className="lightbox-footer">
              <button className="btn-primary-gold" onClick={() => alert(`Playing Audio Recitation for: ${selectedPoem.title}`)}>
                <Volume2 size={16} /> கவிதை வாசிப்பைக் கேட்க (Audio Recitation)
              </button>
              <button className="btn-secondary" onClick={() => setSelectedPoem(null)}>மூடு</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

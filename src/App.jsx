import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Users, User, Feather, Image, Video, Mic, FileText,
  Settings, Grid, Eye, BookOpen, Sparkles, ShieldCheck, Mail, Info,
  Menu, X, Sun, Moon, Heart
} from 'lucide-react';

import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import PhotosPage from './pages/PhotosPage/PhotosPage';
import VideosPage from './pages/VideosPage/VideosPage';
import AudioPage from './pages/AudioPage/AudioPage';
import DocumentsPage from './pages/DocumentsPage/DocumentsPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ContactPage from './pages/ContactPage/ContactPage';
import AdminPage from './pages/AdminPage/AdminPage';
import BiographyPage from './pages/BiographyPage/BiographyPage';
import GenerationsPage from './pages/GenerationsPage/GenerationsPage';
import PoetryPage from './pages/PoetryPage/PoetryPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import AudioPlayer from './components/AudioPlayer';
import AudioNotification from './components/AudioNotification';
import FavoriteToast from './components/FavoriteToast';
import { useFavorites } from './hooks/useFavorites';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageFromPath = (path) => {
    const cleanPath = path.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (!cleanPath || cleanPath === 'home') return 'home';
    if (cleanPath === 'gallery') return 'photos';
    return cleanPath;
  };

  const currentPage = getPageFromPath(location.pathname);
  const [overviewMode, setOverviewMode] = useState(false);
  const [activeHistoryPerson, setActiveHistoryPerson] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage or system preference
    const savedMode = localStorage.getItem('heritageArchiveDarkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Central Favorites Hook
  const { favorites, toggleFavorite, isFavorite, removeFavorite, clearAllFavorites, toastNotification, closeToast } = useFavorites();

  // Global Audio Player State (Persists across all page navigation)
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showAudioNotification, setShowAudioNotification] = useState(false);

  // Global Video State
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  // Initialize dark mode on mount
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme-mode');
    } else {
      document.body.classList.remove('dark-theme-mode');
    }
    localStorage.setItem('heritageArchiveDarkMode', isDarkMode);
  }, [isDarkMode]);

  const handleNavigate = (pageId, person = null) => {
    setOverviewMode(false);
    setIsMobileMenuOpen(false);
    if (person) {
      setActiveHistoryPerson(person);
    }
    const targetPath = pageId === 'home' ? '/' : `/${pageId}`;
    navigate(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayAudio = (audioTrack) => {
    setCurrentAudio(audioTrack);
    setIsAudioPlaying(true);
    setShowAudioNotification(true);
  };

  const handleToggleAudioPlay = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleCloseAudioPlayer = () => {
    setCurrentAudio(null);
    setIsAudioPlaying(false);
    setShowAudioNotification(false);
  };

  const tabs = [
    { id: 'home', label: '1. முகப்பு', icon: Home, comp: HomePage },
    { id: 'about', label: '2. அறிமுகம்', icon: Info, comp: AboutPage },
    { id: 'history', label: '3. வரலாறு & ஆளுமைகள்', icon: Users, comp: HistoryPage },
    { id: 'photos', label: '4. புகைப்படங்கள்', icon: Image, comp: PhotosPage },
    { id: 'videos', label: '5. வீடியோக்கள்', icon: Video, comp: VideosPage },
    { id: 'audio', label: '6. ஆடியோ', icon: Mic, comp: AudioPage },
    { id: 'documents', label: '7. ஆவணங்கள்', icon: FileText, comp: DocumentsPage },
    { id: 'favorites', label: '8. விருப்பமானவை', icon: Heart, comp: FavoritesPage },
    { id: 'contact', label: '9. தொடர்பு', icon: Mail, comp: ContactPage },
  ];

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'about': return <AboutPage />;
      case 'history': return <HistoryPage initialPerson={activeHistoryPerson} onClearPerson={() => setActiveHistoryPerson(null)} />;
      case 'photos': return (
        <PhotosPage
          onNavigate={handleNavigate}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      );
      case 'videos': return (
        <VideosPage
          selectedVideoId={selectedVideoId}
          onSelectVideo={(id) => setSelectedVideoId(id)}
          onNavigate={handleNavigate}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      );
      case 'audio': return (
        <AudioPage
          currentAudio={currentAudio}
          isPlaying={isAudioPlaying}
          onPlayAudio={handlePlayAudio}
          onTogglePlay={handleToggleAudioPlay}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      );
      case 'documents': return (
        <DocumentsPage
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      );
      case 'favorites': return (
        <FavoritesPage
          favorites={favorites}
          onRemoveFavorite={removeFavorite}
          onClearAll={clearAllFavorites}
          onNavigate={handleNavigate}
          onPlayAudio={handlePlayAudio}
        />
      );
      case 'contact': return <ContactPage />;
      case 'admin': return <AdminPage />;
      case 'biography': return <BiographyPage />;
      case 'generations': return <GenerationsPage />;
      case 'poetry': return <PoetryPage />;
      case 'profile': return <ProfilePage />;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-container">
      {/* Modern Traditional Heritage Header & Sticky Navbar */}
      <header className="site-header-navbar">
        <div className="header-top-row">
          <div className="header-brand" onClick={() => handleNavigate('home')}>
            <div className="brand-logo-icon">
              <ShieldCheck size={28} color="#D97706" />
            </div>
            <div className="brand-text">
              <span className="brand-title">
                <span className="brand-title-line1">தமிழ் வரலாறு</span>{' '}
                <span className="brand-title-line2">& சிறப்புப் பேர்கள்</span>
              </span>
              <span className="brand-subtitle">நம் மண்ணின் பெருமையையும், மக்களின் சாதனைகளையும் அறிந்து கொள்வோம்...</span>
            </div>
          </div>

          <div className="header-right-actions">
            <div className="header-quote-tag">
              "நம் வரலாறு நம் அடையாளம்"
            </div>

            {/* Attractive Theme Toggle Button (Light/Dark Mode) */}
            <button
              className={`theme-toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'வெளிச்சப் பயன்முறை (Light Mode)' : 'இரவுப் பயன்முறை (Dark Mode)'}
              aria-label="Toggle theme mode"
            >
              {isDarkMode ? (
                <Sun size={18} className="theme-icon sun-icon" />
              ) : (
                <Moon size={18} className="theme-icon moon-icon" />
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              className="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <nav className={`nav-tabs-bar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = currentPage === tab.id && !overviewMode;
            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigate(tab.id)}
              >
                <IconComp size={16} className="nav-icon" />
                <span className="nav-label">{tab.label.replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Screen Viewport Container */}
      <main className="screen-wrapper">

        {overviewMode ? (
          <div className="grid-overview-layout fade-in">
            <div className="overview-header-box">
              <h2>அனைத்து பிரிவுகளின் நேரலை முழுப் பார்வை (Overview Mode)</h2>
              <p>இணையதளத்தின் அனைத்து பக்கங்களும் ஒரே பார்வையில் கீழே கொடுக்கப்பட்டுள்ளன</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {tabs.map((t) => {
                const PageComp = t.comp;
                return (
                  <div key={t.id} className="overview-card-wrapper">
                    <div className="overview-card-title">
                      <t.icon size={18} />
                      <span>{t.label}</span>
                    </div>
                    <PageComp onNavigate={(pageId, person) => handleNavigate(pageId, person)} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          renderActivePage()
        )}
      </main>

      {/* Global Audio Auto-Open Notification ("Now Playing") */}
      {showAudioNotification && currentAudio && (
        <AudioNotification
          audio={currentAudio}
          onClose={() => setShowAudioNotification(false)}
        />
      )}

      {/* Persistent Floating Audio Player at Bottom-Right Corner */}
      {currentAudio && (
        <AudioPlayer
          audio={currentAudio}
          isPlaying={isAudioPlaying}
          onPlayPause={(val) => setIsAudioPlaying(val)}
          onClose={handleCloseAudioPlayer}
        />
      )}

      {/* Floating Bottom-Right Toast Notification for Favorites */}
      <FavoriteToast toast={toastNotification} onClose={closeToast} />

      {/* Global Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <span>தமிழ் டிஜிட்டல் மரபு காப்பகம்</span> • மதச்சார்பற்ற பண்பாட்டுப் பொக்கிஷம் • 2000+ செம்மொழி ஆவணங்கள்
          </div>
          <div className="footer-copy-text">
            © 2026 Tamil Heritage & Cultural Digital Archive. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
          </div>
        </div>
      </footer>
    </div>
  );
}

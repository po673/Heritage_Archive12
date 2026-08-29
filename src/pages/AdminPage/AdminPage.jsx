import React, { useState } from 'react';
import {
  Users, Image, Video, Mic, FileText, Feather, Plus,
  Trash2, Edit, LogIn, Lock, CheckCircle, Shield
} from 'lucide-react';
import './AdminPage.css';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');

  const [genName, setGenName] = useState('');
  const [genYears, setGenYears] = useState('');

  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaType, setMediaType] = useState('Photo');

  const [mediaItems, setMediaItems] = useState([
    { id: 1, title: 'தமிழ் வகுப்பு - 1962', type: 'Video', date: '12-05-2024' },
    { id: 2, title: 'கவிதை வாசிப்பு - 1975', type: 'Video', date: '10-05-2024' },
    { id: 3, title: 'யாதும் ஊரே - கவிதை', type: 'Poetry', date: '09-05-2024' },
    { id: 4, title: 'கையெழுத்துப் பிரதிகள்', type: 'Document', date: '08-05-2024' },
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!mediaTitle) return;
    const newItem = {
      id: Date.now(),
      title: mediaTitle,
      type: mediaType,
      date: new Date().toLocaleDateString('en-GB')
    };
    setMediaItems([newItem, ...mediaItems]);
    setMediaTitle('');
    alert('ஊடகம் வெற்றிகரமாக சேர்க்கப்பட்டது!');
  };

  const handleDelete = (id) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container fade-in">
        <div className="login-card">
          <div className="login-header">
            <div className="login-header-icon">
              <Shield size={32} />
            </div>
            <h2>நிர்வாகி உள்நுழைவு</h2>
            <p>Admin Login Portal</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              <LogIn size={18} /> Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard fade-in">
      {/* Top Admin Bar */}
      <div className="admin-header-bar">
        <h2>நிர்வாக பகுதி (Admin Panel) - Website Management</h2>
        <button onClick={() => setIsLoggedIn(false)} className="logout-btn">
          வெளியேறு (Logout)
        </button>
      </div>

      {/* Admin Quick Stats Grid */}
      <div className="admin-stats-grid">
        <div className="adm-stat-card">
          <span>தலைமுறைகள்</span>
          <h3>4</h3>
        </div>
        <div className="adm-stat-card">
          <span>புகைப்படங்கள்</span>
          <h3>245</h3>
        </div>
        <div className="adm-stat-card">
          <span>வீடியோக்கள்</span>
          <h3>68</h3>
        </div>
        <div className="adm-stat-card">
          <span>ஆடியோ</span>
          <h3>125</h3>
        </div>
        <div className="adm-stat-card">
          <span>ஆவணங்கள்</span>
          <h3>89</h3>
        </div>
        <div className="adm-stat-card">
          <span>கவிதைகள்</span>
          <h3>200</h3>
        </div>
      </div>

      {/* Main Form & Table Layout */}
      <div className="admin-content-grid">
        {/* Left Form Column */}
        <div className="admin-forms-col">
          {/* Add Generation Form */}
          <div className="admin-card-box">
            <h3><Users size={18} /> தலைமுறை சேர்க்க (Add Generation)</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Generation Added'); }}>
              <div className="form-group">
                <label>பெயர்</label>
                <input type="text" placeholder="திரு. சுப்பிரமணியன்" value={genName} onChange={e => setGenName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>காலம்</label>
                <input type="text" placeholder="1928 - 1998" value={genYears} onChange={e => setGenYears(e.target.value)} />
              </div>
              <button type="submit" className="adm-btn">சேர்க்க</button>
            </form>
          </div>

          {/* Add Media Form */}
          <div className="admin-card-box">
            <h3><Plus size={18} /> ஊடகங்கள் சேர்க்க (Add Media)</h3>
            <form onSubmit={handleAddMedia}>
              <div className="form-group">
                <label>ஊடக வகை</label>
                <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
                  <option value="Photo">புகைப்படம்</option>
                  <option value="Video">வீடியோ</option>
                  <option value="Audio">ஆடியோ</option>
                  <option value="Document">ஆவணம்</option>
                  <option value="Poetry">கவிதை</option>
                </select>
              </div>

              <div className="form-group">
                <label>தலைப்பு</label>
                <input type="text" placeholder="ஊடகத்தின் தலைப்பு..." value={mediaTitle} onChange={e => setMediaTitle(e.target.value)} />
              </div>

              <button type="submit" className="adm-btn">சேர்க்க</button>
            </form>
          </div>
        </div>

        {/* Right Data Table Column */}
        <div className="admin-table-col">
          <div className="admin-card-box">
            <h3>Media List</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>தலைப்பு</th>
                  <th>வகை</th>
                  <th>தேதி</th>
                  <th>செயல்கள்</th>
                </tr>
              </thead>
              <tbody>
                {mediaItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td><span className="type-badge">{item.type}</span></td>
                    <td>{item.date}</td>
                    <td>
                      <div className="table-actions">
                        <button className="act-btn edit"><Edit size={14} /></button>
                        <button className="act-btn delete" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

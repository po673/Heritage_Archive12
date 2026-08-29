import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Globe, Sparkles } from 'lucide-react';
import './ContactPage.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page fade-in">
      <div className="page-title-strip">
        <div className="title-with-badge">
          <h1>தொடர்பு கொள்க (Contact Us)</h1>
          <span className="heritage-badge"><Sparkles size={14} /> மரபு மையம்</span>
        </div>
        <p>தமிழ் மரபு மற்றும் ஆவணப் பகிர்வு தொடர்பான கேள்விகள் & கருத்துக்களுக்கு எங்களைத் தொடர்பு கொள்ளவும்</p>
      </div>

      <div className="contact-layout-grid">
        {/* Contact Info Card */}
        <div className="contact-info-card">
          <div className="card-header-badge">
            <MessageSquare size={22} className="card-badge-icon" />
            <h3>தொடர்பு விவரங்கள்</h3>
          </div>
          <p className="ci-desc">
            உங்களிடம் அரிய தமிழ் ஓலைச்சுவடிகள், புகைப்படங்கள் அல்லது வரலாற்றுச் செய்திகள் இருந்தால் எங்களோடு பகிர்ந்து டிஜிட்டல் மரபு காப்பகத்திற்கு உதவலாம்.
          </p>

          <div className="ci-list">
            <div className="ci-item">
              <Mail className="ci-icon" size={20} />
              <div>
                <span>மின்னஞ்சல் (Email)</span>
                <strong>contact@tamilheritagearchive.org</strong>
              </div>
            </div>

            <div className="ci-item">
              <Phone className="ci-icon" size={20} />
              <div>
                <span>தொலைபேசி (Phone)</span>
                <strong>+91 44 2835 1900</strong>
              </div>
            </div>

            <div className="ci-item">
              <MapPin className="ci-icon" size={20} />
              <div>
                <span>முகவரி (Address)</span>
                <strong>தமிழ் டிஜிட்டல் மரபு மையம், சென்னை, தமிழ்நாடு.</strong>
              </div>
            </div>

            <div className="ci-item">
              <Globe className="ci-icon" size={20} />
              <div>
                <span>வலைத்தளம் (Website)</span>
                <strong>www.tamilheritagearchive.org</strong>
              </div>
            </div>
          </div>

          <div className="ci-footer-note">
            <Sparkles size={16} />
            <span>24/7 மின்னஞ்சல் வழிப் பதிலளிப்பு சேவை</span>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="contact-form-card">
          {submitted ? (
            <div className="form-success-box">
              <CheckCircle size={56} className="success-check-icon" />
              <h2>செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!</h2>
              <p>உங்கள் தொடர்புக்கு நன்றி. எங்கள் குழுவினர் விரைவில் உங்களைத் தொடர்பு கொள்வார்கள்.</p>
              <button className="btn-reset-form" onClick={() => setSubmitted(false)}>
                மற்றொரு செய்தி அனுப்ப
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-header-title">
                <h3>செய்தி அனுப்பவும்</h3>
                <p>கீழே உள்ள படிவத்தைப் பூர்த்தி செய்து அனுப்பவும்</p>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>பெயர் (Full Name)</label>
                  <input
                    type="text"
                    required
                    placeholder="உங்கள் பெயர்..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>மின்னஞ்சல் முகவரி (Email Address)</label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>தொலைபேசி எண் (Phone - Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>தலைப்பு (Subject)</label>
                  <input
                    type="text"
                    required
                    placeholder="செய்தியின் சுருக்கம்..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>செய்தி (Message)</label>
                <textarea
                  rows="4"
                  required
                  placeholder="உங்கள் செய்தியை இங்கு தட்டச்சு செய்யவும்..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn">
                <Send size={18} /> செய்தியை அனுப்புக
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


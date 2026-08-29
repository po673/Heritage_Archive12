import React, { useState, useEffect } from 'react';
import {
  MessageSquare, Send, Heart, Reply, Trash2, User,
  CornerDownRight, Sparkles, Filter, Smile, ShieldAlert
} from 'lucide-react';
import './CommentSection.css';

// Default initial sample comments for realistic content engagement
const sampleDefaultComments = {
  default: [
    {
      id: 'default_1',
      author: 'செல்வம் குமார்',
      avatarColor: '#7c3aed',
      text: 'மிகவும் சிறப்பான மற்றும் பயனுள்ள வரலாற்று பதிவு! மேலும் பல தகவல்களை எதிர்பார்க்கிறோம்.',
      timestamp: '2 மணி நேரத்திற்கு முன்',
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 'reply_1_1',
          author: 'தமிழ் ஆய்வுக்குழு',
          avatarColor: '#2563eb',
          text: 'நன்றி நண்பரே! தொடர்ந்து எமது மரபு காப்பகத்தைப் பாருங்கள்.',
          timestamp: '1 மணி நேரத்திற்கு முன்',
          likes: 4,
          isLiked: false
        }
      ]
    },
    {
      id: 'default_2',
      author: 'அனிதா இராமநாதன்',
      avatarColor: '#ea580c',
      text: 'இந்த தலைப்பு பற்றிய விளக்கம் மிகவும் தெளிவாக இருந்தது. தமிழ் பண்பாட்டின் மேன்மையை வெளிப்படுத்துகிறது.',
      timestamp: '5 மணி நேரத்திற்கு முன்',
      likes: 8,
      isLiked: false,
      replies: []
    }
  ]
};

export default function CommentSection({ contentId = 'general', contentTitle = '' }) {
  const storageKey = `heritage_comments_${contentId}`;

  const [comments, setComments] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'likes'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load comments from Local Storage or fallback to default samples
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setComments(JSON.parse(saved));
      } else {
        // Initialize with default sample comments for this content item
        const defaults = sampleDefaultComments[contentId] || sampleDefaultComments.default;
        setComments(defaults);
      }
    } catch (e) {
      console.error('Error reading comments from localStorage:', e);
      setComments(sampleDefaultComments.default);
    }
  }, [contentId, storageKey]);

  // Load last used author name from localStorage
  useEffect(() => {
    try {
      const savedName = localStorage.getItem('heritage_user_name');
      if (savedName) setAuthorName(savedName);
    } catch (e) { }
  }, []);

  // Save comments to localStorage whenever updated
  const saveComments = (updatedComments) => {
    setComments(updatedComments);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedComments));
    } catch (e) {
      console.error('Failed to save comments:', e);
    }
  };

  // Generate deterministic pastel color for author avatar
  const getAvatarBg = (name) => {
    const colors = ['#7c3aed', '#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626', '#c026d3'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  // Format relative timestamp
  const getTimestamp = () => {
    return 'இப்போதுதான் (Just now)';
  };

  // Handle post new comment
  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) {
      setErrorMsg('தயவுசெய்து உங்கள் கருத்தை உள்ளிடவும் (Please enter a comment)');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const finalAuthor = authorName.trim() || 'விருந்தினர்பயனர் (Guest User)';
    try {
      localStorage.setItem('heritage_user_name', finalAuthor);
    } catch (e) { }

    const newComment = {
      id: `comment_${Date.now()}`,
      author: finalAuthor,
      avatarColor: getAvatarBg(finalAuthor),
      text: newCommentText.trim(),
      timestamp: getTimestamp(),
      likes: 0,
      isLiked: false,
      isUserCreated: true,
      replies: []
    };

    const updated = [newComment, ...comments];
    saveComments(updated);
    setNewCommentText('');
    setIsSubmitting(false);
  };

  // Handle post reply
  const handlePostReply = (parentCommentId) => {
    if (!replyText.trim()) return;

    const finalAuthor = authorName.trim() || 'விருந்தினர்பயனர் (Guest User)';
    try {
      localStorage.setItem('heritage_user_name', finalAuthor);
    } catch (e) { }

    const newReply = {
      id: `reply_${Date.now()}`,
      author: finalAuthor,
      avatarColor: getAvatarBg(finalAuthor),
      text: replyText.trim(),
      timestamp: getTimestamp(),
      likes: 0,
      isLiked: false,
      isUserCreated: true
    };

    const updated = comments.map(c => {
      if (c.id === parentCommentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply]
        };
      }
      return c;
    });

    saveComments(updated);
    setReplyText('');
    setReplyingToId(null);
  };

  // Toggle Like on main comment
  const handleToggleLike = (commentId) => {
    const updated = comments.map(c => {
      if (c.id === commentId) {
        const nextLiked = !c.isLiked;
        return {
          ...c,
          isLiked: nextLiked,
          likes: nextLiked ? c.likes + 1 : Math.max(0, c.likes - 1)
        };
      }
      return c;
    });
    saveComments(updated);
  };

  // Toggle Like on reply
  const handleToggleReplyLike = (parentCommentId, replyId) => {
    const updated = comments.map(c => {
      if (c.id === parentCommentId) {
        const updatedReplies = c.replies.map(r => {
          if (r.id === replyId) {
            const nextLiked = !r.isLiked;
            return {
              ...r,
              isLiked: nextLiked,
              likes: nextLiked ? r.likes + 1 : Math.max(0, r.likes - 1)
            };
          }
          return r;
        });
        return { ...c, replies: updatedReplies };
      }
      return c;
    });
    saveComments(updated);
  };

  // Delete comment (allowed for user-created comments or demo mode)
  const handleDeleteComment = (commentId) => {
    const updated = comments.filter(c => c.id !== commentId);
    saveComments(updated);
  };

  // Delete reply
  const handleDeleteReply = (parentCommentId, replyId) => {
    const updated = comments.map(c => {
      if (c.id === parentCommentId) {
        return {
          ...c,
          replies: c.replies.filter(r => r.id !== replyId)
        };
      }
      return c;
    });
    saveComments(updated);
  };

  // Sorting comments
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'likes') {
      return (b.likes || 0) - (a.likes || 0);
    }
    return 0; // Default order (newest first)
  });

  const totalCommentCount = comments.reduce((acc, curr) => acc + 1 + (curr.replies?.length || 0), 0);

  return (
    <section className="comment-section-root" aria-label="Comment section">
      {/* Section Header */}
      <div className="cs-header">
        <div className="cs-title-group">
          <div className="cs-icon-badge">
            <MessageSquare size={20} className="cs-icon" />
          </div>
          <div>
            <h3 className="cs-title">
              கருத்துகள் & உரையாடல் (Comments & Discussion)
            </h3>
            {contentTitle && (
              <span className="cs-subtitle">
                {contentTitle}
              </span>
            )}
          </div>
          <span className="cs-count-badge">
            {totalCommentCount} {totalCommentCount === 1 ? 'கருத்து' : 'கருத்துகள்'}
          </span>
        </div>

        {/* Sort Filter */}
        <div className="cs-sort-wrap">
          <Filter size={14} className="cs-sort-icon" />
          <select
            className="cs-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort comments"
          >
            <option value="newest">சமீபத்தியவை (Newest)</option>
            <option value="likes">அதிக விருப்பங்கள் (Most Liked)</option>
          </select>
        </div>
      </div>

      {/* 2-Column Grid Layout: Left Input Box, Right Scrollable Comments List */}
      <div className="cs-body-grid">
        {/* Left Column: Main Comment Input Box */}
        <div className="cs-input-card">
          <form onSubmit={handlePostComment} className="cs-form">
            <div className="cs-form-row">
              <div className="cs-user-meta">
                <div
                  className="cs-avatar-preview"
                  style={{ backgroundColor: getAvatarBg(authorName || 'Guest') }}
                >
                  {(authorName.trim()?.[0] || 'V').toUpperCase()}
                </div>
                <div className="cs-name-input-wrapper">
                  <User size={14} className="cs-name-icon" />
                  <input
                    type="text"
                    className="cs-author-input"
                    placeholder="உங்கள் பெயர் (Your Name - Optional)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </div>
              </div>

              <span className="cs-tip-tag">
                <Sparkles size={12} /> உங்கள் கருத்து நன்மதிப்போடு பகிரப்படும்
              </span>
            </div>

            <div className="cs-textarea-wrapper">
              <textarea
                className="cs-textarea"
                placeholder="இங்கே உங்கள் கருத்தைப் பதிவு செய்யுங்கள்... (Write your comment here)"
                rows={4}
                value={newCommentText}
                onChange={(e) => {
                  setNewCommentText(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handlePostComment(e);
                  }
                }}
              />
            </div>

            {errorMsg && (
              <div className="cs-error-banner">
                <ShieldAlert size={14} /> {errorMsg}
              </div>
            )}

            <div className="cs-form-footer">
              <span className="cs-hint-text">
                குறிப்பு: Ctrl + Enter அழுத்தி விரைவாகச் சமர்ப்பிக்கலாம்.
              </span>

              <button
                type="submit"
                className="cs-submit-btn"
                disabled={isSubmitting || !newCommentText.trim()}
              >
                <Send size={16} />
                <span>கருத்து சமர்ப்பி (Post)</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Comments List Area */}
        <div className="cs-list-container">
        {sortedComments.length === 0 ? (
          <div className="cs-empty-state">
            <MessageSquare size={36} className="cs-empty-icon" />
            <p className="cs-empty-title">இன்னும் கருத்துகள் எதுவும் இல்லை</p>
            <p className="cs-empty-desc">
              இந்த வரலாற்று ஆவணத்தைப் பற்றிய உங்கள் கருத்துக்களை முதலில் பதிவு செய்யுங்கள்!
            </p>
          </div>
        ) : (
          <div className="cs-scroll-list">
            {sortedComments.map((comment) => (
              <article key={comment.id} className="cs-comment-card">
                <div className="cs-comment-body">
                  {/* Left Avatar */}
                  <div
                    className="cs-avatar"
                    style={{ backgroundColor: comment.avatarColor || getAvatarBg(comment.author) }}
                  >
                    {(comment.author?.[0] || 'U').toUpperCase()}
                  </div>

                  {/* Main Comment Content */}
                  <div className="cs-comment-content">
                    <div className="cs-comment-header">
                      <div className="cs-author-info">
                        <span className="cs-author-name">{comment.author}</span>
                        <span className="cs-timestamp">{comment.timestamp}</span>
                      </div>

                      {comment.isUserCreated && (
                        <button
                          className="cs-delete-btn"
                          onClick={() => handleDeleteComment(comment.id)}
                          title="கருத்தை நீக்குக (Delete comment)"
                          aria-label="Delete comment"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <p className="cs-text">{comment.text}</p>

                    {/* Actions Bar */}
                    <div className="cs-actions-bar">
                      <button
                        className={`cs-action-btn ${comment.isLiked ? 'liked' : ''}`}
                        onClick={() => handleToggleLike(comment.id)}
                        aria-label="Like comment"
                      >
                        <Heart
                          size={14}
                          fill={comment.isLiked ? '#ef4444' : 'none'}
                          color={comment.isLiked ? '#ef4444' : 'currentColor'}
                        />
                        <span>{comment.likes > 0 ? comment.likes : 'விருப்பம் (Like)'}</span>
                      </button>

                      <button
                        className="cs-action-btn reply-btn"
                        onClick={() => {
                          setReplyingToId(replyingToId === comment.id ? null : comment.id);
                          setReplyText('');
                        }}
                      >
                        <Reply size={14} />
                        <span>பதிலளி (Reply)</span>
                      </button>
                    </div>

                    {/* Inline Reply Input Form */}
                    {replyingToId === comment.id && (
                      <div className="cs-reply-input-box fade-in">
                        <div className="cs-reply-input-wrapper">
                          <input
                            type="text"
                            className="cs-reply-input"
                            placeholder={`${comment.author} என்பவருக்குப் பதிலளிக்கவும்...`}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handlePostReply(comment.id);
                              }
                            }}
                            autoFocus
                          />
                          <button
                            className="cs-reply-send-btn"
                            onClick={() => handlePostReply(comment.id)}
                            disabled={!replyText.trim()}
                          >
                            <Send size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Nested Replies List */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="cs-replies-list">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="cs-reply-card">
                            <CornerDownRight size={14} className="cs-reply-tree-icon" />
                            <div
                              className="cs-avatar cs-avatar-sm"
                              style={{ backgroundColor: reply.avatarColor || getAvatarBg(reply.author) }}
                            >
                              {(reply.author?.[0] || 'U').toUpperCase()}
                            </div>
                            <div className="cs-reply-content">
                              <div className="cs-comment-header">
                                <div className="cs-author-info">
                                  <span className="cs-author-name">{reply.author}</span>
                                  <span className="cs-timestamp">{reply.timestamp}</span>
                                </div>
                                {reply.isUserCreated && (
                                  <button
                                    className="cs-delete-btn"
                                    onClick={() => handleDeleteReply(comment.id, reply.id)}
                                    title="பதிலை நீக்குக"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                )}
                              </div>
                              <p className="cs-text">{reply.text}</p>
                              <div className="cs-actions-bar">
                                <button
                                  className={`cs-action-btn ${reply.isLiked ? 'liked' : ''}`}
                                  onClick={() => handleToggleReplyLike(comment.id, reply.id)}
                                >
                                  <Heart
                                    size={12}
                                    fill={reply.isLiked ? '#ef4444' : 'none'}
                                    color={reply.isLiked ? '#ef4444' : 'currentColor'}
                                  />
                                  <span>{reply.likes > 0 ? reply.likes : 'விருப்பம்'}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      </div>
    </section>
  );
}

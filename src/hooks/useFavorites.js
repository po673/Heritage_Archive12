import React, { useState, useEffect } from 'react';

/**
 * Custom hook to manage persistent favorite/bookmark items in localStorage.
 * Handles images, videos, audio, documents, and history figures.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('heritage_archive_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to load favorites from localStorage', err);
      return [];
    }
  });

  const [toastNotification, setToastNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('heritage_archive_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage', err);
    }
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === item.id);
      if (exists) {
        setToastNotification({
          isAdded: false,
          itemTitle: item.title || item.name,
          itemType: item.type
        });
        return prev.filter((fav) => fav.id !== item.id);
      } else {
        setToastNotification({
          isAdded: true,
          itemTitle: item.title || item.name,
          itemType: item.type
        });
        return [...prev, { ...item, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const closeToast = () => {
    setToastNotification(null);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    removeFavorite,
    clearAllFavorites,
    toastNotification,
    closeToast
  };
}

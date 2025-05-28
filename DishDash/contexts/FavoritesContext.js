import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  const toggleFavorite = (id) => {
    setFavoriteIds((currentFavs) =>
      currentFavs.includes(id)
        ? currentFavs.filter(favId => favId !== id)
        : [...currentFavs, id]
    );
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

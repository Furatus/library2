// HomePage.tsx
import React from 'react';
import AdvancedSearcgPage from './AdvancedSearchPage';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Bienvenue sur la Bibliothèque de la Ville</h1>
      <p>Ce site vous permet de rechercher des livres dans notre bibliothèque.</p>
      <AdvancedSearcgPage />
      {}
    </div>
  );
};

export default HomePage;

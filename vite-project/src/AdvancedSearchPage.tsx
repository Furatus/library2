// AdvancedSearchPage.tsx
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdvancedSearchPage: React.FC = () => {
  const [advancedQuery, setAdvancedQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleAdvancedSearch = async (page: number = 1, limit: number = 10) => {
    try {
      // Effectuer une recherche avancée avec l'API Open Library en utilisant les paramètres de pagination
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${advancedQuery}&mode=advanced&page=${page}&limit=${limit}&fields=title,author_name,subject,key,cover_i`,
      );

      // Naviguer vers une page de résultats avec les données de la recherche avancée
      navigate('/search-results', { state: { results: response.data.docs } });
    } catch (error) {
      console.error('Erreur lors de la recherche avancée :', error);
    }
  };

  return (
    <div>
      <h2>Recherche Avancée</h2>
      <input
        type="text"
        placeholder="Recherche avancée..."
        value={advancedQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setAdvancedQuery(e.target.value)}
      />
      <button onClick={() => handleAdvancedSearch()}>Rechercher</button>
      {/* Autres éléments de la page de recherche avancée */}
    </div>
  );
};

export default AdvancedSearchPage;

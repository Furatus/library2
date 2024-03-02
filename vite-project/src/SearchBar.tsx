// SearchBar.tsx

import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Rechercher un livre..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                    Rechercher
                </button>
            </div>
        </div>
    );
};

export default SearchBar;

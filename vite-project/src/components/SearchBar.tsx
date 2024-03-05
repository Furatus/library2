import React, { useState } from 'react';
import {Link} from "react-router-dom";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = () => {
        onSearch(searchQuery);
        onSearch(encodeURIComponent(searchQuery.trim()));
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Entrer le nom du livre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link to={`/search?q=${searchQuery}`}>
            <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                Rechercher
            </button>
            </Link>
        </div>
    );
};

export default SearchBar;

// SearchPage.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import  Book  from './book'; // Importe l'interface Book

const SearchPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    useEffect(() => {
        // Fetch la liste de livres avec l'endpoint de recherche
        axios.get('https://openlibrary.org/search.json?q=the+lord+of+the+rings')
            .then((response) => {
                const booksData = response.data.docs;
                const booksList: Book[] = booksData.map((book: any) => ({
                    title: book.title,
                    author: book.author_name ? book.author_name[0] : 'Unknown Author',
                    coverUrl: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : '',
                    firstPublishYear: book.first_publish_year || 0,
                    editionCount: book.edition_count || 0,
                    isbn: book.isbn || [],
                }));
                setBooks(booksList);
                setFilteredBooks(booksList);
            })
            .catch((error) => {
                console.error('Error fetching book list:', error);
            });
    }, []);

    const handleSearch = (query: string) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = books.filter((book) => book.title.toLowerCase().includes(lowerCaseQuery));
        setFilteredBooks(filtered);
    };

    return (
        <div>
            {/* Barre de recherche */}
            <div className="sticky-top">
                <SearchBar onSearch={handleSearch} />
            </div>

            {/* Liste des livres en grilles */}
            <div className="container mt-4">
                <div className="row">
                    {filteredBooks.map((book) => (
                        <div className="col-md-4 mb-4" key={book.isbn[0]}>
                            <Link to={`/book/detail?isbn=${book.isbn[0]}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="card">
                                    <img src={book.coverUrl} alt={book.title} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">{`Author: ${book.author}`}</p>
                                        <p className="card-text">{`Year: ${book.firstPublishYear}`}</p>
                                        <p className="card-text">{`Editions: ${book.editionCount}`}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

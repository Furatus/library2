
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import SearchBar from './SearchBar.tsx';
import Book from "../interfaces/book.ts";
import OpenLibraryBook from "../interfaces/OpenLibraryBook.ts";
import {Link} from "react-router-dom";


const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [booksList, setBooksList] = useState<Book[]>([]);

    const handleBookClick = (isbn: string) => {
        // Rediriger vers la page de détails avec l'ISBN
        window.location.href = `/book/detail?isbn=${isbn}`;
    };

    const handleSearch = async (query: string) => {
        try {
            const response: AxiosResponse = await axios.get(`https://openlibrary.org/search.json?q=${query}&fields=title,author_name,cover_i,first_publish_year,edition_count,isbn`);
            const booksData: OpenLibraryBook[] = response.data.docs;

            const mappedBooks: Book[] = booksData.map((book: OpenLibraryBook) => ({
                title: book.title,
                author: book.author_name ? book.author_name[0] : 'Unknown Author',
                coverUrl: book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : '',
                firstPublishYear: book.first_publish_year || 0,
                editionCount: book.edition_count || 0,
                isbn: book.isbn || [],
            }));
            setBooksList(mappedBooks);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
    document.title = 'Page de recherche';
        if (searchQuery) {
            handleSearch(searchQuery);
        }
    }, [searchQuery]);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Rechercher un livre</h1>
            <div className="container text-right mb-2">
                <Link to="/AdvancedSearch" className="btn btn-secondary">
                    Recherche Avancée
                </Link>
            </div>
            <SearchBar onSearch={setSearchQuery}/>
            <div className="row">
                {booksList.map((book, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4"
                         onClick={() => handleBookClick(book.isbn[0])} style={{cursor: 'pointer'}}>
                        <div className="card">
                            <img src={book.coverUrl} className="card-img-top" alt={book.title}/>
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.author}</p>
                                <p className="card-text">Date de Parution: {book.firstPublishYear}</p>
                                <p className="card-text">Editions: {book.editionCount}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;

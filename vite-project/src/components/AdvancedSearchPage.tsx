
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import OpenLibraryBook from "../interfaces/OpenLibraryBook.ts";
import Book from '../interfaces/book.ts';
import {Link, useLocation} from 'react-router-dom';

interface AdvancedSearchPageProps {}


const AdvancedSearchPage: React.FC<AdvancedSearchPageProps> = () => {
    const location = useLocation();
    const [authorQuery, setAuthorQuery] = useState<string>('');
    const [yearQuery, setYearQuery] = useState<string>('');
    const [titleQuery, setTitleQuery] = useState<string>('');
    const [booksList, setBooksList] = useState<Book[]>([]);

    const handleBookClick = (isbn: string) => {
        // Rediriger vers la page de détails avec l'ISBN
        window.location.href = `/book/detail?isbn=${isbn}`;
    };

    const handleSearch = async () => {
        try {
            const apiUrl = 'https://openlibrary.org/search.json?';
            const authorParam = authorQuery ? `author=${authorQuery}&` : '';
            const yearParam = yearQuery ? `first_publish_year=${yearQuery}&` : '';
            const titleParam = titleQuery ? `title=${titleQuery}&` : '';

            const response: AxiosResponse = await axios.get(`${apiUrl}${authorParam}${yearParam}${titleParam}fields=title,author_name,cover_i,first_publish_year,edition_count,isbn`);
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
        document.title = 'Page de recherche avancée';
        handleSearch();
    }, [location.search]);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Recherche Avancée</h1>
            <div className="container text-right mb-2">
                <Link to="/Search" className="btn btn-secondary">
                    Recherche Simple
                </Link>
            </div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="authorInput" className="form-label">
                        Auteur
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="authorInput"
                        placeholder="Nom de l'auteur"
                        value={authorQuery}
                        onChange={(e) => setAuthorQuery(e.target.value)}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="yearInput" className="form-label">
                        Année de Publication
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="yearInput"
                        placeholder="Année"
                        value={yearQuery}
                        onChange={(e) => setYearQuery(e.target.value)}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="titleInput" className="form-label">
                        Titre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="titleInput"
                        placeholder="Titre du livre"
                        value={titleQuery}
                        onChange={(e) => setTitleQuery(e.target.value)}
                    />
                </div>
            </div>
            <button className="btn btn-outline-secondary" onClick={handleSearch}>
                Rechercher
            </button>
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

export default AdvancedSearchPage;


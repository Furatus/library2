import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface AuthorDetails {
    name: string;
}

interface BookDetails {
    title: string;
    authors?: { key: string }[];
    publish_date?: number;
}

function BookDetail() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isbn = searchParams.get('isbn');

    const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
    const [authorDetails, setAuthorDetails] = useState<AuthorDetails[]>([]);

    useEffect(() => {
        document.title = 'Détails du Livre';
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://openlibrary.org/isbn/${isbn}.json`);
                setBookDetails(response.data);


                if (response.data.authors !== undefined) {
                    const authorsDetailsArray: AuthorDetails[] = [];


                    for (let i = 0; i < response.data.authors.length; i++) {
                        const authorKey = response.data.authors[i].key;
                        console.log(response.data.authors);

                        try {
                            const authorResponse = await axios.get(`https://openlibrary.org${authorKey}.json`);
                            const authorDetails = authorResponse.data;

                            // Ajoute les détails de l'auteur au tableau
                            authorsDetailsArray.push({
                                name: authorDetails.name,
                                // Ajoute d'autres propriétés si nécessaire
                            });
                        } catch (authorError) {
                            console.error('Error fetching author details:', authorError);
                        }
                    }

                    setAuthorDetails(authorsDetailsArray);
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        if (isbn) {
            fetchBookDetails();
        }
    }, [isbn]);

    if (!bookDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <img src={`http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`} alt="Book Cover"
                         className="img-fluid"/>
                </div>
                <div className="col-md-8">
                    <h2>{bookDetails.title}</h2>
                    <p>Date de parution: {bookDetails.publish_date || 'Unknown'}</p>

                    {authorDetails.map((author, index) => (
                        <div key={index}>
                            <p>Auteur : {author.name}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-3">
                    <a
                        href={`https://fr.wikipedia.org/w/index.php?search=${encodeURIComponent(bookDetails.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Recherche Wikipedia pour "{bookDetails.title}"
                    </a>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;

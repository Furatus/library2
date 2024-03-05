import { useState, useEffect } from 'react';
import Change from "../interfaces/Change.ts";



const RecentChanges = () => {
    const [changes, setChanges] = useState<Change[]>([]);

    useEffect(() => {
        const fetchRecentChanges = async () => {
            try {
                const response = await fetch('http://openlibrary.org/recentchanges.json?limit=10');
                const data: Change[] = await response.json();
                setChanges(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des modifications récentes :', error);
            }
        };

        fetchRecentChanges();
    }, []);

    return (
        <div>
            <h2>Dernières Modifications sur OpenLibrary</h2>
            <ul>
                {changes.map(change => (
                    <li key={change.id}>
                        <strong>{change.kind}</strong> - {change.comment} ({change.timestamp})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentChanges;


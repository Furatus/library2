import React from 'react';
import RecentChanges from "./RecentChanges";

const HomePage: React.FC = () => {
    const imageUrl : string = "https://st2.depositphotos.com/2769299/7314/i/450/depositphotos_73146775-stock-photo-a-stack-of-books-on.jpg"
    return (
        <div>
        <div className="container mt-5 text-center">
            <h1>Bienvenue sur notre bibliothèque en ligne !</h1>
            <img src={imageUrl}/>
        </div>
        <div className="container mt-5 text-center">
            <RecentChanges/>
        </div>
    </div>
    );
};

export default HomePage;



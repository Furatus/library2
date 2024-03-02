// Header.tsx

import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Accueil
                </Link>
                <Link to="/search" className="navbar-brand">
                    Recherche
                </Link>
            </div>
        </nav>
    );
}

export default Header;

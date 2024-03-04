
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookDetail from './BookDetail';
import SearchPage from './SearchPage';
import Header from './Header';
import AdvancedSearchPage from './AdvancedSearchPage';
import HomePage from './HomePage';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/book/detail" element={<BookDetail />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/AdvancedSearchPage" element={<AdvancedSearchPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;

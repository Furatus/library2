
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookDetail from './BookDetail.tsx';
import SearchPage from './SearchPage.tsx';
import Header from './Header.tsx';
import AdvancedSearchPage from './AdvancedSearchPage.tsx';
import HomePage from './HomePage.tsx';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/book/detail" element={<BookDetail />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/AdvancedSearch" element={<AdvancedSearchPage/>}/>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;

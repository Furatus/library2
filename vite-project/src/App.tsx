

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookDetail from './BookDetail';
import SearchPage from './SearchPage';
import Header from './Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/book/detail" element={<BookDetail />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </Router>
    );
}

export default App;



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookDetail from './BookDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/book/detail" element={<BookDetail />} />
            </Routes>
        </Router>
    );
}

export default App;

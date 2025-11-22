import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import AdminPanel from './components/AdminPanel';
import ResultsList from './components/ResultsList';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center text-indigo-600 font-bold text-xl">
                  Booking AI
                </Link>
              </div>
              <div className="flex items-center">
                <Link to="/admin" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10">
          <Routes>
            <Route path="/" element={
              <>
                <SearchForm onSearch={handleSearch} />
                {loading ? (
                  <div className="text-center mt-8">Loading...</div>
                ) : (
                  <ResultsList results={searchResults} />
                )}
              </>
            } />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

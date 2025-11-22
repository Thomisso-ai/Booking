import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import AdminPanel from './components/AdminPanel';
import ResultsList from './components/ResultsList';
import CookieConsent from './components/CookieConsent';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchData) => {
    setLoading(true);
    setError(null);
    setSearchResults([]); // Clear previous results
    try {
      const response = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching:', error);
      setError('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-extrabold text-2xl">
                  Booking AI
                </Link>
              </div>
              <div className="flex items-center">
                <Link to="/admin" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <>
                <SearchForm onSearch={handleSearch} />

                {loading && (
                  <div className="flex justify-center items-center mt-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
                )}

                {error && (
                  <div className="max-w-4xl mx-auto mt-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                  </div>
                )}

                {!loading && !error && (
                  <ResultsList results={searchResults} />
                )}
              </>
            } />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;

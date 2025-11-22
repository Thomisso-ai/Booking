import React, { useState } from 'react';
import ResultCard from './ResultCard';

const ResultsList = ({ results }) => {
    const [visibleCount, setVisibleCount] = useState(5);

    if (!results || results.length === 0) {
        return (
            <div className="text-center mt-12 text-gray-500">
                <p className="text-lg">No results found. Try adjusting your search criteria.</p>
            </div>
        );
    }

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 5);
    };

    const visibleResults = results.slice(0, visibleCount);

    return (
        <div className="max-w-5xl mx-auto mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">
                Top Recommendations
            </h3>
            <div className="space-y-6">
                {visibleResults.map((result, index) => (
                    <ResultCard key={index} result={result} />
                ))}
            </div>

            {visibleCount < results.length && (
                <div className="mt-8 text-center">
                    <button
                        onClick={handleLoadMore}
                        className="px-6 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
                    >
                        Load More Results
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResultsList;

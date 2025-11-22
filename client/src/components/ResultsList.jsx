import React from 'react';
import ResultCard from './ResultCard';

const ResultsList = ({ results }) => {
    if (!results || results.length === 0) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top Results</h3>
            <div className="space-y-4">
                {results.map((result, index) => (
                    <ResultCard key={index} result={result} />
                ))}
            </div>
        </div>
    );
};

export default ResultsList;

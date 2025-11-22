import React, { useState } from 'react';

const ResultCard = ({ result }) => {
    const [showDetails, setShowDetails] = useState(false);

    const {
        name,
        description,
        price,
        currency,
        imageUrl,
        source,
        sourceUrl,
        overallScore,
        scores,
    } = result;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 border border-gray-200">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img
                        className="h-48 w-full object-cover md:w-48"
                        src={imageUrl || 'https://via.placeholder.com/150'}
                        alt={name}
                    />
                </div>
                <div className="p-8 w-full">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                {source}
                            </div>
                            <a
                                href={sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                            >
                                {name}
                            </a>
                            <p className="mt-2 text-gray-500">{description}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="bg-indigo-600 text-white text-xl font-bold px-3 py-1 rounded">
                                {overallScore}
                            </div>
                            <span className="text-xs text-gray-500 mt-1">Overall Score</span>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-end">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-600">
                                {result.totalPrice ? result.totalPrice.toLocaleString() : price} {currency}
                            </div>
                            <div className="text-sm text-gray-500">
                                {result.nights ? `Total for ${result.nights} nights` : 'per night'}
                            </div>
                            {result.totalPrice && (
                                <div className="text-xs text-gray-400">
                                    ({price} {currency} / night)
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium focus:outline-none"
                        >
                            {showDetails ? 'Hide Score Details' : 'Show Score Details'}
                        </button>
                    </div>

                    {showDetails && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 bg-gray-50 p-4 rounded-md">
                            {Object.entries(scores).map(([key, value]) => (
                                <div key={key} className="flex flex-col items-center p-2 bg-white rounded shadow-sm">
                                    <span className="text-xs text-gray-500 uppercase">{key}</span>
                                    <span className="font-bold text-indigo-600">{value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultCard;

import React, { useState, useEffect } from 'react';

const SearchForm = ({ onSearch }) => {
    const [formData, setFormData] = useState({
        location: '',
        checkIn: '',
        checkOut: '',
        adults: 2,
        children: 0,
        childrenAges: [],
        currency: 'CZK',
        language: 'CZ',
        preferences: {
            wifi: false,
            parking: false,
            pool: false,
            gym: false,
            breakfast: false,
            petFriendly: false,
            airConditioning: false,
            kitchen: false,
            balcony: false,
            seaView: false,
            mountainView: false,
            skiResort: false,
            skiStorage: false,
            fireplace: false,
            nearSlopes: false,
            heatedPool: false,
            sauna: false,
            hotTub: false,
        },
        instructions: '',
        limit: 10,
    });

    useEffect(() => {
        const savedData = localStorage.getItem('lastSearch');
        const consent = localStorage.getItem('cookieConsent');
        if (savedData && consent === 'true') {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            let newData = { ...prev };

            if (type === 'checkbox') {
                newData.preferences = {
                    ...prev.preferences,
                    [name]: checked,
                };
            } else if (name === 'children') {
                const count = parseInt(value) || 0;
                const currentAges = [...prev.childrenAges];
                if (count > currentAges.length) {
                    // Add default age (e.g., 5) for new children
                    for (let i = currentAges.length; i < count; i++) {
                        currentAges.push(5);
                    }
                } else {
                    // Remove ages
                    currentAges.length = count;
                }
                newData.children = count;
                newData.childrenAges = currentAges;
            } else {
                newData[name] = value;
            }

            return newData;
        });
    };

    const handleChildAgeChange = (index, age) => {
        setFormData((prev) => {
            const newAges = [...prev.childrenAges];
            newAges[index] = parseInt(age);
            return { ...prev, childrenAges: newAges };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const consent = localStorage.getItem('cookieConsent');
        if (consent === 'true') {
            localStorage.setItem('lastSearch', JSON.stringify(formData));
        }
        onSearch(formData);
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 mt-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Find Your Perfect Stay
                </h2>
                <div className="flex space-x-4">
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
                    >
                        <option value="CZK">CZK</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                    </select>
                    <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
                    >
                        <option value="CZ">🇨🇿 CZ</option>
                        <option value="EN">🇬🇧 EN</option>
                    </select>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Location */}
                <div className="relative group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Where are you going?"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow shadow-sm hover:shadow-md"
                        />
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                        <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow hover:shadow-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                        <input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow hover:shadow-md"
                        />
                    </div>
                </div>

                {/* Guests */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Guests</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                            <input
                                type="number"
                                name="adults"
                                min="1"
                                value={formData.adults}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                            <input
                                type="number"
                                name="children"
                                min="0"
                                value={formData.children}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Children Ages */}
                    {formData.children > 0 && (
                        <div className="mt-4 animate-fadeIn">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Age of children</label>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                {formData.childrenAges.map((age, index) => (
                                    <div key={index}>
                                        <input
                                            type="number"
                                            min="0"
                                            max="17"
                                            value={age}
                                            onChange={(e) => handleChildAgeChange(index, e.target.value)}
                                            className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm text-center"
                                            placeholder="Age"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Preferences */}
                <div>
                    <span className="block text-sm font-medium text-gray-700 mb-3">Preferences</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.keys(formData.preferences).map((pref) => (
                            <label key={pref} className="relative flex items-center py-3 px-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-200 group">
                                <div className="flex items-center h-5">
                                    <input
                                        type="checkbox"
                                        name={pref}
                                        checked={formData.preferences[pref]}
                                        onChange={handleChange}
                                        className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded transition-transform transform group-hover:scale-110"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <span className="font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">
                                        {pref.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">AI Instructions</label>
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Describe your dream stay..."
                        className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow hover:shadow-md"
                    />
                </div>

                {/* Limit */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Results Limit</label>
                    <select
                        name="limit"
                        value={formData.limit}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="5">Top 5</option>
                        <option value="10">Top 10</option>
                        <option value="20">Top 20</option>
                        <option value="50">Top 50</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    Search with AI
                </button>
            </form>
        </div>
    );
};

export default SearchForm;

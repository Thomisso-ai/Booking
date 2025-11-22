import React, { useState } from 'react';

const SearchForm = () => {
    const [formData, setFormData] = useState({
        location: '',
        checkIn: '',
        checkOut: '',
        adults: 1,
        children: 0,
        preferences: {
            pets: false,
            spa: false,
            sauna: false,
            skiLift: false,
            skiResort: false,
        },
        instructions: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                preferences: {
                    ...prev.preferences,
                    [name]: checked,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search Data:', formData);
        // TODO: Call API
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Find Your Perfect Stay</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, Country, or Region"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Check-in</label>
                        <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Check-out</label>
                        <input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Adults</label>
                        <input
                            type="number"
                            name="adults"
                            min="1"
                            value={formData.adults}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Children</label>
                        <input
                            type="number"
                            name="children"
                            min="0"
                            value={formData.children}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                </div>

                {/* Preferences */}
                <div>
                    <span className="block text-sm font-medium text-gray-700 mb-2">Preferences</span>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.keys(formData.preferences).map((pref) => (
                            <label key={pref} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name={pref}
                                    checked={formData.preferences[pref]}
                                    onChange={handleChange}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-gray-700 capitalize">{pref.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Special Instructions (AI Prompt)</label>
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        rows="3"
                        placeholder="e.g., I want a place with a view of the mountains and close to a hiking trail."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchForm;

import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 text-white p-4 shadow-lg z-50 flex flex-col md:flex-row justify-between items-center border-t border-indigo-500">
            <div className="mb-4 md:mb-0 md:mr-8">
                <p className="text-sm">
                    We use local storage to save your search preferences for a better experience.
                    Do you accept?
                </p>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={handleDecline}
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                    Decline
                </button>
                <button
                    onClick={handleAccept}
                    className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md transition-colors"
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;

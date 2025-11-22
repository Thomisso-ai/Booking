import React from 'react';

const AdminPanel = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel</h2>
            <p className="text-gray-600">
                This area is restricted to authorized users. Configuration for AI models and webhooks will be here.
            </p>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="text-lg font-medium text-yellow-800">Security Notice</h3>
                <p className="text-yellow-700">
                    Authentication (Google OAuth) needs to be implemented to secure this page.
                </p>
            </div>
        </div>
    );
};

export default AdminPanel;

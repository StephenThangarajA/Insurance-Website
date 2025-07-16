import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center mt-8">
        <ExclamationTriangleIcon className="w-20 h-20 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
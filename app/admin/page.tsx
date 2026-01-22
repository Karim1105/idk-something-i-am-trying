'use client';

import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/reports"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Reports Queue
            </h2>
            <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 px-3 py-1 rounded-full text-sm font-medium">
              5 Open
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Review and manage user-reported listings
          </p>
        </Link>

        <Link
          href="/admin/verifications"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Seller Verifications
            </h2>
            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full text-sm font-medium">
              3 Pending
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Approve or reject seller verification requests
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Settings
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Feature flags and platform configuration
          </p>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Platform Stats
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Users:</span>
              <span className="font-medium text-gray-900 dark:text-white">10,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Active Listings:</span>
              <span className="font-medium text-gray-900 dark:text-white">5,432</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Verified Sellers:</span>
              <span className="font-medium text-gray-900 dark:text-white">1,876</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

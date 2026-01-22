'use client';

export default function AdminVerificationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Seller Verifications Queue
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          Seller verification queue. This page would list all pending seller
          verification requests with options to approve/reject with ID document
          review.
        </p>

        <div className="mt-8 space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Sample Seller Profile
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Email: seller@example.com
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status:{' '}
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-2 py-1 rounded text-xs">
                    Pending
                  </span>
                </p>
              </div>
              <div className="space-x-2">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                  Reject
                </button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  ID Front
                </p>
                <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-gray-500">ID Document</span>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  ID Back
                </p>
                <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-gray-500">ID Document</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

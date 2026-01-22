'use client';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Platform Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature Flags */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Feature Flags
          </h2>
          <div className="space-y-3">
            {[
              { key: 'ai_assistance', label: 'AI Listing Assistance', enabled: true },
              { key: 'buyer_assist', label: 'Buyer Assist Chat', enabled: true },
              { key: 'seller_verification', label: 'Seller ID Verification', enabled: true },
              { key: 'advanced_search', label: 'Advanced Search', enabled: false },
            ].map((flag) => (
              <div key={flag.key} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">{flag.label}</span>
                <button
                  className={`px-4 py-1 rounded ${
                    flag.enabled
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {flag.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Prompts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            AI Prompt Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title Suggestion Prompt
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                placeholder="System prompt for title suggestions..."
                defaultValue="Generate 3 engaging product titles based on the input..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description Enhancement Prompt
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                placeholder="System prompt for description enhancement..."
                defaultValue="Enhance the product description to be more compelling..."
              />
            </div>
          </div>
        </div>

        {/* System Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            System Stats
          </h2>
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
              <span className="text-gray-600 dark:text-gray-400">Pending Reports:</span>
              <span className="font-medium text-red-600 dark:text-red-400">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Pending Verifications:</span>
              <span className="font-medium text-yellow-600 dark:text-yellow-400">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

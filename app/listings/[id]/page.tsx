'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Listing } from '@/types';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function ListingDetailPage() {
  const params = useParams();
  const { t } = useLanguage();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchListing(params.id as string);
    }
  }, [params.id]);

  const fetchListing = async (id: string) => {
    try {
      const res = await fetch(`/api/listings/${id}`);
      const data = await res.json();
      setListing(data);
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        {t('loading')}
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        Listing not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {listing.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {listing.price.toLocaleString()} {listing.currency}
              </span>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded capitalize">
                {listing.condition.replace('_', ' ')}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  {listing.category.replace('_', ' ')}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Location:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {listing.location}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Views:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {listing.views || 0}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  {listing.status}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg">
                Contact Seller
              </button>
              <button className="px-6 py-3 border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold rounded-lg">
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

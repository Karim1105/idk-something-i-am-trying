'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              {t('hero_title')}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold mb-4 opacity-90">
              {t('hero_subtitle')}
            </p>
            <p className="text-lg sm:text-xl mb-12 opacity-80 max-w-2xl mx-auto">
              {t('hero_description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/listings"
                className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                {t('explore_listings')}
              </Link>
              <Link
                href="/listings/new"
                className="px-8 py-4 bg-indigo-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                {t('start_selling')}
              </Link>
            </div>

            <div className="mt-16 text-sm opacity-75">
              ✨ {t('trusted_by')}
            </div>
          </div>

          {/* Floating Cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">{t('verified_sellers')}</h3>
              <p className="text-sm opacity-80">
                All sellers go through identity verification
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">{t('secure_payments')}</h3>
              <p className="text-sm opacity-80">
                Safe and encrypted payment processing
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">{t('buyer_protection')}</h3>
              <p className="text-sm opacity-80">
                Your satisfaction is our priority
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  Sample Product {i}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Cairo, Egypt
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {(i * 5000).toLocaleString()} {t('egp')}
                  </span>
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded">
                    New
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                10,000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                5,000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                98%
              </div>
              <div className="text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                2,000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Verified Sellers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

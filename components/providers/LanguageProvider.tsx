'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'ar';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    listings: 'Listings',
    sell: 'Sell',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    admin: 'Admin',
    
    // Landing page
    hero_title: 'Welcome to Weggo',
    hero_subtitle: 'Egypt\'s Trusted Marketplace',
    hero_description: 'Buy and sell with confidence. Verified sellers, secure transactions.',
    explore_listings: 'Explore Listings',
    start_selling: 'Start Selling',
    trusted_by: 'Trusted by thousands of Egyptians',
    verified_sellers: 'Verified Sellers',
    secure_payments: 'Secure Payments',
    buyer_protection: 'Buyer Protection',
    
    // Listings
    all_categories: 'All Categories',
    search: 'Search',
    filter: 'Filter',
    price_range: 'Price Range',
    condition: 'Condition',
    location: 'Location',
    sort_by: 'Sort By',
    
    // Common
    egp: 'EGP',
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    listings: 'الإعلانات',
    sell: 'بيع',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    admin: 'الإدارة',
    
    // Landing page
    hero_title: 'مرحباً بك في ويجو',
    hero_subtitle: 'السوق الموثوق في مصر',
    hero_description: 'اشترِ وبِع بثقة. بائعون موثقون، معاملات آمنة.',
    explore_listings: 'تصفح الإعلانات',
    start_selling: 'ابدأ البيع',
    trusted_by: 'موثوق به من آلاف المصريين',
    verified_sellers: 'بائعون موثقون',
    secure_payments: 'مدفوعات آمنة',
    buyer_protection: 'حماية المشتري',
    
    // Listings
    all_categories: 'جميع الفئات',
    search: 'بحث',
    filter: 'تصفية',
    price_range: 'نطاق السعر',
    condition: 'الحالة',
    location: 'الموقع',
    sort_by: 'ترتيب حسب',
    
    // Common
    egp: 'جنيه',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    save: 'حفظ',
    cancel: 'إلغاء',
    submit: 'إرسال',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

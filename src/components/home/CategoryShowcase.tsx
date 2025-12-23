'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Package, ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  nameHe: string;
  description?: string;
  image?: string;
}

export function CategoryShowcase() {
  const t = useTranslations('home.categories');
  const locale = useLocale();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/categories?locale=${locale}`);
        const data = await response.json();
        if (data.categories) {
          setCategories(data.categories.slice(0, 4)); // Show first 4 categories
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Fallback categories
        setCategories([
          { id: '1', slug: 'plastic-bags', name: locale === 'he' ? 'שקיות פלסטיק' : 'Plastic Bags', nameEn: 'Plastic Bags', nameHe: 'שקיות פלסטיק' },
          { id: '2', slug: 'nylon-rolls', name: locale === 'he' ? 'גלילי ניילון' : 'Nylon Rolls', nameEn: 'Nylon Rolls', nameHe: 'גלילי ניילון' },
          { id: '3', slug: 'carton-boxes', name: locale === 'he' ? 'קופסאות קרטון' : 'Carton Boxes', nameEn: 'Carton Boxes', nameHe: 'קופסאות קרטון' },
          { id: '4', slug: 'foam-trays', name: locale === 'he' ? 'מגשי קצף' : 'Foam Trays', nameEn: 'Foam Trays', nameHe: 'מגשי קצף' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [locale]);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?categoryId=${category.id}`}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 h-full border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                  <Package className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  {t('explore')}
                  <ArrowRight className={`h-4 w-4 ltr:ml-1 rtl:mr-1 transition-transform ${locale === 'he' ? 'rtl:rotate-180' : ''} group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1`} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <button className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
              {t('viewAll')}
              <ArrowRight className={`h-5 w-5 ltr:ml-2 rtl:mr-2 ${locale === 'he' ? 'rtl:rotate-180' : ''}`} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}


'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  nameHe: string;
}

export function ProductFilters() {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const materials = ['Plastic', 'Nylon', 'Carton', 'Foam', 'Aluminum'];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/categories?locale=${locale}`);
        const data = await response.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Fallback to hardcoded categories if API fails
        setCategories([
          { id: '1', slug: 'plastic-bags', name: locale === 'he' ? 'שקיות פלסטיק' : 'Plastic Bags', nameEn: 'Plastic Bags', nameHe: 'שקיות פלסטיק' },
          { id: '2', slug: 'nylon-rolls', name: locale === 'he' ? 'גלילי ניילון' : 'Nylon Rolls', nameEn: 'Nylon Rolls', nameHe: 'גלילי ניילון' },
          { id: '3', slug: 'carton-boxes', name: locale === 'he' ? 'קופסאות קרטון' : 'Carton Boxes', nameEn: 'Carton Boxes', nameHe: 'קופסאות קרטון' },
          { id: '4', slug: 'foam-trays', name: locale === 'he' ? 'מגשי קצף' : 'Foam Trays', nameEn: 'Foam Trays', nameHe: 'מגשי קצף' },
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [locale]);

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedCategories([]);
  };

  const hasActiveFilters = selectedMaterials.length > 0 || selectedCategories.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t('filter')}</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 ltr:mr-1 rtl:ml-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">{tCommon('categories')}</h3>
          {loadingCategories ? (
            <div className="text-sm text-muted-foreground">Loading categories...</div>
          ) : (
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 cursor-pointer hover:text-primary"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Material</h3>
          <div className="space-y-2">
            {materials.map((material) => (
              <label
                key={material}
                className="flex items-center space-x-2 cursor-pointer hover:text-primary"
              >
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(material)}
                  onChange={() => toggleMaterial(material)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{material}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


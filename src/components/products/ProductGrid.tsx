'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ProductCard } from './ProductCard';
import { useLocale } from 'next-intl';

// Mock data - fallback if API fails
const mockProducts = [
  {
    id: '1',
    slug: 'plastic-bags-clear-20x30',
    nameEn: 'Clear Plastic Bags 20x30cm',
    nameHe: 'שקיות פלסטיק שקופות 20x30 ס"מ',
    descriptionEn: 'Food-grade clear plastic bags',
    descriptionHe: 'שקיות פלסטיק שקופות למזון',
    price: 45.50,
    stock: 1000,
    minOrderQuantity: 100,
    packMultiple: 100,
    images: [],
    material: 'Plastic',
    thickness: 20,
    foodGrade: true,
  },
  {
    id: '2',
    slug: 'nylon-rolls-50cm',
    nameEn: 'Nylon Rolls 50cm Width',
    nameHe: 'גלילי ניילון רוחב 50 ס"מ',
    descriptionEn: 'Heavy-duty nylon rolls for packaging',
    descriptionHe: 'גלילי ניילון עמידים לאריזה',
    price: 120.00,
    stock: 500,
    minOrderQuantity: 10,
    packMultiple: 10,
    images: [],
    material: 'Nylon',
    thickness: 30,
    foodGrade: true,
  },
  {
    id: '3',
    slug: 'carton-boxes-small',
    nameEn: 'Small Carton Boxes',
    nameHe: 'קופסאות קרטון קטנות',
    descriptionEn: 'Recyclable carton boxes',
    descriptionHe: 'קופסאות קרטון ממוחזרות',
    price: 8.50,
    stock: 2000,
    minOrderQuantity: 50,
    packMultiple: 50,
    images: [],
    material: 'Carton',
    foodGrade: false,
  },
];

export function ProductGrid({
  searchParams,
}: {
  searchParams?: { search?: string; categoryId?: string; material?: string };
}) {
  const t = useTranslations('products');
  const locale = useLocale();
  const tCommon = useTranslations('common');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const search = searchParams?.search || '';
        const categoryId = searchParams?.categoryId || '';
        const material = searchParams?.material || '';

        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (categoryId) params.append('categoryId', categoryId);
        if (material) params.append('material', material);
        params.append('locale', locale);

        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();

        if (data.products) {
          setProducts(data.products);
        } else {
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams?.search, searchParams?.categoryId, searchParams?.material, locale]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t('noProducts')}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          // Localize category name if category exists
          const categoryName = product.category 
            ? (locale === 'he' ? product.category.nameHe : product.category.nameEn)
            : undefined;

          return (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                slug: product.slug,
                name: locale === 'he' ? product.nameHe : product.nameEn,
                description: locale === 'he' ? product.descriptionHe : product.descriptionEn,
                price: Number(product.price),
                stock: product.stock,
                minOrderQuantity: product.minOrderQuantity,
                packMultiple: product.packMultiple,
                images: product.images || [],
                material: product.material,
                thickness: product.thickness,
                foodGrade: product.foodGrade,
                categoryName,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

